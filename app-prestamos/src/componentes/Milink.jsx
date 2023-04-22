import React from 'react'
import { Link } from 'react-router-dom';

const Milink = ({ to, children }) => (
    <Link
    to={to}
    style={{
      color: 'blue',
      textDecoration: 'none'
      
    }}
  >
    {children}
  </Link>
  );
  
  export default Milink;