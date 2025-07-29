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

const ALL_PRODUCTS_ADMIN = generateDummyProducts(100); // Use a separate dummy data for admin to simulate persistence

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    countInStock: '',
    imageUrl: '',
    category: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    // Load products from localStorage or use dummy data if empty
    const storedProducts = JSON.parse(localStorage.getItem('admin_products'));
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      setProducts(ALL_PRODUCTS_ADMIN);
      localStorage.setItem('admin_products', JSON.stringify(ALL_PRODUCTS_ADMIN));
    }
  }, []);

  useEffect(() => {
    // Save products to localStorage whenever they change
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  const getFilteredProducts = () => {
    let filtered = products;

    if (keyword) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter(p => p.category === filterCategory);
    }
    return filtered;
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update existing product
        setProducts(products.map(p => p._id === editingProduct._id ? { ...formData, _id: editingProduct._id } : p));
        toast.success('Product updated successfully!');
      } else {
        // Add new product
        const newProduct = { ...formData, _id: `prod_${Date.now()}` };
        setProducts([...products, newProduct]);
        toast.success('Product added successfully!');
      }
      setFormData({
        name: '',
        description: '',
        price: '',
        countInStock: '',
        imageUrl: '',
        category: '',
      });
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save product.');
    }
  };

  const onEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
      imageUrl: product.imageUrl,
      category: product.category,
    });
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product removed successfully!');
    }
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div>
      <h1>Manage Products</h1>

      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={onChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="countInStock" className="form-label">Count In Stock</label>
          <input type="number" className="form-control" id="countInStock" name="countInStock" value={formData.countInStock} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input type="text" className="form-control" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-select"
            name="category"
            value={formData.category}
            onChange={onChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {editingProduct && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditingProduct(null); setFormData({ name: '', description: '', price: '', countInStock: '', imageUrl: '', category: '' }); }}>Cancel</button>}
      </form>

      <h2 className="mt-5">Existing Products</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No products found matching criteria.</td>
            </tr>
          ) : (
            displayedProducts.map((product) => (
              <tr key={product._id} className={product.countInStock < 10 ? 'table-danger' : ''}> {/* Highlight low stock */}
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.countInStock} {product.countInStock < 10 && <span className="badge bg-danger ms-2">Low Stock!</span>}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(product)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
