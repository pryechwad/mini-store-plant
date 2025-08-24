const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plant = require('../models/Plant');
const connectDB = require('../config/db');

dotenv.config();

const samplePlants = [
  // Indoor Plants
  {
    name: "Monstera Deliciosa",
    price: 599,
    categories: ["Indoor Plants", "Air Purifying", "Tropical Plants"],
    description: "A stunning tropical plant with large, split leaves that adds a dramatic touch to any indoor space.",
    careInstructions: "Bright, indirect light. Water when top inch of soil is dry. Prefers humidity 40-60%.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Snake Plant (Sansevieria)",
    price: 299,
    categories: ["Indoor Plants", "Air Purifying", "Low Maintenance"],
    description: "Perfect for beginners! This hardy plant tolerates low light and infrequent watering.",
    careInstructions: "Low to bright indirect light. Water every 2-3 weeks. Very drought tolerant.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Fiddle Leaf Fig",
    price: 899,
    categories: ["Indoor Plants"],
    description: "A popular statement plant with large, violin-shaped leaves that creates a bold focal point.",
    careInstructions: "Bright, indirect light. Water when top 2 inches of soil are dry. Avoid moving frequently.",
    image: "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Peace Lily",
    price: 399,
    categories: ["Indoor Plants", "Air Purifying", "Flowering Plants"],
    description: "Elegant white flowers and glossy green leaves make this a perfect indoor companion.",
    careInstructions: "Medium to low light. Keep soil consistently moist but not soggy. Loves humidity.",
    image: "https://images.unsplash.com/photo-1591958911259-bee2173bdcf4?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Rubber Plant (Ficus Elastica)",
    price: 449,
    categories: ["Indoor Plants", "Air Purifying"],
    description: "Glossy, dark green leaves and easy care make this a favorite for modern homes.",
    careInstructions: "Bright, indirect light. Water when top inch is dry. Wipe leaves regularly.",
    image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Spider Plant",
    price: 249,
    categories: ["Indoor Plants", "Air Purifying", "Low Maintenance"],
    description: "Fast-growing plant with arching leaves and baby plantlets that dangle like spiders.",
    careInstructions: "Bright, indirect light. Water regularly but allow soil to dry between waterings.",
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "ZZ Plant (Zamioculcas Zamiifolia)",
    price: 349,
    categories: ["Indoor Plants", "Low Maintenance"],
    description: "Extremely low-maintenance plant with glossy, dark green leaves that tolerates neglect.",
    careInstructions: "Low to bright indirect light. Water every 2-3 weeks. Very drought tolerant.",
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Pothos Golden",
    price: 199,
    categories: ["Indoor Plants", "Air Purifying", "Low Maintenance"],
    description: "Trailing vine with heart-shaped golden-green leaves, perfect for hanging baskets.",
    careInstructions: "Medium to low light. Water when soil feels dry. Very forgiving plant.",
    image: "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Philodendron Heartleaf",
    price: 229,
    categories: ["Indoor Plants", "Air Purifying", "Tropical Plants"],
    description: "Heart-shaped leaves on trailing vines make this a popular choice for beginners.",
    careInstructions: "Bright, indirect light. Water when top inch is dry. Loves humidity.",
    available: true
  },
  {
    name: "Boston Fern",
    price: 329,
    categories: ["Indoor Plants", "Air Purifying"],
    description: "Lush, feathery fronds create a classic, elegant look in any room.",
    careInstructions: "Bright, indirect light. Keep soil consistently moist. High humidity preferred.",
    available: true
  },
  {
    name: "Areca Palm",
    price: 549,
    categories: ["Indoor Plants", "Air Purifying", "Tropical Plants"],
    description: "Graceful palm with feathery fronds that brings tropical vibes indoors.",
    careInstructions: "Bright, indirect light. Water when top inch is dry. Mist regularly.",
    available: true
  },
  {
    name: "Dracaena Marginata",
    price: 399,
    categories: ["Indoor Plants", "Air Purifying", "Low Maintenance"],
    description: "Spiky leaves with red edges on slender stems create an architectural look.",
    careInstructions: "Bright, indirect light. Water when soil is dry. Very drought tolerant.",
    available: true
  },
  {
    name: "Chinese Evergreen",
    price: 349,
    categories: ["Indoor Plants", "Air Purifying", "Low Maintenance"],
    description: "Colorful variegated leaves in shades of green, silver, and pink.",
    careInstructions: "Low to medium light. Water when top inch is dry. Tolerates low light well.",
    available: true
  },
  {
    name: "Monstera Adansonii",
    price: 449,
    categories: ["Indoor Plants", "Tropical Plants"],
    description: "Swiss cheese plant with unique holes in leaves, perfect for climbing or trailing.",
    careInstructions: "Bright, indirect light. Water when top inch is dry. Provide support for climbing.",
    available: true
  },
  {
    name: "Calathea Orbifolia",
    price: 699,
    categories: ["Indoor Plants", "Tropical Plants"],
    description: "Large, round leaves with beautiful silver and green stripes.",
    careInstructions: "Medium, indirect light. Keep soil moist. High humidity essential.",
    available: true
  },
  
  // Succulents
  {
    name: "Aloe Vera",
    price: 199,
    categories: ["Succulents", "Low Maintenance", "Herbs"],
    description: "A medicinal succulent that's both beautiful and useful for treating minor burns and cuts.",
    careInstructions: "Bright light. Water deeply but infrequently. Allow soil to dry completely between waterings.",
    image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Jade Plant",
    price: 249,
    categories: ["Succulents", "Low Maintenance"],
    description: "Thick, glossy leaves on sturdy stems. Known as the money tree for good luck.",
    careInstructions: "Bright light. Water when soil is completely dry. Very drought tolerant.",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Echeveria Elegans",
    price: 149,
    categories: ["Succulents", "Low Maintenance"],
    description: "Beautiful rosette-shaped succulent with blue-green leaves and pink edges.",
    careInstructions: "Bright light. Water sparingly. Allow soil to dry between waterings.",
    available: true
  },
  {
    name: "Haworthia Zebra Plant",
    price: 179,
    categories: ["Succulents", "Low Maintenance"],
    description: "Small succulent with distinctive white stripes on dark green leaves.",
    careInstructions: "Bright, indirect light. Water when soil is dry. Very low maintenance.",
    available: true
  },
  {
    name: "String of Pearls",
    price: 299,
    categories: ["Succulents", "Low Maintenance"],
    description: "Unique trailing succulent with bead-like leaves that cascade beautifully.",
    careInstructions: "Bright light. Water sparingly. Allow soil to dry completely.",
    available: true
  },
  {
    name: "Barrel Cactus",
    price: 199,
    categories: ["Succulents", "Low Maintenance"],
    description: "Round, spiny cactus that's perfect for desert-themed decor.",
    careInstructions: "Bright, direct light. Water very sparingly. Extremely drought tolerant.",
    available: true
  },
  {
    name: "Prickly Pear Cactus",
    price: 229,
    categories: ["Succulents", "Low Maintenance"],
    description: "Flat, paddle-shaped segments with colorful flowers in season.",
    careInstructions: "Bright, direct light. Water monthly in growing season. Very hardy.",
    available: true
  },
  {
    name: "Sedum Morganianum",
    price: 249,
    categories: ["Succulents", "Low Maintenance"],
    description: "Trailing succulent with thick, blue-green leaves that look like burro's tail.",
    careInstructions: "Bright light. Water when soil is dry. Handle gently as leaves drop easily.",
    available: true
  },
  
  // Outdoor Plants
  {
    name: "Bougainvillea",
    price: 399,
    categories: ["Outdoor Plants", "Flowering Plants"],
    description: "Vibrant flowering vine with colorful bracts in pink, purple, or orange.",
    careInstructions: "Full sun. Water regularly but allow soil to dry. Prune after flowering.",
    image: "https://images.unsplash.com/photo-1597848212624-e8bb10e4bdf6?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Hibiscus Rosa-sinensis",
    price: 349,
    categories: ["Outdoor Plants", "Flowering Plants", "Tropical Plants"],
    description: "Large, showy flowers in various colors bloom throughout the warm season.",
    careInstructions: "Full sun to partial shade. Water regularly. Feed monthly during growing season.",
    available: true
  },
  {
    name: "Marigold",
    price: 99,
    categories: ["Outdoor Plants", "Flowering Plants"],
    description: "Bright orange and yellow flowers that bloom all season long.",
    careInstructions: "Full sun. Water at base of plant. Deadhead for continuous blooming.",
    available: true
  },
  {
    name: "Rose Plant",
    price: 449,
    categories: ["Outdoor Plants", "Flowering Plants"],
    description: "Classic flowering shrub with fragrant blooms in various colors.",
    careInstructions: "Full sun. Water deeply at base. Prune in late winter. Feed regularly.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Jasmine",
    price: 299,
    categories: ["Outdoor Plants", "Flowering Plants"],
    description: "Fragrant white flowers on climbing or trailing vines.",
    careInstructions: "Full sun to partial shade. Water regularly. Provide support for climbing.",
    available: true
  },
  {
    name: "Croton",
    price: 249,
    categories: ["Outdoor Plants", "Tropical Plants"],
    description: "Colorful foliage plant with leaves in yellow, red, orange, and green.",
    careInstructions: "Bright light. Water when top inch is dry. Protect from cold winds.",
    available: true
  },
  {
    name: "Ixora",
    price: 199,
    categories: ["Outdoor Plants", "Flowering Plants", "Tropical Plants"],
    description: "Clusters of small, bright flowers in red, orange, pink, or yellow.",
    careInstructions: "Full sun to partial shade. Water regularly. Feed monthly.",
    available: true
  },
  {
    name: "Pentas",
    price: 149,
    categories: ["Outdoor Plants", "Flowering Plants"],
    description: "Star-shaped flowers in clusters, great for attracting butterflies.",
    careInstructions: "Full sun to partial shade. Water regularly. Deadhead for more blooms.",
    available: true
  },
  
  // Herbs
  {
    name: "Basil",
    price: 99,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Aromatic herb essential for cooking, with fresh green leaves.",
    careInstructions: "Full sun. Water regularly. Pinch flowers to encourage leaf growth.",
    image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Mint",
    price: 89,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Refreshing herb that spreads quickly, perfect for teas and cooking.",
    careInstructions: "Partial shade. Keep soil moist. Contain in pot to prevent spreading.",
    available: true
  },
  {
    name: "Rosemary",
    price: 149,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Woody herb with needle-like leaves and a strong, pine-like fragrance.",
    careInstructions: "Full sun. Water sparingly. Very drought tolerant once established.",
    available: true
  },
  {
    name: "Coriander (Cilantro)",
    price: 79,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Fresh herb with delicate leaves, essential in many cuisines.",
    careInstructions: "Partial shade. Water regularly. Harvest leaves before flowering.",
    available: true
  },
  {
    name: "Curry Leaves",
    price: 199,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Aromatic leaves essential in South Indian cooking.",
    careInstructions: "Full sun to partial shade. Water regularly. Pinch growing tips for bushier growth.",
    available: true
  },
  {
    name: "Lemongrass",
    price: 129,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Tall grass with citrusy fragrance, used in teas and Asian cooking.",
    careInstructions: "Full sun. Water regularly. Divide clumps every few years.",
    available: true
  },
  {
    name: "Thyme",
    price: 119,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Small-leaved herb with a strong, earthy flavor perfect for cooking.",
    careInstructions: "Full sun. Water sparingly. Very drought tolerant.",
    available: true
  },
  {
    name: "Oregano",
    price: 109,
    categories: ["Herbs", "Outdoor Plants"],
    description: "Pungent herb essential for Italian and Mediterranean cooking.",
    careInstructions: "Full sun. Water moderately. Pinch flowers for better leaf flavor.",
    available: true
  },
  
  // Air Purifying Plants
  {
    name: "Bamboo Palm",
    price: 599,
    categories: ["Indoor Plants", "Air Purifying", "Tropical Plants"],
    description: "Elegant palm that effectively removes indoor air pollutants.",
    careInstructions: "Bright, indirect light. Keep soil consistently moist. High humidity preferred.",
    available: true
  },
  {
    name: "English Ivy",
    price: 199,
    categories: ["Indoor Plants", "Air Purifying"],
    description: "Trailing vine that's excellent at removing airborne mold particles.",
    careInstructions: "Bright, indirect light. Water when top inch is dry. Prefers cool temperatures.",
    available: true
  },
  {
    name: "Gerbera Daisy",
    price: 249,
    categories: ["Indoor Plants", "Air Purifying", "Flowering Plants"],
    description: "Colorful flowers that help remove benzene and trichloroethylene from air.",
    careInstructions: "Bright light. Water at soil level. Good air circulation important.",
    available: true
  },
  {
    name: "Chrysanthemum",
    price: 199,
    categories: ["Indoor Plants", "Air Purifying", "Flowering Plants"],
    description: "Beautiful flowers that filter out ammonia and benzene from indoor air.",
    careInstructions: "Bright light. Water regularly. Remove spent flowers for continued blooming.",
    available: true
  },
  
  // Low Maintenance Plants
  {
    name: "Cast Iron Plant",
    price: 299,
    categories: ["Indoor Plants", "Low Maintenance"],
    description: "Nearly indestructible plant with dark green, leathery leaves.",
    careInstructions: "Low to medium light. Water when soil is dry. Very tolerant of neglect.",
    available: true
  },
  {
    name: "Ponytail Palm",
    price: 449,
    categories: ["Indoor Plants", "Low Maintenance"],
    description: "Unique plant with a bulbous base and long, thin leaves that cascade down.",
    careInstructions: "Bright light. Water sparingly. Store water in bulbous base.",
    available: true
  },
  {
    name: "Yucca Plant",
    price: 399,
    categories: ["Indoor Plants", "Low Maintenance"],
    description: "Sword-like leaves on a sturdy trunk, very drought tolerant.",
    careInstructions: "Bright light. Water when soil is completely dry. Very low maintenance.",
    available: true
  },
  
  // Flowering Plants
  {
    name: "African Violet",
    price: 179,
    categories: ["Indoor Plants", "Flowering Plants"],
    description: "Compact plant with velvety leaves and delicate purple, pink, or white flowers.",
    careInstructions: "Bright, indirect light. Water from bottom. Avoid getting leaves wet.",
    available: true
  },
  {
    name: "Anthurium",
    price: 549,
    categories: ["Indoor Plants", "Flowering Plants", "Tropical Plants"],
    description: "Glossy, heart-shaped flowers in red, pink, or white with dark green leaves.",
    careInstructions: "Bright, indirect light. Keep soil moist. High humidity preferred.",
    available: true
  },
  {
    name: "Cyclamen",
    price: 299,
    categories: ["Indoor Plants", "Flowering Plants"],
    description: "Delicate flowers in pink, red, or white above heart-shaped leaves.",
    careInstructions: "Cool, bright location. Water from bottom. Prefers temperatures 60-65°F.",
    available: true
  },
  
  // Tropical Plants
  {
    name: "Bird of Paradise",
    price: 899,
    categories: ["Indoor Plants", "Tropical Plants"],
    description: "Large, paddle-shaped leaves that create a dramatic tropical statement.",
    careInstructions: "Bright light. Water when top inch is dry. Wipe leaves regularly.",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&h=400&fit=crop",
    available: true
  },
  {
    name: "Banana Plant",
    price: 699,
    categories: ["Indoor Plants", "Tropical Plants"],
    description: "Large, tropical leaves that bring jungle vibes to your home.",
    careInstructions: "Bright light. Keep soil moist. High humidity and warmth preferred.",
    available: true
  },
  {
    name: "Prayer Plant (Maranta)",
    price: 349,
    categories: ["Indoor Plants", "Tropical Plants"],
    description: "Beautiful patterned leaves that fold up at night like praying hands.",
    careInstructions: "Medium, indirect light. Keep soil moist. High humidity essential.",
    available: true
  }
];

const seedPlants = async () => {
  try {
    await connectDB();
    
    // Clear existing plants
    await Plant.deleteMany({});
    console.log('🗑️  Cleared existing plants');
    
    // Insert sample plants
    const plants = await Plant.insertMany(samplePlants);
    console.log(`🌱 ${plants.length} plants seeded successfully`);
    console.log('📊 Categories distribution:');
    const categoryCount = {};
    plants.forEach(plant => {
      plant.categories.forEach(category => {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
    });
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} plants`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedPlants();