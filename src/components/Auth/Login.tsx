import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../../redux/actions/authActions';
import axios from 'axios';
import { useState } from 'react';
const Login = (props: any) => {
    const [loginError, setLoginError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        setLoginError(null);
        dispatch(loginStart());
        const userData = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value

        }
        try {
            // Make your API call for login
            const response = await axios.post('http://localhost:8080/api/auth/login', userData);
            props.setUsername(response.data.username);
            dispatch(loginSuccess(response.data));
            navigate('/home');
        } catch (error: any) {
            dispatch(loginFailure(error.response));
            if (error.response.status === 400) {
                setLoginError('Invalid credentials. Please check your email and password.');
            } else {
                // Handle other types of errors if needed
                setLoginError('An error occurred during login. Please try again.');
            }
        }
    };

    return (
        <>

            <h2 className="p-4 shadow rounded bg-green text-white text-center fw-bold" style={{ backgroundColor: '#4CAF50' }}>Welcome To Green Harbor</h2>
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="row w-75 p-4 shadow rounded bg-white">
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="login-image-container">
                            <img className="login-img img-fluid rounded" src="https://www.realsimple.com/thmb/P9g1f-xU0Zr2cq2_3dMwfXizZcM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/impossible-to-kill-outdoor-plants-1-2000-f513b0574cb04674a1bce40b832b28dd.jpg" alt="plant images" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form className="mb-4" onSubmit={handleOnSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            {loginError && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {loginError}
                                </div>
                            )}
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg" >Login</button>
                            </div>
                        </form>

                        <div className="text-center mb-3">
                            <a href="/forgot-password" className="text-muted">Forgot Password?</a>
                        </div>

                        <div className="text-center">
                            Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;


