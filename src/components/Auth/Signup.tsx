// Signup.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerFailure, registerStart, registerSuccess } from '../../redux/actions/authActions';
import axios from 'axios';

const Signup = (props: any) => {
    const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        const password = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confirmPassword.value;

        if (password !== confirmPassword) {
            setPasswordMatchError("Passwords do not match");
            return;
        }
        setPasswordMatchError(null);
        dispatch(registerStart());
        const userData = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
            username: e.target.elements.username.value

        }
        try {
            // Make your API call for registration
            const response = await axios.post('http://localhost:8080/api/auth/register', userData);
            props.setUsername(response.data.username);
            dispatch(registerSuccess(response.data));
            navigate('/home')
        } catch (error: any) {
            dispatch(registerFailure(error.response));
        }
    };
    return (
        <>
            <h2 className="p-4 shadow rounded bg-green text-white text-center fw-bold" style={{ backgroundColor: '#4CAF50' }}>Welcome To Green Harbor</h2>
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="row w-75 p-4 shadow rounded bg-white">
                    <div className="col-md-6 d-flex align-items-center">
                        <img className="login-img img-fluid rounded" src="https://www.realsimple.com/thmb/P9g1f-xU0Zr2cq2_3dMwfXizZcM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/impossible-to-kill-outdoor-plants-1-2000-f513b0574cb04674a1bce40b832b28dd.jpg" alt="plant images" />
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={handleOnSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter your username"
                                    name='username'
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    name='email'
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    name='password'
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${passwordMatchError ? 'is-invalid' : ''}`}
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    name='confirmPassword'
                                    required
                                />
                                {passwordMatchError && (
                                    <div className="invalid-feedback">
                                        {passwordMatchError}
                                    </div>
                                )}
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                            </div>
                        </form>

                        <div className="text-center mt-3">
                            Already have an account? <Link to="/" className="text-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Signup;
function setPasswordMatchError(arg0: string) {
    throw new Error('Function not implemented.');
}

