import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios'; // No longer needed
import { useParams, Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';

// Dummy data for products (must match the structure from ProductList)
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

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { username } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate network delay
    setTimeout(() => {
      const foundProduct = ALL_PRODUCTS.find(p => p._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Load reviews for this product from localStorage
        const storedReviews = JSON.parse(localStorage.getItem(`product_reviews_${id}`)) || [];
        setReviews(storedReviews);

        // Calculate average rating
        if (storedReviews.length > 0) {
          const totalRating = storedReviews.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating((totalRating / storedReviews.length).toFixed(1));
        } else {
          setAverageRating(0);
        }

        // Record recently viewed product
        if (username) {
          let recentlyViewed = JSON.parse(localStorage.getItem(`pharmacy_recently_viewed_${username}`)) || [];
          recentlyViewed = [id, ...recentlyViewed.filter(item => item !== id)].slice(0, 10);
          localStorage.setItem(`pharmacy_recently_viewed_${username}`, JSON.stringify(recentlyViewed));
        }

        // Find related products (same category, excluding current product)
        const related = ALL_PRODUCTS.filter(
          p => p.category === foundProduct.category && p._id !== foundProduct._id
        ).slice(0, 4); // Get up to 4 related products
        setRelatedProducts(related);

      } else {
        setError('Product not found.');
      }
      setLoading(false);
    }, 500); // Simulate 0.5 second load time
  }, [id, username]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity} of ${product.name} added to cart!`);
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!username) {
      toast.error('Please enter your name to submit a review.');
      return;
    }
    if (rating === 0 || comment.trim() === '') {
      toast.error('Please enter a rating and a comment.');
      return;
    }

    const newReview = {
      _id: `review_${Date.now()}`,
      username: username,
      rating: rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, newReview];
    localStorage.setItem(`product_reviews_${id}`, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setRating(0);
    setComment('');
    toast.success('Review submitted successfully!');
  };

  const handleAddToWishlist = (product) => {
    if (!username) {
      toast.error('Please enter your name to add to wishlist.');
      return;
    }
    const existingWishlist = JSON.parse(localStorage.getItem(`pharmacy_wishlist_${username}`)) || [];
    const isAlreadyInWishlist = existingWishlist.some(item => item._id === product._id);

    if (isAlreadyInWishlist) {
      toast.info('Product is already in your wishlist!');
    } else {
      existingWishlist.push(product);
      localStorage.setItem(`pharmacy_wishlist_${username}`, JSON.stringify(existingWishlist));
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  if (loading) {
    return (
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4 bg-light" style={{ height: '400px' }}></div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title bg-light mb-2" style={{ height: '30px', width: '80%' }}></h5>
              <p className="card-text bg-light mb-2" style={{ height: '20px', width: '60%' }}></p>
              <p className="card-text bg-light mb-2" style={{ height: '20px', width: '40%' }}></p>
              <p className="card-text bg-light mb-2" style={{ height: '20px', width: '50%' }}></p>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light me-2" style={{ height: '20px', width: '50px' }}></div>
                <div className="form-control w-25 bg-light" style={{ height: '38px' }}></div>
              </div>
              <div className="btn btn-primary me-2 bg-light" style={{ height: '38px', width: '120px' }}></div>
              <div className="btn btn-outline-secondary bg-light" style={{ height: '38px', width: '120px' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div className="alert alert-info">Product not found.</div>;
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.imageUrl} className="img-fluid rounded-start" alt={product.name} style={{ maxHeight: '400px', objectFit: 'contain' }} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">Category: {product.category}</p>
            <p className="card-text">{product.description}</p>
            <p className="card-text"><strong>Price: ${product.price}</strong></p>
            <p className="card-text">In Stock: {product.countInStock}</p>
            {averageRating > 0 && (
              <p className="card-text">
                <strong>Average Rating:</strong> {averageRating} <i className="fas fa-star text-warning"></i> ({reviews.length} reviews)
              </p>
            )}
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="quantity" className="form-label me-2">Quantity:</label>
              <input
                type="number"
                id="quantity"
                className="form-control w-25"
                value={quantity}
                min="1"
                max={product.countInStock}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button className="btn btn-primary me-2" onClick={handleAddToCart} disabled={product.countInStock === 0}>
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button className="btn btn-outline-secondary" onClick={() => handleAddToWishlist(product)}>
              <i className="far fa-heart me-1"></i> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this product!</p>
        ) : (
          <ul className="list-group mb-4">
            {reviews.map((review) => (
              <li key={review._id} className="list-group-item">
                <strong>{review.username}</strong> - {review.rating} Stars
                <p>{review.comment}</p>
                <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}

        <h3>Write a Review</h3>
        <form onSubmit={submitReview}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <select id="rating" className="form-select" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required>
              <option value="0">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <textarea id="comment" className="form-control" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
      </div>

      <div className="mt-5">
        <h2>You Might Also Like</h2>
        {relatedProducts.length === 0 ? (
          <p>No related products found.</p>
        ) : (
          <div className="row">
            {relatedProducts.map(p => (
              <div key={p._id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img src={p.imageUrl} className="card-img-top" alt={p.name} style={{ height: '150px', objectFit: 'contain' }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">${p.price}</p>
                    <Link to={`/products/${p._id}`} className="btn btn-primary mt-auto">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
