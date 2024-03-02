import { log } from 'console';
import React from 'react'

const NumBord = (props: any) => {

  const close = () => {
    props.setNumBordShow(false);
    props.setBordNum("");
  }

  const nums:string[] = ["1","2","3","4","5","6","7","8","9"];


  
  const handleNum = (e: any, num: string) => {  
    if (props.bordNum === undefined) {
      props.setBordNum(num);
    } else {
      props.setBordNum(props.bordNum + num);
    }
  }

  const deleteNum = () => {
    props.setBordNum(props.bordNum.slice(0, -1));
  }

  const soldOut = () => {
    props.setBordNum(0);
  }

  type Food = {
    genre: "rice" | "soup" | "main" | "side" | "dessert" | "drink";
    name: string;
    img: string;
    price: number;
    remaining: number;
    isRecommended: boolean;
    select: boolean;
  }
  const confirm = () => {
    const newFoods = props.foods.map((food: Food) => {
      if (props.selectFoodName === food.name) {
        food.remaining = props.bordNum;
      }
      return food;
    });
    props.setFoods(newFoods);
    props.setNumBordShow(false);
  }

  return (
    <div className={`num-bord ${props.numBordShow ? "num-show" : ""}`}>
      {/* <h2>残り: {props.bordNum}</h2> */}
      <h2>{props.bordNum === 0 ? "売切" : `残り: ${props.bordNum}`}</h2>
      <button className='cancel' onClick={close}>キャンセル</button>
      <div className='key-container'>
        <div className='nums'>
          {nums.map((num: string, index: number) => {
            return <span key={index} onClick={(e) => handleNum (e, num)}>{num}</span>
          })}
        </div>
        <div className='num-side-btns'>
          <button onClick={deleteNum}>削除</button>
          <button onClick={soldOut}>売切</button>
          <button onClick={confirm} className="num-confirm">確定</button>
        </div>
      </div>
    </div>
  )
}

export default NumBord
