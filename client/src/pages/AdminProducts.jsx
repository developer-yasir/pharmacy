import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    countInStock: '',
    imageUrl: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formData);
      } else {
        await axios.post('/api/products', formData);
      }
      setFormData({
        name: '',
        description: '',
        price: '',
        countInStock: '',
        imageUrl: '',
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err.response.data);
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
    });
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

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
        <button type="submit" className="btn btn-primary">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {editingProduct && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditingProduct(null); setFormData({ name: '', description: '', price: '', countInStock: '', imageUrl: '' }); }}>Cancel</button>}
      </form>

      <h2 className="mt-5">Existing Products</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.countInStock}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
