import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/Css/Authform.css';

const ShippingPolicy = () => {
    return (
        <>
            <div className='privacy_container'>
                <div className="container">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link to='/'>Home</Link></li>/&nbsp;
                            <li>Shipping & Delivery Policy</li>
                        </ul>
                    </div>

                    <div className="privacy_inner_content">
                        <div className="title">
                            <h4>Shipping & Delivery Policy</h4>
                        </div>

                        <div className="common_para">
                            <p><b>Last updated on Feb 4th 2025</b></p>
                            <p>
                                For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only.
                                For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only. Orders are shipped within 0-7 days or as per the
                                delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
                                PRAKRITISA BOTANICALS PRIVATE LIMITED is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over
                                the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time
                                of order confirmation.
                            </p>
                            <p>
                                Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
                                For any issues in utilizing our services you may contact our helpdesk on <Link to="tel: 9220807109"> 9220807109</Link> or <Link to="mailto:finance@prakritisa.com">finance@prakritisa.com</Link>
                            </p>
                            <p>
                                <b>Disclaimer:</b> The above content is created at PRAKRITISA BOTANICALS PRIVATE LIMITED's sole discretion. Razorpay shall not be liable for any content provided here and shall not be
                                responsible for any claims and liability that may arise due to merchant’s non-adherence to it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShippingPolicy;
