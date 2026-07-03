export const FEATURES = {
  summary: { key: "summary", label: "Summary", route: "/summary", color: "#a78bfa", icon: "sparkles", title: "AI Summarizer", desc: "Turn any text into a structured, recall-ready summary." },
  qa:      { key: "qa",      label: "Notes",   route: "/note",    color: "#38bdf8", icon: "chat",     title: "Notes & Q&A",   desc: "Write notes with cues, then chat with them. Answers stay grounded in your source." },
  quiz:    { key: "quiz",    label: "Quiz",    route: "/quiz",    color: "#fbbf24", icon: "quiz",     title: "AI Quiz",       desc: "Generate a quiz from any topic and test your recall." },
} as const;

export type FeatureKey = keyof typeof FEATURES;

export const SAMPLE_TOPICS = [
  { t: "Photosynthesis", s: "Biology" },
  { t: "Newton's Laws of Motion", s: "Physics" },
  { t: "The French Revolution", s: "History" },
  { t: "Supply & Demand", s: "Economics" },
  { t: "Big-O Notation", s: "Computer Science" },
  { t: "The Krebs Cycle", s: "Biochemistry" },
];

export interface DummySummary {
  id: string;
  title: string;
  subject: string;
  tint: string;
  date: string;
  keywords: string[];
  details: string;
}

export const SUMMARIES: DummySummary[] = [
  { id: "s1", title: "Photosynthesis & the Light Reactions", subject: "Biology", tint: "#34d399", date: "May 28",
    keywords: ["Chloroplast", "Light reactions", "Calvin cycle", "ATP", "NADPH", "Stroma"],
    details: "Photosynthesis converts light energy into chemical energy stored in glucose. It happens in two stages. The light-dependent reactions occur in the thylakoid membranes, where chlorophyll absorbs photons, splits water (releasing O₂), and produces ATP and NADPH. The Calvin cycle (light-independent) then uses that ATP and NADPH in the stroma to fix CO₂ into G3P, which builds glucose. Net equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂." },
  { id: "s2", title: "Newton's Three Laws of Motion", subject: "Physics", tint: "#a78bfa", date: "May 26",
    keywords: ["Inertia", "F = ma", "Action–reaction", "Momentum"],
    details: "First law (inertia): an object stays at rest or in uniform motion unless acted on by a net force. Second law: F = ma — acceleration is proportional to net force and inversely proportional to mass. Third law: for every action there is an equal and opposite reaction. Together they form the foundation of classical mechanics." },
  { id: "s3", title: "The French Revolution: Causes", subject: "History", tint: "#fbbf24", date: "May 24",
    keywords: ["Ancien Régime", "Estates-General", "Bastille", "Enlightenment"],
    details: "The French Revolution (1789) grew from financial crisis, an unfair three-estate social order, and Enlightenment ideas about liberty and equality. The Estates-General convened in 1789, the Third Estate broke away to form the National Assembly, and the storming of the Bastille on July 14 became the symbolic start of the revolution." },
  { id: "s4", title: "Supply & Demand Fundamentals", subject: "Economics", tint: "#38bdf8", date: "May 21",
    keywords: ["Equilibrium", "Elasticity", "Surplus", "Shortage"],
    details: "Markets coordinate through prices. The demand curve slopes down; the supply curve slopes up. Equilibrium is where they intersect. Elasticity measures how responsive quantity is to price. A price ceiling below equilibrium causes shortages; a price floor above it causes surpluses." },
  { id: "s5", title: "Big-O Notation & Complexity", subject: "Computer Science", tint: "#a78bfa", date: "May 18",
    keywords: ["O(1)", "O(n)", "O(log n)", "O(n²)", "Amortized"],
    details: "Big-O describes how an algorithm's running time grows with input size n, ignoring constants. O(1) is constant, O(log n) halves the problem each step (binary search), O(n) scales linearly, O(n log n) is typical of good sorts, and O(n²) doubles work for nested loops." },
  { id: "s6", title: "The Krebs Cycle (Citric Acid Cycle)", subject: "Biochemistry", tint: "#34d399", date: "May 15",
    keywords: ["Acetyl-CoA", "NADH", "FADH₂", "Mitochondria"],
    details: "The Krebs cycle oxidizes acetyl-CoA in the mitochondrial matrix, producing NADH, FADH₂, and a small amount of ATP/GTP per turn. These electron carriers feed the electron transport chain. Each glucose yields two turns of the cycle." },
];

export interface DummyCue {
  q: string;
  a: string;
}

