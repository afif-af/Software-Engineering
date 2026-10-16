import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import Bkash from '../assets/BKashLogo.png'

import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || {};
  const { backendUrl, token, userInfo, cartItems, setCartItems, delivery_fee, products } = useContext(ShopContext);
  const hasSelectedItems = Object.values(selectedItems).some((sizes) => Object.values(sizes || {}).some(Boolean));
  const [method, setMethod] = useState('bkash');

  useEffect(() => {
    if (!hasSelectedItems) {
      toast.error('Select at least one cart item to checkout');
      navigate('/cart', { replace: true });
    }
  }, [hasSelectedItems, navigate]);

  const selectedSubtotal = Object.entries(selectedItems).reduce((total, [itemId, sizes]) => {
    const product = products.find((item) => item._id === itemId);
    if (!product) return total;
    return total + Object.keys(sizes || {}).reduce((sum, size) => (
      sizes[size] && cartItems[itemId]?.[size] > 0
        ? sum + product.price * cartItems[itemId][size]
        : sum
    ), 0);
  }, 0);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: ''
  });

  useEffect(() => {
    if (!userInfo) return;
    const nameParts = (userInfo.name || '').trim().split(/\s+/);
    setFormData((current) => ({
      ...current,
      firstName: nameParts[0] || current.firstName,
      lastName: nameParts.slice(1).join(' ') || current.lastName,
      email: userInfo.email || current.email,
      phone: userInfo.phone || userInfo.address?.phone || current.phone,
      street: userInfo.address?.street || current.street,
      city: userInfo.address?.city || current.city,
      state: userInfo.address?.state || current.state,
      zipcode: userInfo.address?.zipcode || current.zipcode,
      country: userInfo.address?.country || current.country
    }));
  }, [userInfo]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (!hasSelectedItems) {
      toast.error('Select at least one cart item to checkout');
      navigate('/cart');
      return;
    }

    const orderItems = [];
    Object.entries(selectedItems).forEach(([itemId, sizes]) => {
      Object.keys(sizes || {}).forEach((size) => {
        const quantity = cartItems[itemId]?.[size];
        const product = products.find((item) => item._id === itemId);
        if (sizes[size] && quantity > 0 && product) {
          orderItems.push({ ...structuredClone(product), size, quantity });
        }
      });
    });

    if (orderItems.length === 0) {
      toast.error("The selected cart items are no longer available");
      navigate("/cart");
      return;
    }
    let orderData = {
      address: formData,
      items: orderItems,
      amount: selectedSubtotal + delivery_fee,
    };

    switch (method) {
      case "bkash": {
        for (const item of orderItems) {
          const cartResponse = await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId: item._id, size: item.size, quantity: item.quantity },
            { headers: { token } }
          );
          if (!cartResponse.data.success) {
            throw new Error(cartResponse.data.message || "Could not sync the selected cart item");
          }
        }
        const response = await axios.post(
          `${backendUrl}/api/order/bkash`,
          orderData,
          {
            headers: {
              token,
            },
          }
        );

        if (response.data.success) {
          window.location.href = response.data.bkashURL;

        } else {

          toast.error(
            response.data.message || "bKash payment failed"
          );
        }

        break;
      }
      case "cod": {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          {
            headers: {
              token,
            },
          }
        );

        if (response.data.success) {
          const remainingCart = structuredClone(cartItems);
          Object.entries(selectedItems).forEach(([itemId, sizes]) => {
            Object.keys(sizes || {}).forEach((size) => {
              if (sizes[size] && remainingCart[itemId]) delete remainingCart[itemId][size];
            });
            if (remainingCart[itemId] && Object.keys(remainingCart[itemId]).length === 0) delete remainingCart[itemId];
          });
          setCartItems(remainingCart);
          navigate("/orders");

        } else {
          toast.error(
            response.data.message || "Order placement failed"
          );
        }

        break;
      }
      default:
        toast.error("Please select a payment method");
        break;
    }

  } catch (error) {

    console.error("Payment/Order Error:", error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }
};


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal subtotal={selectedSubtotal} />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('bkash')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'bkash' ? 'bg-green-400' : ''}`}></p>
              <img className={`h-5 mx-4`} src={Bkash} alt="bkash" />
            </div>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;



