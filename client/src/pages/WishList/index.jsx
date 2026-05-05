import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { FiTrash2, FiShare2, FiFilter } from "react-icons/fi";
import { BiSolidHeart, BiHeart } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import "./style.css";

const WishList = () => {
    const [sortBy, setSortBy] = useState('newest');
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Sample wishlist data
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "Wireless Noise-Cancelling Headphones",
            price: 149.99,
            originalPrice: 199.99,
            category: "Electronics",
            image: "https://via.placeholder.com/200x200?text=Headphones",
            rating: 4.5,
            reviews: 128,
            inStock: true,
            addedDate: "2026-04-28",
            discount: 25
        },
        {
            id: 2,
            name: "Premium Laptop Stand",
            price: 49.99,
            originalPrice: 69.99,
            category: "Office",
            image: "https://via.placeholder.com/200x200?text=LaptopStand",
            rating: 4.2,
            reviews: 87,
            inStock: true,
            addedDate: "2026-04-25",
            discount: 28
        },
        {
            id: 3,
            name: "4K Webcam with Microphone",
            price: 89.99,
            originalPrice: 129.99,
            category: "Electronics",
            image: "https://via.placeholder.com/200x200?text=Webcam",
            rating: 4.7,
            reviews: 256,
            inStock: true,
            addedDate: "2026-04-20",
            discount: 30
        },
        {
            id: 4,
            name: "Mechanical Keyboard RGB",
            price: 119.99,
            originalPrice: 159.99,
            category: "Office",
            image: "https://via.placeholder.com/200x200?text=Keyboard",
            rating: 4.8,
            reviews: 342,
            inStock: false,
            addedDate: "2026-04-15",
            discount: 25
        },
        {
            id: 5,
            name: "USB-C Hub Multi-Port",
            price: 39.99,
            originalPrice: 59.99,
            category: "Accessories",
            image: "https://via.placeholder.com/200x200?text=USBHub",
            rating: 4.4,
            reviews: 156,
            inStock: true,
            addedDate: "2026-04-10",
            discount: 33
        },
        {
            id: 6,
            name: "Phone Screen Protector Pack",
            price: 12.99,
            originalPrice: 19.99,
            category: "Accessories",
            image: "https://via.placeholder.com/200x200?text=ScreenProtector",
            rating: 4.1,
            reviews: 89,
            inStock: true,
            addedDate: "2026-04-05",
            discount: 35
        }
    ]);

    const handleRemoveFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    const handleAddToCart = (item) => {
        console.log("Added to cart:", item);
        // Add to cart logic here
    };

    const handleShareClick = (item) => {
        setSelectedItem(item);
        setOpenShareDialog(true);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    // Filter and sort items
    const getFilteredAndSortedItems = () => {
        let filtered = wishlistItems.filter(item => {
            const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Sort items
        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        } else if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    };

    const filteredItems = getFilteredAndSortedItems();
    const categories = ['Electronics', 'Office', 'Accessories'];
    const totalSavings = wishlistItems.reduce((acc, item) => acc + (item.originalPrice - item.price), 0);

    return (
        <section className="py-10 bg-[#f5f0f0] min-h-screen">
            <div className="container">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <BiSolidHeart className="text-[#ff5252] text-[32px]" />
                        <h1 className="text-[32px] font-[700]">My Wishlist</h1>
                    </div>
                    <p className="text-gray-600 text-[16px]">
                        You have <span className="font-[600] text-[#ff5252]">{wishlistItems.length}</span> items in your wishlist
                    </p>
                </div>

                {wishlistItems.length > 0 ? (
                    <>
                        {/* Savings Card */}
                        <div className="bg-gradient-to-r from-[#ff5252] to-[#ff7575] rounded-lg p-6 mb-8 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[14px] opacity-90">Total Potential Savings</p>
                                    <p className="text-[32px] font-[700]">${totalSavings.toFixed(2)}</p>
                                </div>
                                <AiOutlineShopping className="text-[48px] opacity-30" />
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Search */}
                                <TextField
                                    fullWidth
                                    placeholder="Search wishlist..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />

                                {/* Category Filter */}
                                <FormControl fullWidth size="small">
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={filterCategory}
                                        onChange={handleFilterChange}
                                        label="Category"
                                    >
                                        <MenuItem value="all">All Categories</MenuItem>
                                        {categories.map(cat => (
                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Sort By */}
                                <FormControl fullWidth size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="newest">Newest First</MenuItem>
                                        <MenuItem value="price-low">Price: Low to High</MenuItem>
                                        <MenuItem value="price-high">Price: High to Low</MenuItem>
                                        <MenuItem value="rating">Highest Rated</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Clear All Button */}
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="!border-gray-300 !text-gray-600 !hover:bg-gray-50"
                                    onClick={() => {
                                        setSortBy('newest');
                                        setFilterCategory('all');
                                        setSearchTerm('');
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        </div>

                        {/* Wishlist Items Grid */}
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="wishlist-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                                    >
                                        {/* Product Image */}
                                        <div className="relative overflow-hidden bg-gray-100 h-[200px]">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                            />

                                            {/* Discount Badge */}
                                            {item.discount > 0 && (
                                                <div className="absolute top-3 right-3 bg-[#ff5252] text-white px-3 py-1 rounded-full text-[12px] font-[600]">
                                                    -{item.discount}%
                                                </div>
                                            )}

                                            {/* Stock Status */}
                                            {!item.inStock && (
                                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                                    <span className="bg-red-500 text-white px-4 py-2 rounded-md font-[600]">
                                                        Out of Stock
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <p className="text-[12px] text-gray-500 font-[600] mb-2">
                                                {item.category}
                                            </p>

                                            <h3 className="text-[16px] font-[600] mb-2 line-clamp-2">
                                                {item.name}
                                            </h3>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i}>
                                                            {i < Math.floor(item.rating) ? '★' : '☆'}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-[12px] text-gray-600">
                                                    ({item.reviews})
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-[20px] font-[700] text-[#ff5252]">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                <span className="text-[14px] text-gray-500 line-through">
                                                    ${item.originalPrice.toFixed(2)}
                                                </span>
                                                <span className="text-[12px] text-green-600 font-[600]">
                                                    Save ${(item.originalPrice - item.price).toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    className="!bg-[#ff5252] !text-white !py-2"
                                                    onClick={() => handleAddToCart(item)}
                                                    disabled={!item.inStock}
                                                    startIcon={<BsCart3 />}
                                                >
                                                    Add to Cart
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    className="!text-gray-600 !border-gray-300 !p-2"
                                                    onClick={() => handleShareClick(item)}
                                                    title="Share"
                                                >
                                                    <FiShare2 />
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    className="!text-red-600 !border-red-300 !p-2"
                                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                                    title="Remove from Wishlist"
                                                >
                                                    <FiTrash2 />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <AiOutlineShopping className="text-[64px] text-gray-300 mx-auto mb-4" />
                                <p className="text-[18px] text-gray-600 font-[500] mb-2">
                                    No items match your filters
                                </p>
                                <p className="text-[14px] text-gray-500 mb-6">
                                    Try adjusting your search or filter options
                                </p>
                                <Button
                                    variant="contained"
                                    className="!bg-[#ff5252] !text-white"
                                    onClick={() => {
                                        setSortBy('newest');
                                        setFilterCategory('all');
                                        setSearchTerm('');
                                    }}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}

                        {/* Bottom Section with Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                <p className="text-gray-600 text-[14px] mb-2">Items in Wishlist</p>
                                <p className="text-[32px] font-[700] text-[#ff5252]">
                                    {wishlistItems.length}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                <p className="text-gray-600 text-[14px] mb-2">In Stock Items</p>
                                <p className="text-[32px] font-[700] text-green-600">
                                    {wishlistItems.filter(i => i.inStock).length}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                <p className="text-gray-600 text-[14px] mb-2">Total Value</p>
                                <p className="text-[32px] font-[700] text-blue-600">
                                    ${wishlistItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    // Empty Wishlist State
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <BiHeart className="text-[80px] text-gray-300 mx-auto mb-4" />
                        <h2 className="text-[24px] font-[700] text-gray-600 mb-2">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-[16px] text-gray-500 mb-8">
                            Start adding items to your wishlist by clicking the heart icon on products!
                        </p>
                        <Button
                            variant="contained"
                            size="large"
                            className="!bg-[#ff5252] !text-white !px-8 !py-3"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                )}
            </div>

            {/* Share Dialog */}
            <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle className="!text-[18px] !font-[600]">
                    Share Item
                </DialogTitle>
                <DialogContent className="!pt-6">
                    {selectedItem && (
                        <div>
                            <div className="flex gap-4 mb-6">
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                    <p className="font-[600] text-[14px]">{selectedItem.name}</p>
                                    <p className="text-[#ff5252] font-[700] mt-2">
                                        ${selectedItem.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[14px] text-gray-600 font-[600] mb-4">Share via:</p>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="!justify-start !text-gray-600 !border-gray-300"
                                >
                                    📧 Email
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="!justify-start !text-blue-600 !border-blue-300"
                                >
                                    f Facebook
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="!justify-start !text-cyan-400 !border-cyan-300"
                                >
                                    𝕏 Twitter
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="!justify-start !text-green-600 !border-green-300"
                                >
                                    💬 WhatsApp
                                </Button>

                                <TextField
                                    fullWidth
                                    label="Wishlist Link"
                                    value={`${window.location.origin}/wishlist?item=${selectedItem.id}`}
                                    variant="outlined"
                                    size="small"
                                    readOnly
                                    className="!mt-4"
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className="!p-4">
                    <Button onClick={() => setOpenShareDialog(false)}>Close</Button>
                    <Button
                        variant="contained"
                        className="!bg-[#ff5252]"
                        onClick={() => {
                            // Copy to clipboard
                            navigator.clipboard.writeText(
                                `${window.location.origin}/wishlist?item=${selectedItem.id}`
                            );
                            setOpenShareDialog(false);
                        }}
                    >
                        Copy Link
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default WishList;