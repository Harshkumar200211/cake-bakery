import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/Home.css';
import cake_slider_1 from "../images/Home-carousal-image/cake-1-slider.jpg";
import cake_slider_2 from "../images/Home-carousal-image/cake-2-slider.jpg";
import cake_slider_3 from "../images/Home-carousal-image/cake-3-slider.jpg";
import cake_slider_4 from "../images/Home-carousal-image/cake-4-slider.jpg";
import cake_slider_5 from "../images/Home-carousal-image/cake-5-slider.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Cake Bakery</h1>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src={cake_slider_1} alt="Cake 1" />
          <p className="legend">Delicious Cake 1</p>
        </div>
        <div>
          <img src={cake_slider_2} alt="Cake 2" />
          <p className="legend">Tasty Cake 2</p>
        </div>
        <div>
          <img src={cake_slider_3} alt="Cake 3" />
          <p className="legend">Yummy Cake 3</p>
        </div>
        <div>
          <img src={cake_slider_4} alt="Cake 4" />
          <p className="legend">Scrumptious Cake 4</p>
        </div>
        <div>
          <img src={cake_slider_5} alt="Cake 5" />
          <p className="legend">Delectable Cake 5</p>
        </div>
      </Carousel>

      <section className="intro">
        <h2 className="intro-title">About Us</h2>
        <p className="intro-text">
          At Cake Bakery, we are passionate about creating delightful and exquisite cakes that bring joy to every occasion. Our team of skilled bakers and decorators meticulously crafts each cake using the finest ingredients. Whether it's a birthday, wedding, or any special event, we have the perfect cake to make your celebration unforgettable.
        </p>
      </section>

      <section className="featured-products">
        <h2 className="section-title">Featured Cakes</h2>
        <div className="featured-cakes">
          <div className="featured-cake">
            <h3 className="cake-title">Chocolate Delight</h3>
            <p className="cake-description">
              Experience the richness of our Chocolate Delight cake, featuring moist layers of chocolate sponge, enveloped in a creamy chocolate ganache, and topped with decadent chocolate shavings. Perfect for chocolate lovers!
            </p>
          </div>
          <div className="featured-cake">
            <h3 className="cake-title">Strawberry Dream</h3>
            <p className="cake-description">
              Delight in the freshness of our Strawberry Dream cake, with layers of fluffy vanilla sponge, fresh strawberries, and a light whipped cream frosting. It's a taste of summer in every bite.
            </p>
          </div>
          <div className="featured-cake">
            <h3 className="cake-title">Lemon Zest</h3>
            <p className="cake-description">
              Enjoy the zesty flavors of our Lemon Zest cake. This tangy treat features a lemon-infused sponge cake, topped with a lemon glaze and garnished with candied lemon slices. Refreshingly delightful!
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">Customer Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p className="testimonial-text">"The best bakery in town! Their cakes are not only beautiful but also incredibly delicious. Highly recommend!"</p>
            <p className="testimonial-author">- Harsh Kumar</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">"I ordered a custom cake for my wedding, and it was perfect. The team at Cake Bakery made my vision come true."</p>
            <p className="testimonial-author">- Sunny Shrivastav</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2 className="section-title">Order Your Cake Today!</h2>
        <p className="cta-text">Ready to make your celebration extra special? Browse our selection of cakes and place your order today. We offer delivery and pick-up options for your convenience.</p>
        <Link to="/products" className="cta-button">
          Order Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
