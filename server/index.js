import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Stripe Setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

app.use(cors());

// Webhook requires raw body for Stripe signature verification
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock'
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.client_reference_id;

      if (userId) {
        // Elevate user status in Supabase
        await supabase
          .from('profiles')
          .update({ status: 'Active' })
          .eq('id', userId);
        
        console.log(`Updated user ${userId} to Active.`);
      }
    }

    res.json({ received: true });
  }
);

// Standard JSON parsing for all other routes
app.use(express.json());

// API Status
app.get('/', (req, res) => {
  res.send('ParGive Backend API is running.');
});

// Create Stripe Checkout Session
app.post('/api/create-checkout', async (req, res) => {
  const { plan, userId, charityId, email } = req.body;
  
  if (!plan || !userId) {
    return res.status(400).json({ error: 'Missing plan or userId' });
  }

  const priceId = plan === 'yearly' 
    ? process.env.STRIPE_PRICE_YEARLY
    : process.env.STRIPE_PRICE_MONTHLY;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || 'price_mock',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/subscribe?canceled=true`,
      client_reference_id: userId,
      customer_email: email,
      metadata: {
        charityId: charityId || 'none'
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

// Admin: Simulate Draw Logic
app.post('/api/admin/simulate-draw', async (req, res) => {
  const { logic } = req.body;
  
  try {
    // 1. Fetch active users' score entries
    const { data: scores, error } = await supabase
      .from('scores')
      .select('user_id, stableford_points, profiles!inner(status)')
      .eq('profiles.status', 'Active');
      
    if (error) throw error;
    
    // Simplistic dummy sum for demo purposes:
    // In production, calculating "rolling average" in SQL or server memory.
    const totalPrizePool = 14200; // Demo logic
    let winningNum = 36;
    
    if (logic === 'Random') {
      winningNum = Math.floor(Math.random() * 45) + 1;
    } else {
      // Find the most frequent rolling average segment
      // (Mock logic mapping for simulation demonstration)
      winningNum = 38;
    }

    res.json({
      number: winningNum,
      winners: scores ? Math.floor(scores.length / 5) : 0, 
      totalPrize: totalPrizePool,
      logic
    });
  } catch (error) {
    console.error('Simulation Error:', error);
    res.status(500).json({ error: 'Simulation failed.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
