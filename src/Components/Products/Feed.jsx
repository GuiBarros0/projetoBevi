import React from 'react';
import FeedModal from './FeedModal';
import FeedProducts from './FeedProducts';

const Feed = () => {
  const [modalProduct, setModalProduct] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleUpdateSuccess = () => {
    window.location.reload();
  };

  return (
    <div>
      {modalProduct && !isEditing && <FeedModal product={modalProduct} onClose={() => setModalProduct(null)} onEdit={() => setIsEditing(true)} />}

      {isEditing && <FeedModalEdit product={modalProduct} onClose={() => setIsEditing(false)} onSuccess={handleUpdateSuccess} />}

      <FeedProducts setModalProduct={setModalProduct} />
    </div>
  );
};

export default Feed;
