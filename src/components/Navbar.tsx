import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props: any) => {
    return (
        <nav className="navbar navbar-expand-lg mb-1" style={{ backgroundColor: "#3CB043" }} >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home" style={{ color: 'white' }}>Green Harbor</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" >
                            <Link className="nav-link active" aria-current="page" style={{ color: 'white' }} to="/home">Home</Link>
                        </li>
                        <li className="nav-item" >
                            <Link className="nav-link" to="/hierarchy" style={{ color: 'white' }}>Hierarchy</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/plant" style={{ color: 'white' }}>Add Plant</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addroot" style={{ color: 'white' }}>Add Kingdom</Link>
                        </li>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" style={{ color: 'white' }}>Search</button>
                        </form>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {props.username && (
                            <li className="nav-item text">
                                <p className="navbar-text" style={{ color: 'white' }}>Welcome, {props.username}</p>
                            </li>
                        )}
                        <li className="nav-item text">
                            <Link to="/" className="nav-link " style={{ color: 'white' }} aria-disabled="true">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
