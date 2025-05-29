import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Css/Authform.css';

const ReturnRefundPolicy = () => {
    return (
        <div className='privacy_container'>
            <div className="container">
                <div className="breadcrumbs">
                    <ul>
                        <li><Link to='/'>Home</Link></li>/&nbsp;
                        <li>Cancellation & Refund Policy</li>
                    </ul>
                </div>

                <div className="privacy_inner_content">
                    <div className="title">
                        <h4>CANCELLATION & REFUND POLICY</h4>
                    </div>

                    <div className="common_para">
                        <p><b>Last updated on Feb 4th 2025</b></p>
                        <p>No cancellations & Refunds are entertained</p>
                    </div>

                    <div className="title">
                        <h4>Disclaimer</h4>
                    </div>

                    <div className="common_para">
                        <p>
                            The above content is created at <b>PRAKRITISA BOTANICALS PRIVATE LIMITED</b>'s sole discretion.
                            Razorpay shall not be liable for any content provided here and shall not be responsible for
                            any claims and liability that may arise due to merchant’s non-adherence to it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReturnRefundPolicy;
