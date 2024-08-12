import React from 'react'
import Navbar from './components/Navbar/Navbar';
import { Route,Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <>
     <div class='app'>
        <Navbar/>

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
