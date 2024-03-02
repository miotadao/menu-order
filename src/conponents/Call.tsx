import React from 'react'

const Call = (props: any) => {
  return (
    <div className='call-container'>
      <div className='calling'>
        <h2>呼出</h2>
        <ul>
          <li className={props.isCall? "" : "hide"}>{props.seatSymbol}</li>
        </ul>
      </div>
      <div className='accounting'>
        <h2 >会計</h2>
        <ul>
          <li className={props.isBill? "" : "hide"}>{props.seatSymbol}</li>
        </ul>
      </div>
    </div>
  )
}

export default Call
