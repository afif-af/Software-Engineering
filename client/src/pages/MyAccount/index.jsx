import React, { useState } from 'react';
import { Button, TextField, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { FiEdit2, FiMapPin, FiCreditCard, FiLogOut, FiUser } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import "./style.css";

const MyAccount = () => {
    const [tabValue, setTabValue] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    // Sample user data
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-05-15",
        profileImage: "https://via.placeholder.com/150"
    });

    // Sample orders data
    const [orders] = useState([
        {
            id: 1,
            orderNo: "ORD-001234",
            date: "2026-04-28",
            total: "$156.50",
            status: "Delivered",
            items: ["Wireless Headphones", "Phone Case"]
        },
        {
            id: 2,
            orderNo: "ORD-001233",
            date: "2026-04-15",
            total: "$89.99",
            status: "Shipped",
            items: ["USB-C Cable"]
        },
        {
            id: 3,
            orderNo: "ORD-001232",
            date: "2026-03-20",
            total: "$234.75",
            status: "Delivered",
            items: ["Laptop Stand", "Keyboard", "Mouse"]
        }
    ]);

    // Sample addresses
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
            isDefault: true
        },
        {
            id: 2,
            type: "Office",
            street: "456 Business Ave",
            city: "New York",
            state: "NY",
            zip: "10002",
            country: "USA",
            isDefault: false
        }
    ]);

    // Sample payment methods
    const [paymentMethods] = useState([
        {
            id: 1,
            type: "Credit Card",
            cardNumber: "**** **** **** 4242",
            expiryDate: "12/25",
            isDefault: true
        },
        {
            id: 2,
            type: "Debit Card",
            cardNumber: "**** **** **** 5555",
            expiryDate: "08/26",
            isDefault: false
        }
    ]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleEditProfile = () => {
        setEditMode(!editMode);
    };

    const handleSaveProfile = () => {
        setEditMode(false);
        // Here you would typically make an API call to save the data
    };

    const handleAddressDelete = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleLogout = () => {
        // Logout logic here
        console.log("Logging out...");
    };

    return (
        <section className="py-10 bg-[#f5f0f0]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-center mb-6">
                                <img
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-[18px] font-[600]">{userData.name}</h3>
                                <p className="text-[14px] text-gray-600">{userData.email}</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setTabValue(0)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${
                                        tabValue === 0
                                            ? "bg-[#ff5252] text-white"
                                            : "bg-gray-100 text-black hover:bg-gray-200"
                                    }`}
                                >
                                    <FiUser /> My Profile
                                </button>

                                <button
                                    onClick={() => setTabValue(1)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${
                                        tabValue === 1
                                            ? "bg-[#ff5252] text-white"
                                            : "bg-gray-100 text-black hover:bg-gray-200"
                                    }`}
                                >
                                    <GoPackage /> My Orders
                                </button>

                                <button
                                    onClick={() => setTabValue(2)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${
                                        tabValue === 2
                                            ? "bg-[#ff5252] text-white"
                                            : "bg-gray-100 text-black hover:bg-gray-200"
                                    }`}
                                >
                                    <FiMapPin /> Addresses
                                </button>

                                <button
                                    onClick={() => setTabValue(3)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${
                                        tabValue === 3
                                            ? "bg-[#ff5252] text-white"
                                            : "bg-gray-100 text-black hover:bg-gray-200"
                                    }`}
                                >
                                    <FiCreditCard /> Payment Methods
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                                >
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="md:col-span-3">
                        {/* My Profile Tab */}
                        {tabValue === 0 && (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[24px] font-[600]">My Profile</h2>
                                    <Button
                                        onClick={handleEditProfile}
                                        className="!flex !items-center !gap-2 !bg-[#ff5252] !text-white !px-4 !py-2"
                                        variant="contained"
                                    >
                                        <FiEdit2 /> {editMode ? "Cancel" : "Edit"}
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {editMode ? (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <TextField
                                                    fullWidth
                                                    label="Full Name"
                                                    value={userData.name}
                                                    onChange={(e) =>
                                                        setUserData({ ...userData, name: e.target.value })
                                                    }
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    type="email"
                                                    value={userData.email}
                                                    onChange={(e) =>
                                                        setUserData({ ...userData, email: e.target.value })
                                                    }
                                                    variant="outlined"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <TextField
                                                    fullWidth
                                                    label="Phone"
                                                    value={userData.phone}
                                                    onChange={(e) =>
                                                        setUserData({ ...userData, phone: e.target.value })
                                                    }
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Date of Birth"
                                                    type="date"
                                                    value={userData.dateOfBirth}
                                                    onChange={(e) =>
                                                        setUserData({ ...userData, dateOfBirth: e.target.value })
                                                    }
                                                    variant="outlined"
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </div>

                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    onClick={handleSaveProfile}
                                                    variant="contained"
                                                    className="!bg-[#ff5252] !text-white"
                                                >
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-[12px] text-gray-600 font-[600]">
                                                        FULL NAME
                                                    </label>
                                                    <p className="text-[16px] font-[500] mt-2">{userData.name}</p>
                                                </div>

                                                <div>
                                                    <label className="text-[12px] text-gray-600 font-[600]">
                                                        EMAIL ADDRESS
                                                    </label>
                                                    <p className="text-[16px] font-[500] mt-2">
                                                        {userData.email}
                                                    </p>
                                                </div>

                                                <div>
                                                    <label className="text-[12px] text-gray-600 font-[600]">
                                                        PHONE NUMBER
                                                    </label>
                                                    <p className="text-[16px] font-[500] mt-2">
                                                        {userData.phone}
                                                    </p>
                                                </div>

                                                <div>
                                                    <label className="text-[12px] text-gray-600 font-[600]">
                                                        DATE OF BIRTH
                                                    </label>
                                                    <p className="text-[16px] font-[500] mt-2">
                                                        {userData.dateOfBirth}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* My Orders Tab */}
                        {tabValue === 1 && (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-[24px] font-[600] mb-6">My Orders</h2>

                                {orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <p className="text-[14px] text-gray-600">Order ID</p>
                                                        <p className="text-[16px] font-[600]">{order.orderNo}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-[14px] text-gray-600">Order Date</p>
                                                        <p className="text-[16px] font-[600]">{order.date}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-[14px] text-gray-600">Total</p>
                                                        <p className="text-[16px] font-[600] text-[#ff5252]">
                                                            {order.total}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-[14px] text-gray-600">Status</p>
                                                        <span
                                                            className={`inline-block px-3 py-1 rounded-full text-[12px] font-[600] mt-1 ${
                                                                order.status === "Delivered"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-blue-100 text-blue-700"
                                                            }`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </div>

                                                    <Button variant="outlined" size="small">
                                                        View Details
                                                    </Button>
                                                </div>

                                                <div className="text-[13px] text-gray-600 mt-3">
                                                    <p>
                                                        <strong>Items:</strong> {order.items.join(", ")}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <GoPackage className="text-[48px] text-gray-300 mx-auto mb-4" />
                                        <p className="text-[16px] text-gray-600">No orders yet</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {tabValue === 2 && (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[24px] font-[600]">My Addresses</h2>
                                    <Button
                                        onClick={() => setOpenAddressDialog(true)}
                                        variant="contained"
                                        className="!bg-[#ff5252] !text-white"
                                    >
                                        Add New Address
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map((address) => (
                                        <div
                                            key={address.id}
                                            className="border border-gray-200 rounded-lg p-4 relative"
                                        >
                                            {address.isDefault && (
                                                <span className="absolute top-3 right-3 bg-[#ff5252] text-white text-[11px] px-2 py-1 rounded">
                                                    Default
                                                </span>
                                            )}

                                            <h4 className="text-[16px] font-[600] mb-2">{address.type}</h4>
                                            <p className="text-[14px] text-gray-600 mb-1">
                                                {address.street}
                                            </p>
                                            <p className="text-[14px] text-gray-600 mb-3">
                                                {address.city}, {address.state} {address.zip}
                                            </p>
                                            <p className="text-[14px] text-gray-600 mb-4">{address.country}</p>

                                            <div className="flex gap-2">
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    className="!text-[#ff5252] !border-[#ff5252]"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    onClick={() => handleAddressDelete(address.id)}
                                                    className="!text-red-600"
                                                    startIcon={<MdDelete />}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Payment Methods Tab */}
                        {tabValue === 3 && (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[24px] font-[600]">Payment Methods</h2>
                                    <Button
                                        variant="contained"
                                        className="!bg-[#ff5252] !text-white"
                                    >
                                        Add Payment Method
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-[600]">
                                                    {method.type === "Credit Card" ? "CC" : "DC"}
                                                </div>

                                                <div>
                                                    <p className="text-[14px] text-gray-600 mb-1">
                                                        {method.type}
                                                    </p>
                                                    <p className="text-[16px] font-[600]">
                                                        {method.cardNumber}
                                                    </p>
                                                    <p className="text-[12px] text-gray-500 mt-1">
                                                        Expires: {method.expiryDate}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {method.isDefault && (
                                                    <span className="bg-green-100 text-green-700 text-[12px] px-3 py-1 rounded">
                                                        Default
                                                    </span>
                                                )}

                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    className="!text-[#ff5252] !border-[#ff5252]"
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    size="small"
                                                    className="!text-red-600"
                                                    startIcon={<MdDelete />}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Address Dialog */}
            <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle className="!text-[18px] !font-[600]">Add New Address</DialogTitle>
                <DialogContent className="!pt-4">
                    <div className="space-y-4">
                        <TextField fullWidth label="Address Type" variant="outlined" />
                        <TextField fullWidth label="Street Address" variant="outlined" />
                        <div className="grid grid-cols-2 gap-4">
                            <TextField fullWidth label="City" variant="outlined" />
                            <TextField fullWidth label="State" variant="outlined" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <TextField fullWidth label="Zip Code" variant="outlined" />
                            <TextField fullWidth label="Country" variant="outlined" />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="!p-4">
                    <Button onClick={() => setOpenAddressDialog(false)}>Cancel</Button>
                    <Button variant="contained" className="!bg-[#ff5252]">
                        Add Address
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default MyAccount;