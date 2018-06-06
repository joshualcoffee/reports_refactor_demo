import React from 'react';
import Loader from 'COMMON/components/LoadingWrapper/InlineLoader';
export default function TabTitle({
  subText,
  title,
  color,
  isLoading
}){
  if (isLoading) {
    return (
      <Loader isLoading={true} />
    )
  }
  return(
    <div>
      <div className='tab-title-container'>
        <span className='color-dot' style={{ backgroundColor: color }}></span>
        <span className='tab-title'>{title}</span>
        <span className='m-l-1-sm tab-tooltip'>
          <span className='print-hidden'>
            <span className='icon-rl-info'></span>
          </span>
        </span>
      </div>
      <div className='tab-subtitle' style={{ color: color }}>
        {subText}
      </div>
    </div>
  )
}
