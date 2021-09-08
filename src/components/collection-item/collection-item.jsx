import React, { useContext } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import '../../css/collection-item.styles.css';
import { CartContext } from '../../providers/cart/cart.provider';

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const { addItem } = useContext(CartContext);
  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        ADD to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
