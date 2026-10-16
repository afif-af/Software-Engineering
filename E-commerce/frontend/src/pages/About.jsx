
import React from 'react'
import Title from "../components/Title"
import { assets } from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about_img}
          alt='About Forever'
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to Forever, your destination for modern fashion and
            everyday style. We offer a carefully selected collection of
            clothing designed to help you look confident and feel comfortable
            every day.
          </p>

          <p>
            From timeless essentials to the latest fashion trends, our
            collection is created for different styles, occasions, and
            preferences. We focus on quality products, affordable prices,
            and a simple shopping experience for every customer.
          </p>

          <b className='text-gray-800'>Our Mission</b>

          <p>
            Our mission is to make fashion accessible, convenient, and
            enjoyable for everyone. We continuously work to improve our
            products and services while providing a reliable and customer-
            friendly online shopping experience.
          </p>

        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

      
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-800'>Quality Assurance</b>

          <p className='text-gray-600'>
            We carefully select our products and focus on quality, comfort,
            and durability so you can shop with confidence.
          </p>
        </div>

        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-800'>Convenience</b>

          <p className='text-gray-600'>
            Browse our collection, choose your favorite products, and place
            your order from anywhere with a simple and convenient shopping
            experience.
          </p>
        </div>

       
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-800'>Exceptional Customer Service</b>

          <p className='text-gray-600'>
            Our goal is to provide helpful and friendly support throughout
            your shopping journey, from product selection to order delivery.
          </p>
        </div>

      </div>

      
      <NewsLetterBox />

    </div>
  )
}

export default About

