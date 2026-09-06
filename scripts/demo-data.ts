export const DEMO_SUBJECTS = ["Physics", "Biology", "Mathematics", "History"] as const;

export type DemoSummary = {
	subject: (typeof DEMO_SUBJECTS)[number];
	title: string;
	description: string;
	keywords: string[];
	content: string;
};

export const DEMO_SUMMARIES: DemoSummary[] = [
	// ─── PHYSICS ────────────────────────────────────────────────────────────────
	{
		subject: "Physics",
		title: "Newton's Laws: Forces, Motion and Inertia",
		description: "A focused summary of Newton's three laws, inertia, mass vs weight, and how forces govern everyday motion.",
		keywords: ["Newton", "inertia", "F=ma", "force", "mass", "weight", "action-reaction", "momentum"],
		content: `Newton's three laws of motion are the foundation of classical mechanics. The First Law (the Law of Inertia) states that an object at rest stays at rest and an object in motion stays in motion at constant velocity unless acted on by a net external force. Inertia is not a force itself; it is the property of matter that resists changes to motion. Mass is the quantitative measure of inertia: the more massive an object, the more force is needed to change its motion. This explains why large trucks require far longer braking distances than bicycles at the same speed.

The Second Law makes this quantitative: F = ma. The net force on an object equals its mass times its resulting acceleration. Doubling the force doubles the acceleration; doubling the mass halves it for the same force. This law is the workhorse of mechanics, from calculating how rockets lift off to predicting how quickly a car accelerates.

The Third Law states that every action force has an equal and opposite reaction force, always acting on a different object. A rocket expels gas downward (action); the gas pushes the rocket upward (reaction). You push the ground when you jump; the ground pushes you up. These force pairs never cancel each other because they act on different bodies.

Mass and weight are related but distinct. Mass (kg) is constant, it does not change with location. Weight (N) is the gravitational force on that mass: W = mg. On the Moon (g ≈ 1.6 m/s²) a 60 kg person weighs only 96 N, but their mass is still 60 kg. In deep space with no gravity, weight becomes zero while mass is unchanged. This distinction matters enormously in physics problem-solving.`,
	},
	{
		subject: "Physics",
		title: "Work, Energy and Power: Conservation and Calculation",
		description: "How work, kinetic energy, gravitational potential energy, and power relate, and why energy is always conserved.",
		keywords: ["work", "kinetic energy", "potential energy", "conservation", "power", "joule", "watt", "efficiency"],
		content: `Work in physics has a precise meaning: it is done when a force causes displacement in the direction of that force. W = Fd cosθ, where θ is the angle between the force and the displacement. Carrying a bag horizontally does no work on the bag (force is vertical, displacement is horizontal, cos 90° = 0), a result that surprises most students. Work is measured in Joules (J).

Kinetic energy (KE = ½mv²) is the energy an object has because of its motion. Velocity is squared, so doubling speed quadruples KE, the core reason high-speed car crashes are so destructive. A 1,000 kg car at 20 m/s has 200 kJ of KE; at 40 m/s it has 800 kJ. Gravitational potential energy (GPE = mgh) is stored energy due to height above a reference point. Lifting a 2 kg book to a 1.5 m shelf gives it 29.4 J of GPE that converts entirely to KE when it falls.

The Law of Conservation of Energy is one of physics' most fundamental principles: energy cannot be created or destroyed, only converted between forms. A swinging pendulum constantly exchanges GPE and KE. In real systems, friction converts some mechanical energy to heat, the energy is not lost, merely dispersed. Tracking energy transformations is the key to solving a huge range of mechanics problems.

Power (P = W/t = Fv) measures how quickly work is done, in Watts (W = J/s). A 100 W bulb uses 100 J every second. Efficiency = (useful output power / total input power) × 100%. No real machine reaches 100% efficiency because some energy always converts to waste heat. Improving efficiency is central to engineering design, from car engines to wind turbines.`,
	},
	{
		subject: "Physics",
		title: "Electricity and Circuits: Ohm's Law, Series and Parallel",
		description: "Voltage, current, resistance, Ohm's Law, circuit types, electric power, and the nature of conductors and insulators.",
		keywords: ["voltage", "current", "resistance", "Ohm's law", "series", "parallel", "power", "conductor", "insulator", "semiconductor"],
		content: `Three quantities govern every electric circuit. Voltage (V, Volts) is the electrical potential difference, the 'push' that drives charge through the circuit. Current (I, Amperes) is the rate of flow of charge, how many electrons pass a point per second. Resistance (R, Ohms) is the opposition to that flow. A useful analogy: voltage is water pressure, current is flow rate, and resistance is how narrow the pipe is.

Ohm's Law ties them together: V = IR, equivalently I = V/R and R = V/I. If resistance is constant and voltage doubles, current doubles. If voltage is fixed and resistance doubles, current halves. Ohm's Law applies to ohmic conductors (resistors, wires at constant temperature) but not to non-ohmic devices like diodes or filament bulbs, whose resistance changes with conditions.

Series and parallel circuits behave very differently. In series, components share a single loop: current is the same everywhere, but voltage divides across each component. Total resistance sums: Rₜ = R₁ + R₂ + R₃. If one component fails, the entire circuit breaks, like old-style Christmas lights. In parallel, components connect across the same two points: voltage is equal on every branch, but current divides. Total resistance is lower than any individual branch. Household wiring uses parallel circuits so each appliance gets full mains voltage and can operate independently.

Electric power is calculated as P = VI = I²R = V²/R. Energy consumed over time is E = Pt. Too much current through a wire generates heat (P = I²R), risking fire, the reason fuses and circuit breakers exist. Materials differ by conductivity: conductors (copper, aluminium) have free electrons and carry current easily; insulators (rubber, glass, plastic) bind electrons tightly and block current; semiconductors (silicon, germanium) sit between these extremes and can be precisely controlled, forming the basis of every transistor, diode, and microchip.`,
	},
	{
		subject: "Physics",
		title: "Waves and Gravity: Properties, Behaviour, and Planetary Motion",
		description: "Wave characteristics, wave types, reflection, refraction, diffraction, and Newton's law of gravitation with Kepler's laws.",
		keywords: ["wavelength", "frequency", "transverse", "longitudinal", "gravity", "Kepler", "orbit", "escape velocity", "reflection", "refraction"],
		content: `Every wave is characterised by four properties: wavelength (λ, distance between identical points, e.g. crest to crest), frequency (f, complete cycles per second, in Hz), amplitude (maximum displacement, determines energy carried), and period (T = 1/f). These connect through the wave equation: v = fλ. For a given medium, speed is fixed, so frequency and wavelength are inversely proportional.

Transverse waves oscillate perpendicular to the direction of travel, light waves and water waves. Longitudinal waves oscillate parallel to travel direction, producing compressions and rarefactions, sound is the prime example. Electromagnetic waves (radio, visible light, X-rays) are transverse and travel at c = 3 × 10⁸ m/s in a vacuum. Sound requires a medium and cannot travel through space.

Waves exhibit three key behaviours. Reflection: the wave bounces off a surface; angle of incidence equals angle of reflection. Refraction: the wave bends when passing between media of different speeds, light slows in glass and bends toward the normal. Diffraction: the wave spreads around gaps or obstacles; pronounced when gap size ≈ wavelength, which is why sound bends around corners (long wavelength) but light barely does (nanometre wavelengths).

Gravity governs large-scale motion through Newton's Law of Universal Gravitation: F = Gm₁m₂/r². Every mass attracts every other mass; force weakens with the square of the distance (doubling distance → force drops to one quarter). Kepler's three laws describe resulting orbital motion: planets move in ellipses with the Sun at one focus; a planet sweeps equal areas in equal times (faster when closer to the Sun); and T² ∝ r³ relating orbital period to average distance. Satellites orbit because they are falling toward Earth while moving sideways fast enough that Earth's surface curves away at the same rate. Escape velocity (≈11.2 km/s from Earth's surface) is the minimum speed to break free from a gravitational field entirely.`,
	},

	// ─── BIOLOGY ────────────────────────────────────────────────────────────────
	{
		subject: "Biology",
		title: "Cell Biology: Structure, Organelles and Function",
		description: "The key differences between cell types and the roles of the nucleus, mitochondria, ribosomes, and membranes.",
		keywords: ["prokaryote", "eukaryote", "nucleus", "mitochondria", "ribosomes", "cell membrane", "cell wall", "organelles"],
		content: `The cell is the fundamental unit of all life. Prokaryotic cells (bacteria and archaea) are small and structurally simple: no membrane-bound nucleus, no membrane-bound organelles. Their genetic material floats freely in the cytoplasm in a region called the nucleoid. Eukaryotic cells (animals, plants, fungi, protists) are larger and compartmentalised, with a true nucleus enclosed by a double nuclear membrane and specialised organelles.

The nucleus is the cell's control centre, housing DNA wound around proteins (histones) to form chromosomes. It directs which proteins the cell makes via messenger RNA, and within it sits the nucleolus, the ribosome factory. Without a nucleus, a cell cannot replicate DNA or produce proteins.

Mitochondria produce most of the cell's ATP through cellular respiration (glucose + O₂ → CO₂ + H₂O + ATP). Their folded inner membrane (cristae) maximises surface area for ATP synthesis. Cells with high energy demands (muscle, liver) contain hundreds or thousands of mitochondria. Mitochondria carry their own DNA, evidence that they were once free-living bacteria engulfed by an ancestral cell (endosymbiotic theory).

Ribosomes are present in all cells and are the sites of protein synthesis. They read mRNA instructions to assemble amino acid chains. Free ribosomes make proteins used within the cell; those attached to the rough endoplasmic reticulum make proteins destined for export or insertion into the cell membrane. Every enzyme, structural protein, and signalling molecule in the body was assembled on a ribosome.

The cell membrane is a phospholipid bilayer (present in every cell) that selectively controls what enters and exits, maintaining the internal environment. Plant cells, fungi, and bacteria additionally have a rigid cell wall outside the membrane (cellulose in plants, chitin in fungi, peptidoglycan in bacteria) that provides shape and prevents bursting under osmotic pressure. Animal cells lack a wall, which is why they can adopt specialised shapes like the biconcave disc of red blood cells.`,
	},
	{
		subject: "Biology",
		title: "Photosynthesis: Capturing Light to Make Glucose",
		description: "How plants use sunlight, water and CO₂ to produce glucose through the light reactions and the Calvin cycle.",
		keywords: ["chlorophyll", "light reactions", "Calvin cycle", "glucose", "CO₂", "ATP", "NADPH", "chloroplast", "stomata", "limiting factors"],
		content: `Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored as glucose. The overall equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Carbon dioxide enters leaves through stomata; water is absorbed from the soil by roots. Oxygen is released as a by-product, the source of virtually all atmospheric oxygen that animal life depends on.

The process occurs inside chloroplasts in two linked stages. The light-dependent reactions take place in the thylakoid membranes. Chlorophyll (and accessory pigments) absorb light, primarily red and blue wavelengths, reflecting green (which is why plants appear green). The absorbed energy excites electrons, which are passed along an electron transport chain, driving the synthesis of ATP and NADPH. Simultaneously, water is split by photolysis (2H₂O → 4H⁺ + 4e⁻ + O₂), releasing the oxygen by-product.

The Calvin cycle (light-independent reactions) runs in the stroma using the ATP and NADPH produced by the light reactions. CO₂ is 'fixed' (attached to a five-carbon molecule called RuBP by the enzyme Rubisco) and then reduced to produce G3P (glyceraldehyde-3-phosphate), a three-carbon sugar that serves as the building block for glucose, starch, and other organic compounds. Some G3P molecules are recycled to regenerate RuBP and keep the cycle running. Critically, these reactions do not require light directly, but they stop quickly when light fails because ATP and NADPH run out.

The rate of photosynthesis is governed by the most limiting factor in the environment. In low light, increasing brightness raises the rate. Once light is saturated, CO₂ concentration becomes the bottleneck. Temperature affects enzyme activity (especially Rubisco): too cold slows reactions; too hot (above ~40°C) denatures enzymes. Greenhouse horticulture exploits these relationships by enriching CO₂ and supplementing light to maximise crop yield.`,
	},
	{
		subject: "Biology",
		title: "Human Digestion and Ecosystems: Body Systems and the Natural World",
		description: "How the human digestive system processes food and how energy flows through ecosystems via food chains and nutrient cycles.",
		keywords: ["digestion", "enzymes", "villi", "peristalsis", "food chain", "trophic levels", "decomposers", "biodiversity", "10% rule"],
		content: `Digestion breaks large insoluble food molecules into small soluble ones that can be absorbed into the blood. The process is both mechanical (teeth, stomach churning) and chemical (enzymes). In the mouth, salivary amylase begins breaking starch into maltose. The bolus is swallowed and propelled by peristalsis (rhythmic muscular contractions) through the oesophagus into the stomach.

The stomach secretes hydrochloric acid (pH 1–2), which kills bacteria and activates pepsin to begin protein digestion. The resulting semi-liquid chyme passes through the pyloric sphincter into the small intestine (duodenum). Here, bile from the liver emulsifies fats into tiny droplets, vastly increasing surface area for lipase. The pancreas contributes pancreatic amylase, lipase, and protease, completing the breakdown of all major food groups. Absorption occurs across villi and microvilli lining the small intestine: glucose and amino acids enter blood capillaries, fatty acids and glycerol enter lymph lacteals.

Ecosystems organise living organisms by the energy they process. Producers (plants, algae) sit at the base, converting solar energy into organic matter via photosynthesis. Primary consumers (herbivores) eat producers; secondary consumers eat primary consumers; apex predators sit at the top. Only about 10% of stored energy transfers between each trophic level; the rest is lost as heat through respiration, waste, and movement. This 10% rule explains why food chains rarely exceed four or five links and why large predators are always less numerous than their prey.

Decomposers (bacteria and fungi) are often overlooked but are ecologically critical. They break down dead organisms and waste products into inorganic molecules (CO₂, water, mineral salts), returning nutrients to the soil for producers to use again. Without decomposers, nutrients would remain locked in dead matter and ecosystems would quickly become nutrient-depleted. Food webs better represent reality than simple food chains, showing the many interconnected feeding relationships. Removing a keystone species ripples through the web. The extirpation of wolves from Yellowstone, for example, cascaded into changes in vegetation and river behaviour.`,
	},
	{
		subject: "Biology",
		title: "DNA, Genetics and Heredity: From Molecule to Trait",
		description: "DNA structure, genes and alleles, dominant and recessive inheritance, Punnett squares, and mutations.",
		keywords: ["DNA", "double helix", "genes", "alleles", "chromosomes", "dominant", "recessive", "Punnett square", "mutation", "genotype", "phenotype"],
		content: `DNA (deoxyribonucleic acid) is the molecule of heredity. It is a double helix: two antiparallel strands of nucleotides held together by hydrogen bonds between complementary bases: adenine pairs with thymine (A-T), cytosine pairs with guanine (C-G). This base-pairing rule (Chargaff's rules) is what makes accurate DNA replication possible. The sequence of bases along a strand encodes genetic information. In eukaryotic cells, DNA is tightly coiled around histone proteins to form chromosomes housed in the nucleus. Humans have 46 chromosomes in 23 pairs.

A gene is a specific DNA sequence that codes for a particular protein, and ultimately a trait. Alleles are different versions of the same gene at the same chromosomal locus. One allele is inherited from each parent. The combination of alleles an individual carries is their genotype; the observable characteristics that result is their phenotype.

Dominant alleles (conventionally written as capital letters, e.g. B) express their trait even when only one copy is present, heterozygous individuals (Bb) show the dominant phenotype. Recessive alleles (b) are only expressed when both copies are recessive (bb). A heterozygous individual who shows the dominant phenotype but carries a recessive allele is called a carrier. Punnett squares map possible offspring genotypes: crossing two carriers (Bb × Bb) produces a 1 BB : 2 Bb : 1 bb ratio, a 3:1 phenotype ratio of dominant to recessive.

Mutations are changes in the DNA base sequence. They arise spontaneously during replication errors or are induced by mutagens: ultraviolet radiation, ionising radiation (X-rays), and certain chemicals. Point mutations change a single base pair; insertion or deletion mutations cause a frameshift that alters every codon downstream, often severely disrupting protein function. Somatic mutations affect only the individual; germline mutations (in sperm or egg cells) can be passed to offspring. Most mutations are neutral or harmful, but rarely a mutation confers a selective advantage, the raw material for evolutionary change.`,
	},

	// ─── MATHEMATICS ────────────────────────────────────────────────────────────
	{
		subject: "Mathematics",
		title: "Algebra: Linear Equations, Quadratics and Graphing",
		description: "Slope, intercepts, and graphing straight lines, alongside solving quadratic equations and interpreting parabolas.",
		keywords: ["slope", "y-intercept", "linear", "quadratic formula", "discriminant", "parabola", "factoring", "vertex", "parallel", "perpendicular"],
		content: `Linear equations describe straight-line relationships. The slope-intercept form y = mx + b is the most useful: m is the slope (rise over run, calculated as m = (y₂−y₁)/(x₂−x₁)) and b is the y-intercept. From this form, you can immediately read off both features and graph the line: start at the y-intercept, then step by the slope ratio to locate a second point. The x-intercept is found by setting y = 0 and solving for x.

Parallel lines have equal slopes but different y-intercepts and never intersect. Perpendicular lines have slopes that are negative reciprocals: if one slope is m, the perpendicular slope is −1/m, and their product is always −1. These relationships underpin coordinate geometry proofs, construction of altitudes, and perpendicular bisectors.

Quadratic equations (ax² + bx + c = 0, a ≠ 0) produce U-shaped parabolas. Three solution strategies exist. Factoring rewrites the quadratic as (x − p)(x − q) = 0, set each factor to zero to find the roots. It is fastest when the roots are rational integers, but not always possible. The quadratic formula x = (−b ± √(b²−4ac)) / 2a is universal and always works.

Before solving, evaluate the discriminant Δ = b²−4ac. If Δ > 0: two distinct real roots (parabola crosses x-axis twice). If Δ = 0: one repeated root (parabola just touches x-axis at its vertex). If Δ < 0: no real roots (parabola does not cross the x-axis). The vertex's x-coordinate is x = −b/(2a); substitute back to find y. The vertex is the minimum point when a > 0, maximum when a < 0, critical in optimisation problems involving projectile height, maximum profit, or minimum cost.`,
	},
	{
		subject: "Mathematics",
		title: "Geometry and Trigonometry: Right Triangles and Ratios",
		description: "The Pythagorean Theorem, Pythagorean triples, and the sine, cosine, and tangent ratios for finding unknown sides and angles.",
		keywords: ["Pythagoras", "hypotenuse", "a²+b²=c²", "SOH-CAH-TOA", "sine", "cosine", "tangent", "inverse trig", "30-60-90", "distance formula"],
		content: `The Pythagorean Theorem (a² + b² = c²) applies to every right-angled triangle, where c is the hypotenuse (the longest side, opposite the right angle) and a, b are the two legs. Given any two sides, you can find the third: to find the hypotenuse, add the squares; to find a leg, subtract, c² − a² = b². Pythagorean triples are integer sets that satisfy the theorem exactly: (3, 4, 5), (5, 12, 13), (8, 15, 17). Any multiple of a triple is also a triple: (6, 8, 10). These are used in construction to verify square corners. The theorem extends to the distance formula between two coordinate points: d = √[(x₂−x₁)² + (y₂−y₁)²].

The converse is equally useful: if a² + b² = c² for a triangle's three sides, then the angle opposite c is exactly 90°. If a² + b² > c², the angle is acute; if a² + b² < c², it is obtuse. This lets you test whether a triangle is right-angled without measuring angles directly.

Trigonometry uses the fixed ratios between sides to connect angles to lengths in right-angled triangles. SOH-CAH-TOA: sin(θ) = Opposite/Hypotenuse, cos(θ) = Adjacent/Hypotenuse, tan(θ) = Opposite/Adjacent, where θ is the reference angle (not the right angle), opposite is the side across from θ, adjacent is the side next to θ. To find an unknown side: choose the correct ratio, substitute the known angle and side, then rearrange. To find an unknown angle: form the ratio from the two known sides, then apply the inverse function (sin⁻¹, cos⁻¹, or tan⁻¹).

Certain angle values are exact and worth memorising: sin 30° = ½, cos 30° = √3/2, tan 30° = 1/√3; sin 45° = cos 45° = 1/√2, tan 45° = 1; sin 60° = √3/2, cos 60° = ½, tan 60° = √3. Real-world applications are extensive: surveying uses angle of elevation to find heights of inaccessible structures; navigation uses bearings; physics resolves force vectors into components; architecture calculates roof angles and ramp gradients.`,
	},
	{
		subject: "Mathematics",
		title: "Probability: Calculating and Reasoning About Chance",
		description: "Theoretical vs experimental probability, the complement rule, independent and dependent events, and the addition rules.",
		keywords: ["probability", "sample space", "complementary rule", "independent", "dependent", "mutually exclusive", "addition rule", "multiplication rule", "Law of Large Numbers"],
		content: `Probability is a number between 0 and 1 (or 0% to 100%) that measures how likely an event is to occur. The theoretical formula is P(event) = (number of favourable outcomes) / (total number of equally likely outcomes). The sample space is the set of all possible outcomes; the probabilities of all outcomes in a sample space must sum to exactly 1. Theoretical probability is calculated by reasoning before any experiment; experimental (empirical) probability is calculated from actual observed results, number of times event occurred / total trials. As trials increase, experimental probability converges on theoretical probability: this is the Law of Large Numbers.

The complementary rule is one of the most useful shortcuts in probability. The complement of event A (written A') is the event that A does not occur: P(A') = 1 − P(A). When calculating 'at least one' scenarios, it is almost always easier to calculate the complement ('none') and subtract from 1.

Two events are independent if the outcome of one does not affect the other. For independent events, the multiplication rule applies: P(A and B) = P(A) × P(B). Coin flips and dice rolls are independent. Two events are dependent if one outcome changes the probability of the other, drawing cards without replacement is the classic case. Here you must update the sample space after each draw: P(two Aces in a row) = 4/52 × 3/51, not 4/52 × 4/52.

For combining events with OR, the rule depends on whether events overlap. Mutually exclusive events cannot occur simultaneously: P(A or B) = P(A) + P(B). For events that can overlap, add then subtract the double-counted intersection: P(A or B) = P(A) + P(B) − P(A and B). Forgetting to subtract the intersection is one of the most common errors in probability. Always identify whether events are mutually exclusive before applying a formula.`,
	},

	// ─── HISTORY ────────────────────────────────────────────────────────────────
	{
		subject: "History",
		title: "The Age of Revolution: France, Industry and Social Transformation",
		description: "The French Revolution's causes and outcomes, Napoleon's rise, and the Industrial Revolution's impact on work and society.",
		keywords: ["French Revolution", "Bastille", "Reign of Terror", "Napoleon", "Industrial Revolution", "factory system", "urbanisation", "social class", "railways"],
		content: `The French Revolution (1789–1799) arose from an unsustainable combination of financial crisis, social inequality, and Enlightenment ideas. The Ancien Régime divided France into three Estates: clergy and nobility held privilege and largely avoided taxation while the Third Estate (97% of the population) bore the full burden. State bankruptcy from wars and royal extravagance, combined with bread shortages and soaring prices, pushed the Third Estate to revolt. The storming of the Bastille on 14 July 1789 became the defining symbol: a show of popular force against royal tyranny. The National Assembly issued the Declaration of the Rights of Man and Citizen, proclaiming liberty, equality, popular sovereignty, and freedom of expression.

The Revolution's radical phase (the Reign of Terror (1793–94)) saw Robespierre and the Committee of Public Safety execute approximately 17,000 people, including Louis XVI and Marie Antoinette, in the name of protecting the Revolution from enemies. The Terror ended when Robespierre himself was arrested and guillotined. The instability that followed enabled Napoleon Bonaparte (a military general who had risen through Revolutionary campaigns) to seize power in the coup of 18 Brumaire (1799). By 1804 he was Emperor Napoleon I. He preserved many Revolutionary gains (the Napoleonic Code, abolition of feudalism, meritocracy) while dismantling democratic institutions. His conquest of Europe spread Revolutionary ideals far beyond France's borders, paradoxically igniting nationalist movements against French rule.

The Industrial Revolution (c.1760–1840) began in Britain for interlocking reasons: abundant coal and iron, stable property law, colonial markets and raw materials, navigable waterways, and a culture of technical experimentation. James Watt's improved steam engine was the transformative technology, powering looms, mills, and eventually locomotives. The factory system gathered workers under one roof to operate machinery on fixed, long hours, displacing the cottage industry where workers had controlled their own pace. Conditions were often brutal: child labour, 12–16 hour shifts, dangerous unguarded machinery, and cholera-ridden urban slums. Gradual reform came through Factory Acts and the campaigning of reformers like Robert Owen.

Railways were the defining infrastructure of industrialisation. George Stephenson's Rocket (1829) proved steam locomotion viable; by 1850 Britain had over 10,000 km of track. Railways collapsed travel times, unified national markets, stimulated demand for steel and engineering, and enabled mass commuting. Socially, urbanisation accelerated; Britain became majority urban by 1851, the first country in history to do so. A powerful industrial middle class rose alongside an industrial working class, the latter eventually inspiring trade unionism and socialist thought: Marx and Engels published The Communist Manifesto in 1848 as a direct response to the conditions industrialisation had created.`,
	},
	{
		subject: "History",
		title: "The Renaissance and World War I: Cultural Rebirth and Global Conflict",
		description: "The Renaissance's humanist revolution in art and ideas, the printing press, and the causes, events, and consequences of World War I.",
		keywords: ["Renaissance", "humanism", "Leonardo da Vinci", "Michelangelo", "printing press", "WWI", "MAIN", "trench warfare", "Treaty of Versailles", "nationalism"],
		content: `The Renaissance (roughly 14th–17th centuries, beginning in Italy) was a cultural and intellectual rebirth, a rediscovery of classical Greek and Roman learning that shifted European thought from a medieval, Church-centred worldview to one placing human potential at the centre. Humanism, the intellectual movement at its core, promoted the study of classical texts, individual achievement, and the idea that human life had intrinsic value beyond preparation for the afterlife. Florence, backed by the wealth of the Medici banking family, became the cradle of Renaissance art and philosophy.

Renaissance artists broke sharply from medieval conventions. Where medieval art was flat and symbolic, Renaissance masters developed linear perspective (the illusion of depth on a flat surface), chiaroscuro (light-shadow modelling to give three-dimensional form), and anatomically precise depiction of the human body. Leonardo da Vinci (painter of the Mona Lisa and The Last Supper, and a scientist, engineer, and anatomist) epitomised the Renaissance ideal of the universal man. Michelangelo's David (celebrating human beauty and dignity) and the Sistine Chapel ceiling remain pinnacles of Western art. Johannes Gutenberg's movable-type printing press (~1440) was the era's most consequential technology: it reduced book costs dramatically, spread humanist ideas across Europe in decades rather than centuries, enabled ordinary people to read the Bible for themselves, and directly catalysed the Protestant Reformation when Martin Luther's 95 Theses were printed and distributed in 1517.

World War I (1914–1918) had roots in decades of European tension, summarised by the acronym MAIN: Militarism (an arms race, especially the Anglo-German naval rivalry), Alliances (Europe split into the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente: France, Russia, Britain), Imperialism (rivalry for colonies), and Nationalism (ethnic tensions, particularly among Slavic peoples in Austria-Hungary). The immediate trigger was the assassination of Archduke Franz Ferdinand in Sarajevo on 28 June 1914 by Gavrilo Princip, a Bosnian Serb nationalist. The alliance system activated rapidly, and within weeks the whole of Europe was at war.

On the Western Front, the war settled into the catastrophic stalemate of trench warfare. Machine guns, artillery, and barbed wire made offensive advances suicidal: the Battle of the Somme (1916) cost approximately 60,000 British casualties on its first day alone. Two events shifted the balance in 1917: the USA entered the war after Germany's unrestricted submarine warfare sank American vessels and the Zimmermann Telegram (proposing a German-Mexican military alliance against the USA) was intercepted; simultaneously, revolution in Russia removed the Eastern Front entirely. Fresh American troops and resources tipped the military balance decisively. Germany signed the armistice at 11 a.m. on 11 November 1918. The Treaty of Versailles (1919) imposed the war guilt clause (Article 231), reparations of £6.6 billion, severe territorial losses, and military restrictions on Germany, humiliations that created the economic desperation and political resentment that brought Adolf Hitler to power and planted the seeds of World War II.`,
	},
];

