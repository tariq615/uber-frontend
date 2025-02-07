import React from 'react'
import Information from './ui_components/information'

const WaitingForDriver =  ({img, setWaitingForDriverPanel, pickup, destination, fare, ride}) => {
    return (
      <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
          setWaitingForDriverPanel(false)
        }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
  
        <div className='flex items-center justify-between'>
          <img className='h-12' src={img} alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{`${ride?.captain.fullname.firstname} ${ride?.captain.fullname.lastname}`}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Suzuki Alto</p>
            <h1 className='text-lg font-semibold'> OTP {ride?.otp} </h1>
          </div>
        </div>
  
        <Information 
        pickup={pickup}
        destination={destination}
        fare={fare}
        currency={"Rs."}
        />
      </div>
    )
}

export default WaitingForDriver