import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Dummy data for products (100 products across 10 categories)
const categories = ['Pain Relief', 'Cold & Flu', 'Vitamins', 'First Aid', 'Digestive Health', 'Skin Care', 'Eye Care', 'Oral Care', 'Baby Care', 'Supplements'];

const generateDummyProducts = (num) => {
  const products = [];
  for (let i = 1; i <= num; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    products.push({
      _id: `prod${i}`,
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

const ALL_PRODUCTS = generateDummyProducts(100);

function ProductComparison() {
  const [productIds, setProductIds] = useState(['', '', '']); // Up to 3 products for comparison
  const [productsToCompare, setProductsToCompare] = useState([]);

  useEffect(() => {
    const fetchedProducts = productIds.map(id => ALL_PRODUCTS.find(p => p._id === id)).filter(Boolean);
    setProductsToCompare(fetchedProducts);
  }, [productIds]);

  const handleIdChange = (index, value) => {
    const newIds = [...productIds];
    newIds[index] = value;
    setProductIds(newIds);
  };

  return (
    <div>
      <h1>Product Comparison</h1>
      <p>Enter up to 3 product IDs to compare their features.</p>

      <div className="row mb-4">
        {[0, 1, 2].map(index => (
          <div className="col-md-4" key={index}>
            <div className="mb-3">
              <label htmlFor={`productId${index}`} className="form-label">Product ID {index + 1}</label>
              <input
                type="text"
                className="form-control"
                id={`productId${index}`}
                value={productIds[index]}
                onChange={(e) => handleIdChange(index, e.target.value)}
                placeholder="e.g., prod1"
              />
            </div>
          </div>
        ))}
      </div>

      {productsToCompare.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Feature</th>
              {productsToCompare.map(p => <th key={p._id}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              {productsToCompare.map(p => <td key={p._id}><img src={p.imageUrl} alt={p.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} /></td>)}
            </tr>
            <tr>
              <td>Description</td>
              {productsToCompare.map(p => <td key={p._id}>{p.description}</td>)}
            </tr>
            <tr>
              <td>Price</td>
              {productsToCompare.map(p => <td key={p._id}>${p.price}</td>)}
            </tr>
            <tr>
              <td>In Stock</td>
              {productsToCompare.map(p => <td key={p._id}>{p.countInStock}</td>)}
            </tr>
            <tr>
              <td>Category</td>
              {productsToCompare.map(p => <td key={p._id}>{p.category}</td>)}
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info">Enter product IDs above to compare.</div>
      )}
    </div>
  );
}

export default ProductComparison;
