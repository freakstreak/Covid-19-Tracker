import React from 'react'

const Card = (props) => {
  return (
    <div className={`card ${props.styleName}`}>
        {props.children}
    </div>
  )
}

export default Card