import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscription from '../components/NewsletterSubscription';

// Dummy data for products (100 products across 10 categories)
const categories = ['Pain Relief', 'Cold & Flu', 'Vitamins', 'First Aid', 'Digestive Health', 'Skin Care', 'Eye Care', 'Oral Care', 'Baby Care', 'Supplements'];

const medicineNames = [
  'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Aspirin', 'Cetirizine', 'Omeprazole', 'Metformin', 'Amlodipine', 'Atorvastatin', 'Levothyroxine',
  'Prednisone', 'Gabapentin', 'Hydrochlorothiazide', 'Sertraline', 'Losartan', 'Furosemide', 'Trazodone', 'Tramadol', 'Alprazolam', 'Ciprofloxacin',
  'Azithromycin', 'Doxycycline', 'Fluoxetine', 'Escitalopram', 'Venlafaxine', 'Bupropion', 'Lisinopril', 'Valsartan', 'Metoprolol', 'Carvedilol',
  'Warfarin', 'Clopidogrel', 'Rivaroxaban', 'Apixaban', 'Insulin', 'Glipizide', 'Sitagliptin', 'Duloxetine', 'Pregabalin', 'Cyclobenzaprine',
  'Tizanidine', 'Baclofen', 'Sumatriptan', 'Zolpidem', 'Eszopiclone', 'Clonazepam', 'Lorazepam', 'Diazepam', 'Codeine', 'Oxycodone',
  'Morphine', 'Fentanyl', 'Naloxone', 'Epinephrine', 'Diphenhydramine', 'Ranitidine', 'Famotidine', 'Ondansetron', 'Loperamide', 'Bisacodyl',
  'Psyllium', 'Docusate', 'Polyethylene Glycol', 'Lactulose', 'Allopurinol', 'Colchicine', 'Hydroxychloroquine', 'Methotrexate', 'Adalimumab', 'Etanercept',
  'Infliximab', 'Rituximab', 'Ocrelizumab', 'Natalizumab', 'Fingolimod', 'Teriflunomide', 'Dimethyl Fumarate', 'Interferon Beta', 'Glatiramer Acetate', 'Sildenafil',
  'Tadalafil', 'Vardenafil', 'Finasteride', 'Tamsulosin', 'Solifenacin', 'Oxybutynin', 'Mirabegron', 'Tolterodine', 'Buprenorphine', 'Naltrexone',
  'Acamprosate', 'Disulfiram', 'Varenicline', 'Nicotine Patch', 'Nicotine Gum'
];

const generateDummyProducts = (num) => {
  const products = [];
  const usedNames = new Set();

  for (let i = 0; i < num; i++) {
    let randomName;
    do {
      randomName = medicineNames[Math.floor(Math.random() * medicineNames.length)];
    } while (usedNames.has(randomName)); // Ensure unique names
    usedNames.add(randomName);

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    products.push({
      _id: `prod${i + 1}`,
      name: randomName,
      description: `Description for ${randomName}. This medicine helps with various ailments and belongs to the ${randomCategory} category.`, 
      price: parseFloat((Math.random() * (50 - 5) + 5).toFixed(2)),
      countInStock: Math.floor(Math.random() * 100) + 10,
      imageUrl: `https://via.placeholder.com/150?text=${randomName.replace(/ /g, '+')}`,
      category: randomCategory,
    });
  }
  return products;
};

