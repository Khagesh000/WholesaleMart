import { useState, useEffect } from "react";
import { FaUser, FaStore, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBusinessTime, FaFileInvoice, FaEdit } from "react-icons/fa";
import "../assets/css/VendorProfile.css"; 

const VendorProfile = () => {
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updatedVendor, setUpdatedVendor] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/check-vendor-session/", { credentials: "include" })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("🟢 Vendor profile response:", data);

                if (data.loggedIn) {
                    setVendor(data);
                    setUpdatedVendor(data);  // Set for editing
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

// ✅ Handle input change for editing fields
const handleChange = (e) => {
    setUpdatedVendor({
        ...updatedVendor,
        [e.target.name]: e.target.value,
    });
};


const handleSave = async () => {
    try {
        const csrfToken = await getCSRFToken();

        const response = await fetch("http://127.0.0.1:8000/api/update-vendor-profile/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            credentials: "include",
            body: JSON.stringify({
                firstName: updatedVendor.firstName,
                lastName: updatedVendor.lastName,
                shopName: updatedVendor.shopName,
                shopAddress: updatedVendor.shopAddress,
                shopFullAddress: updatedVendor.shopFullAddress,
                pincode: updatedVendor.pincode,
                mobile: updatedVendor.mobile,
                panNumber: updatedVendor.panNumber,
            }),
        });

        const data = await response.json();
        console.log("✅ Update response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to update profile");
        }

        if (data.status === "Success") {
            localStorage.setItem("vendorData", JSON.stringify(updatedVendor));
            setVendor(updatedVendor);
            setEditMode(false);
        } else {
            console.error("❌ Update failed:", data.message);
        }
    } catch (error) {
        console.error("❌ Error updating vendor profile:", error.message);
    }
};



// ✅ Function to fetch CSRF token
const getCSRFToken = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/get-csrf-token/", {
            credentials: "include", // ✅ Send cookies for session auth
        });
        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error("❌ Error fetching CSRF token:", error);
        return "";
    }
};




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
                        <h2 className="vendor-name">
                            {editMode ? (
                                <input type="text" name="firstName" value={updatedVendor.firstName} onChange={handleChange} />
                            ) : (
                                `${vendor.firstName} ${vendor.lastName}`
                            )}
                        </h2>

                        <p className="vendor-shop">
                            <FaStore /> {editMode ? <input type="text" name="shopName" value={updatedVendor.shopName} onChange={handleChange} /> : vendor.shopName}
                        </p>

                        {/* Vendor Details */}
                        <div className="vendor-details">
                            <p><FaEnvelope className="icon" /> <strong>Email:</strong> {vendor.email}</p>
                            <p><FaPhone className="icon" /> <strong>Mobile:</strong> {editMode ? <input type="text" name="mobile" value={updatedVendor.mobile} onChange={handleChange} /> : vendor.mobile}</p>
                            <p><FaBusinessTime className="icon" /> <strong>Business Type:</strong> {editMode ? <input type="text" name="businessType" value={updatedVendor.businessType} onChange={handleChange} /> : vendor.businessType}</p>
                            <p><FaMapMarkerAlt className="icon" /> <strong>Address:</strong> {editMode ? <input type="text" name="shopAddress" value={updatedVendor.shopAddress} onChange={handleChange} /> : vendor.shopAddress}</p>
                            <p><FaMapMarkerAlt className="icon" /> <strong>Pincode:</strong> {editMode ? <input type="text" name="pincode" value={updatedVendor.pincode} onChange={handleChange} /> : vendor.pincode}</p>
                            <p><FaFileInvoice className="icon" /> <strong>PAN Number:</strong> {editMode ? <input type="text" name="panNumber" value={updatedVendor.panNumber} onChange={handleChange} /> : vendor.panNumber}</p>
                            <p><FaFileInvoice className="icon" /> <strong>GST Number:</strong> {editMode ? <input type="text" name="gstNumber" value={updatedVendor.gstNumber} onChange={handleChange} /> : vendor.gstNumber}</p>
                        </div>

                        {/* Edit & Save Button */}
                        {editMode ? (
                            <button className="save-profile-btn" onClick={handleSave}>💾 Save</button>
                        ) : (
                            <button className="edit-profile-btn" onClick={() => setEditMode(true)}><FaEdit /> Edit Profile</button>
                        )}
                    </>
                ) : (
                    <p className="text-red-500 font-semibold">⚠️ No vendor data available.</p>
                )}
            </div>
        </div>
    );
};

export default VendorProfile;
