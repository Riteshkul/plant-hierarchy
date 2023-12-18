import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'

const Root = (props: any) => {
    const [error, setError] = useState<string | null>(null);
    const handleonsubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            kingdomname: e.target.elements.name.value,
            kingdomdescription: e.target.elements.description.value,
            division: e.target.elements.division.value,
            plantClass: e.target.elements.class.value,
            orderValue: e.target.elements.order.value,
            family: e.target.elements.family.value
        }
        try {
            const response = await axios.post('http://localhost:8080/api/parent/add', data);
            if (response.status === 200) {
                window.alert('Kingdom added successfully!');
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                setError('An error occurred during adding the kingdom. Please try again.');
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
            else if (error.response.status === 409) {
                setError('An error occurred Kingdom already exists');
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
            else {
                setError(error.message);
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        }


    }
    return (
        <>
            <Navbar username={props.username} />
            <div className="container-fluid  d-flex align-items-center justify-content-center bg-light mb-3">
                <div className='row w-75 p-4 shadow rounded bg-white'>
                    <h2 className='mb-3 mt-5 ' style={{ textAlign: 'center' }}>Add Kingdom </h2>
                    <form onSubmit={handleonsubmit} >
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" required />

                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" className="form-control" id="description" rows={3} placeholder='enter description of kingdom' required></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="division">Division</label>
                            <input type="text" name="division" className="form-control" id="division" aria-describedby="emailHelp" placeholder="Enter Division under kingdom" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="family">Family</label>
                            <input type="text" name="family" className="form-control" id="family" aria-describedby="emailHelp" placeholder="Enter family under kingdom" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="order">Order</label>
                            <input type="text" name="order" className="form-control" id="order" aria-describedby="emailHelp" placeholder="Enter order under kingdom" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="class">Class</label>
                            <input type="text" name="class" className="form-control" id="class" aria-describedby="emailHelp" placeholder="Enter class under kingdom" required />
                        </div>
                        <button type="submit" className="btn btn-primary">ADD</button>
                    </form>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Root