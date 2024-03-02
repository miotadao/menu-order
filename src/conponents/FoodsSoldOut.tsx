import React, { useState } from 'react'

const FoodsSoldOut = (props: any) => {
  const handlePage = () => {
    props.setDisplay(0);
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

  const handleFood = (e: any, name: string) => {
    props.setBordNum("");
    props.setNumBordShow(true);
    props.setSelectFoodName(name);
  }

  const close = () => {
    props.setNumBordShow(false);
    props.setBordNum("");
  }


  return (
    <div className={`f-s-o ${props.display === props.pageNum ? "" : "hide"}`}>
      <div className={`mask ${props.numBordShow ? "" : "hide"}`} onClick={close}></div>
      <button onClick={handlePage}>トップ画面</button>
      <h1>{props.title}</h1>
      <div className='fso-top-container'>
        <p>残数</p>
        <p>売切</p>
      </div>
      <ul>
        {props.thisPageFoods.map((thisPageFood: Food, index: number) => {
          return <li key={index} onClick={(e) => handleFood(e, thisPageFood.name)}>
            <p>{thisPageFood.name}</p>
            <p>{Number.isNaN(thisPageFood.remaining) ? "" : `${thisPageFood.remaining}`}</p>
            <p>{thisPageFood.remaining === 0 ? "●" : ""}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default FoodsSoldOut
