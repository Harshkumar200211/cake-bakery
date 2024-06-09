import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useDispatch } from 'react-redux';
import { addToCart } from './CartSlice';
import '../css/Products.css';

import products1 from '../images/Products-cake-image/Best Chocolate Cake Recipe _ My Baking Addiction.jpg';
import products2 from '../images/Products-cake-image/Black Forest Cheesecake.jpg';
import products3 from '../images/Products-cake-image/Chocolate Strawberry Cake.jpg';
import products4 from '../images/Products-cake-image/Custom Cakes - Recipes Worth Repeating.jpg';
import products5 from '../images/Products-cake-image/Moist and Fudgy Chocolate Cake - Butternut Bakery.jpg';
import products6 from '../images/Products-cake-image/Peanut Butter Chocolate Layer Cake.jpg';
import products7 from '../images/Products-cake-image/Stracciatella Maqui Cheesecake _ Rainbow in My Kitchen.jpg';
import products8 from '../images/Products-cake-image/Super Moist Vegan Chocolate Cake _ Desi~licious RD.jpg';
import products9 from '../images/Products-cake-image/Ultimate Oreo Cheesecake - Oreo Lovers This Way!.jpg';
import products10 from '../images/Products-cake-image/Wicked Windmill Chocolate Cake.jpg';

const Products = ({ addToCart }) => {
  const [productsData] = useState([
    { id: 1, image: products1, name: 'Best Chocolate Cake', description: 'Indulge in the rich and decadent flavor of our Best Chocolate Cake. Made with premium cocoa and topped with chocolate ganache.', price: 500 },
    { id: 2, image: products2, name: 'Black Forest Cheesecake', description: 'Savor the classic combination of cherries and chocolate in our Black Forest Cheesecake. Creamy cheesecake on a chocolate crust, topped with cherry compote.', price: 450 },
    { id: 3, image: products3, name: 'Chocolate Strawberry Cake', description: 'Enjoy the delightful blend of chocolate and strawberries in our Chocolate Strawberry Cake. Layers of moist chocolate cake filled with fresh strawberries.', price: 550 },
    { id: 4, image: products4, name: 'Custom Cakes', description: 'Create your dream cake with our Custom Cakes service. Tell us your preferences, and we\'ll design a cake that suits your taste and occasion.', price: 600 },
    { id: 5, image: products5, name: 'Moist and Fudgy Chocolate Cake', description: 'Experience pure bliss with our Moist and Fudgy Chocolate Cake. Dense, moist, and intensely chocolatey, it\'s a chocolate lover\'s paradise.', price: 520 },
    { id: 6, image: products6, name: 'Peanut Butter Chocolate Layer Cake', description: 'Indulge in the heavenly combination of peanut butter and chocolate in our Peanut Butter Chocolate Layer Cake. Layers of moist chocolate cake sandwiched with creamy peanut butter frosting.', price: 480 },
    { id: 7, image: products7, name: 'Stracciatella Maqui Cheesecake', description: 'Discover the unique flavor of our Stracciatella Maqui Cheesecake. Creamy cheesecake infused with maqui berry and speckled with chocolate flakes.', price: 570 },
    { id: 8, image: products8, name: 'Super Moist Vegan Chocolate Cake', description: 'Vegans rejoice with our Super Moist Vegan Chocolate Cake. Rich, moist, and utterly delicious, it\'s a chocolate cake that everyone can enjoy.', price: 530 },
    { id: 9, image: products9, name: 'Ultimate Oreo Cheesecake', description: 'Get ready for an Oreo explosion with our Ultimate Oreo Cheesecake. Creamy cheesecake loaded with chunks of Oreo cookies and topped with a layer of Oreo crumble.', price: 590 },
    { id: 10, image: products10, name: 'Wicked Windmill Chocolate Cake', description: 'Indulge your senses with our Wicked Windmill Chocolate Cake. Rich chocolate cake with a molten chocolate center, served warm for an irresistible treat.', price: 510 }
  ]);

  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Please sign in first to add items to your cart.');
      navigate('/signin');
    } else {
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="product-container">
      <h2 className="product-heading">Our Products</h2>
      <div className="grid-container">
        {productsData.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-details">
              <span className="product-price">Price: ₹{product.price}</span>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
