import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const emptyProfile = { name: '', email: '', phone: '', street: '', city: '', state: '', zipcode: '', country: '' }

const Profile = () => {
  const { token, setToken, navigate, backendUrl, userInfo, setUserInfo } = useContext(ShopContext)
  const [formData, setFormData] = useState(emptyProfile)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!userInfo) return
    setFormData({
      name: userInfo.name || '', email: userInfo.email || '', phone: userInfo.phone || '',
      street: userInfo.address?.street || '', city: userInfo.address?.city || '',
      state: userInfo.address?.state || '', zipcode: userInfo.address?.zipcode || '',
      country: userInfo.address?.country || ''
    })
  }, [userInfo])

  const onChange = (event) => setFormData((data) => ({ ...data, [event.target.name]: event.target.value }))

  const saveProfile = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const { name, email, phone, ...address } = formData
      const response = await axios.put(`${backendUrl}/api/user/profile`, { name, email, phone, address }, { headers: { token } })
      if (!response.data.success) return toast.error(response.data.message)
      setUserInfo(response.data.user)
      setEditing(false)
      toast.success('Profile saved')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setSaving(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem('token')
    setToken('')
    setUserInfo(null)
    navigate('/login')
  }

  const fields = [
    ['name', 'Full name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone number', 'tel'],
    ['street', 'Street address', 'text'], ['city', 'City', 'text'], ['state', 'State / Division', 'text'],
    ['zipcode', 'Postal code', 'text'], ['country', 'Country', 'text']
  ]

  return (
    <main className="border-t border-gray-200 pb-20 pt-10 sm:pt-14">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-gray-500">Your account</p><h1 className="prata-regular text-3xl text-gray-900 sm:text-4xl">My profile</h1></div>
        <p className="text-sm text-gray-500">Manage your personal details and orders</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
        <aside className="h-fit overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="bg-[#f7f5f1] px-6 py-7"><div className="flex items-center gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xl text-white">{userInfo?.name?.charAt(0)?.toUpperCase() || 'U'}</div><div className="min-w-0"><p className="truncate font-medium text-gray-900">{userInfo?.name || 'Your account'}</p><p className="mt-1 truncate text-xs text-gray-500">{userInfo?.email || 'Sign in to view your details'}</p></div></div></div>
          <nav className="p-3" aria-label="Account navigation">
            <div className="flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white"><span className="w-5 text-center">P</span><span>Profile details</span></div>
            <Link to="/orders" className="mt-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"><span className="w-5 text-center">O</span><span>My orders</span><span className="ml-auto">&gt;</span></Link>
            <Link to="/cart" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"><span className="w-5 text-center">B</span><span>Shopping bag</span><span className="ml-auto">&gt;</span></Link>
            {token && <button onClick={signOut} className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-700"><span className="w-5 text-center">S</span><span>Sign out</span></button>}
          </nav>
        </aside>

        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-6"><div><h2 className="text-lg font-medium text-gray-900">Personal information</h2><p className="mt-1 text-sm text-gray-500">Saved details are used to prefill your checkout.</p></div>{token && <button type="button" onClick={() => setEditing(!editing)} className="w-fit border border-gray-300 px-5 py-2 text-sm transition hover:border-gray-900 hover:bg-gray-900 hover:text-white">{editing ? 'Cancel' : 'Edit profile'}</button>}</div>
          {token ? <form onSubmit={saveProfile}>
            <div className="grid gap-x-8 gap-y-6 px-5 py-7 sm:grid-cols-2 sm:px-8 sm:py-8">
              {fields.map(([name, label, type]) => <label key={name} className="block text-sm text-gray-500">{label}<input name={name} type={type} required={name === 'name' || name === 'email'} disabled={!editing} value={formData[name]} onChange={onChange} placeholder={`Add your ${label.toLowerCase()}`} className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-700 disabled:bg-gray-50" /></label>)}
            </div>
            {editing && <div className="flex justify-end px-5 pb-6 sm:px-8"><button disabled={saving} className="bg-gray-900 px-6 py-3 text-sm text-white transition hover:bg-gray-700 disabled:opacity-60">{saving ? 'Saving...' : 'Save changes'}</button></div>}
          </form> : <div className="mx-5 my-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:mx-8">Sign in to connect this profile to your account. <Link to="/login" className="font-medium underline">Sign in</Link></div>}
          <div className="mx-5 mb-5 flex flex-col gap-4 rounded-lg bg-[#f7f5f1] p-5 sm:mx-8 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><p className="font-medium text-gray-900">Ready for your next order?</p><p className="mt-1 text-sm text-gray-500">Explore the latest pieces in our collection.</p></div><Link to="/collection" className="inline-flex w-fit items-center gap-2 bg-gray-900 px-5 py-3 text-sm text-white transition hover:bg-gray-700">Explore collection <span>&gt;</span></Link></div>
        </section>
      </div>
    </main>
  )
}

export default Profile
