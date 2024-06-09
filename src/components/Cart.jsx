import React, { useState } from 'react';
import { BsDash, BsPlus, BsTrash } from 'react-icons/bs';
import Modal from './Modal'; // Import the modal component
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    return <p className="text-center text-gray-600">Your cart is empty.</p>;
  }

  const MyDocument = () => (
    <Document>
      <Page className="p-4">
        <Text className="text-2xl text-center mb-6">Order Invoice</Text>
        <Text className="mb-2 text-base">Name: {userInfo.name}</Text>
        <Text className="mb-2 text-base">Address: {userInfo.address}</Text>
        <Text className="mb-2 text-base">Email: {userInfo.email}</Text>
        <Text className="mb-4 text-base">Phone: {userInfo.phone}</Text>
        <View className="w-full mb-4">
          {cartItems.map((product, index) => (
            <View key={product.id} className="flex flex-row mb-2">
              <Text className="w-1/5 text-sm">{index + 1}</Text>
              <Text className="w-1/5 text-sm">{product.name}</Text>
              <Text className="w-1/5 text-sm">Rs. {product.price}</Text>
              <Text className="w-1/5 text-sm">{product.quantity}</Text>
              <Text className="w-1/5 text-sm">Rs. {product.quantity * product.price}</Text>
            </View>
          ))}
        </View>
        <Text className="text-right text-lg">Total: Rs. {cartItems.reduce((total, product) => total + product.quantity * product.price, 0)}</Text>
      </Page>
    </Document>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: "#B5C18E" }}>Your Cart ({cartItems.length} items)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cartItems.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center bg-white shadow-lg">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded-lg" />
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">Rs. {product.price}</p>
            <div className="flex items-center justify-center mb-2">
              <button onClick={() => decreaseQuantity(product.id)} className="text-sm text-gray-600 p-1 bg-gray-200 rounded-full mr-2"><BsDash /></button>
              <span className="text-lg font-semibold">{product.quantity}</span>
              <button onClick={() => increaseQuantity(product.id)} className="text-sm text-gray-600 p-1 bg-gray-200 rounded-full ml-2"><BsPlus /></button>
            </div>
            <p className="text-sm text-gray-600">Total: Rs. {product.quantity * product.price}</p>
            <button onClick={() => removeFromCart(product.id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"><BsTrash /></button>
          </div>
        ))}
      </div>
      <button onClick={openModal} className="mt-8 bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-300">Order</button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#B5C18E" }}>Enter Your Details</h2>
          <form className="space-y-4 w-80">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="mt-4">
              <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-300">
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
