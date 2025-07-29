import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

// Dummy data for products (must match the structure from ProductList)
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

function RecentlyViewed() {
  const [viewedProducts, setViewedProducts] = useState([]);
  const { username } = useContext(UserContext);

  useEffect(() => {
    if (username) {
      const viewedIds = JSON.parse(localStorage.getItem(`pharmacy_recently_viewed_${username}`)) || [];
      // Filter ALL_PRODUCTS to get the actual product objects
      const products = viewedIds.map(id => ALL_PRODUCTS.find(p => p._id === id)).filter(Boolean);
      setViewedProducts(products);
    }
  }, [username]);

  if (!username) {
    return <p>Please enter your name to view your recently viewed products.</p>;
  }

  return (
    <div>
      <h1>Recently Viewed Products</h1>
      {viewedProducts.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          You haven't viewed any products recently.
        </div>
      ) : (
        <div className="row">
          {viewedProducts.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{ height: '150px', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <Link to={`/products/${product._id}`} className="btn btn-primary mt-auto">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentlyViewed;
