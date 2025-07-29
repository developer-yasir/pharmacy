import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ProductQuickView({ show, handleClose, product, handleAddToCart }) {
  if (!product) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 text-center">
            <img src={product.imageUrl} alt={product.name} className="img-fluid" style={{ maxHeight: '300px', objectFit: 'contain' }} />
          </div>
          <div className="col-md-6">
            <h5>Category: {product.category}</h5>
            <p>{product.description}</p>
            <p><strong>Price: ${product.price}</strong></p>
            <p>In Stock: {product.countInStock}</p>
            <Button variant="primary" onClick={() => handleAddToCart(product, 1)} disabled={product.countInStock === 0}>
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductQuickView;
