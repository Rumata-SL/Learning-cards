import React from 'react'

import e from './ErrorComponent.module.css'

export const ErrorComponent = () => {
  return (
    <div className={e.wrapper}>
      <div className={e.title}>
        <span>404</span>
      </div>
      <div className={e.text}>
        <span>NOT FOUND</span>
      </div>
    </div>
  )
}
