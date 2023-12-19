import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props: any) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();

    const fetchSuggestions = async (term: string) => {
        try {
            const response = await axios.get<string[]>(`http://localhost:8080/api/nodes/suggestions?term=${term}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching plant suggestions:', error);
        }
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        // Redirect to hierarchy page with the selected plant
        navigate(`/hierarchy/${searchTerm}`)
        // window.location.href = `/hierarchy/${searchTerm}`;
    };
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
                        <form className="d-flex" role="search" onSubmit={handleSearch}>
                            <div className="position-relative">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        fetchSuggestions(e.target.value);
                                    }}
                                />
                                {suggestions.length > 0 && (
                                    <div className="autocomplete-suggestions">
                                        {suggestions.map((plant) => (
                                            <div
                                                key={plant}
                                                className="suggestion"
                                                onClick={() => {
                                                    setSearchTerm(plant);
                                                    setSuggestions([]);
                                                }}
                                            >
                                                {plant}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-outline-primary" type="submit" style={{ color: 'white' }}>
                                Search
                            </button>
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
