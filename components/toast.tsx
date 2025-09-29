import React from 'react';

type ToastProps = {
    text: string,
};

const Toast = ({ text } : ToastProps) => {
  return (
    <div className='fixed bottom-5 right-5 border border-gray-700 rounded-lg flex flex-col px-4 py-2'>
        <h1 className='font-display text-green-500 text-lg'>CodeCoach</h1>
        <p className='font-sans text-white text-md'>{text}</p>
    </div>
  )
}

export default Toast