import React from 'react'

const SelectScreen = (props: any) => {

  type selectFood = {
    name: string;
    num: number;
    price: number;
    remaining: number;
    genre: "rice" | "soup" | "main" | "side" | "dessert" | "drink";
    seat: "A" | "B" | "C";
  }

const confirm = () => {
  if (props.selectFoods.length > 0) {
    props.setSubShow(4);
  }
}


  return (
    <div className='select-screen'>
      <h3>選択中</h3>
      <ul className='select-list'>
        {props.selectFoods.map((selectFood: selectFood, index: number) => {
          return <li key={index}>
            <p>{selectFood.name}</p>
            <div>
              <input
                type="number"
                min={1}
                max={10}
                value={selectFood.num}
                onChange={(e) => props.handlenum(e, selectFood.name)}
              />
              <button onClick={(e) => props.handleDelete(e, selectFood.name)}>削</button>
            </div>
          </li>
        })}

      </ul>
      <p className='total-amount'>合計：{props.result}円</p>
      <button className='confirm' onClick={confirm}>注文</button>
    </div>
  )
}

export default SelectScreen
