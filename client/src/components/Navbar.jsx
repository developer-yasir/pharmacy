import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

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

function Navbar() {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [quickSearchResults, setQuickSearchResults] = useState([]);

  const handleChangeUsername = () => {
    setUsername(''); // Clear username to trigger modal
    navigate('/'); // Navigate to home to show modal
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/products?keyword=${searchKeyword.trim()}`);
      setSearchKeyword(''); // Clear search input after navigating
      setQuickSearchResults([]); // Clear quick search results
    }
  };

  const handleQuickSearchChange = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
    if (value.length > 1) {
      const results = ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setQuickSearchResults(results);
    } else {
      setQuickSearchResults([]);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Pharmacy App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">Wishlist</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recently-viewed">Recently Viewed</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/compare">Compare</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownInfo" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Info
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownInfo">
                <li><Link className="dropdown-item" to="/about">About Us</Link></li>
                <li><Link className="dropdown-item" to="/contact">Contact Us</Link></li>
                <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link className="dropdown-item" to="/terms-of-service">Terms of Service</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex position-relative" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={searchKeyword}
              onChange={handleQuickSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
            {quickSearchResults.length > 0 && searchKeyword.length > 1 && (
              <div className="quick-search-results card position-absolute w-100 mt-2 shadow-lg" style={{ zIndex: 100, top: '100%' }}>
                <ul className="list-group list-group-flush">
                  {quickSearchResults.map(product => (
                    <li key={product._id} className="list-group-item list-group-item-action">
                      <Link to={`/products/${product._id}`} onClick={() => setQuickSearchResults([])} className="text-decoration-none text-dark d-flex align-items-center">
                        <img src={product.imageUrl} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '10px' }} />
                        <span>{product.name}</span>
                      </Link>
                    </li>
                  ))}
                  {quickSearchResults.length === 5 && (
                    <li className="list-group-item text-center">
                      <Link to={`/products?keyword=${searchKeyword}`} onClick={() => setQuickSearchResults([])}>View all results</Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {username ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Hello, {username}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownUser">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleChangeUsername}>Change Name</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <span className="nav-link">Welcome!</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;