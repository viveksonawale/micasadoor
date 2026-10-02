const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMG = {
  factoryFloor: "/factory/factory-floor.jpg",
  doorDark: u("photo-1537199322506-85bfd51c0601"),
  handle: u("photo-1670100191868-84c3809e0f00"),
  hotelCorridor: u("photo-1760276148666-1fd62b875fa6"),
  hotelDark: u("photo-1763142106375-fb47c275ed45", 2000),
  grain: u("photo-1644931551533-02906718127f"),
  blueprint: u("photo-1721244654394-36a7bc2da288"),
  bathroom: u("photo-1620626011761-996317b8d101"),
  bathroomAlt: u("photo-1552321554-5fefe8c9ef14"),
  interior: u("photo-1600607687939-ce8a6c25118c"),
  living: u("photo-1600566753086-00f18fb6b3ea"),
  interiorAlt: u("photo-1615873968403-89e068629265"),
};

export interface DoorProduct {
  slug: string;
  name: string;
  wood: string;
  tagline: string;
  image: string;
  description: string;
  appearance: string;
  applications: string[];
  finishes: string[];
  customisation: string;
  frames: string[];
  suitability: string;
  seo: { title: string; description: string };
  isDoor: true;
}

export interface FrameProduct {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  image: string;
  description: string;
  points: string[];
  seo: { title: string; description: string };
  isDoor: false;
}

export type Product = DoorProduct | FrameProduct;