const ALL_PRODUCTS = generateDummyProducts(100);

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Select a few random products as featured
    const shuffled = [...ALL_PRODUCTS].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled.slice(0, 4));
    setBestSellers(shuffled.slice(4, 8)); // Dummy best sellers
    setNewArrivals(shuffled.slice(8, 12)); // Dummy new arrivals
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="hero-section rounded">
        <h1 className="display-3">Your Trusted Online Pharmacy</h1>
        <p className="lead mb-4">Quality medicines, delivered safely to your doorstep.</p>
        <Link to="/products" className="btn btn-light btn-lg shadow-sm">Shop Now</Link>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-white rounded shadow-sm mb-5">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Us?</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded h-100">
                <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                <h4 className="fw-bold">Certified Products</h4>
                <p className="text-muted">All our medicines are sourced from verified suppliers and are 100% authentic.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded h-100">
                <i className="fas fa-truck fa-3x text-success mb-3"></i>
                <h4 className="fw-bold">Fast & Reliable Delivery</h4>
                <p className="text-muted">We ensure quick and secure delivery right to your doorstep.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded h-100">
                <i className="fas fa-headset fa-3x text-info mb-3"></i>
                <h4 className="fw-bold">24/7 Customer Support</h4>
                <p className="text-muted">Our dedicated team is always ready to assist you with any queries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <div className="text-center mt-5">
        <h2 className="mb-3">Featured Products</h2>
        <p className="text-muted">Discover our top-selling and highly-rated products.</p>
      </div>
      {loading ? (
        <div>Loading featured products...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : featuredProducts.length === 0 ? (
        <div className="alert alert-info">No featured products available.</div>
      ) : (
        <div className="row mt-4">
          {featuredProducts.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={product.imageUrl} className="card-img-top p-3" alt={product.name} style={{ height: '180px', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{product.name}</h5>
                  <p className="card-text text-primary fw-bold">${product.price}</p>
                  <Link to={`/products/${product._id}`} className="btn btn-primary mt-auto">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Shop by Category Section */}
      <section className="py-5">
        <h2 className="text-center mb-4">Shop by Category</h2>
        <div className="row">
          {categories.map(cat => (
            <div key={cat} className="col-md-3 mb-4">
              <div className="card text-center h-100 p-3">
                <i className={`fas fa-${cat.toLowerCase().replace(/ /g, '-')} fa-4x text-primary mb-3`}></i> {/* Placeholder icons */}
                <h5 className="card-title">{cat}</h5>
                <Link to={`/products?category=${cat}`} className="btn btn-outline-primary mt-auto">View Products</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <div className="text-center mt-5">
        <h2 className="mb-3">Best Sellers</h2>
        <p className="text-muted">Our most popular products, loved by our customers.</p>
      </div>
      {loading ? (
        <div>Loading best sellers...</div>
      ) : bestSellers.length === 0 ? (
        <div className="alert alert-info">No best sellers available.</div>
      ) : (
        <div className="row mt-4">
          {bestSellers.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={product.imageUrl} className="card-img-top p-3" alt={product.name} style={{ height: '180px', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{product.name}</h5>
                  <p className="card-text text-primary fw-bold">${product.price}</p>
                  <Link to={`/products/${product._id}`} className="btn btn-primary mt-auto">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Arrivals Section */}
      <div className="text-center mt-5">
        <h2 className="mb-3">New Arrivals</h2>
        <p className="text-muted">Check out the latest additions to our inventory.</p>
      </div>
      {loading ? (
        <div>Loading new arrivals...</div>
      ) : newArrivals.length === 0 ? (
        <div className="alert alert-info">No new arrivals available.</div>
      ) : (
        <div className="row mt-4">
          {newArrivals.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={product.imageUrl} className="card-img-top p-3" alt={product.name} style={{ height: '180px', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{product.name}</h5>
                  <p className="card-text text-primary fw-bold">${product.price}</p>
                  <Link to={`/products/${product._id}`} className="btn btn-primary mt-auto">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonials Section */}
      <section className="py-5 bg-white rounded shadow-sm mt-5">
        <div className="container">
          <h2 className="text-center mb-4">What Our Customers Say</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active text-center p-4">
                <p className="lead">"Pharmacy App has revolutionized how I buy medicines. Fast delivery and genuine products!"</p>
                <footer className="blockquote-footer">John Doe</footer>
              </div>
              <div className="carousel-item text-center p-4">
                <p className="lead">"Excellent customer service and a wide range of products. Highly recommended!"</p>
                <footer className="blockquote-footer">Jane Smith</footer>
              </div>
              <div className="carousel-item text-center p-4">
                <p className="lead">"So convenient! I can find everything I need in one place."</p>
                <footer className="blockquote-footer">Peter Jones</footer>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <NewsletterSubscription />
    </div>
  );
}

export default Home;