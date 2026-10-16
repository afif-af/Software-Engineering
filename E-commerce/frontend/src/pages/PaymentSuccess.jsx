import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const PaymentSuccess = () => {
  const { backendUrl, token, navigate, setCartItems } = useContext(ShopContext)
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verified') !== '1') {
      navigate('/payment-failed', { replace: true })
      return
    }
    setVerified(true)
    const sessionToken = token || localStorage.getItem('token')
    if (!sessionToken) {
      setLoading(false)
      return
    }

    axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token: sessionToken } })
      .then((response) => {
        if (response.data.success) {
          setCartItems(response.data.cartData ?? response.data.message ?? {})
        }
      })
      .catch((error) => console.error('Could not refresh cart after payment:', error))
      .finally(() => setLoading(false))
  }, [backendUrl, navigate, setCartItems, token])

  if (loading) {
    return <div className="flex min-h-[400px] flex-col items-center justify-center"><h2 className="text-2xl">Confirming your payment...</h2><p className="mt-2 text-gray-500">Please wait.</p></div>
  }

  if (!verified) return null

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className="text-5xl text-green-600">&#10003;</div>
      <h1 className="mt-4 text-3xl font-bold">Payment Successful</h1>
      <p className="mt-2 text-gray-500">Your bKash payment was completed successfully.</p>
      <button onClick={() => navigate('/orders')} className="mt-6 rounded bg-black px-6 py-3 text-white">View My Orders</button>
    </div>
  )
}

export default PaymentSuccess