export type DemoNote = {
	subject: (typeof DEMO_SUBJECTS)[number];
	title: string;
	description: string;
	keywords: string[];
	cues: { cue: string; details: string }[];
};

export const DEMO_NOTES: DemoNote[] = [
	// ─── PHYSICS ────────────────────────────────────────────────────────────────
	{
		subject: "Physics",
		title: "Newton's Laws of Motion",
		description: "The three fundamental laws that describe how forces act on objects and govern classical mechanics.",
		keywords: ["inertia", "force", "acceleration", "Newton", "momentum", "action-reaction", "mass"],
		cues: [
			{
				cue: "What does Newton's First Law state?",
				details:
					"Newton's First Law, the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion at the same speed and direction unless acted upon by an unbalanced external force. Objects do not change their state of motion on their own, a net force is always required to start, stop, or alter direction. A soccer ball on a field stays still until kicked, and a hockey puck sliding on frictionless ice would keep sliding indefinitely. This law explains why you lurch forward when a car suddenly brakes, your body was in motion and tends to continue so.",
			},
			{
				cue: "What is Newton's Second Law and what does F = ma mean?",
				details:
					"Newton's Second Law states that the acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass. The equation is F = ma, where F is force in Newtons (N), m is mass in kilograms (kg), and a is acceleration in m/s². A larger force produces greater acceleration; a larger mass requires more force to achieve the same acceleration. Pushing an empty supermarket trolley versus a fully loaded one illustrates this: the loaded trolley needs significantly more force to reach the same speed because its mass is greater. This law is the foundation for calculating how objects respond to forces.",
			},
			{
				cue: "What does Newton's Third Law state? Give real-world examples.",
				details:
					"Newton's Third Law states that for every action there is an equal and opposite reaction. When object A exerts a force on object B, object B exerts a force of equal magnitude but opposite direction on A. These forces act on different objects simultaneously. Examples: when you jump, you push the ground down (action) and the ground pushes you up (reaction); a rocket expels hot gases downward (action) and is thrust upward (reaction); swimming, your arms push water backward (action) and water pushes you forward (reaction). It is important to note these paired forces never cancel each other because they act on different bodies.",
			},
			{
				cue: "What is inertia and how does mass relate to it?",
				details:
					"Inertia is the tendency of an object to resist any change in its state of motion, whether that is staying at rest or continuing to move. The greater an object's mass, the greater its inertia. A bowling ball has far more inertia than a tennis ball, it takes considerably more force to start moving, redirect, or stop it. Inertia is not a force itself; it is a property of matter. This explains why large trucks require much longer braking distances than bicycles at the same speed, and why it is difficult to suddenly change the direction of a fast-moving train. Mass is the quantitative measure of inertia.",
			},
			{
				cue: "What is the difference between mass and weight?",
				details:
					"Mass is the amount of matter in an object, measured in kilograms (kg), and is constant regardless of location. Weight is the gravitational force acting on that mass, measured in Newtons (N), calculated as W = mg where g is gravitational acceleration. On Earth, g ≈ 9.8 m/s², so a 60 kg person weighs 60 × 9.8 = 588 N. On the Moon, where g ≈ 1.6 m/s², the same person weighs only 96 N, but their mass is still 60 kg. In outer space with no gravity, weight becomes zero while mass stays the same. Mass is intrinsic; weight depends on the gravitational field the object is in.",
			},
		],
	},
	{
		subject: "Physics",
		title: "Electricity & Basic Circuits",
		description: "Core concepts of electric current, voltage, resistance, and how circuits are arranged.",
		keywords: ["voltage", "current", "resistance", "Ohm's law", "series", "parallel", "conductor", "insulator"],
		cues: [
			{
				cue: "What are voltage, current, and resistance?",
				details:
					"Voltage (V), measured in Volts (V), is the electrical potential difference between two points, the 'push' that drives charges through a circuit. Current (I), measured in Amperes (A), is the rate at which electric charge flows past a point, how many electrons per second pass through a wire. Resistance (R), measured in Ohms (Ω), is the opposition to the flow of current offered by a component. A good analogy is water in a pipe: voltage is water pressure, current is the flow rate, and resistance is the narrowness of the pipe. All three are connected by Ohm's Law.",
			},
			{
				cue: "State Ohm's Law and explain its significance.",
				details:
					"Ohm's Law states that the current through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance: V = IR, equivalently I = V/R or R = V/I. It allows us to calculate any one of the three quantities if the other two are known. If voltage doubles with resistance constant, current doubles. If resistance doubles with voltage constant, current halves. Ohm's Law applies to ohmic conductors (those that obey the law at constant temperature, like resistors) but not to non-ohmic devices like diodes or filament bulbs, whose resistance changes with temperature.",
			},
			{
				cue: "How do series and parallel circuits differ?",
				details:
					"In a series circuit, components are connected end-to-end in a single loop. Current is the same through every component, but voltage is shared (splits) across them. Total resistance is the sum of individual resistances: R_total = R₁ + R₂ + R₃. If one component breaks, the entire circuit fails. In a parallel circuit, components are connected across the same two points, providing multiple paths for current. Voltage is the same across every branch, but total current is the sum of branch currents. Total resistance is lower than any individual branch resistance. Household appliances use parallel wiring so each device gets full voltage and can operate independently.",
			},
			{
				cue: "What is electric power and how is it calculated?",
				details:
					"Electric power is the rate at which electrical energy is transferred or consumed, measured in Watts (W). The formulas are P = VI (power equals voltage times current), and since V = IR, we can also write P = I²R or P = V²/R. A 60 W light bulb connected to 120 V draws I = P/V = 60/120 = 0.5 A of current. Energy consumed over time is calculated as E = Pt (in Joules or kilowatt-hours). Understanding power is essential for electrical safety, too much current through a wire generates heat (P = I²R) and can cause fires, which is why fuses and circuit breakers exist.",
			},
			{
				cue: "What are conductors, insulators, and semiconductors?",
				details:
					"Conductors are materials that allow electric current to flow easily because they have many free electrons. Examples include copper, aluminium, silver, and gold. Insulators resist the flow of current because electrons are tightly bound to atoms. Examples include rubber, glass, plastic, and wood, used to coat wires for safety. Semiconductors have conductivity between conductors and insulators; their conductivity can be controlled by temperature, light, or added impurities (doping). Silicon and germanium are classic semiconductors. They are the foundation of modern electronics, transistors, diodes, and integrated circuits are all made from semiconducting materials.",
			},
		],
	},
	{
		subject: "Physics",
		title: "Wave Properties",
		description: "The characteristics of waves including wavelength, frequency, amplitude, and types of wave motion.",
		keywords: ["wavelength", "frequency", "amplitude", "transverse", "longitudinal", "reflection", "refraction", "diffraction"],
		cues: [
			{
				cue: "What are the key properties of a wave?",
				details:
					"Every wave has four key measurable properties. Wavelength (λ) is the distance between two consecutive identical points on a wave (e.g., crest to crest), measured in metres. Frequency (f) is the number of complete waves passing a point per second, measured in Hertz (Hz). Amplitude is the maximum displacement of a wave from its rest position, it determines the energy carried by the wave; a larger amplitude means more energy. Period (T) is the time taken for one complete wave cycle, related to frequency by T = 1/f. These properties are linked by the wave speed equation: v = fλ.",
			},
			{
				cue: "What is the difference between transverse and longitudinal waves?",
				details:
					"In transverse waves, the oscillation of particles is perpendicular (at 90°) to the direction of wave travel. Light waves and waves on a rope or water surface are transverse, you can see crests and troughs. In longitudinal waves, the oscillation of particles is parallel to the direction of wave travel, creating compressions (regions of high pressure) and rarefactions (regions of low pressure). Sound waves are longitudinal, air molecules vibrate back and forth in the same direction the sound travels. Longitudinal waves can travel through solids, liquids, and gases; transverse electromagnetic waves can travel through a vacuum.",
			},
			{
				cue: "Explain reflection and refraction of waves.",
				details:
					"Reflection occurs when a wave hits a surface and bounces back. The angle of incidence (the angle between the incoming wave and the normal to the surface) equals the angle of reflection. Mirrors work on light reflection; echoes are reflected sound waves. Refraction occurs when a wave passes from one medium to another and changes speed, causing the wave to bend. Light slows down when entering glass from air and bends toward the normal; it speeds up when returning to air and bends away. The bending of a straw in water and the formation of rainbows are examples of refraction. The amount of bending depends on the wave's frequency and the materials involved.",
			},
			{
				cue: "What is diffraction and when is it significant?",
				details:
					"Diffraction is the spreading out of a wave when it passes through a gap or around an obstacle. It occurs with all wave types: light, sound, and water. The degree of diffraction depends on the relationship between the wavelength and the size of the gap: diffraction is most pronounced when the gap size is similar to or smaller than the wavelength. Sound diffracts significantly around corners because it has long wavelengths (centimetres to metres), which is why you can hear someone around a corner. Light has very short wavelengths (nanometres) so it barely diffracts around everyday objects, making shadows sharp. Diffraction is the reason radio waves can travel around hills.",
			},
			{
				cue: "How does the wave equation v = fλ connect wave properties?",
				details:
					"The wave equation v = fλ states that wave speed (v) equals frequency (f) multiplied by wavelength (λ). For a given medium, the wave speed is constant, so frequency and wavelength are inversely proportional: if frequency increases, wavelength decreases, and vice versa. For example, all electromagnetic waves travel at c = 3 × 10⁸ m/s in a vacuum. A radio wave with frequency 100 MHz has wavelength λ = v/f = 3×10⁸ / 1×10⁸ = 3 m, while a visible light wave at 600 THz has λ = 3×10⁸ / 6×10¹⁴ ≈ 500 nm. This equation is fundamental in optics, acoustics, and the study of electromagnetic radiation.",
			},
		],
	},
	{
		subject: "Physics",
		title: "Gravity & Planetary Motion",
		description: "How gravity governs the motion of planets, satellites, and falling objects.",
		keywords: ["gravity", "orbit", "gravitational force", "Kepler", "centripetal", "mass", "weight", "escape velocity"],
		cues: [
			{
				cue: "What is Newton's Law of Universal Gravitation?",
				details:
					"Newton's Law of Universal Gravitation states that every mass attracts every other mass with a force that is proportional to the product of their masses and inversely proportional to the square of the distance between them: F = Gm₁m₂/r². Here G is the gravitational constant (6.67 × 10⁻¹¹ N·m²/kg²), m₁ and m₂ are the two masses, and r is the distance between their centres. Doubling the distance reduces the gravitational force to one quarter of its original value (inverse square law). This law explains why planets orbit the Sun, why the Moon orbits Earth, and why objects fall to the ground.",
			},
			{
				cue: "What are Kepler's three laws of planetary motion?",
				details:
					"Kepler's First Law (Law of Ellipses): planets orbit the Sun in elliptical paths with the Sun at one focus, not at the centre. Kepler's Second Law (Law of Equal Areas): a line from the planet to the Sun sweeps equal areas in equal times, planets move faster when closer to the Sun and slower when farther away. Kepler's Third Law (Law of Periods): the square of a planet's orbital period is proportional to the cube of its average distance from the Sun: T² ∝ r³. These laws were derived from Tycho Brahe's observational data before Newton explained them using gravity. They apply to any body orbiting another under gravity.",
			},
			{
				cue: "Why do satellites stay in orbit?",
				details:
					"A satellite stays in orbit because it is continuously falling toward Earth but simultaneously moving forward fast enough that the curvature of Earth 'falls away' at the same rate. This balance between the satellite's inertia (tendency to move in a straight line) and gravity (pulling it toward Earth) results in a circular or elliptical path. Gravity provides the centripetal force: F = mv²/r = GMm/r². The orbital speed depends on altitude, the International Space Station orbits at ~400 km and travels at ~7.7 km/s, completing one orbit every ~90 minutes. Geostationary satellites orbit at ~36,000 km and take exactly 24 hours, remaining stationary above one location.",
			},
			{
				cue: "What factors affect the strength of gravitational pull?",
				details:
					"Gravitational force depends on two factors: mass and distance. Larger masses produce stronger gravitational fields, the Sun's gravity is much stronger than Earth's because the Sun is ~333,000 times more massive. Distance also matters greatly: gravity weakens with the square of the distance (inverse square law), so doubling your distance from Earth's centre reduces gravity to one quarter. On Earth's surface, g ≈ 9.8 m/s². At twice Earth's radius, g drops to about 2.45 m/s². The Moon has about 1/6 of Earth's surface gravity because it is less massive, even though it is smaller. Black holes have extreme gravitational fields because of enormous mass concentrated in very small space.",
			},
			{
				cue: "What is escape velocity and how is it calculated?",
				details:
					"Escape velocity is the minimum speed an object needs to break free from a gravitational field without further propulsion. It is derived by equating kinetic energy to gravitational potential energy: v_esc = √(2GM/r), where G is the gravitational constant, M is the mass of the body, and r is the radius (distance from centre). For Earth, this equals approximately 11.2 km/s (about 40,000 km/h). If a rocket reaches this speed, it will escape Earth's gravity without needing further thrust. The Moon's escape velocity is only 2.4 km/s (smaller mass), which is why it cannot hold an atmosphere, gas molecules move at speeds that exceed its escape velocity and drift away into space.",
			},
		],
	},
	{
		subject: "Physics",
		title: "Work, Energy & Power",
		description: "The concepts of mechanical work, kinetic and potential energy, conservation of energy, and power.",
		keywords: ["work", "kinetic energy", "potential energy", "conservation of energy", "power", "joule", "watt", "efficiency"],
		cues: [
			{
				cue: "What is work in physics and how is it calculated?",
				details:
					"In physics, work is done when a force causes displacement in the direction of the force. W = Fd cosθ, where W is work (Joules), F is the applied force (Newtons), d is displacement (metres), and θ is the angle between the force and displacement. If you push a box horizontally and it moves horizontally, θ = 0° and cos0° = 1, so W = Fd. If you carry a bag and walk horizontally, the upward force and horizontal displacement are perpendicular (θ = 90°, cos90° = 0), so no work is done on the bag, this surprises many students. Work is only done when force has a component in the direction of motion.",
			},
			{
				cue: "What is kinetic energy and what is the formula?",
				details:
					"Kinetic energy (KE) is the energy an object possesses due to its motion. KE = ½mv², where m is mass (kg) and v is velocity (m/s). Because velocity is squared, doubling speed quadruples kinetic energy, this is why speed is so dangerous in car crashes. A 1,000 kg car at 20 m/s has KE = ½ × 1000 × 400 = 200,000 J. At 40 m/s (double the speed), KE = ½ × 1000 × 1600 = 800,000 J, four times greater. All moving objects have kinetic energy: wind, flowing water, a moving electron. Kinetic energy is always positive since v² is positive regardless of direction.",
			},
			{
				cue: "What is gravitational potential energy?",
				details:
					"Gravitational potential energy (GPE) is the stored energy an object has due to its position in a gravitational field. GPE = mgh, where m is mass (kg), g is gravitational acceleration (9.8 m/s² on Earth), and h is height above a reference point (metres). The reference point can be chosen arbitrarily, often the ground or the lowest point in the system. Lifting a 2 kg book to a shelf 1.5 m high gives it GPE = 2 × 9.8 × 1.5 = 29.4 J. When the book falls, this energy converts to kinetic energy. Water in a reservoir high above a turbine has large GPE which becomes KE and then electrical energy as it flows down.",
			},
			{
				cue: "What does the Law of Conservation of Energy state?",
				details:
					"The Law of Conservation of Energy states that energy cannot be created or destroyed, it can only be converted from one form to another. The total energy in an isolated system remains constant. A pendulum swinging demonstrates this: at its highest point, all energy is GPE; at the lowest point, all energy is KE; at intermediate points, it is a mix of both. In a frictionless roller coaster, the total mechanical energy (KE + GPE) remains the same throughout. In real systems, some energy converts to heat through friction or air resistance, it is not lost, merely converted to thermal energy. This principle is one of the most fundamental in all of physics.",
			},
			{
				cue: "What is power and how does it relate to work?",
				details:
					"Power is the rate at which work is done or energy is transferred. P = W/t, where P is power (Watts), W is work done (Joules), and t is time (seconds). Equivalently, P = Fv (force times velocity). One Watt equals one Joule per second. A 100 W light bulb uses 100 J of energy every second. A car engine rated at 150 kW can do 150,000 J of work per second. Efficiency is related to power: efficiency = (useful power output / total power input) × 100%. No real machine is 100% efficient, energy is always lost to heat, sound, or deformation. Understanding power and efficiency is critical in designing engines, electrical systems, and sustainable energy sources.",
			},
		],
	},

	// ─── BIOLOGY ────────────────────────────────────────────────────────────────
	{
		subject: "Biology",
		title: "Cell Structure & Function",
		description: "The building blocks of life: the structures found in animal, plant, and bacterial cells and their roles.",
		keywords: ["nucleus", "mitochondria", "cell membrane", "prokaryote", "eukaryote", "organelles", "ribosome", "chloroplast"],
		cues: [
			{
				cue: "What is the difference between prokaryotic and eukaryotic cells?",
				details:
					"Prokaryotic cells (found in bacteria and archaea) are simpler and smaller. They lack a membrane-bound nucleus, their genetic material (DNA) floats freely in the cytoplasm in a region called the nucleoid. They also lack membrane-bound organelles. Eukaryotic cells (found in animals, plants, fungi, and protists) are larger and more complex. They have a true nucleus enclosed by a nuclear membrane, and contain numerous membrane-bound organelles such as mitochondria, endoplasmic reticulum, and Golgi apparatus. The complexity of eukaryotic cells allows for greater specialisation and the development of multicellular organisms.",
			},
			{
				cue: "What is the function of the nucleus?",
				details:
					"The nucleus is the control centre of the cell, often called the 'brain' of the cell. It contains the cell's DNA (deoxyribonucleic acid) in the form of chromosomes, the genetic instructions for building and running the organism. The nucleus is enclosed by a double-layered nuclear membrane with pores that regulate the movement of molecules in and out. Within the nucleus is the nucleolus, where ribosomes are produced. The nucleus controls which proteins the cell makes and therefore controls all cellular activities, growth, reproduction, metabolism, and response to the environment. Without a nucleus, a cell cannot replicate its DNA or produce proteins.",
			},
			{
				cue: "What do mitochondria do and why are they called the powerhouse?",
				details:
					"Mitochondria are organelles responsible for producing most of the cell's ATP (adenosine triphosphate), the main energy currency used for cellular processes. This occurs through a process called cellular respiration, specifically oxidative phosphorylation in the inner mitochondrial membrane. The equation is: glucose + oxygen → carbon dioxide + water + ATP. Cells with high energy demands (muscle cells, liver cells) have many more mitochondria than less active cells. Mitochondria have their own DNA and reproduce independently, evidence that they were once free-living bacteria that were engulfed by an ancestral eukaryotic cell (endosymbiotic theory). They have a folded inner membrane called cristae to maximise surface area for ATP production.",
			},
			{
				cue: "How do the cell membrane and cell wall differ in function?",
				details:
					"The cell membrane (plasma membrane) is present in ALL cells, animal, plant, and bacterial. It is made of a phospholipid bilayer with embedded proteins and is selectively permeable, controlling what enters and exits the cell. It regulates the internal environment of the cell. The cell wall is an additional outer layer found only in plant cells (made of cellulose), fungi (chitin), and bacteria (peptidoglycan). It is rigid and provides structural support and protection, preventing the cell from bursting when it takes in water (turgor pressure). Animal cells lack a cell wall, which is why they can change shape and form specialised cells like red blood cells and neurons.",
			},
			{
				cue: "What are ribosomes and what is their role?",
				details:
					"Ribosomes are tiny organelles found in all cells (both prokaryotic and eukaryotic) that are the sites of protein synthesis. They read messenger RNA (mRNA) instructions copied from DNA and assemble chains of amino acids (polypeptides) that fold into proteins. Ribosomes can be found free-floating in the cytoplasm (making proteins used within the cell) or attached to the rough endoplasmic reticulum (making proteins for export or the cell membrane). Each ribosome consists of two subunits made of ribosomal RNA (rRNA) and proteins. Without ribosomes, cells cannot manufacture proteins, and since proteins carry out nearly every function in the cell (from catalysing reactions (enzymes) to providing structure (keratin, collagen)) ribosomes are absolutely essential.",
			},
		],
	},
	{
		subject: "Biology",
		title: "Photosynthesis",
		description: "How plants capture light energy and convert it into chemical energy stored as glucose.",
		keywords: ["chlorophyll", "glucose", "CO₂", "light reaction", "Calvin cycle", "chloroplast", "ATP", "oxygen"],
		cues: [
			{
				cue: "What is the overall equation for photosynthesis?",
				details:
					"The overall equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. In words: six molecules of carbon dioxide and six molecules of water, in the presence of light energy, are converted into one molecule of glucose and six molecules of oxygen. Carbon dioxide enters through tiny pores called stomata in leaves; water is absorbed from the soil through roots and transported up the stem. The glucose produced stores chemical energy that the plant uses for growth, reproduction, and respiration. The oxygen released is a by-product that most life on Earth depends upon for aerobic respiration.",
			},
			{
				cue: "What role does chlorophyll play in photosynthesis?",
				details:
					"Chlorophyll is the green pigment found in chloroplasts that captures light energy to power photosynthesis. It absorbs red and blue light most effectively and reflects green light, which is why plants appear green. Chlorophyll is located in the thylakoid membranes of the chloroplast. When chlorophyll absorbs a photon of light, the energy excites electrons to a higher energy level. These excited electrons are passed along the electron transport chain to produce ATP and NADPH, energy carriers used in the next stage of photosynthesis. There are several types of chlorophyll (a, b, c) and accessory pigments (carotenoids) that broaden the spectrum of light that can be absorbed.",
			},
			{
				cue: "What happens in the light-dependent reactions?",
				details:
					"The light-dependent reactions (also called the light reactions) occur in the thylakoid membranes of the chloroplast. Chlorophyll absorbs sunlight, which energises electrons. Water molecules are split by photolysis: 2H₂O → 4H⁺ + 4e⁻ + O₂. The released oxygen is a by-product expelled through stomata. The energised electrons move through the electron transport chain, releasing energy that is used to synthesise ATP (through a process called photophosphorylation). NADP⁺ is reduced to NADPH using electrons and hydrogen ions. The ATP and NADPH produced are then used in the Calvin cycle. Without light, these reactions stop.",
			},
			{
				cue: "What happens in the Calvin cycle (light-independent reactions)?",
				details:
					"The Calvin cycle (light-independent reactions) takes place in the stroma of the chloroplast. It uses the ATP and NADPH produced by the light reactions to fix CO₂ into organic molecules. CO₂ is attached to a five-carbon molecule called RuBP (ribulose bisphosphate) by an enzyme called Rubisco, forming an unstable six-carbon compound that immediately splits into two three-carbon molecules (G3P). ATP and NADPH are used to convert these into a three-carbon sugar (glyceraldehyde-3-phosphate or G3P), which is the building block for glucose and other organic compounds. Some G3P molecules are used to regenerate RuBP, keeping the cycle running.",
			},
			{
				cue: "What factors affect the rate of photosynthesis?",
				details:
					"The rate of photosynthesis is controlled by limiting factors: conditions that slow down the process when they are in short supply. The main limiting factors are: Light intensity (more light = faster rate, up to a saturation point); CO₂ concentration (more CO₂ = faster Calvin cycle, up to a point); temperature (enzymes work faster with warmth, but denature above ~40°C); and water availability (needed for photolysis; water stress closes stomata). In practice, the factor in shortest supply limits the overall rate. Even if light is plentiful, a cold temperature or low CO₂ will restrict photosynthesis. This is exploited in greenhouse agriculture, where CO₂ and light are enriched to maximise crop yield.",
			},
		],
	},
	{
		subject: "Biology",
		title: "Human Digestive System",
		description: "How food is broken down and nutrients are absorbed through the organs of the human digestive tract.",
		keywords: ["enzymes", "stomach", "small intestine", "bile", "absorption", "digestion", "peristalsis", "villi"],
		cues: [
			{
				cue: "What is the role of the mouth and saliva in digestion?",
				details:
					"Digestion begins in the mouth through both mechanical and chemical processes. Teeth physically break food into smaller pieces, increasing surface area for enzymes to act on. The tongue mixes food with saliva, forming a ball of food called a bolus. Saliva contains the enzyme amylase (salivary amylase), which breaks down starch into maltose (a simpler sugar). Saliva also contains mucus to lubricate the food for swallowing and water to help dissolve food particles. Once swallowing occurs, the bolus passes through the pharynx into the oesophagus. The uvula (soft palate) prevents food from entering the nasal passage.",
			},
			{
				cue: "What is peristalsis and where does it occur?",
				details:
					"Peristalsis is a wave-like series of muscular contractions that propels food along the digestive tract from the oesophagus to the rectum. The circular muscles behind a food bolus contract while longitudinal muscles in front relax, squeezing the food forward. Then the pattern repeats, creating a continuous wave of movement. Peristalsis occurs throughout the oesophagus, stomach, small intestine, and large intestine. It is involuntary (you cannot consciously control it) and can push food upward against gravity, which is why you can swallow while upside down (though not recommended). Gravity speeds up the process but is not required.",
			},
			{
				cue: "What happens in the stomach?",
				details:
					"The stomach is a muscular, J-shaped organ that churns food through muscular contractions and mixes it with gastric juice. Gastric juice contains hydrochloric acid (HCl, pH 1–2), which kills most bacteria, denatures proteins, and activates the enzyme pepsinogen into pepsin. Pepsin breaks proteins into smaller polypeptide chains. The acid environment is essential for pepsin activity. Mucus secreted by the stomach lining protects it from digesting itself. Food remains in the stomach for 2–4 hours, becoming a semi-liquid paste called chyme. The chyme is gradually released through the pyloric sphincter into the small intestine for further digestion.",
			},
			{
				cue: "What roles do the liver and pancreas play in digestion?",
				details:
					"The liver produces bile, a greenish fluid stored in the gall bladder and released into the small intestine (duodenum). Bile does not contain enzymes but emulsifies fats, it breaks large fat droplets into tiny droplets, massively increasing their surface area for lipase enzymes to act on. It also neutralises the acidic chyme from the stomach. The pancreas secretes pancreatic juice into the duodenum, containing three key enzymes: pancreatic amylase (breaks starch into maltose), lipase (breaks fats into fatty acids and glycerol), and protease/trypsin (breaks proteins into amino acids). The pancreas also secretes sodium bicarbonate to neutralise the acid from the stomach.",
			},
			{
				cue: "How are nutrients absorbed in the small intestine?",
				details:
					"The small intestine (6–7 metres long) is the main site of nutrient absorption. Its inner surface is covered with finger-like projections called villi, and each villus is covered with even smaller projections called microvilli (brush border), creating enormous surface area for absorption. Each villus contains a network of blood capillaries (for absorbing glucose, amino acids, vitamins, and minerals) and a lacteal (lymph vessel for absorbing fatty acids and glycerol). Glucose and amino acids pass by active transport and diffusion into the blood and travel to the liver via the hepatic portal vein. Fatty acids and glycerol are reassembled into triglycerides and enter the lymphatic system as chylomicrons.",
			},
		],
	},
	{
		subject: "Biology",
		title: "DNA & Basic Heredity",
		description: "The structure of DNA, genes, chromosomes, and the principles of genetic inheritance.",
		keywords: ["DNA", "genes", "chromosomes", "dominant", "recessive", "mutation", "Mendel", "alleles", "genotype", "phenotype"],
		cues: [
			{
				cue: "What is the structure of DNA?",
				details:
					"DNA (deoxyribonucleic acid) is a double-stranded molecule shaped like a twisted ladder, a double helix. Each strand is a chain of nucleotides, each made of three parts: a deoxyribose sugar, a phosphate group, and one of four nitrogenous bases, adenine (A), thymine (T), cytosine (C), and guanine (G). The two strands are held together by hydrogen bonds between complementary base pairs: A always pairs with T, and C always pairs with G (Chargaff's rules). The sequence of bases along the strand encodes genetic information. The human genome contains approximately 3 billion base pairs. DNA is found in the nucleus of eukaryotic cells, tightly coiled around proteins called histones to form chromosomes.",
			},
			{
				cue: "What are genes, alleles, and chromosomes?",
				details:
					"A gene is a specific sequence of DNA bases on a chromosome that codes for a particular protein, and ultimately a specific trait (e.g., eye colour, blood type). Chromosomes are long, thread-like structures made of tightly packed DNA and proteins; humans have 46 chromosomes arranged in 23 pairs. Alleles are different versions of the same gene at the same position (locus) on homologous chromosomes. For example, the gene for eye colour has alleles for brown and blue eyes. One allele is inherited from each parent. The combination of alleles an individual has is their genotype; the physical expression of those alleles is their phenotype.",
			},
			{
				cue: "What are dominant and recessive alleles?",
				details:
					"A dominant allele expresses its trait even when only one copy is present (heterozygous state). It is represented by a capital letter (e.g., B for brown eyes). A recessive allele only expresses its trait when two copies are present (homozygous recessive, bb). A person with one dominant allele (Bb) shows the dominant phenotype but carries the recessive allele, they are called a carrier. Examples: in humans, brown eyes (B) are dominant over blue eyes (b); the ability to roll your tongue is dominant over the inability. Recessive conditions like cystic fibrosis only appear in individuals who inherit two recessive alleles (ff), one from each carrier parent.",
			},
			{
				cue: "How do Punnett squares predict inheritance?",
				details:
					"A Punnett square is a grid used to predict the probability of different genotype and phenotype combinations in offspring. The alleles of one parent are arranged along the top; the other parent's along the side. Each box is filled by combining one allele from each parent, representing a possible offspring. Example: two heterozygous brown-eyed parents (Bb × Bb) produce offspring in a 1:2:1 ratio (25% BB (brown), 50% Bb (brown), 25% bb (blue)) a 3:1 phenotype ratio of brown to blue. For two traits simultaneously, a dihybrid cross uses a 4×4 Punnett square and produces a 9:3:3:1 ratio. Mendel discovered these ratios experimentally using pea plants.",
			},
			{
				cue: "What are mutations and how do they affect organisms?",
				details:
					"A mutation is a change in the sequence of DNA bases. Mutations can be spontaneous (errors during DNA replication) or induced by mutagens such as ultraviolet radiation, X-rays, or certain chemicals. Point mutations change a single base pair (substitution, insertion, or deletion). Insertions or deletions cause frameshift mutations that alter every codon downstream, usually with serious consequences. Most mutations have no effect (silent mutation), some are harmful (causing conditions like sickle cell anaemia), and a very small number may be beneficial, conferring an evolutionary advantage. Somatic mutations occur in body cells and affect only the individual; germline mutations occur in gametes and can be inherited by offspring.",
			},
		],
	},
	{
		subject: "Biology",
		title: "Ecosystems & Food Chains",
		description: "How energy flows through ecosystems and the roles organisms play within them.",
		keywords: ["producer", "consumer", "decomposer", "food web", "energy pyramid", "trophic level", "biodiversity", "habitat"],
		cues: [
			{
				cue: "What are the trophic levels in an ecosystem?",
				details:
					"Trophic levels describe the position an organism occupies in a food chain. Producers (trophic level 1) are autotrophs (typically plants and algae) that make their own food through photosynthesis using sunlight. Primary consumers (trophic level 2) are herbivores that eat producers. Secondary consumers (trophic level 3) eat primary consumers. Tertiary consumers (trophic level 4) eat secondary consumers. Decomposers (bacteria and fungi) break down dead organisms at all levels, returning nutrients to the soil for producers to use again. Energy enters the ecosystem through producers and flows upward through the food chain.",
			},
			{
				cue: "What is the 10% rule of energy transfer?",
				details:
					"Only about 10% of the energy stored at one trophic level is transferred to the next. The other 90% is lost, primarily as heat through cellular respiration (which powers the organism's activities), and also through waste, movement, and body heat maintenance. This is why energy pyramids are wider at the base (producers) and narrow dramatically at the top (apex predators). For example, if grass (producers) contains 10,000 kJ of energy, rabbits (primary consumers) obtain only 1,000 kJ, foxes (secondary consumers) obtain only 100 kJ, and a top predator might get just 10 kJ. This explains why food chains rarely exceed 4–5 links and why large predators are less numerous than their prey.",
			},
			{
				cue: "What is the difference between a food chain and a food web?",
				details:
					"A food chain is a simple linear sequence showing who eats whom: grass → grasshopper → frog → snake → eagle. Arrows show the direction of energy flow (from eaten to eater). A food web is a more realistic and complex diagram showing all the interconnected food chains in an ecosystem. Most organisms eat multiple types of food and are eaten by multiple predators, so a web better represents reality. If one species is removed from a food web, it affects many other species in the ecosystem (a cascade effect). Food webs demonstrate ecological interdependence, the removal of a keystone species (like sea otters or wolves) can dramatically alter the entire ecosystem.",
			},
			{
				cue: "What roles do decomposers play in ecosystems?",
				details:
					"Decomposers (primarily bacteria and fungi) break down dead organisms and organic waste products (faeces, fallen leaves) into simpler inorganic molecules: carbon dioxide, water, and mineral salts (nitrogen compounds, phosphates). This process, called decomposition, returns essential nutrients back to the soil, where producers can absorb them again through their roots. Without decomposers, nutrients would remain locked in dead matter; the soil would become nutrient-depleted, and waste would accumulate. Decomposers are therefore critical for nutrient cycling, particularly the carbon cycle and nitrogen cycle. They do not receive much attention in food chains, but ecosystems would collapse without them within a short period.",
			},
			{
				cue: "What is biodiversity and why does it matter?",
				details:
					"Biodiversity refers to the variety of life in an ecosystem, including the number of different species (species diversity), the genetic variation within each species (genetic diversity), and the range of different ecosystems (ecosystem diversity). High biodiversity is associated with ecosystem stability: more diverse ecosystems recover better from disturbances like drought, disease, or human activity. Biodiversity provides essential ecosystem services, clean air, clean water, soil fertility, pollination, food, and medicines. Many of today's medicines were derived from wild species. Human activities (deforestation, pollution, overexploitation, climate change, and habitat destruction) are causing a biodiversity crisis, with species going extinct at a rate far exceeding natural background rates.",
			},
		],
	},

	// ─── MATHEMATICS ────────────────────────────────────────────────────────────
	{
		subject: "Mathematics",
		title: "The Pythagorean Theorem",
		description: "The relationship between the sides of a right-angled triangle and its many applications in geometry.",
		keywords: ["right triangle", "hypotenuse", "a²+b²=c²", "Pythagoras", "Pythagorean triples", "distance formula"],
		cues: [
			{
				cue: "State the Pythagorean Theorem and identify its parts.",
				details:
					"The Pythagorean Theorem states that in any right-angled triangle, the square of the length of the hypotenuse (c) equals the sum of the squares of the other two sides (a and b): a² + b² = c². The hypotenuse is always the longest side and is always opposite the right angle (90°). The other two sides are called legs or catheti. To use the theorem: if a = 3 and b = 4, then c² = 9 + 16 = 25, so c = 5. It is one of the most used theorems in mathematics and has been proven in hundreds of different ways throughout history. It only applies to right-angled triangles.",
			},
			{
				cue: "What are Pythagorean triples?",
				details:
					"Pythagorean triples are sets of three positive whole numbers (a, b, c) that exactly satisfy a² + b² = c². The most well-known is (3, 4, 5): 9 + 16 = 25. Other common triples include (5, 12, 13): 25 + 144 = 169; (8, 15, 17): 64 + 225 = 289; and (7, 24, 25): 49 + 576 = 625. Any multiple of a Pythagorean triple is also a triple: (6, 8, 10), (9, 12, 15). These are useful in construction and carpentry for creating perfect right angles, the ancient Egyptians used (3, 4, 5) ropes to lay out square foundations. There are infinitely many Pythagorean triples.",
			},
			{
				cue: "How do you find a missing leg (not the hypotenuse)?",
				details:
					"When the hypotenuse is known and one leg is missing, rearrange a² + b² = c² to solve for the missing leg. If c = 13 and a = 5, then b² = c² − a² = 169 − 25 = 144, so b = 12. The key difference from finding the hypotenuse is that you subtract instead of add. A common mistake is treating the known sides as both legs when one might be the hypotenuse. Always identify which side is opposite the right angle (that is c, the hypotenuse) before substituting values. You can only use this formula if you know it is a right triangle.",
			},
			{
				cue: "How is the Pythagorean Theorem used in the real world?",
				details:
					"The Pythagorean Theorem has countless real-world applications. In construction: checking if corners are square using (3, 4, 5) ratios; calculating rafter lengths in roofing. In navigation: finding the shortest (straight-line) distance between two points. In coordinate geometry: the distance formula between two points (x₁, y₁) and (x₂, y₂) is d = √[(x₂−x₁)² + (y₂−y₁)²], derived directly from Pythagoras. In screen sizes: a 55-inch TV means the diagonal measures 55 inches, the width and height are the two legs. In physics: finding the resultant of two perpendicular vectors. GPS systems use extensions of this principle in three dimensions.",
			},
			{
				cue: "What is the converse of the Pythagorean Theorem?",
				details:
					"The converse states: if the square of the longest side of a triangle equals the sum of the squares of the other two sides (a² + b² = c²), then the triangle is a right-angled triangle. It provides a way to test whether a given triangle has a right angle without measuring angles. Example: a triangle with sides 6, 8, 10, does 6² + 8² = 10²? → 36 + 64 = 100 ✓. It is a right triangle. If a² + b² > c², the angle between a and b is acute. If a² + b² < c², the angle is obtuse. The converse is used in architecture, engineering, and computer graphics to verify that structures are properly perpendicular.",
			},
		],
	},
	{
		subject: "Mathematics",
		title: "Quadratic Equations",
		description: "Understanding quadratic expressions, methods of solving them, and interpreting their solutions.",
		keywords: ["quadratic formula", "discriminant", "roots", "factoring", "completing the square", "vertex", "parabola"],
		cues: [
			{
				cue: "What is the standard form of a quadratic equation?",
				details:
					"A quadratic equation is a polynomial equation of degree 2, written in standard form as ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0. The term ax² makes it quadratic, if a were zero, it would be a linear equation. Examples: x² − 5x + 6 = 0 (a=1, b=−5, c=6); 3x² + 2x − 1 = 0 (a=3, b=2, c=−1). Quadratic equations can have two, one, or no real solutions (called roots, zeros, or x-intercepts). Graphically, a quadratic function y = ax² + bx + c produces a U-shaped curve called a parabola that opens upward if a > 0 and downward if a < 0.",
			},
			{
				cue: "How do you solve a quadratic by factoring?",
				details:
					"Factoring works when the quadratic can be written as a product of two binomials. To factor x² − 5x + 6 = 0: find two numbers that multiply to c (6) and add to b (−5). Those numbers are −2 and −3. So: (x − 2)(x − 3) = 0. By the zero product property, if the product is zero, at least one factor must be zero: x − 2 = 0 → x = 2, or x − 3 = 0 → x = 3. The solutions are x = 2 and x = 3. Factoring is the fastest method when it works, but not all quadratics factor neatly over integers. If the discriminant is not a perfect square, factoring with integers is not possible and the quadratic formula is needed.",
			},
			{
				cue: "State the quadratic formula and explain when to use it.",
				details:
					"The quadratic formula solves any equation of the form ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) / 2a. The ± symbol means there are two potential solutions: one using + and one using −. The formula always works, even when factoring is impossible or messy. Example: 2x² + 3x − 2 = 0. Here a=2, b=3, c=−2. Discriminant = 3² − 4(2)(−2) = 9 + 16 = 25. x = (−3 ± √25) / 4 = (−3 ± 5) / 4. Solutions: x = (−3+5)/4 = 0.5 and x = (−3−5)/4 = −2. Use the formula when the equation does not factor neatly, or whenever you want a reliable universal method.",
			},
			{
				cue: "What is the discriminant and what does it tell us?",
				details:
					"The discriminant is the expression inside the square root in the quadratic formula: Δ = b² − 4ac. It tells us the nature of the roots without fully solving the equation. If Δ > 0: two distinct real roots (the parabola crosses the x-axis at two points). If Δ = 0: one repeated real root (the parabola just touches the x-axis at its vertex). If Δ < 0: no real roots, the solutions are complex/imaginary (the parabola does not cross the x-axis at all). Example: x² + 4 = 0 → Δ = 0 − 16 = −16 < 0, so no real solutions. The discriminant is a powerful diagnostic tool: check it before spending time solving.",
			},
			{
				cue: "What is the vertex of a parabola and how do you find it?",
				details:
					"The vertex is the highest or lowest point of a parabola, the turning point. For y = ax² + bx + c, the x-coordinate of the vertex is x = −b/(2a). Substitute this x back into the equation to find the y-coordinate. Example: y = x² − 4x + 1. x-vertex = −(−4)/(2×1) = 4/2 = 2. y-vertex = 2² − 4(2) + 1 = 4 − 8 + 1 = −3. Vertex is (2, −3). If a > 0, the vertex is the minimum; if a < 0, it is the maximum. The vertex is crucial in real-world problems: finding the maximum height of a projectile, the minimum cost in economics, or the optimal dimensions of an enclosure.",
			},
		],
	},
	{
		subject: "Mathematics",
		title: "Linear Equations & Graphs",
		description: "Working with straight-line equations, slope, intercepts, and graphing in the coordinate plane.",
		keywords: ["slope", "y-intercept", "gradient", "linear", "x-intercept", "slope-intercept form", "parallel", "perpendicular"],
		cues: [
			{
				cue: "What is slope and how is it calculated?",
				details:
					"Slope (also called gradient) measures the steepness and direction of a line. It is defined as the ratio of vertical change (rise) to horizontal change (run) between any two points on the line: m = (y₂ − y₁) / (x₂ − x₁). A positive slope means the line rises from left to right; negative slope means it falls. A slope of zero is horizontal; an undefined slope is vertical. Example: for points (1, 2) and (4, 8): m = (8 − 2) / (4 − 1) = 6/3 = 2. The slope remains the same between any two points on the same line, this is what makes it a straight line. Slope is fundamental in physics (velocity-time graphs), economics (cost functions), and engineering.",
			},
			{
				cue: "What is slope-intercept form (y = mx + b)?",
				details:
					"Slope-intercept form y = mx + b is the most convenient way to write a linear equation. m is the slope (steepness of the line) and b is the y-intercept (where the line crosses the y-axis, at x = 0). From this form you can immediately read off both key features without calculating. Example: y = 3x − 5 has slope 3 (rises 3 units for every 1 unit right) and y-intercept −5 (crosses y-axis at (0, −5)). To graph: start at the y-intercept, then use the slope as a ratio (rise/run) to find a second point, and draw a line through them. Any linear relationship can be written in this form, making it extremely versatile.",
			},
			{
				cue: "How do parallel and perpendicular lines relate in terms of slope?",
				details:
					"Parallel lines have equal slopes but different y-intercepts, they never intersect. If one line has slope m = 3, any parallel line also has slope 3. Example: y = 3x + 1 and y = 3x − 4 are parallel. Perpendicular lines meet at a right angle (90°). Their slopes are negative reciprocals of each other: if one slope is m, the perpendicular slope is −1/m. Example: if m = 2, the perpendicular slope is −1/2. The product of perpendicular slopes always equals −1: m₁ × m₂ = −1. This relationship is used in geometry (constructing perpendicular bisectors), coordinate geometry (finding altitudes of triangles), and architecture (ensuring right-angle structures).",
			},
			{
				cue: "How do you find the x-intercept and y-intercept of a line?",
				details:
					"The y-intercept is where the line crosses the y-axis (x = 0). To find it from y = mx + b, simply read off b. For other forms, set x = 0 and solve for y. The x-intercept is where the line crosses the x-axis (y = 0). Set y = 0 in the equation and solve for x. Example: for y = 2x − 6: y-intercept: set x = 0 → y = −6, so (0, −6). x-intercept: set y = 0 → 2x − 6 = 0 → x = 3, so (3, 0). Knowing both intercepts makes graphing straightforward: plot both points and draw a straight line through them. In applied contexts, intercepts often have meaningful interpretations, e.g., the y-intercept is the fixed cost when no items are produced.",
			},
			{
				cue: "How do you write an equation of a line from given information?",
				details:
					"There are two common scenarios. (1) Given slope m and y-intercept b: substitute directly into y = mx + b. (2) Given slope m and a point (x₁, y₁): use point-slope form y − y₁ = m(x − x₁), then rearrange to slope-intercept form. (3) Given two points: first calculate slope m = (y₂−y₁)/(x₂−x₁), then use point-slope form with either point. Example: through (2, 5) and (4, 9): m = (9−5)/(4−2) = 4/2 = 2. y − 5 = 2(x − 2) → y = 2x − 4 + 5 → y = 2x + 1. Always verify by substituting both original points back into the final equation.",
			},
		],
	},
	{
		subject: "Mathematics",
		title: "Basic Probability",
		description: "Understanding chance, sample spaces, and the rules for calculating probabilities of events.",
		keywords: ["probability", "event", "sample space", "independent", "dependent", "complementary", "theoretical", "experimental"],
		cues: [
			{
				cue: "What is probability and how is it calculated?",
				details:
					"Probability is a measure of how likely an event is to occur, expressed as a number between 0 and 1 (or 0% to 100%). P(event) = Number of favourable outcomes / Total number of possible outcomes. A probability of 0 means the event is impossible; a probability of 1 means it is certain. Example: rolling a 4 on a fair six-sided die, P(4) = 1/6 ≈ 0.167 or 16.7%. The set of all possible outcomes is called the sample space. The sum of probabilities of all possible outcomes in a sample space must equal 1. Theoretical probability is calculated from reasoning; experimental probability is calculated from actual results of repeated trials.",
			},
			{
				cue: "What is the complementary rule of probability?",
				details:
					"The complement of an event A (written A' or Ā) is the event that A does NOT occur. The complementary rule states: P(A) + P(A') = 1, equivalently P(A') = 1 − P(A). This is extremely useful when it is easier to calculate the probability of the complement than the event itself. Example: probability of rolling at least one 6 in two rolls. Instead of calculating all cases where at least one 6 appears, calculate the complement (no 6 in either roll): P(no 6 in one roll) = 5/6; P(no 6 in two rolls) = 5/6 × 5/6 = 25/36. Therefore, P(at least one 6) = 1 − 25/36 = 11/36 ≈ 0.306. The complementary rule simplifies many complex probability problems.",
			},
			{
				cue: "What are independent and dependent events?",
				details:
					"Two events are independent if the outcome of one does not affect the probability of the other. For independent events: P(A and B) = P(A) × P(B). Example: flipping a coin and rolling a die, heads and rolling a 3 are independent. P(H and 3) = 1/2 × 1/6 = 1/12. Two events are dependent if one affects the other. Example: drawing two cards from a deck without replacement. P(drawing an Ace first) = 4/52. P(drawing another Ace given the first was an Ace) = 3/51 (one fewer Ace and one fewer card). P(two Aces) = 4/52 × 3/51 = 12/2652 ≈ 0.0045. With replacement, the events would be independent.",
			},
			{
				cue: "What is theoretical versus experimental probability?",
				details:
					"Theoretical probability is based on mathematical reasoning and assumes all outcomes are equally likely. It is calculated using the formula P = favourable outcomes / total outcomes before any experiment is conducted. Experimental (empirical) probability is based on actual results from repeated trials: P = number of times event occurred / total number of trials. As the number of trials increases, experimental probability approaches theoretical probability, this is the Law of Large Numbers. Example: flipping a fair coin theoretically gives P(heads) = 0.5. If you flip it 10 times, you might get 6 heads (experimental P = 0.6), but over 10,000 flips it will be very close to 0.5. Both types have practical uses in statistics, gambling, and science.",
			},
			{
				cue: "How do you calculate probability of mutually exclusive events (OR)?",
				details:
					"Two events are mutually exclusive if they cannot happen at the same time. For mutually exclusive events A and B: P(A or B) = P(A) + P(B). Example: rolling a 2 or a 5 on a die: P(2) = 1/6, P(5) = 1/6, P(2 or 5) = 2/6 = 1/3. For non-mutually exclusive events (which can both occur): P(A or B) = P(A) + P(B) − P(A and B). The subtraction prevents double-counting the overlap. Example: P(drawing a heart or a king) = P(heart) + P(king) − P(king of hearts) = 13/52 + 4/52 − 1/52 = 16/52 = 4/13. Always check whether events can overlap before choosing the correct formula.",
			},
		],
	},
	{
		subject: "Mathematics",
		title: "Introduction to Trigonometry",
		description: "Using sine, cosine, and tangent ratios to find unknown sides and angles in right-angled triangles.",
		keywords: ["sine", "cosine", "tangent", "SOH-CAH-TOA", "right triangle", "hypotenuse", "opposite", "adjacent", "inverse trig"],
		cues: [
			{
				cue: "What is SOH-CAH-TOA and what does it stand for?",
				details:
					"SOH-CAH-TOA is a mnemonic for remembering the three basic trigonometric ratios in a right-angled triangle. SOH: Sin(θ) = Opposite / Hypotenuse. CAH: Cos(θ) = Adjacent / Hypotenuse. TOA: Tan(θ) = Opposite / Adjacent. θ (theta) is the reference angle, not the right angle. The opposite side is the side directly across from the angle θ. The adjacent side is the side next to the angle θ (not the hypotenuse). The hypotenuse is always the longest side, opposite the right angle. These ratios only apply in right-angled triangles. For any given angle, the ratio is constant regardless of the size of the triangle.",
			},
			{
				cue: "How do you find an unknown side using trigonometry?",
				details:
					"Identify the angle you are using (θ), identify which two sides are involved (which are known and unknown), then select the appropriate trig ratio. Example: In a right triangle, θ = 35°, hypotenuse = 10 cm, find the opposite side. Use SOH: sin(35°) = opposite/10. Opposite = 10 × sin(35°) = 10 × 0.574 = 5.74 cm. Another example: θ = 42°, adjacent = 7 m, find the hypotenuse. Use CAH: cos(42°) = 7/hypotenuse. Hypotenuse = 7/cos(42°) = 7/0.743 = 9.42 m. Always ensure your calculator is set to degrees (not radians) for standard problems.",
			},
			{
				cue: "How do you find an unknown angle using inverse trig functions?",
				details:
					"When you know two sides and want to find the angle, use inverse trigonometric functions: sin⁻¹ (arcsin), cos⁻¹ (arccos), or tan⁻¹ (arctan). Select the ratio involving the two known sides, calculate the ratio's value, then apply the inverse function. Example: opposite = 5, hypotenuse = 8. Use SOH: sin(θ) = 5/8 = 0.625. θ = sin⁻¹(0.625) = 38.7°. Another example: opposite = 6, adjacent = 4. Use TOA: tan(θ) = 6/4 = 1.5. θ = tan⁻¹(1.5) = 56.3°. On a calculator, look for the 'INV', '2nd', or 'SHIFT' key followed by the trig function. You can always verify your answer: once the angle is found, confirm the sides make sense using Pythagoras.",
			},
			{
				cue: "What are the exact values of trig ratios for 30°, 45°, and 60°?",
				details:
					"Certain angles have exact trig values that appear frequently and are worth memorising: For 30°: sin = 1/2, cos = √3/2, tan = 1/√3 (= √3/3). For 45°: sin = 1/√2 (= √2/2), cos = 1/√2 (= √2/2), tan = 1. For 60°: sin = √3/2, cos = 1/2, tan = √3. These come from two special triangles: the 30-60-90 triangle (half an equilateral triangle with sides 1, √3, 2) and the 45-45-90 triangle (an isosceles right triangle with legs 1, 1, hypotenuse √2). Using exact values avoids rounding errors in proofs and exact calculations. In exams, leaving answers as fractions or with √ is often expected.",
			},
			{
				cue: "What are real-world applications of trigonometry?",
				details:
					"Trigonometry has extensive real-world uses. Navigation and surveying: calculating distances and bearings that cannot be measured directly, e.g., finding the height of a mountain from a known distance away using the angle of elevation. Architecture: determining the correct angle and length of roof supports, ramps, and staircases. Physics: resolving forces into components (a 40 N force at 30° has horizontal component 40cos(30°) and vertical 40sin(30°)). Astronomy: calculating distances to stars using parallax angles. Music and signal processing: sound waves are modelled using trigonometric functions. GPS technology uses triangulation, a geometric application of trigonometric principles. Angle of elevation and angle of depression problems are classic applications taught at school level.",
			},
		],
	},

	// ─── HISTORY ────────────────────────────────────────────────────────────────
	{
		subject: "History",
		title: "World War I: Causes and Key Events",
		description: "The underlying tensions and immediate triggers that led to the First World War and the major events that followed.",
		keywords: ["assassination", "alliances", "nationalism", "imperialism", "trench warfare", "Archduke Franz Ferdinand", "armistice"],
		cues: [
			{
				cue: "What were the long-term causes of World War I? (MAIN)",
				details:
					"Historians use the acronym MAIN to summarise the long-term causes. Militarism: European powers (especially Germany and Britain) were in an arms race, building larger navies and armies, making war more likely and more destructive. Alliances: Europe was divided into two armed camps: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (France, Russia, Britain). Any conflict between two nations could drag in all of Europe. Imperialism: competition for colonies in Africa and Asia created tensions and rivalry between Britain, France, and Germany. Nationalism: strong national pride led to demands for independence (e.g., Slavic peoples in Austria-Hungary) and rivalry between nations. These tensions had been building for decades before 1914.",
			},
			{
				cue: "What was the immediate trigger for World War I?",
				details:
					"The immediate trigger was the assassination of Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, on 28 June 1914 in Sarajevo (Bosnia). The assassin was Gavrilo Princip, a Bosnian Serb nationalist and member of the Black Hand secret society. Austria-Hungary blamed Serbia and issued an ultimatum with harsh demands. Serbia accepted most but not all conditions. Austria-Hungary declared war on Serbia on 28 July 1914. The alliance system then activated: Russia began mobilising to support Serbia; Germany declared war on Russia; Germany invaded Belgium and declared war on France; Britain declared war on Germany (due to a treaty guaranteeing Belgian neutrality). Within weeks, Europe was engulfed in war.",
			},
			{
				cue: "What was trench warfare and why did it develop?",
				details:
					"Trench warfare was a form of land warfare where opposing armies dug extensive networks of trenches and fortifications facing each other across a strip of land called No Man's Land. It developed on the Western Front because advances in weapons technology (machine guns, artillery, and barbed wire) made offensive attacks across open ground extremely deadly. Neither side could advance without suffering catastrophic losses, leading to years of stalemate. The trenches stretched from the English Channel to Switzerland, over 700 km. Conditions were brutal: mud, rats, disease, shell shock, and constant danger. The Battle of the Somme (1916) saw approximately 60,000 British casualties on the first day alone, illustrating the horrific cost of trench warfare.",
			},
			{
				cue: "What were the key turning points and events of World War I?",
				details:
					"Several events shifted the course of the war: The Schlieffen Plan (Germany's strategy to quickly defeat France before turning east) failed when Belgium resisted and Britain entered the war. The Battle of Marne (1914) halted Germany's advance into France, establishing the Western Front. Gallipoli Campaign (1915) (an Allied attempt to open a supply route to Russia through the Ottoman Empire) ended in failure. The USA entered the war in April 1917 after Germany's unrestricted submarine warfare sank American ships (including the Lusitania) and the Zimmermann Telegram was intercepted (Germany proposing a German-Mexican alliance against the USA). The Russian Revolution (1917) took Russia out of the war. Fresh American troops and resources tipped the balance toward the Allies.",
			},
			{
				cue: "How did World War I end and what were the consequences?",
				details:
					"Germany signed an armistice (ceasefire) on 11 November 1918 at 11 a.m., the famous 'eleventh hour of the eleventh day of the eleventh month.' The formal peace was negotiated at the Paris Peace Conference in 1919. The Treaty of Versailles imposed harsh terms on Germany: war guilt clause (Article 231, blaming Germany for the war), enormous reparations (£6.6 billion), loss of territory (Alsace-Lorraine to France, colonies lost), and severe military restrictions. The Ottoman and Austro-Hungarian Empires collapsed. The League of Nations was established to prevent future wars. The humiliation and economic hardship imposed on Germany created conditions that contributed to the rise of Adolf Hitler and the seeds of World War II.",
			},
		],
	},
	{
		subject: "History",
		title: "The French Revolution",
		description: "The political and social upheaval in France from 1789 that overthrew the monarchy and transformed society.",
		keywords: ["Bastille", "Ancien Régime", "Estates", "Robespierre", "Reign of Terror", "Napoleon", "Declaration of Rights", "liberty"],
		cues: [
			{
				cue: "What were the causes of the French Revolution?",
				details:
					"The French Revolution arose from a combination of financial, social, and ideological factors. Financial crisis: France was bankrupted by its involvement in the American Revolution and extravagant royal spending (especially of Marie Antoinette). The state could not pay its debts. Unjust social structure (Ancien Régime): French society was divided into three Estates, the First Estate (clergy) and Second Estate (nobility) held privileges and largely avoided taxation, while the Third Estate (97% of the population, commoners, merchants, peasants) bore the full tax burden. Enlightenment ideas: philosophers like Voltaire, Rousseau, and Montesquieu spread ideas of liberty, equality, and the social contract, inspiring ordinary people to question royal authority. A series of poor harvests also caused bread shortages and soaring prices, causing widespread suffering among the poor.",
			},
			{
				cue: "What was the storming of the Bastille and why was it significant?",
				details:
					"On 14 July 1789, Parisian crowds stormed the Bastille, a fortress-prison that symbolised royal tyranny and absolute monarchy. They were searching for weapons and gunpowder to defend themselves. Although only seven prisoners were found inside, the fall of the Bastille became the defining symbol of the Revolution, a demonstration that the people could challenge and overthrow royal power. It marks the symbolic start of the Revolution and is still commemorated as Bastille Day (French National Day) on 14 July every year. The Third Estate had already declared itself the National Assembly on 17 June 1789, claiming sovereign authority and beginning to draft a new constitution.",
			},
			{
				cue: "What was the Declaration of the Rights of Man and Citizen?",
				details:
					"Adopted by the National Assembly on 26 August 1789, the Declaration of the Rights of Man and Citizen was a foundational document of the Revolution. Inspired by Enlightenment philosophy and the American Declaration of Independence, it declared that all men are born free and equal in rights; sovereignty belongs to the nation, not the king; citizens have natural rights including liberty, property, security, and resistance to oppression; and freedom of speech and press are inviolable. It fundamentally challenged the privilege of the Ancien Régime. However, it applied to men only, women's rights were not included, which led figures like Olympe de Gouges to write the Declaration of the Rights of Woman and the Female Citizen (1791) in protest.",
			},
			{
				cue: "What was the Reign of Terror?",
				details:
					"The Reign of Terror (September 1793 – July 1794) was a period of extreme political violence led by Maximilien Robespierre and the Committee of Public Safety. In the name of protecting the Revolution from internal enemies and foreign invasion, suspected counter-revolutionaries were arrested and executed with speed. The guillotine became the instrument of revolutionary justice. Approximately 17,000 people were officially executed (including King Louis XVI in January 1793 and Queen Marie Antoinette) and tens of thousands more died in prison or through summary violence. Robespierre justified the Terror as necessary to defend the Revolution. Ironically, he himself was arrested, tried, and guillotined in July 1794 (Thermidorian Reaction) as his colleagues turned against him.",
			},
			{
				cue: "How did Napoleon rise from the Revolution?",
				details:
					"Napoleon Bonaparte was a military general who rose to prominence during the Revolutionary Wars, gaining fame through campaigns in Italy and Egypt. The instability of the Directory (the weak government that replaced Robespierre) created an opportunity for a military coup. On 9 November 1799 (18 Brumaire), Napoleon staged a coup and became First Consul of France, effectively its ruler. By 1804 he declared himself Emperor Napoleon I, crowned in Notre-Dame Cathedral. Napoleon preserved many Revolutionary achievements, the Napoleonic Code (civil law reform based on equality before the law, property rights, and secular governance), abolition of feudalism, while dismantling democratic institutions and centralising power. His conquests spread Revolutionary ideas across Europe, inadvertently sparking nationalism in other nations.",
			},
		],
	},
	{
		subject: "History",
		title: "The Industrial Revolution",
		description: "The transformation from agrarian economies to industrialised societies beginning in Britain in the late 18th century.",
		keywords: ["steam engine", "factory system", "urbanisation", "textile industry", "child labour", "railways", "capitalism"],
		cues: [
			{
				cue: "Where and when did the Industrial Revolution begin, and why?",
				details:
					"The Industrial Revolution began in Britain around 1760–1840, before spreading to Europe, North America, and beyond. Britain had several unique advantages: abundant coal and iron ore reserves; a stable government and legal system that protected private property and contracts; an empire providing raw materials and markets for manufactured goods; a tradition of scientific inquiry (the Scientific Revolution); surplus agricultural population (from the Enclosure Acts) providing workers for factories; a network of rivers and canals for transporting goods; and a culture of entrepreneurship and innovation. James Watt's improved steam engine (1769) is often cited as a pivotal invention that powered the Industrial Revolution.",
			},
			{
				cue: "What was the factory system and how did it change work?",
				details:
					"Before industrialisation, most goods were made in homes or small workshops under the cottage industry system, where workers controlled their own pace and tools. The factory system gathered many workers under one roof, using machinery powered by water or steam to produce goods at high speed and volume. Workers now operated machines owned by factory owners (capitalists) and worked fixed, often long hours (12–16 hours a day) for wages. The division of labour meant each worker performed only one repetitive task. This dramatically increased production and reduced costs but changed the nature of work, workers lost autonomy, were exposed to dangerous machinery, and were subject to strict discipline. The factory system was the foundation of industrial capitalism.",
			},
			{
				cue: "What were working and living conditions like during the Industrial Revolution?",
				details:
					"Conditions for industrial workers were often harsh. Factory work was dangerous, unguarded machinery caused frequent injuries and deaths; coal mines risked cave-ins, explosions, and lung disease. Working hours were extremely long, and wages were low. Child labour was widespread, children as young as 5 or 6 worked in factories and mines because they were cheap and their small size was useful in cramped spaces. Living conditions in industrial cities were overcrowded and unsanitary, workers lived in cramped slum housing with no clean water or sewage systems, leading to epidemics of cholera, typhoid, and tuberculosis. Gradual reform came through Factory Acts (1833, 1844) that restricted child labour and hours, and the work of reformers like Robert Owen and the Chartist movement.",
			},
			{
				cue: "How did railways transform society during the Industrial Revolution?",
				details:
					"The railway was one of the most transformative technologies of the Industrial Revolution. George Stephenson's Rocket (1829) established the viability of steam-powered railways. The first public passenger railway (Liverpool to Manchester, 1830) launched the railway age. Railways revolutionised society in multiple ways: they dramatically cut travel time (journeys taking days by horse now took hours); reduced the cost of transporting goods, enabling mass markets; stimulated demand for coal, iron, and engineering; encouraged investment and the growth of financial markets; allowed people to live further from work (early commuting); and united national economies. By 1850, Britain had over 10,000 km of railway track. Railways also spread industrialisation globally as British engineers built railways across Europe, America, and colonial territories.",
			},
			{
				cue: "How did the Industrial Revolution change social structures?",
				details:
					"The Industrial Revolution fundamentally altered social structures. Urbanisation: millions moved from rural areas to cities, Britain went from a rural majority to an urban majority by 1851, the first country in history to achieve this. The middle class (bourgeoisie) expanded enormously, factory owners, merchants, professionals, and engineers gained wealth and political influence. The working class (proletariat) emerged as the new industrial poor, leading to labour movements, trade unions, and eventually socialist and communist political thought (Marx and Engels published The Communist Manifesto in 1848, responding to industrial capitalism). Women and children entered paid work in unprecedented numbers. The landed aristocracy's dominance declined as industrial wealth became the new measure of power.",
			},
		],
	},
	{
		subject: "History",
		title: "The Renaissance",
		description: "The cultural and intellectual revival in Europe from the 14th to 17th centuries that transformed art, science, and thought.",
		keywords: ["humanism", "Florence", "printing press", "Leonardo da Vinci", "Michelangelo", "perspective", "Reformation", "patronage"],
		cues: [
			{
				cue: "What was the Renaissance and what does the word mean?",
				details:
					"The Renaissance (French for 'rebirth') was a cultural and intellectual movement that began in Italy around the 14th century and spread across Europe by the 16th–17th centuries. It marked the transition from the medieval period to the modern era. The Renaissance was characterised by a renewed interest in the culture, art, philosophy, and learning of ancient Greece and Rome (classical antiquity). Scholars, artists, and thinkers turned away from purely religious medieval thought toward a more human-centred worldview. Italy (particularly city-states like Florence, Venice, and Rome) was the cradle of the Renaissance because of its wealth (from trade), political competition between city-states, and its physical proximity to ancient Roman ruins and manuscripts.",
			},
			{
				cue: "What is humanism and how did it shape Renaissance thought?",
				details:
					"Humanism was the intellectual movement at the heart of the Renaissance. It emphasised the study of classical texts (Greek and Latin), the importance of the individual, and the potential of human beings to achieve greatness through reason and education. Humanists believed that human life had value in itself, not merely as preparation for the afterlife. They studied the humanities: history, poetry, rhetoric, philosophy, and grammar. Key humanists include Francesco Petrarch (often called the 'father of humanism'), Erasmus of Rotterdam, and Pico della Mirandola, whose 'Oration on the Dignity of Man' declared that humans have unlimited potential to shape their own nature. Humanism challenged Church authority and laid intellectual groundwork for the Scientific Revolution and the Reformation.",
			},
			{
				cue: "How did Renaissance art differ from medieval art?",
				details:
					"Medieval art was largely symbolic and flat, figures were depicted according to religious significance (the more important, the larger) rather than realistic proportion, and depicted against gold backgrounds with no depth. Renaissance artists developed several revolutionary techniques. Linear perspective: creating the illusion of three-dimensional depth on a flat surface by converging lines to a vanishing point, pioneered by Brunelleschi and Alberti. Chiaroscuro: the use of light and shadow to give figures a three-dimensional, sculpted appearance (mastered by Leonardo da Vinci and Caravaggio). Realistic human anatomy: artists like Michelangelo studied human corpses to accurately depict the human body. Secular subjects: alongside religious themes, portraits, mythological scenes, and landscapes became legitimate subjects for art.",
			},
			{
				cue: "Who were the key figures of the Renaissance and what did they achieve?",
				details:
					"Leonardo da Vinci (1452–1519) was perhaps the ultimate Renaissance man, painter (Mona Lisa, The Last Supper), sculptor, architect, engineer, and scientist. His notebooks contain designs for flying machines, armoured vehicles, and anatomical studies centuries ahead of their time. Michelangelo (1475–1564) created the statue of David (celebrating human beauty), painted the Sistine Chapel ceiling (1508–1512), and designed the dome of St. Peter's Basilica. Raphael (1483–1520) created harmonious, idealised paintings including The School of Athens. In literature, Dante Alighieri (Divine Comedy), Petrarch, and Boccaccio (Decameron) established vernacular Italian literature. Niccolò Machiavelli's The Prince introduced modern political science. The wealthy Medici family of Florence were crucial patrons, financing many of these artists and scholars.",
			},
			{
				cue: "How did the printing press spread Renaissance ideas?",
				details:
					"Johannes Gutenberg's development of the movable-type printing press around 1440 in Germany was one of history's most transformative technologies. Before printing, books were hand-copied by monks, expensive, slow, and accessible only to the elite and Church. The printing press allowed identical copies of texts to be produced quickly and cheaply. By 1500, an estimated 15–20 million books had been printed in Europe. This had profound consequences: Renaissance ideas, scientific discoveries, and humanist writings spread rapidly across Europe; the Bible could be printed in vernacular languages, not just Latin, allowing ordinary people to read and interpret it themselves, a catalyst for the Protestant Reformation (Martin Luther's 95 Theses were distributed via printing in 1517); literacy rates rose; and the power of the Church and monarchies to control information was weakened.",
			},
		],
	},
];
