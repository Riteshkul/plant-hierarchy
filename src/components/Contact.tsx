import React from 'react'

const Contact = () => {
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
            <div className='container vh-100   bg-light'>
                <div className='row  p-4 d-flex bg-white'>
                    <div className='col-md-6 '>
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="contact">Contact Number</label>
                                <input type="number" className="form-control" id="contact" placeholder="Contact Number" />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className='col-md-6 '>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdnOnOVPzbsemkgOVe8aJuDXqhO7Nn2_PBfw&usqp=CAU' alt='contact us' style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Contact