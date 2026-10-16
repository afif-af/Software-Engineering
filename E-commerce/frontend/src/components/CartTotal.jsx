import React, {useContext} from 'react'
import Title from "./Title";
import {ShopContext} from "../context/ShopContext";


const CartTotal = ({ subtotal }) => {
  const {currency, delivery_fee, getCartAmount}=useContext(ShopContext);
  const cartSubtotal = subtotal ?? getCartAmount();

  return (
    <div className='w-full'>
       <div className='text-2xl'>
        <Title text1={"CART"} text2={"TOTAL"}/>

       </div>

       <div className='flex flex-col gap-2 wt-2 text-sm'>
        <div className='flex justify-between'>
          <p>SubTotal</p>
          <p>
            {currency}
            {cartSubtotal}.00
          </p>
        </div>
        <hr/>
        <div className='flex justify-between'>
          <p>Shiping fee</p>
          <p>{currency}
            {delivery_fee}.00
          </p>

          
        </div>
        <hr/>
        <div className='flex justify-between'>
          <b> Total</b>
          <b>{currency}
            {cartSubtotal==0? "0":cartSubtotal +delivery_fee}.00
          </b>
        </div>
       </div>
       
    </div>
  )
}

export default CartTotal
