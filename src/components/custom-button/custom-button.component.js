import React from "react";
import '../../css/custom-button.styles.css';

const CustomButton = ({children, ...otherProps}) => (
  <button className='custom-button'>
    {children}
  </button>
)

export default CustomButton