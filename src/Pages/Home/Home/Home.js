import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Feedback from '../Feedback/Feedback';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <Products></Products>
            <Feedback></Feedback>
            <hr />
            <Footer></Footer>
        </div>
    );
};

export default Home;