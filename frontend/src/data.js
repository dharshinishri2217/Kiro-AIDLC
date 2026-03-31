export const roles = [
  { id: 'mother', label: 'Mother', emoji: '👩‍👧', description: 'Nurturing, caregiving, and raising children', category: 'household' },
  { id: 'partner', label: 'Partner', emoji: '💑', description: 'Emotional support and relationship management', category: 'emotional' },
  { id: 'caregiver', label: 'Caregiver', emoji: '🤲', description: 'Looking after elderly or dependent family members', category: 'household' },
  { id: 'employee', label: 'Professional', emoji: '💼', description: 'Managing career while carrying home responsibilities', category: 'professional' },
  { id: 'homemaker', label: 'Homemaker', emoji: '🏠', description: 'Running the household and keeping it functional', category: 'household' },
  { id: 'planner', label: 'Family Planner', emoji: '📋', description: 'Organizing schedules, appointments, and logistics', category: 'planning' },
  { id: 'friend', label: 'Friend & Confidant', emoji: '🫂', description: 'Being the emotional anchor for friends and family', category: 'emotional' },
  { id: 'mentor', label: 'Mentor', emoji: '🌟', description: 'Guiding others professionally and personally', category: 'professional' },
];

// Task categories
export const taskCategories = [
  { id: 'emotional', label: 'Emotional Support', emoji: '💜', color: 'pink' },
  { id: 'household', label: 'Household Work', emoji: '🏡', color: 'amber' },
  { id: 'planning', label: 'Planning & Organization', emoji: '📋', color: 'blue' },
  { id: 'professional', label: 'Professional Contributions', emoji: '💼', color: 'green' },
];

export const tasks = [
  // Emotional Support
  { id: 'emotional-support', label: 'Listening & Emotional Support', emoji: '💬', category: 'emotional', roleIds: ['partner', 'mother', 'caregiver', 'friend'], impactMessage: 'No one listens anymore. Tensions rise. Relationships begin to fracture silently. People feel unseen and unheard.' },
  { id: 'conflict-resolution', label: 'Resolving Family Conflicts', emoji: '🕊️', category: 'emotional', roleIds: ['mother', 'partner', 'friend'], impactMessage: 'Arguments escalate without resolution. The home fills with unspoken resentment and tension.' },
  { id: 'mental-health-check', label: 'Checking In on Others', emoji: '🫶', category: 'emotional', roleIds: ['friend', 'partner', 'mother'], impactMessage: 'No one notices when someone is struggling. Mental health crises go undetected and unsupported.' },
  { id: 'celebration', label: 'Remembering Birthdays & Milestones', emoji: '🎂', category: 'emotional', roleIds: ['planner', 'mother', 'friend'], impactMessage: 'Birthdays pass unnoticed. Milestones go uncelebrated. People feel forgotten and unloved.' },

  // Household Work
  { id: 'cooking', label: 'Cooking Meals', emoji: '🍳', category: 'household', roleIds: ['mother', 'homemaker', 'partner'], impactMessage: 'No meals are prepared. Hunger sets in. Children cry. The kitchen goes cold and silent.' },
  { id: 'childcare', label: 'Childcare & Supervision', emoji: '👶', category: 'household', roleIds: ['mother', 'caregiver'], impactMessage: 'Children are unsupervised. School pickups are missed. Homework goes undone. Safety is at risk.' },
  { id: 'cleaning', label: 'Cleaning & Tidying', emoji: '🧹', category: 'household', roleIds: ['homemaker', 'mother'], impactMessage: 'Dishes pile up. Laundry overflows. The home becomes unlivable within days.' },
  { id: 'elder-care', label: 'Elder Care', emoji: '👴', category: 'household', roleIds: ['caregiver', 'mother'], impactMessage: 'Elderly family members go without medication, meals, and companionship. Their dignity suffers.' },
  { id: 'grocery', label: 'Grocery & Errands', emoji: '🛒', category: 'household', roleIds: ['homemaker', 'planner', 'mother'], impactMessage: 'The fridge empties. Basic supplies run out. Daily life grinds to a halt.' },

  // Planning & Organization
  { id: 'appointments', label: 'Managing Appointments', emoji: '📅', category: 'planning', roleIds: ['planner', 'mother', 'caregiver'], impactMessage: 'Doctor visits are missed. Deadlines are forgotten. The family drifts into disorganized chaos.' },
  { id: 'mental-load', label: 'Carrying the Mental Load', emoji: '🧠', category: 'planning', roleIds: ['planner', 'partner', 'mother'], impactMessage: 'No one remembers what needs to be done. Everything falls through the cracks simultaneously.' },
  { id: 'social-glue', label: 'Being the Social Glue', emoji: '🤝', category: 'planning', roleIds: ['partner', 'planner', 'friend'], impactMessage: 'Family gatherings stop. Friendships fade. The social fabric quietly and permanently unravels.' },
  { id: 'finances', label: 'Managing Household Finances', emoji: '💰', category: 'planning', roleIds: ['planner', 'homemaker'], impactMessage: 'Bills go unpaid. Budgets spiral. Financial stress tears through the household.' },

  // Professional Contributions
  { id: 'work-balance', label: 'Balancing Work & Home', emoji: '⚖️', category: 'professional', roleIds: ['employee', 'mother', 'partner'], impactMessage: 'Work performance drops. Home suffers. She was holding both worlds together — alone.' },
  { id: 'mentoring', label: 'Mentoring Colleagues', emoji: '🌟', category: 'professional', roleIds: ['mentor', 'employee'], impactMessage: 'Junior colleagues lose their guide. Growth stalls. The team loses its quiet backbone.' },
  { id: 'volunteering', label: 'Community Volunteering', emoji: '🏘️', category: 'professional', roleIds: ['mentor', 'friend', 'planner'], impactMessage: 'Community programs collapse. The people who depended on her have nowhere to turn.' },
];

export const finalInsights = {
  default: "She was holding everything together — silently, invisibly, every single day. This is what invisible work looks like when it stops.",
  mother: "A mother's work is never listed on a resume, never paid, and rarely acknowledged. But when it stops — everything stops.",
  partner: "Emotional labor is real labor. When she stops being the emotional anchor, the whole relationship drifts.",
  caregiver: "Caregiving is a full-time job that society pretends doesn't exist. Until it stops.",
  planner: "The mental load is exhausting. She remembered everything so no one else had to. Now no one does.",
  employee: "She contributed professionally while carrying the entire home. When she stops, both worlds feel the loss.",
  friend: "She was the one who checked in, remembered, and showed up. Without her, people realize how much they relied on her presence.",
  mentor: "Her guidance shaped careers and lives. Invisible until it's gone.",
};

export const motivationalMessages = [
  "Every simulation you complete builds awareness. Keep going. 💜",
  "You've taken another step toward understanding invisible labor.",
  "Awareness is the first act of change. Thank you for being here.",
  "Each perspective you explore makes the invisible a little more visible.",
  "Your streak shows commitment to understanding. That matters.",
];
