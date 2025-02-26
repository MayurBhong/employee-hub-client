import React from 'react'

const SummaryCard = ({icon, text, number, color}) => {
    return (
        <div className='rounded flex bg-white'>
            <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}>
                {icon}
            </div>
            <div className='p-4 py-1'>
                <p className='text-1g font-semibold'>{text}</p>
                <p className='text-x1 font-bold'>{number}</p>
            </div>
        </div>
    )
}

export default SummaryCard