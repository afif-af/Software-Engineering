import React from 'react'
import Title from "../components/Title"
import {assets} from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
       <Title text1={"ABOUT"} text2={"US"}/>
      
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aut,
            nisi suscipit tempore exercitationem quaerat accusantium deserunt
            provident molestiae voluptates iste consequuntur unde sint esse
            corporis architecto, quia temporibus reprehenderit cum? Consectetur
            dolores enim fugiat neque necessitatibus, deleniti a, omnis
            voluptate voluptatem facere libero distinctio.
            
          </p>

          <p>
             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            officia iste corrupti deserunt, deleniti, quia harum eaque eveniet
            labore beatae dignissimos placeat vero! Adipisci ipsam qui, odio
            sunt illum sed voluptate atque est deserunt, eius, ipsum recusandae
            necessitatibus asperiores rerum harum nihil ipsa ut amet earum
            distinctio nobis minus dolorum.
          </p>

          <b className='text-gray-800'>Our Mission</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            officia iste corrupti deserunt, deleniti, quia harum eaque eveniet
            labore beatae dignissimos placeat vero! Adipisci ipsam qui, odio
            sunt illum sed voluptate atque est deserunt, eius, ipsum recusandae
            necessitatibus asperiores rerum harum nihil ipsa ut amet earum
            distinctio nobis minus dolorum.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>

      <div className='flex flex-col md:flex-row tex-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            rem consequuntur. Ducimus eveniet sint officiis consequatur?
          </p>

        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            rem consequuntur. Ducimus eveniet sint officiis consequatur?
          </p>

        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            rem consequuntur. Ducimus eveniet sint officiis consequatur?
          </p>

        </div>
      </div>

      <NewsLetterBox/>

    </div>
  )
}

export default About