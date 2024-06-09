import React, { useState } from 'react';
import { BsDash, BsPlus, BsTrash } from 'react-icons/bs';
import Modal from './Modal'; // Import the modal component
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import '../css/Cart.css';

function Cart({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  const MyDocument = () => (
    <Document>
      <Page className="pdf-page">
        <Text className="pdf-title">Order Invoice</Text>
        <Text className="pdf-text">Name: {userInfo.name}</Text>
        <Text className="pdf-text">Address: {userInfo.address}</Text>
        <Text className="pdf-text">Email: {userInfo.email}</Text>
        <Text className="pdf-text">Phone: {userInfo.phone}</Text>
        <View className="pdf-item-list">
          {cartItems.map((product, index) => (
            <View key={product.id} className="pdf-item">
              <Text className="pdf-item-index">{index + 1}</Text>
              <Text className="pdf-item-name">{product.name}</Text>
              <Text className="pdf-item-price">Rs. {product.price}</Text>
              <Text className="pdf-item-quantity">{product.quantity}</Text>
              <Text className="pdf-item-total">Rs. {product.quantity * product.price}</Text>
            </View>
          ))}
        </View>
        <Text className="pdf-total">Total: Rs. {cartItems.reduce((total, product) => total + product.quantity * product.price, 0)}</Text>
      </Page>
    </Document>
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart ({cartItems.length} items)</h1>
      <div className="cart-grid">
        {cartItems.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} className="cart-item-image" />
            <h2 className="cart-item-name">{product.name}</h2>
            <p className="cart-item-price">Rs. {product.price}</p>
            <div className="cart-item-quantity">
              <button onClick={() => decreaseQuantity(product.id)} className="cart-item-button"><BsDash /></button>
              <span className="cart-item-count">{product.quantity}</span>
              <button onClick={() => increaseQuantity(product.id)} className="cart-item-button"><BsPlus /></button>
            </div>
            <p className="cart-item-total">Total: Rs. {product.quantity * product.price}</p>
            <button onClick={() => removeFromCart(product.id)} className="cart-item-remove"><BsTrash /></button>
          </div>
        ))}
      </div>
      <button onClick={openModal} className="order-button">Order</button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="modal-title">Enter Your Details</h2>
          <form className="modal-form">
            <div className="modal-form-group">
              <label className="modal-label">Name</label>
              <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} className="modal-input" />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Address</label>
              <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} className="modal-input" />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Email</label>
              <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} className="modal-input" />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Phone</label>
              <input type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} className="modal-input" />
            </div>
            <div className="modal-form-button">
              <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf" className="download-button">
                {({ loading }) => (loading ? 'Generating...' : 'Download Bill')}
              </PDFDownloadLink>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Cart;
