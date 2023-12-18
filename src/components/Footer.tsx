import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 w-100  ">
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: info@example.com</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <p>Facebook | Twitter | Instagram</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Newsletter</h5>
                        <p>Subscribe to our newsletter for updates.</p>
                        <form>
                            <div className="input-group">
                                <input type="email" className="form-control" placeholder="Enter your email" />
                                <button type="submit" className="btn btn-success">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="text-center p-2 bg-secondary">
                <p>&copy; 2023 Green Harbor. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
