import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import { Route,Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import LoginPopup from './components/LoginPopup/LoginPopup';

const App = () => {

  
  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    
     <div class='app'>
        <Navbar setShowLogin={setShowLogin}/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/place-order' element={<PlaceOrder/>}/>
        </Routes>
    </div>

     <Footer/>
    </>
   
  )
}

export default App;
