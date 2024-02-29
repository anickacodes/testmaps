import React, { useState } from 'react';
import Map from './Map';

// import './SignIn.css'; 

function SignIn() {
  const [isVendor, setIsVendor] = useState(false);

  const handleToggle = () => {
    setIsVendor(!isVendor);
  };

  return (
    <div>
<Map/>
      <div className="toggle-container">
        <label className={`toggle-label ${isVendor ? 'vendor' : 'user'}`} onClick={handleToggle}>
          <div className="slider"></div>
        </label>
        <span>{isVendor ? 'Vendor' : 'User'}</span>
      </div>

      <form id="signInForm">
        {isVendor ? (
          <div>
            <input type="text" id="vendorId" placeholder="Vendor ID" />
            <input type="password" id="password" placeholder="Password" />
          </div>
        ) : (
          <div>
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
          </div>
        )}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
