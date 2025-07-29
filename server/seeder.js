const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const categories = ['Pain Relief', 'Cold & Flu', 'Vitamins', 'First Aid', 'Digestive Health', 'Skin Care', 'Eye Care', 'Oral Care', 'Baby Care', 'Supplements'];

const generateDummyProducts = (num) => {
  const products = [];
  for (let i = 1; i <= num; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    products.push({
      name: `Medicine ${i} (${randomCategory})`,
      description: `Description for Medicine ${i}. This medicine helps with various ailments and belongs to the ${randomCategory} category.`, 
      price: parseFloat((Math.random() * (50 - 5) + 5).toFixed(2)),
      countInStock: Math.floor(Math.random() * 100) + 10,
      imageUrl: `https://via.placeholder.com/150?text=${randomCategory.replace(/ /g, '+')}+${i}`,
      category: randomCategory,
    });
  }
  return products;
};

const importData = async () => {
  try {
    await Product.deleteMany();
    console.log('Existing products cleared!');

    const dummyProducts = generateDummyProducts(100);
    await Product.insertMany(dummyProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}