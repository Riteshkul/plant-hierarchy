import React from 'react';
import Navbar from './Navbar';
import Contact from './Contact';
import Slider from './Slider';
import Footer from './Footer';

const Home = (props: any) => {
    return (
        <>
            <Navbar username={props.username} />
            <Slider />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
