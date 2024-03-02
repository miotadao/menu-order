import React from 'react'

const SideBtns = (props: any) => {
  const handlebtn1 = () => {
    if (props.subShow === 0) {
      props.setSubShow(1);
    }
  }

  const handlebtn2 = () => {
    if (props.subShow === 0) {
      props.setSubShow(2);
      props.setIsCall(true);
    }
  }

  const handlebtn3 = () => {
    if (props.subShow === 0) {
      props.setSubShow(3);
      props.setIsBill(true);
    }
  }

  return (
    <div className='side-btns'>
      <button onClick={handlebtn1}>注文履歴</button>
      <button onClick={handlebtn2}>呼び出し</button>
      <button onClick={handlebtn3}>会計</button>
    </div>
  )
}

export default SideBtns
