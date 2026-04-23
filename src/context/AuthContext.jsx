import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }

      // If mock env, gracefully fallback
      if (!data) {
         setUser({
           id: authUser.id,
           email: authUser.email,
           name: authUser.user_metadata?.full_name || 'Demo User',
           role: authUser.email === 'admin@pargive.com' ? 'admin' : 'user',
           status: 'Active'
         });
      } else {
        setUser({ ...authUser, ...data });
      }
    } catch (err) {
       console.error("Error connecting to Supabase:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // If we're mocking local tests with dummy keys:
    if (import.meta.env.VITE_SUPABASE_URL === 'https://mock.supabase.co' || !import.meta.env.VITE_SUPABASE_URL) {
      const mockUser = {
        id: 'mock-1',
        name: 'John Doe',
        email: email,
        role: email === 'admin@pargive.com' ? 'admin' : 'user',
        status: 'Active'
      };
      setUser(mockUser);
      return { data: { user: mockUser }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { data, error };
  };

  const logout = async () => {
    if (import.meta.env.VITE_SUPABASE_URL !== 'https://mock.supabase.co') {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const signup = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    if (error) throw error;
    return { data, error };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
