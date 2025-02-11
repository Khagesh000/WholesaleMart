import { useState, useEffect } from "react";
import { FaUser, FaStore, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBusinessTime, FaFileInvoice, FaEdit } from "react-icons/fa";
import "../assets/css/VendorProfile.css"; 

const VendorProfile = () => {
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/check-vendor-session/", { credentials: "include" })
            .then(response => response.json())
            .then(data => {
                console.log("🟢 Vendor profile response:", data);

                if (data.loggedIn) {
                    setVendor({
                        firstName: data.firstName || "Not Provided",
                        lastName: data.lastName || "Not Provided",
                        shopName: data.shopName || "Not Provided",
                        shopAddress: data.shopAddress || "No Address",
                        shopFullAddress: data.shopFullAddress || "No Full Address",
                        pincode: data.pincode || "Not Provided",
                        mobile: data.mobile || "Not Provided",
                        email: data.email || "Not Provided",
                        panNumber: data.panNumber || "Not Provided",
                        gstNumber: data.gstNumber || "Not Provided",
                        businessType: data.businessType || "Not Provided"
                    });
                } else {
                    console.warn("⚠️ Vendor not authenticated. Redirecting...");
                    window.location.href = "/vendor-login";
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("❌ Error fetching vendor profile:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center text-blue-500 animate-pulse">🔄 Loading Vendor Profile...</p>;

    return (
        <div className="vendor-profile-container">
            <div className="vendor-profile-card">
                {vendor ? (
                    <>
                        {/* Profile Picture */}
                        <div className="profile-pic-container">
                            <FaUser className="default-profile-icon" />
                        </div>

                        {/* Vendor Name */}
                        <h2 className="vendor-name">{vendor.firstName} {vendor.lastName}</h2>
                        <p className="vendor-shop"><FaStore /> {vendor.shopName}</p>

                        {/* Vendor Details */}
                        <div className="vendor-details">
                            <p><FaEnvelope className="icon" /> <strong>Email:</strong> {vendor.email}</p>
                            <p><FaPhone className="icon" /> <strong>Mobile:</strong> {vendor.mobile}</p>
                            <p><FaBusinessTime className="icon" /> <strong>Business Type:</strong> {vendor.businessType}</p>
                            <p><FaMapMarkerAlt className="icon" /> <strong>Address:</strong> {vendor.shopAddress}</p>
                            <p><FaMapMarkerAlt className="icon" /> <strong>Full Address:</strong> {vendor.shopFullAddress}</p>
                            <p><FaMapMarkerAlt className="icon" /> <strong>Pincode:</strong> {vendor.pincode}</p>
                            <p><FaFileInvoice className="icon" /> <strong>PAN Number:</strong> {vendor.panNumber}</p>
                            <p><FaFileInvoice className="icon" /> <strong>GST Number:</strong> {vendor.gstNumber}</p>
                        </div>

                        {/* Edit Profile Button */}
                        <button className="edit-profile-btn">
                            <FaEdit /> Edit Profile
                        </button>
                    </>
                ) : (
                    <p className="text-red-500 font-semibold">⚠️ No vendor data available.</p>
                )}
            </div>
        </div>
    );
};

export default VendorProfile;
