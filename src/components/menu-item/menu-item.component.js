import React from 'react';
import { withRouter } from 'react-router';
import '../../css/menu-item.styles.css'

const MenuItem = ({title, imageUrl, size, linkUrl, history, match}) => (
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div className='background-image' style={{
      backgroundImage: `url(${imageUrl})`
    }}  />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

//withRouter return superpower component with access to history location etc 
export default withRouter(MenuItem);