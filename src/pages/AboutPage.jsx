import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-charcoal">Our Heritage</h1>
        <hr className="border-gold-bottom w-25 mx-auto" />
        <p className="lead text-center product-description">
          At HP Jewels, we craft extraordinary jewelry pieces that embody timeless elegance
          and exceptional artistry. Since 1985, our master jewelers have been creating
          distinctive pieces that celebrate life's most precious moments. Each piece in
          our collection is meticulously crafted with the finest materials, ensuring
          heirloom quality that transcends trends. Our commitment to excellence and
          sustainable practices has earned us the trust of discerning clients worldwide.
        </p>

        <h2 className="text-center py-4 text-charcoal">Our Collections</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card card-luxury h-100 hover-lift">
              <img className="card-img-top img-fluid p-3" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Diamond Rings" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center product-title">Diamond Rings</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card card-luxury h-100 hover-lift">
              <img className="card-img-top img-fluid p-3" src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Gemstone Necklaces" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center product-title">Gemstone Necklaces</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card card-luxury h-100 hover-lift">
              <img className="card-img-top img-fluid p-3" src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Luxury Bracelets" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center product-title">Luxury Bracelets</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card card-luxury h-100 hover-lift">
              <img className="card-img-top img-fluid p-3" src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Elegant Earrings" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center product-title">Elegant Earrings</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage