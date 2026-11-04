import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Error = () => {
  const router = useRouter()
  return (
    <div className=' flex items-center py-10 justify-center flex-col'>
    <div>
      <Image 
        src={"/assets/ERROR.png"}
        width={500}
        height={500}
        alt='success'
        className='w-[200px] h-full'
      />
    </div>
    <div className=''>
      <h2 className=' text-[40px] font-bold'>Your payment failed! Please try again </h2>
    </div>
    <div className=' mt-7'>
      <button onClick={()=>router.push("/user/dashboard")} className=' bg-primary text-white py-3 px-8 rounded-lg'>Go to Dashboard</button>
    </div>
  </div>
  )
}

export default Error