export const DOORS: DoorProduct[] = [
  {
    isDoor: true,
    slug: "teak-wood-doors",
    name: "Teak Wood Doors",
    wood: "Teak",
    tagline: "The benchmark hardwood for premium doors.",
    image: IMG.doorDark,
    description: "Solid teak doors crafted from carefully selected timber. Teak is one of the most widely specified hardwoods in Indian architecture, valued for its rich golden-brown grain and natural oil content.",
    appearance: "Rich golden-brown grain that deepens beautifully with polish.",
    applications: ["Premium residences", "Hotel suites", "Villa entrances", "Executive offices"],
    finishes: ["Natural", "Wood Polish", "Matt", "Gloss", "Custom Stains"],
    customisation: "Sizes, panel designs, grooves, veneer overlays and hardware preparation made to drawing.",
    frames: ["Solid Teak Frame", "LVL Frame", "BWP LVL Frame"],
    suitability: "Suited to premium residential, hospitality and commercial projects where appearance matters.",
    seo: { title: "Teak Wood Doors Manufacturer", description: "Premium teak wood doors manufactured in Gandhidham, Gujarat by Micasa Doors Solutions. Custom sizes, finishes and frame combinations for projects across India." },
  },
  {
    isDoor: true,
    slug: "red-meranti-doors",
    name: "Red Meranti Wood Doors",
    wood: "Red Meranti",
    tagline: "Warm reddish tone with dependable project performance.",
    image: IMG.interiorAlt,
    description: "Red Meranti is a popular hardwood choice for door manufacturing, offering a warm reddish-brown appearance and good workability for both solid and panelled constructions.",
    appearance: "Warm reddish-brown with a straight, even grain that takes polish well.",
    applications: ["Residential projects", "Hotels", "Institutional buildings", "Developer projects"],
    finishes: ["Natural", "Wood Polish", "Matt", "Painted", "Laminate"],
    customisation: "Project-specific sizes, designs and batch consistency for large quantities.",
    frames: ["Steamed Beech Frame", "LVL Frame", "BWP LVL Frame"],
    suitability: "A strong mid-premium option for multi-unit residential and hospitality projects.",
    seo: { title: "Red Meranti Wooden Doors Manufacturer", description: "Red Meranti wooden doors manufactured in India by Micasa Doors Solutions. Warm tone, consistent supply and custom finishes for developers, hotels and residences." },
  },
  {
    isDoor: true,
    slug: "steamed-beech-doors",
    name: "Steamed Beech Wood Doors",
    wood: "Steamed Beech",
    tagline: "Light, uniform and modern.",
    image: IMG.interior,
    description: "Steamed beech offers a pale, uniform appearance that suits contemporary interiors. Its even texture makes it a reliable substrate for polish, paint and laminate finishes.",
    appearance: "Light cream-to-pink tone with a fine, uniform grain.",
    applications: ["Modern apartments", "Offices", "Institutional projects", "Interior doors"],
    finishes: ["Natural", "Matt", "Painted", "Laminate"],
    customisation: "Clean-lined modern designs, grooves and factory-applied finishes.",
    frames: ["Steamed Beech Frame", "LVL Frame", "Marine Grade LVL Frame"],
    suitability: "Ideal for projects that need a light, consistent, contemporary look at scale.",
    seo: { title: "Steamed Beech Doors Manufacturer", description: "Steamed beech wooden doors by Micasa Doors Solutions  light, uniform and modern doors manufactured in Gandhidham for residential and commercial projects." },
  },
  {
    isDoor: true,
    slug: "pine-doors",
    name: "Pine Wood Doors",
    wood: "Pine",
    tagline: "100% pine construction for internal and wet-area applications.",
    image: IMG.bathroom,
    description: "Our non-fire-rated doors are built on 100% A-grade pine  bedrooms, utility areas and bathrooms. For bathrooms and wet areas we offer a water-resistant laminated build-up; final performance depends on the selected finish and site conditions.",
    appearance: "Pale, soft grain that works beautifully painted or laminated.",
    applications: ["Bedroom doors", "Internal doors", "Utility areas", "Bathroom doors", "Wet-area applications"],
    finishes: ["Painted", "Laminate", "Matt", "Water-resistant coating systems"],
    customisation: "Wet-area build-ups, ventilation louvres, sizes and finishes to specification.",
    frames: ["LVL Frame", "BWP LVL Frame", "Marine Grade LVL Frame"],
    suitability: "Cost-efficient internal door programme for large residential and institutional projects.",
    seo: { title: "Pine Wooden Doors & Bathroom Doors Manufacturer", description: "100% pine wood doors for bedrooms, internal doors, bathrooms and wet areas. Manufactured by Micasa Doors Solutions, Gandhidham." },
  },
  {
    isDoor: true,
    slug: "designer-wooden-doors",
    name: "Designer Wooden Doors",
    wood: "Multiple",
    tagline: "Architectural surfaces, grooves and statement entrances.",
    image: IMG.handle,
    description: "Designer doors combine our standard timber constructions with architectural surface treatments  fluting, grooves, inlays and mixed-material detailing developed with your architect.",
    appearance: "Custom surface architecture  fluted, grooved, panelled or inlaid.",
    applications: ["Luxury villas", "Boutique hotels", "Feature entrances", "Premium apartments"],
    finishes: ["Natural", "Polish", "Matt", "Gloss", "Two-tone"],
    customisation: "Fully drawing-led. Share elevations and we engineer the build-up.",
    frames: ["Solid Teak Frame", "LVL Frame", "Custom Engineered Frame"],
    suitability: "For projects where the door is a designed element, not just a partition.",
    seo: { title: "Designer Wooden Doors Manufacturer India", description: "Designer wooden doors with fluted, grooved and custom surfaces  manufactured by Micasa Doors Solutions for villas, hotels and premium projects." },
  },
  {
    isDoor: true,
    slug: "custom-wooden-doors",
    name: "Custom Wooden Doors",
    wood: "To specification",
    tagline: "Built to your drawings, in production quantity.",
    image: IMG.grain,
    description: "When a project needs something outside the standard range, we manufacture doors to architect and consultant specifications  sizes, cores, veneers, finishes and hardware preparation included.",
    appearance: "Defined entirely by your specification.",
    applications: ["Developments", "Institutions", "Hospitality", "One-off architectural pieces"],
    finishes: ["Any specified finish system"],
    customisation: "Complete  this is the custom programme.",
    frames: ["Any frame from our range", "Custom Engineered Frame"],
    suitability: "Project-led manufacturing with sampling and approval before production.",
    seo: { title: "Custom Wooden Doors Manufacturer", description: "Custom wooden doors manufactured to architect specifications by Micasa Doors Solutions. Sampling, approval and production quantity supply across India." },
  },
  {
    isDoor: true,
    slug: "laminated-non-fire-doors",
    name: "Laminated Non-Fire Rated Doors",
    wood: "100% A-Grade Pine Core",
    tagline: "Everyday doors, engineered to stay straight.",
    image: IMG.interior,
    description: "Every Micasa non-fire-rated door is built on a 100% A-grade pine core  selected, seasoned pine with a factory-applied laminated surface for a consistent, easy-maintenance finish across large project quantities.",
    appearance: "Clean laminated surface available in a wide range of decors and textures.",
    applications: ["Bedroom doors", "Internal doors", "Utility areas", "Apartments", "Institutional housing"],
    finishes: ["Laminate decors", "Matt", "Painted"],
    customisation: "Sizes, groove patterns, decor selection and hardware preparation to project specification.",
    frames: ["Teak Frame", "Red Meranti Frame", "Steam Beech Frame", "LVL Frame"],
    suitability: "High-volume residential and institutional projects needing consistent quality per unit.",
    seo: { title: "Laminated Non-Fire Rated Doors  100% A-Grade Pine", description: "Laminated non-fire rated doors with 100% A-grade pine core, manufactured by Micasa Doors Solutions for residential, institutional and developer projects across India." },
  },
  {
    isDoor: true,
    slug: "laminated-fire-rated-doors",
    name: "Laminated Fire Rated Doors",
    wood: "Fire-Rated Core · Laminated Finish",
    tagline: "IS 3614 certified fire protection with a laminated finish.",
    image: IMG.hotelDark,
    description: "Our fire-rated laminated doors combine a certified fire-rated construction with durable laminated faces  tested protection that still matches the interior design scheme.",
    appearance: "Laminated surface in project-matched decors  indistinguishable from non-fire doors in the same corridor.",
    applications: ["Hotel corridors", "Hospitals", "Commercial buildings", "Fire exit routes", "High-rise residential"],
    finishes: ["Laminate decors", "Project-matched finishes"],
    customisation: "Fire-rated frame options, intumescent seal preparation and fire-rated hardware preparation.",
    frames: ["Fire-rated frame options", "Engineered frames"],
    suitability: "Any project where certified fire performance must meet a laminated design scheme.",
    seo: { title: "Laminated Fire Rated Doors  IS 3614 Certified", description: "IS 3614 certified laminated fire rated wooden doors by Micasa Doors Solutions. Fire protection with a laminated finish for hotels, hospitals and commercial projects." },
  },
  {
    isDoor: true,
    slug: "laminated-hotel-room-doors",
    name: "Laminated Hotel Room Doors",
    wood: "A-Grade Pine / Fire-Rated Core Options",
    tagline: "Guest-room doors built for hospitality traffic.",
    image: IMG.hotelCorridor,
    description: "Hotel room entry doors engineered for daily hospitality use  solid feel, laminated surfaces that resist scuffs and cleaning chemicals, and optional fire-rated construction for corridor compliance.",
    appearance: "Laminated decors matched to the room design  woodgrains, solids and textures.",
    applications: ["Hotels", "Serviced apartments", "Resorts", "Hostels", "Guest houses"],
    finishes: ["Laminate decors", "Custom-matched finishes"],
    customisation: "Access-control preparation, peepholes, drop seals and fire-rated variants to project specification.",
    frames: ["Teak Frame", "Red Mahogany Frame", "LVL Frame"],
    suitability: "Hospitality projects from boutique hotels to multi-hundred-key developments.",
    seo: { title: "Hotel Room Doors Manufacturer India", description: "Laminated hotel room doors manufactured by Micasa Doors Solutions  hospitality-grade doors with optional fire rating, custom decors and hardware preparation." },
  },
  {
    isDoor: true,
    slug: "laminated-toilet-doors",
    name: "Laminated Toilet Doors",
    wood: "100% A-Grade Pine Core",
    tagline: "Water-resistant laminated doors for bathrooms and wet areas.",
    image: IMG.bathroom,
    description: "Toilet and bathroom doors with water-resistant laminated surfaces and sealed edges, built on our 100% A-grade pine core. Designed for humid Indian conditions.",
    appearance: "Moisture-friendly laminated decors, easy to wipe and maintain.",
    applications: ["Bathroom doors", "Toilet doors", "Washrooms", "Utility & wet areas"],
    finishes: ["Water-resistant laminate", "Matt laminate"],
    customisation: "Ventilation louvres, sizes and edge-sealing options to specification.",
    frames: ["BWP Grade LVL Frame", "Marine Grade LVL Frame", "Steam Beech Frame"],
    suitability: "Wet-area programmes for residences, hotels, hospitals and institutions.",
    seo: { title: "Toilet & Bathroom Doors Manufacturer", description: "Water-resistant laminated toilet and bathroom doors with 100% A-grade pine core by Micasa Doors Solutions." },
  },
];

