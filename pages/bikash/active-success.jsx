import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Success = () => {
  const router = useRouter()

  return (
    <div className=' flex items-center py-10 justify-center flex-col'>
      <div>
        <Image 
          src={"/assets/success.png"}
          width={500}
          height={500}
          alt='success'
          className='w-[200px] h-full'
        />
      </div>
      <div className=''>
        <h2 className=' text-[40px] font-bold'>Your Account  Successfully Active</h2>
      </div>
      <div className=' mt-7'>
        <button onClick={()=>router.push("/user/dashboard")} className=' bg-primary text-white py-3 px-8 rounded-lg'>View Account</button>
      </div>
    </div>
  )
}

export default Success