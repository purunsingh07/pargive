// ParGive Mock Data & Logic

export const INITIAL_SCORES = [
  { id: 1, date: '2025-06-01', course: 'St Andrews', score: 38, type: 'Stableford' },
  { id: 2, date: '2025-06-08', course: 'Carnoustie', score: 34, type: 'Stableford' },
  { id: 3, date: '2025-06-14', course: 'Muirfield', score: 41, type: 'Stableford' },
  { id: 4, date: '2025-06-20', course: 'Royal Troon', score: 36, type: 'Stableford' },
  { id: 5, date: '2025-06-27', course: 'Turnberry', score: 39, type: 'Stableford' },
];

export const DRAW_HISTORY = [
  { month: 'June 2025', entry: 38, drawn: 36, result: 'No Match', prize: 0 },
  { month: 'May 2025', entry: 37, drawn: 37, result: '🏆 Winner!', prize: 1240 },
  { month: 'April 2025', entry: 35, drawn: 42, result: 'No Match', prize: 0 },
  { month: 'March 2025', entry: 39, drawn: 39, result: '🏆 Winner!', prize: 890 },
];

export const CHARITIES = [
  { 
    id: 1, 
    name: 'Cancer Research UK', 
    category: 'Health', 
    logo: '🎗️', 
    desc: 'Funding over 4,000 scientists, doctors and nurses to help beat cancer.',
    impact: '£1.4M raised this year'
  },
  { 
    id: 2, 
    name: "Alzheimer's Society", 
    category: 'Health', 
    logo: '💙', 
    desc: 'Working towards a world without dementia.',
    impact: '800k lives touched'
  },
  { 
    id: 3, 
    name: 'Oxfam', 
    category: 'Global Aid', 
    logo: '🌍', 
    desc: 'Tackling poverty and inequality worldwide.',
    impact: 'Active in 60+ countries'
  },
  { 
    id: 4, 
    name: 'Irish Wildlife Trust', 
    category: 'Nature', 
    logo: '🌊', 
    desc: 'Conserving Ireland’s wildlife and their habitats.',
    impact: '12 new protected areas'
  },
  { 
    id: 5, 
    name: 'ISPCC', 
    category: 'Child Support', 
    logo: '🧒', 
    desc: 'Protecting children and supporting families.',
    impact: '24/7 Childline support'
  }
];
