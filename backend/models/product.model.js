const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a product
const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  color: { type: String, required: true },
  sizes: [{ size: Number, stock: Number }], // Array of sizes and stock
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

// Create a model from the product schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product; // Export the model
