import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tab, Tabs } from "@mui/material";
import { FiSearch, FiChevronDown, FiDownload, FiX } from "react-icons/fi";
import { GiReturn } from "react-icons/gi";
import { MdLocalShipping, MdCheckCircle, MdCancel } from "react-icons/md";
import { TbTruck } from "react-icons/tb";
import { BsBox } from "react-icons/bs";
import "./style.css"

const Order = () => {
    const [tabValue, setTabValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openReturn, setOpenReturn] = useState(false);
    const [returnReason, setReturnReason] = useState("");
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // Sample orders data with comprehensive tracking
    const [orders] = useState([
        {
            id: 1,
            orderNo: "ORD-001234",
            date: "2026-04-28",
            total: "$156.50",
            status: "delivered",
            estimatedDelivery: "2026-05-02",
            actualDelivery: "2026-05-01",
            items: [
                { name: "Wireless Headphones", quantity: 1, price: "$89.99" },
                { name: "Phone Case", quantity: 1, price: "$24.99" }
            ],
            paymentMethod: "Credit Card (****4242)",
            paymentStatus: "Paid",
            shippingAddress: "123 Main Street, New York, NY 10001",
            carrier: "FedEx",
            trackingNumber: "7642851625312",
            timeline: [
                { stage: "Order Placed", date: "2026-04-28", completed: true, icon: "order" },
                { stage: "Payment Confirmed", date: "2026-04-28", completed: true, icon: "payment" },
                { stage: "Processing", date: "2026-04-29", completed: true, icon: "processing" },
                { stage: "Shipped", date: "2026-04-30", completed: true, icon: "shipped" },
                { stage: "Out for Delivery", date: "2026-05-01", completed: true, icon: "delivery" },
                { stage: "Delivered", date: "2026-05-01", completed: true, icon: "completed" }
            ],
            returnEligible: false,
            cancelable: false
        },
        {
            id: 2,
            orderNo: "ORD-001233",
            date: "2026-04-25",
            total: "$89.99",
            status: "shipped",
            estimatedDelivery: "2026-05-05",
            actualDelivery: null,
            items: [
                { name: "USB-C Cable", quantity: 2, price: "$19.99" }
            ],
            paymentMethod: "Debit Card (****5555)",
            paymentStatus: "Paid",
            shippingAddress: "456 Business Ave, New York, NY 10002",
            carrier: "UPS",
            trackingNumber: "1Z999AA10123456784",
            timeline: [
                { stage: "Order Placed", date: "2026-04-25", completed: true, icon: "order" },
                { stage: "Payment Confirmed", date: "2026-04-25", completed: true, icon: "payment" },
                { stage: "Processing", date: "2026-04-26", completed: true, icon: "processing" },
                { stage: "Shipped", date: "2026-04-27", completed: true, icon: "shipped" },
                { stage: "Out for Delivery", date: "2026-05-04", completed: false, icon: "delivery" },
                { stage: "Delivered", date: "2026-05-05", completed: false, icon: "completed" }
            ],
            returnEligible: false,
            cancelable: false
        },
        {
            id: 3,
            orderNo: "ORD-001232",
            date: "2026-04-20",
            total: "$234.75",
            status: "processing",
            estimatedDelivery: "2026-05-07",
            actualDelivery: null,
            items: [
                { name: "Laptop Stand", quantity: 1, price: "$89.99" },
                { name: "Keyboard", quantity: 1, price: "$79.99" },
                { name: "Mouse", quantity: 1, price: "$29.99" }
            ],
            paymentMethod: "PayPal",
            paymentStatus: "Paid",
            shippingAddress: "789 Tech Street, San Francisco, CA 94105",
            carrier: "DHL",
            trackingNumber: "3928428947291",
            timeline: [
                { stage: "Order Placed", date: "2026-04-20", completed: true, icon: "order" },
                { stage: "Payment Confirmed", date: "2026-04-20", completed: true, icon: "payment" },
                { stage: "Processing", date: "2026-04-21", completed: true, icon: "processing" },
                { stage: "Shipped", date: "2026-04-28", completed: false, icon: "shipped" },
                { stage: "Out for Delivery", date: "2026-05-07", completed: false, icon: "delivery" },
                { stage: "Delivered", date: "2026-05-07", completed: false, icon: "completed" }
            ],
            returnEligible: false,
            cancelable: true
        },
        {
            id: 4,
            orderNo: "ORD-001231",
            date: "2026-04-10",
            total: "$125.50",
            status: "delivered",
            estimatedDelivery: "2026-04-18",
            actualDelivery: "2026-04-18",
            items: [
                { name: "Screen Protector", quantity: 3, price: "$9.99" }
            ],
            paymentMethod: "Credit Card (****1234)",
            paymentStatus: "Paid",
            shippingAddress: "321 Oak Avenue, Boston, MA 02108",
            carrier: "FedEx",
            trackingNumber: "7894561230123",
            timeline: [
                { stage: "Order Placed", date: "2026-04-10", completed: true, icon: "order" },
                { stage: "Payment Confirmed", date: "2026-04-10", completed: true, icon: "payment" },
                { stage: "Processing", date: "2026-04-11", completed: true, icon: "processing" },
                { stage: "Shipped", date: "2026-04-13", completed: true, icon: "shipped" },
                { stage: "Out for Delivery", date: "2026-04-17", completed: true, icon: "delivery" },
                { stage: "Delivered", date: "2026-04-18", completed: true, icon: "completed" }
            ],
            returnEligible: true,
            cancelable: false,
            daysBeforeReturnExpires: 12
        },
        {
            id: 5,
            orderNo: "ORD-001230",
            date: "2026-04-05",
            total: "$349.99",
            status: "returned",
            estimatedDelivery: "2026-04-13",
            actualDelivery: "2026-04-12",
            items: [
                { name: "Wireless Speaker", quantity: 1, price: "$149.99" }
            ],
            paymentMethod: "Credit Card (****6789)",
            paymentStatus: "Refunded",
            shippingAddress: "654 Pine Lane, Seattle, WA 98101",
            carrier: "Amazon",
            trackingNumber: "AMZ987654321",
            timeline: [
                { stage: "Order Placed", date: "2026-04-05", completed: true, icon: "order" },
                { stage: "Payment Confirmed", date: "2026-04-05", completed: true, icon: "payment" },
                { stage: "Processing", date: "2026-04-06", completed: true, icon: "processing" },
                { stage: "Shipped", date: "2026-04-08", completed: true, icon: "shipped" },
                { stage: "Out for Delivery", date: "2026-04-11", completed: true, icon: "delivery" },
                { stage: "Delivered", date: "2026-04-12", completed: true, icon: "completed" },
                { stage: "Return Initiated", date: "2026-04-15", completed: true, icon: "return" },
                { stage: "Returned", date: "2026-04-22", completed: true, icon: "completed" }
            ],
            returnEligible: false,
            cancelable: false,
            refundAmount: "$349.99"
        }
    ]);

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items[0].name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedOrder(null);
    };

    const handleOpenReturn = (order) => {
        setSelectedOrder(order);
        setOpenReturn(true);
    };

    const handleCloseReturn = () => {
        setOpenReturn(false);
        setReturnReason("");
        setSelectedOrder(null);
    };

    const handleSubmitReturn = () => {
        console.log("Return submitted for:", selectedOrder.orderNo, "Reason:", returnReason);
        alert(`Return request submitted for order ${selectedOrder.orderNo}`);
        handleCloseReturn();
    };

    const handleCancel = (order) => {
        console.log("Order cancelled:", order.orderNo);
        alert(`Order ${order.orderNo} has been cancelled`);
    };

    const handleDownloadInvoice = (order) => {
        console.log("Downloading invoice for:", order.orderNo);
        alert(`Invoice downloaded for order ${order.orderNo}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-700";
            case "shipped":
                return "bg-blue-100 text-blue-700";
            case "processing":
                return "bg-yellow-100 text-yellow-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            case "returned":
                return "bg-purple-100 text-purple-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "delivered":
                return <MdCheckCircle className="text-green-600" />;
            case "shipped":
                return <TbTruck className="text-blue-600" />;
            case "processing":
                return <BsBox className="text-yellow-600" />;
            case "cancelled":
                return <MdCancel className="text-red-600" />;
            case "returned":
                return <GiReturn className="text-purple-600" />;
            default:
                return <BsBox className="text-gray-600" />;
        }
    };

    return (
        <section className="py-10 bg-[#f5f0f0] min-h-screen">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-[32px] font-[700] mb-2">My Orders</h1>
                    <p className="text-gray-600">Track and manage all your orders in one place</p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3">
                                <FiSearch className="text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search by Order ID or Product Name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent outline-none w-full text-[14px]"
                                />
                            </div>
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none"
                        >
                            <option value="all">All Orders</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="returned">Returned</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Orders Tabs Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        className="border-b border-gray-200 px-6"
                    >
                        <Tab label={`All Orders (${orders.length})`} />
                        <Tab label={`Active (${orders.filter(o => o.status !== 'delivered' && o.status !== 'returned').length})`} />
                        <Tab label={`Delivered (${orders.filter(o => o.status === 'delivered').length})`} />
                        <Tab label={`Returned (${orders.filter(o => o.status === 'returned').length})`} />
                    </Tabs>

                    <div className="p-6">
                        {/* All Orders Tab */}
                        {tabValue === 0 && (
                            <div className="space-y-4">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            onViewDetails={handleViewDetails}
                                            onReturn={handleOpenReturn}
                                            onCancel={handleCancel}
                                            onDownloadInvoice={handleDownloadInvoice}
                                            getStatusColor={getStatusColor}
                                            getStatusIcon={getStatusIcon}
                                            isExpanded={expandedOrderId === order.id}
                                            onToggleExpand={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <MdLocalShipping className="text-[48px] text-gray-300 mx-auto mb-4" />
                                        <p className="text-[16px] text-gray-600">No orders found</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Active Orders Tab */}
                        {tabValue === 1 && (
                            <div className="space-y-4">
                                {orders.filter(o => o.status !== 'delivered' && o.status !== 'returned').length > 0 ? (
                                    orders
                                        .filter(o => o.status !== 'delivered' && o.status !== 'returned')
                                        .map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                onViewDetails={handleViewDetails}
                                                onReturn={handleOpenReturn}
                                                onCancel={handleCancel}
                                                onDownloadInvoice={handleDownloadInvoice}
                                                getStatusColor={getStatusColor}
                                                getStatusIcon={getStatusIcon}
                                                isExpanded={expandedOrderId === order.id}
                                                onToggleExpand={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                                            />
                                        ))
                                ) : (
                                    <div className="text-center py-12">
                                        <TbTruck className="text-[48px] text-gray-300 mx-auto mb-4" />
                                        <p className="text-[16px] text-gray-600">No active orders</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Delivered Orders Tab */}
                        {tabValue === 2 && (
                            <div className="space-y-4">
                                {orders.filter(o => o.status === 'delivered').length > 0 ? (
                                    orders
                                        .filter(o => o.status === 'delivered')
                                        .map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                onViewDetails={handleViewDetails}
                                                onReturn={handleOpenReturn}
                                                onCancel={handleCancel}
                                                onDownloadInvoice={handleDownloadInvoice}
                                                getStatusColor={getStatusColor}
                                                getStatusIcon={getStatusIcon}
                                                isExpanded={expandedOrderId === order.id}
                                                onToggleExpand={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                                            />
                                        ))
                                ) : (
                                    <div className="text-center py-12">
                                        <MdCheckCircle className="text-[48px] text-gray-300 mx-auto mb-4" />
                                        <p className="text-[16px] text-gray-600">No delivered orders</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Returned Orders Tab */}
                        {tabValue === 3 && (
                            <div className="space-y-4">
                                {orders.filter(o => o.status === 'returned').length > 0 ? (
                                    orders
                                        .filter(o => o.status === 'returned')
                                        .map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                onViewDetails={handleViewDetails}
                                                onReturn={handleOpenReturn}
                                                onCancel={handleCancel}
                                                onDownloadInvoice={handleDownloadInvoice}
                                                getStatusColor={getStatusColor}
                                                getStatusIcon={getStatusIcon}
                                                isExpanded={expandedOrderId === order.id}
                                                onToggleExpand={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                                            />
                                        ))
                                ) : (
                                    <div className="text-center py-12">
                                        <GiReturn className="text-[48px] text-gray-300 mx-auto mb-4" />
                                        <p className="text-[16px] text-gray-600">No returned orders</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Details Dialog */}
            <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth maxWidth="md">
                <DialogTitle className="!text-[20px] !font-[700] flex justify-between items-center">
                    <span>Order Details</span>
                    <button onClick={handleCloseDetails} className="text-gray-600 hover:text-gray-900">
                        <FiX size={24} />
                    </button>
                </DialogTitle>
                <DialogContent className="!pt-4">
                    {selectedOrder && (
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex justify-between items-start border-b pb-4">
                                <div>
                                    <p className="text-[12px] text-gray-600 font-[600]">ORDER NUMBER</p>
                                    <p className="text-[18px] font-[700]">{selectedOrder.orderNo}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[12px] font-[600] ${getStatusColor(selectedOrder.status)}`}>
                                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                </span>
                            </div>

                            {/* Timeline */}
                            <div className="order-timeline">
                                <h3 className="text-[16px] font-[600] mb-4">Shipment Timeline</h3>
                                <div className="relative">
                                    {selectedOrder.timeline.map((item, index) => (
                                        <div key={index} className="flex gap-4 mb-4 relative">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-[700] text-white text-[12px] ${item.completed ? 'bg-[#ff5252]' : 'bg-gray-300'}`}>
                                                {item.completed ? '✓' : '○'}
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <p className="font-[600] text-[14px]">{item.stage}</p>
                                                <p className="text-[12px] text-gray-600">{item.date}</p>
                                            </div>
                                            {index < selectedOrder.timeline.length - 1 && (
                                                <div className="absolute left-3 top-8 w-0.5 h-12 bg-gray-300"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="border-t pt-4">
                                <h3 className="text-[16px] font-[600] mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b">
                                            <div>
                                                <p className="text-[14px] font-[600]">{item.name}</p>
                                                <p className="text-[12px] text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-[600]">{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                <div>
                                    <p className="text-[12px] text-gray-600 font-[600]">SHIPPING ADDRESS</p>
                                    <p className="text-[14px] mt-2">{selectedOrder.shippingAddress}</p>
                                </div>
                                <div>
                                    <p className="text-[12px] text-gray-600 font-[600]">TRACKING NUMBER</p>
                                    <p className="text-[14px] mt-2 font-mono">{selectedOrder.trackingNumber}</p>
                                    <p className="text-[12px] text-gray-600 mt-1">Carrier: {selectedOrder.carrier}</p>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span className="font-[600]">${selectedOrder.total.replace('$', '')}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span className="font-[600]">Free</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between">
                                    <span className="font-[600]">Total</span>
                                    <span className="text-[#ff5252] font-[700]">{selectedOrder.total}</span>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="border-t pt-4">
                                <p className="text-[12px] text-gray-600 font-[600]">PAYMENT METHOD</p>
                                <p className="text-[14px] mt-2">{selectedOrder.paymentMethod}</p>
                                <span className={`inline-block mt-2 px-2 py-1 rounded text-[11px] font-[600] ${selectedOrder.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {selectedOrder.paymentStatus}
                                </span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Return Order Dialog */}
            <Dialog open={openReturn} onClose={handleCloseReturn} fullWidth maxWidth="sm">
                <DialogTitle className="!text-[18px] !font-[600]">Return Order</DialogTitle>
                <DialogContent className="!pt-4">
                    {selectedOrder && (
                        <div className="space-y-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                <p className="text-[13px] text-amber-800">
                                    <strong>Note:</strong> You have {selectedOrder.daysBeforeReturnExpires} days left to return this order.
                                </p>
                            </div>

                            <div>
                                <p className="text-[12px] text-gray-600 font-[600] mb-2">ORDER ID</p>
                                <p className="text-[14px] font-[600]">{selectedOrder.orderNo}</p>
                            </div>

                            <div>
                                <p className="text-[12px] text-gray-600 font-[600] mb-2">ITEM(S)</p>
                                {selectedOrder.items.map((item, idx) => (
                                    <p key={idx} className="text-[14px]">
                                        {item.name} x {item.quantity}
                                    </p>
                                ))}
                            </div>

                            <TextField
                                fullWidth
                                label="Reason for Return"
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Please tell us why you want to return this order..."
                                value={returnReason}
                                onChange={(e) => setReturnReason(e.target.value)}
                            />

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-[13px] text-blue-800">
                                    <strong>Process:</strong> Once approved, we'll send you a prepaid return label. Expected refund: 5-7 business days after we receive your return.
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className="!p-4">
                    <Button onClick={handleCloseReturn}>Cancel</Button>
                    <Button
                        onClick={handleSubmitReturn}
                        variant="contained"
                        disabled={!returnReason.trim()}
                        className="!bg-[#ff5252]"
                    >
                        Submit Return Request
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

// Order Card Component
const OrderCard = ({
    order,
    onViewDetails,
    onReturn,
    onCancel,
    onDownloadInvoice,
    getStatusColor,
    getStatusIcon,
    isExpanded,
    onToggleExpand
}) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            {/* Card Header */}
            <div className="bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center">
                            {getStatusIcon(order.status)}
                        </div>
                        <div className="flex-1">
                            <p className="text-[12px] text-gray-600 font-[600]">Order ID</p>
                            <p className="text-[16px] font-[700]">{order.orderNo}</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-gray-600 font-[600]">Date</p>
                            <p className="text-[14px] font-[600]">{order.date}</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-gray-600 font-[600]">Total</p>
                            <p className="text-[16px] font-[700] text-[#ff5252]">{order.total}</p>
                        </div>
                        <div>
                            <span className={`px-3 py-1 rounded-full text-[12px] font-[600] ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>
                    </div>
                    <button onClick={onToggleExpand} className="ml-4 text-gray-600">
                        <FiChevronDown
                            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                    {/* Quick Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-[12px] text-gray-600 font-[600]">CARRIER</p>
                            <p className="text-[14px] mt-1">{order.carrier}</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-gray-600 font-[600]">TRACKING</p>
                            <p className="text-[13px] mt-1 font-mono text-[#ff5252]">{order.trackingNumber}</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-gray-600 font-[600]">EST. DELIVERY</p>
                            <p className="text-[14px] mt-1">{order.estimatedDelivery}</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-gray-600 font-[600]">ITEMS</p>
                            <p className="text-[14px] mt-1">{order.items.length} item(s)</p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-gray-50 rounded p-3">
                        <p className="text-[12px] font-[600] text-gray-600 mb-2">ORDER ITEMS</p>
                        <div className="space-y-2">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-[13px]">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span className="font-[600]">{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mini Timeline */}
                    <div>
                        <p className="text-[12px] font-[600] text-gray-600 mb-2">DELIVERY STATUS</p>
                        <div className="flex items-center gap-2 flex-wrap">
                            {order.timeline.slice(0, 3).map((stage, idx) => (
                                <div key={idx} className="flex items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-[700] text-white ${stage.completed ? 'bg-[#ff5252]' : 'bg-gray-300'}`}>
                                        {stage.completed ? '✓' : (idx + 1)}
                                    </div>
                                    {idx < 2 && <div className="w-4 h-0.5 bg-gray-300 mx-1"></div>}
                                </div>
                            ))}
                            {order.timeline.length > 3 && <span className="text-[12px] text-gray-600">...</span>}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t">
                        <Button
                            size="small"
                            onClick={() => onViewDetails(order)}
                            variant="outlined"
                            className="!text-[#ff5252] !border-[#ff5252]"
                        >
                            View Full Details
                        </Button>

                        {order.returnEligible && (
                            <Button
                                size="small"
                                onClick={() => onReturn(order)}
                                variant="outlined"
                                startIcon={<GiReturn />}
                                className="!text-blue-600 !border-blue-600"
                            >
                                Return Item
                            </Button>
                        )}

                        {order.cancelable && (
                            <Button
                                size="small"
                                onClick={() => onCancel(order)}
                                variant="outlined"
                                className="!text-red-600 !border-red-600"
                            >
                                Cancel Order
                            </Button>
                        )}

                        <Button
                            size="small"
                            onClick={() => onDownloadInvoice(order)}
                            startIcon={<FiDownload />}
                            variant="outlined"
                            className="!text-gray-600 !border-gray-300"
                        >
                            Invoice
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;