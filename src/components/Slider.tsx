import React from 'react'

const Slider = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide mb-5" data-ride="carousel" >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="https://media.istockphoto.com/id/1305444223/photo/retail-display-of-fresh-flowers-for-sale-outside-florist-shop.jpg?s=612x612&w=0&k=20&c=HNg18OW11TECmItBho1AzFOzN763VZn07DYPV364wf8=" alt="First slide" style={{ height: '600px', width: '300px' }} />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://c4.wallpaperflare.com/wallpaper/547/992/1021/flowers-plants-colorful-stones-wallpaper-preview.jpg" alt="Second slide" style={{ height: '600px', width: '300px' }} />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://nurserylive.com/cdn/shop/collections/nurserylive-flowering-plants-category-image-505581_600x600.jpg?v=1681381493" alt="Third slide" style={{ height: '600px', width: '300px' }} />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Slider