export const FRAMES_PRODUCTS: FrameProduct[] = [
  {
    isDoor: false,
    slug: "solid-teak-frames",
    name: "Solid Teak Wood Frames",
    kind: "Solid Wood",
    tagline: "Traditional solid timber, machined with precision.",
    image: IMG.grain,
    description: "Solid teak frames for projects that specify traditional timber throughout. Machined to size with consistent rebates and joinery.",
    points: ["Solid teak sections", "Machined rebates", "Site-ready finish options", "Custom sections to drawing"],
    seo: { title: "Solid Teak Door Frames", description: "Solid teak wood door frames machined to size by Micasa Doors Solutions, Gandhidham." },
  },
  {
    isDoor: false,
    slug: "steamed-beech-frames",
    name: "Steamed Beech Wood Frames",
    kind: "Solid Wood",
    tagline: "Light-toned solid frames for modern interiors.",
    image: IMG.interior,
    description: "Solid steamed beech frames that pair with our beech and painted door programmes for a light, uniform finish.",
    points: ["Uniform pale tone", "Good paint & polish substrate", "Machined to size", "Project quantities"],
    seo: { title: "Steamed Beech Door Frames", description: "Steamed beech wood door frames manufactured by Micasa Doors Solutions for residential and commercial projects." },
  },
  {
    isDoor: false,
    slug: "lvl-door-frames",
    name: "LVL Door Frames",
    kind: "Engineered",
    tagline: "Precision-engineered frames for strength, dimensional stability and project consistency.",
    image: IMG.blueprint,
    description: "LVL (Laminated Veneer Lumber) frames are built from multiple thin wood veneers bonded under pressure with grains aligned. The result is an engineered frame that stays straighter and more consistent than conventional solid sections.",
    points: ["Engineered from laminated veneers", "High dimensional stability", "Consistent across large quantities", "Factory-machined precision"],
    seo: { title: "LVL Door Frames Manufacturer India", description: "Engineered LVL door frames by Micasa Doors Solutions  dimensional stability and consistency for large projects." },
  },
  {
    isDoor: false,
    slug: "bwp-door-frames",
    name: "BWP Grade LVL Frames",
    kind: "Engineered  BWP",
    tagline: "Boiling-water-resistant bonding for demanding conditions.",
    image: IMG.grain,
    description: "BWP grade LVL frames use boiling-water-proof adhesive systems for areas exposed to moisture and humidity  recommended for bathrooms, kitchens and coastal projects.",
    points: ["BWP-grade bonding", "For humid & moisture-prone areas", "Engineered stability", "Pairs with wet-area doors"],
    seo: { title: "BWP Door Frames Manufacturer", description: "BWP grade LVL door frames for moisture-prone areas  manufactured by Micasa Doors Solutions, Gandhidham." },
  },
  {
    isDoor: false,
    slug: "marine-grade-frames",
    name: "Marine Grade LVL Frames",
    kind: "Engineered  Marine",
    tagline: "Our highest moisture-resistance frame specification.",
    image: IMG.bathroomAlt,
    description: "Marine grade LVL frames are specified where water exposure is a given  wet areas, washrooms, coastal hospitality and healthcare projects.",
    points: ["Marine-grade bonding system", "Wet-area specification", "Engineered consistency", "Project documentation available"],
    seo: { title: "Marine Grade Door Frames Manufacturer", description: "Marine grade LVL door frames for wet areas and coastal projects by Micasa Doors Solutions." },
  },
  {
    isDoor: false,
    slug: "custom-engineered-frames",
    name: "Custom Engineered Frames",
    kind: "Engineered  Custom",
    tagline: "Sections, species and build-ups engineered to your specification.",
    image: IMG.factoryFloor,
    description: "Custom engineered frames built to project drawings  non-standard sections, fire-rated frame build-ups and special finishes.",
    points: ["Custom sections", "Fire-rated frame build-ups", "Drawing-led production", "Sampling before supply"],
    seo: { title: "Custom Engineered Door Frames", description: "Custom engineered door frames built to specification by Micasa Doors Solutions." },
  },
  {
    isDoor: false,
    slug: "red-meranti-frames",
    name: "Red Meranti Frames",
    kind: "Solid Wood",
    tagline: "Warm-toned hardwood frames for residential and hospitality projects.",
    image: IMG.interiorAlt,
    description: "Solid Red Meranti frames  a dependable hardwood with a warm reddish tone, machined to size with consistent rebates for project supply.",
    points: ["Solid Red Meranti sections", "Warm reddish-brown tone", "Machined rebates", "Project quantities"],
    seo: { title: "Red Meranti Door Frames Manufacturer", description: "Solid Red Meranti door frames machined to size by Micasa Doors Solutions, Gandhidham." },
  },
  {
    isDoor: false,
    slug: "red-mahogany-frames",
    name: "Red Mahogany Frames",
    kind: "Solid Wood",
    tagline: "Deep, rich-toned hardwood frames for premium interiors.",
    image: IMG.doorDark,
    description: "Solid Red Mahogany frames with a deep, rich tone  a premium hardwood frame option for hotels, villas and premium residential projects.",
    points: ["Solid Red Mahogany sections", "Deep rich tone", "Premium finish substrate", "Machined to size"],
    seo: { title: "Red Mahogany Door Frames Manufacturer", description: "Solid Red Mahogany door frames by Micasa Doors Solutions  premium rich-toned hardwood frames." },
  },
  {
    isDoor: false,
    slug: "white-oak-frames",
    name: "White Oak Frames",
    kind: "Solid Wood",
    tagline: "Pale, strong hardwood frames with a refined grain for contemporary spaces.",
    image: IMG.living,
    description: "Solid White Oak frames  a pale, strong hardwood with a refined grain, suited to contemporary interiors and light finish schemes.",
    points: ["Solid White Oak sections", "Pale refined grain", "Suited to light finishes", "Machined to drawing"],
    seo: { title: "White Oak Door Frames Manufacturer", description: "Solid White Oak door frames by Micasa Doors Solutions  pale, refined hardwood frames for contemporary projects." },
  },
];

export const ALL_PRODUCTS: Product[] = [...DOORS, ...FRAMES_PRODUCTS];
