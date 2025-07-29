import React from 'react';

function ProductListSkeleton({ viewMode }) {
  const skeletonCount = 9; // Number of skeleton cards to display

  return (
    <div className={viewMode === 'grid' ? 'row' : 'list-group'}>
      {[...Array(skeletonCount)].map((_, index) => (
        <div key={index} className={viewMode === 'grid' ? 'col-md-4 mb-4' : 'list-group-item mb-3'}>
          <div className={viewMode === 'grid' ? 'card h-100' : 'd-flex align-items-center'}>
            <div className={viewMode === 'grid' ? 'card-img-top bg-light' : 'me-3 bg-light'} style={viewMode === 'grid' ? { height: '200px' } : { width: '100px', height: '100px' }}></div>
            <div className={viewMode === 'grid' ? 'card-body d-flex flex-column' : 'flex-grow-1'}>
              <h5 className={viewMode === 'grid' ? 'card-title bg-light mb-2' : 'mb-1 bg-light'} style={{ height: '20px', width: '80%' }}></h5>
              <p className={viewMode === 'grid' ? 'card-text bg-light mb-2' : 'mb-1 bg-light'} style={{ height: '15px', width: '60%' }}></p>
              <p className={viewMode === 'grid' ? 'card-text bg-light mb-2' : 'mb-1 bg-light'} style={{ height: '15px', width: '40%' }}></p>
              <p className={viewMode === 'grid' ? 'card-text bg-light mb-2' : 'mb-1 bg-light'} style={{ height: '15px', width: '50%' }}></p>
              <div className={viewMode === 'grid' ? 'mt-auto' : 'd-flex justify-content-between align-items-center mt-2'}>
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-light me-2" style={{ height: '20px', width: '30px' }}></div>
                  <div className="form-control w-25 bg-light" style={{ height: '38px' }}></div>
                </div>
                <div className={viewMode === 'grid' ? '' : 'd-flex flex-column align-items-end'}>
                  <div className="btn btn-primary w-100 mb-2 bg-light" style={{ height: '38px' }}></div>
                  <div className="btn btn-outline-info w-100 mb-2 bg-light" style={{ height: '38px' }}></div>
                  <div className="btn btn-outline-secondary w-100 bg-light" style={{ height: '38px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListSkeleton;
