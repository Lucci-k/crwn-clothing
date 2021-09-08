import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item';
import '../../css/collection.styles.css';

const CollectionPage = () => {
  const { collectionId } = useParams();
  const { title, items } = useSelector(selectCollection(collectionId));

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
