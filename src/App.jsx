import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Correctly import PersistGate
import { store, persistor } from './components/Store'; // Import named exports
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import Contact from './components/Contact';
import Messages from './components/Messages';
import Update from './components/Update';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import SignUp from './components/SignUp';
import Data from './components/Data';
import Profile from './components/Profile';
import UpdateForm from './components/UpdateForm';
import Admin from './components/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
import AddUserForm from './components/AddUserForm';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
      toast.success("Added Successfully");
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success("Added Successfully");
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (productId) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(item => item.id === productId);
    updatedCartItems[itemIndex].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (productId) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(item => item.id === productId);
    if (updatedCartItems[itemIndex].quantity > 1) {
      updatedCartItems[itemIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    } else {
      removeFromCart(productId);
    }
  };

  const toastStyle = {
    marginTop: "7vh"
  };

  return (
    <>
      <ToastContainer position='top-right' theme='dark' style={toastStyle} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider> {/* Wrap App with AuthProvider */}
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products addToCart={addToCart} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='/update' element={<Update />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/admin" element={<Admin />} />
                <Route path='/messages' element={<Messages />} />
                <Route path='/updateform' element={<UpdateForm />} />
                <Route path='/adduserform' element={<AddUserForm />} />
                <Route path="/data" element={<Data />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
              <Footer />
            </Router>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