export interface DummyNote {
  id: string;
  title: string;
  subject: string;
  date: string;
  details: string;
  cues: DummyCue[];
}

export const NOTES: DummyNote[] = [
  { id: "n1", title: "Organic Chemistry: Functional Groups", subject: "Chemistry", date: "May 27",
    details: "Functional groups are specific arrangements of atoms that give organic molecules characteristic chemical properties. The hydroxyl group (—OH) defines alcohols and makes molecules more polar and water-soluble. Carbonyl groups (C=O) appear in aldehydes and ketones. Carboxyl groups (—COOH) make carboxylic acids. Amino groups (—NH₂) are basic and appear in amino acids.",
    cues: [
      { q: "What does the hydroxyl group do to solubility?", a: "The —OH group is polar and forms hydrogen bonds with water, making the molecule more water-soluble." },
      { q: "How do you tell an aldehyde from a ketone?", a: "Both have a carbonyl (C=O). In an aldehyde the carbonyl carbon is bonded to at least one H (terminal); in a ketone it sits between two carbons." },
      { q: "Why are carboxylic acids acidic?", a: "The —COOH group can donate a proton; the resulting carboxylate ion is stabilized by resonance." },
    ] },
  { id: "n2", title: "World War II: Key Turning Points", subject: "History", date: "May 23",
    details: "World War II (1939–1945) turned on several decisive moments. The Battle of Britain (1940) denied Germany air superiority. Operation Barbarossa (1941) opened a brutal Eastern Front. Pearl Harbor brought the US into the war. Stalingrad (1942–43) marked the collapse of German momentum in the east, and D-Day (June 1944) opened the Western Front.",
    cues: [
      { q: "Why was Stalingrad a turning point?", a: "It was the first massive German surrender and ended their eastward advance, shifting initiative permanently to the Soviets." },
      { q: "What did D-Day accomplish?", a: "The Allied landings in Normandy opened a second major front in Western Europe, squeezing Germany from both sides." },
    ] },
  { id: "n3", title: "Intro to Macroeconomics: GDP", subject: "Economics", date: "May 19",
    details: "Gross Domestic Product (GDP) measures the total market value of all final goods and services produced within a country in a period. It can be calculated three ways: the expenditure approach (C + I + G + NX), the income approach, and the production approach. Real GDP adjusts for inflation.",
    cues: [
      { q: "What are the components of the expenditure approach?", a: "Consumption + Investment + Government spending + Net exports (exports − imports)." },
      { q: "Why use real instead of nominal GDP?", a: "Real GDP strips out price changes (inflation), so growth reflects actual output rather than rising prices." },
    ] },
];

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export const QUIZ_BANK: QuizQuestion[] = [
  { q: "Which organelle is the primary site of ATP production in eukaryotic cells?", options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"], correct: 1,
    explain: "Mitochondria run oxidative phosphorylation, producing the majority of a cell's ATP." },
  { q: "What process do plants use to convert light energy into chemical energy?", options: ["Respiration", "Transpiration", "Photosynthesis", "Fermentation"], correct: 2,
    explain: "Photosynthesis captures light in chloroplasts and stores it as glucose." },
  { q: "DNA replication is best described as which of the following?", options: ["Conservative", "Semi-conservative", "Dispersive", "Non-conservative"], correct: 1,
    explain: "Each new double helix keeps one original strand and one new strand — semi-conservative." },
  { q: "Which molecule carries amino acids to the ribosome during translation?", options: ["mRNA", "tRNA", "rRNA", "DNA"], correct: 1,
    explain: "Transfer RNA (tRNA) matches its anticodon to the mRNA codon and delivers the amino acid." },
  { q: "The cell membrane is primarily composed of which structure?", options: ["Single protein layer", "Phospholipid bilayer", "Cellulose wall", "Glycogen mesh"], correct: 1,
    explain: "A phospholipid bilayer with embedded proteins forms the selectively permeable membrane." },
];

export const ACTIVITY = [
  { feat: "summary" as FeatureKey, title: "Photosynthesis & the Light Reactions", action: "Summarized", time: "2h ago" },
  { feat: "quiz"    as FeatureKey, title: "Cell Biology", action: "Scored 8/10 on", time: "5h ago" },
  { feat: "qa"      as FeatureKey, title: "Organic Chemistry: Functional Groups", action: "Asked 4 questions about", time: "Yesterday" },
  { feat: "summary" as FeatureKey, title: "Newton's Three Laws of Motion", action: "Summarized", time: "2 days ago" },
];
