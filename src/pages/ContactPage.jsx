import React from "react";
import { Footer, Navbar } from "../components";
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-charcoal">Reach Out to Our Concierge</h1>
        <hr className="border-gold-bottom w-25 mx-auto" />
        <div class="row my-4 h-100">
          <div className="col-md-6 col-lg-6 col-sm-10 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name" className="text-charcoal">Name</label>
                <input
                  type="text"
                  className="form-control form-control-luxury"
                  id="Name"
                  placeholder="Enter your name"
                />
              </div>
              <div class="form my-3">
                <label for="Email" className="text-charcoal">Email</label>
                <input
                  type="email"
                  className="form-control form-control-luxury"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="form  my-3">
                <label for="Message" className="text-charcoal">Message</label>
                <textarea
                  rows={5}
                  className="form-control form-control-luxury"
                  id="Message"
                  placeholder="How can we assist you with your jewelry selection?"
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-gold"
                  type="submit"
                  disabled
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
