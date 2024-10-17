import React from 'react';

const analyticButton = ({ imgSrc, title, number ,bgColor }) => {
  return (
    <div  className={`flex items-center space-x-2 p-3 text-white rounded-[23px] m-3 ml-1 w-36 ${bgColor}`}>
      {imgSrc && <img src={imgSrc} alt={title} className="h-9 w-9" />}
        <div className='flex flex-col text-center'>
            {number != null && <span className="px-2 text-xl font-semibold">{number}</span>}
            <span className='text-sm'>{title}</span>
        </div>
      
    </div>
  );
};

export default analyticButton;
