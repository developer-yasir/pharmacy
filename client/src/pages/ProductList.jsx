import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import ProductQuickView from '../components/ProductQuickView';
import ProductListSkeleton from '../components/ProductListSkeleton';

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

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('nameAsc'); // New state for sorting
  const [minPrice, setMinPrice] = useState(''); // New state for min price filter
  const [maxPrice, setMaxPrice] = useState(''); // New state for max price filter
  const [inStockOnly, setInStockOnly] = useState(false); // New state for stock filter
  const [quantities, setQuantities] = useState({}); // State to manage quantities for each product
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const { addToCart } = useContext(CartContext);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const pageSize = 10; // Number of products per page

  useEffect(() => {
    // Parse query parameters from URL for initial state
    const queryParams = new URLSearchParams(location.search);
    setKeyword(queryParams.get('keyword') || '');
    setCategory(queryParams.get('category') || '');
    setPage(parseInt(queryParams.get('page')) || 1);
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate network delay
    setTimeout(() => {
      let filteredProducts = ALL_PRODUCTS;

      if (keyword) {
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }

      if (minPrice !== '') {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
      }

      if (maxPrice !== '') {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
      }

      if (inStockOnly) {
        filteredProducts = filteredProducts.filter(p => p.countInStock > 0);
      }

      // Apply sorting
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'nameAsc') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'nameDesc') {
          return b.name.localeCompare(a.name);
        } else if (sortBy === 'priceAsc') {
          return a.price - b.price;
        } else if (sortBy === 'priceDesc') {
          return b.price - a.price;
        }
        return 0;
      });

      const count = sortedProducts.length;
      const totalPages = Math.ceil(count / pageSize);
      setPages(totalPages);

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setProducts(sortedProducts.slice(startIndex, endIndex));

      setLoading(false);
    }, 500); // Simulate 0.5 second load time
  }, [page, keyword, category, sortBy, minPrice, maxPrice, inStockOnly]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    navigate(`/products?keyword=${keyword}&category=${category}&page=${1}`);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1); // Reset to first page on category change
    navigate(`/products?keyword=${keyword}&category=${e.target.value}&page=${1}`);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1); // Reset to first page on sort change
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({ ...prev, [productId]: parseInt(value) }));
  };

  const handleAddToCart = (product, qty = 1) => {
    addToCart(product, qty);
    toast.success(`${qty} of ${product.name} added to cart!`);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setSelectedProduct(null);
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
    }
    else {
      existingWishlist.push(product);
      localStorage.setItem(`pharmacy_wishlist_${username}`, JSON.stringify(existingWishlist));
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Our Products</h1>

      <form onSubmit={handleSearch} className="mb-4 p-3 border rounded bg-white shadow-sm">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label htmlFor="searchKeyword" className="form-label">Search Product</label>
            <input
              type="text"
              id="searchKeyword"
              className="form-control"
              placeholder="Search by name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="productCategory" className="form-label">Category</label>
            <select
              id="productCategory"
              className="form-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="sortBy" className="form-label">Sort By</label>
            <select
              id="sortBy"
              className="form-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Search</button>
          </div>
        </div>

        <div className="row g-3 align-items-end mt-3">
          <div className="col-md-3">
            <label htmlFor="minPrice" className="form-label">Min Price</label>
            <input
              type="number"
              id="minPrice"
              className="form-control"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="maxPrice" className="form-label">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              className="form-control"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
            />
          </div>
          <div className="col-md-3 form-check d-flex align-items-center mt-auto">
            <input
              type="checkbox"
              className="form-check-input me-2"
              id="inStockOnly"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <label htmlFor="inStockOnly" className="form-check-label">In Stock Only</label>
          </div>
        </div>
      </form>

      <div className="d-flex justify-content-end mb-3">
        <button className={`btn btn-outline-secondary me-2 ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
          <i className="fas fa-th-large"></i> Grid View
        </button>
        <button className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
          <i className="fas fa-list"></i> List View
        </button>
      </div>

      {loading ? (
        <ProductListSkeleton viewMode={viewMode} />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : products.length === 0 ? (
        <div className="alert alert-info">No products found.</div>
      ) : (
        <div className={viewMode === 'grid' ? 'row' : 'list-group'}> {/* Conditional rendering for grid/list */}
          {products.map((product) => (
            <div key={product._id} className={viewMode === 'grid' ? 'col-md-4 mb-4' : 'list-group-item mb-3'}> {/* Conditional class */}
              <div className={viewMode === 'grid' ? 'card h-100' : 'd-flex align-items-center p-3'}> {/* Conditional class */}
                <img src={product.imageUrl} className={viewMode === 'grid' ? 'card-img-top p-3' : 'me-3'} alt={product.name} style={viewMode === 'grid' ? { height: '200px', objectFit: 'contain' } : { width: '100px', height: '100px', objectFit: 'contain' }} />
                <div className={viewMode === 'grid' ? 'card-body d-flex flex-column' : 'flex-grow-1'}> {/* Conditional class */}
                  <h5 className={viewMode === 'grid' ? 'card-title text-truncate' : 'mb-1 fw-bold'}>{product.name}</h5>
                  <p className={viewMode === 'grid' ? 'card-text' : 'mb-1'}>Category: {product.category}</p>
                  <p className={viewMode === 'grid' ? 'card-text text-primary fw-bold' : 'mb-1 text-primary fw-bold'}>${product.price}</p>
                  <p className={viewMode === 'grid' ? 'card-text' : 'mb-1'}>In Stock: {product.countInStock}</p>
                  <div className={viewMode === 'grid' ? 'mt-auto' : 'd-flex justify-content-between align-items-center mt-2'}> {/* Conditional class */}
                    <div className="d-flex align-items-center mb-2">
                      <label htmlFor={`qty-${product._id}`} className="form-label me-2 mb-0">Qty:</label>
                      <input
                        type="number"
                        id={`qty-${product._id}`}
                        className="form-control w-25"
                        value={quantities[product._id] || 1}
                        min="1"
                        max={product.countInStock}
                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                      />
                    </div>
                    <div className={viewMode === 'grid' ? '' : 'd-flex flex-column align-items-end'}> {/* Conditional class */}
                      <button
                        className="btn btn-primary w-100 mb-2"
                        onClick={() => handleAddToCart(product, quantities[product._id] || 1)}
                        disabled={product.countInStock === 0}
                      >
                        {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button className="btn btn-outline-info w-100 mb-2" onClick={() => handleQuickView(product)}>Quick View</button>
                      <button className="btn btn-outline-secondary w-100" onClick={() => handleAddToWishlist(product)}>
                        <i className="far fa-heart me-1"></i> Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {[...Array(pages).keys()].map((x) => (
              <li key={x + 1} className={`page-item ${x + 1 === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPage(x + 1)}>{x + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <ProductQuickView
        show={showQuickView}
        handleClose={handleCloseQuickView}
        product={selectedProduct}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default ProductList;
