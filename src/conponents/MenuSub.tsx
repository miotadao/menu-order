import React, { useState } from 'react'

const MenuSub = (props: any) => {

  const [really, setReally] = useState<boolean>(false);

  const OK = () => {
    setReally(true);
  }

  const close = () => {
    props.setSubShow(0);
  }

  const cancel = () => {
    props.setIsCall(false);
    props.setIsBill(false);
    props.setSubShow(0);
    setReally(false);
  }

  // 合計額
  const totals: number[] = [];
  props.orderHistorys.forEach((orderHistory: orderHistory) => {
    const total = orderHistory.price * orderHistory.num;
    totals.push(total);
  });

  let result = totals.reduce(function (sum, element) {
    return sum + element;
  }, 0);

 
  // 注文確定

  type Food = {
    genre: "rice" | "soup" | "main" | "side" | "dessert" | "drink";
    name: string;
    img: string;
    price: number;
    remaining: number;
    isRecommended: boolean;
    select: boolean;
  }

  type foodInfo = {
    name: string;
    startTime: number;
    num: number;
    seat: "A" | "B" | "C";
  }

  type selectFood = {
    name: string;
    num: number;
    price: number;
    remaining: number;
    genre: "rice" | "soup" | "main" | "side" | "dessert" | "drink";
    seat: "A" | "B" | "C";
  }

  type orderHistory = {
    name: string;
    num: number;
    price: number;
    isProvide: boolean;
  }

  const confirm = () => {
    const newRices: foodInfo[] = [];
    const newSoups: foodInfo[] = [];
    const newMains: foodInfo[] = [];
    const newSides: foodInfo[] = [];
    const newDesserts: foodInfo[] = [];
    const newDrinks: foodInfo[] = [];

    props.selectFoods.forEach((selectFood: selectFood) => {
      const newFoodInfo: foodInfo = {
        name: selectFood.name,
        startTime: new Date().getTime(),
        num: selectFood.num,
        seat: "C",
      }

      switch (selectFood.genre) {
        case "rice":
          newRices.push(newFoodInfo);
          break;

        case "soup":
          newSoups.push(newFoodInfo);
          break;

        case "main":
          newMains.push(newFoodInfo);
          break;

        case "side":
          newSides.push(newFoodInfo);
          break;

        case "dessert":
          newDesserts.push(newFoodInfo);
          break;

        case "drink":
          newDrinks.push(newFoodInfo);
          break;
      }
      
    });

    props.setRices([
      ...props.rices,
      ...newRices
    ]);

    props.setSoups([
      ...props.soups,
      ...newSoups
    ]);

    props.setMains([
      ...props.mains,
      ...newMains
    ]);

    props.setSides([
      ...props.sides,
      ...newSides
    ]);

    props.setDesserts([
      ...props.desserts,
      ...newDesserts
    ]);

    props.setDrinks([
      ...props.drinks,
      ...newDrinks
    ]);

    const newOrderHistorys: orderHistory[] = [];
    props.selectFoods.forEach((selectFood: selectFood) => {
      const newOrderHistory: orderHistory = {
        name: selectFood.name,
        num: selectFood.num,
        price: selectFood.price,
        isProvide: false
      }
      newOrderHistorys.push(newOrderHistory);
    });
    props.setOrderHistorys([
      ...newOrderHistorys,
      ...props.orderHistorys
    ]);

    
    const newFoods = props.foods.map((food: Food) => {

      if (!(Number.isNaN(food.remaining) || food.remaining === 0)) {
        props.selectFoods.forEach((selectFood: selectFood) => {
          if (food.name === selectFood.name) {
            food.remaining = food.remaining - selectFood.num;
          }
        });
      }

      if (food.select) {
        food.select = false;
      }
      return food;
    });
    props.setFoods(newFoods);
    props.setSelectFoods([]);
    props.setSubShow(0);
  }


  return (
    <div className={`menu-sub ${props.subShow === 0 ? "hide" : ""}`}>

      <div className={`order-history ${props.subShow === 1 ? "" : "hide"}`}>
        <div className='o-h-top'>
          <p>品名</p>
          <p>個</p>
          <p>提供</p>
        </div>
        <ul className='o-h-list'>
          {props.orderHistorys.map((orderHistory: orderHistory, index: number) => {
            return <li key={index}>
              <p>{orderHistory.name}</p>
              <p>{orderHistory.num}</p>
              <p className={orderHistory.isProvide ? "" : "hide"}><span>済</span></p>
            </li>
          })}
        </ul>
        <p className='now-total'>現在の合計額<span>{result}</span>円</p>
      </div>


      <div className={`call ${props.subShow === 2 ? "" : "hide"}`}>
        <div>
          <p>只今店員を呼び出し中です</p>
          <p>しばらくお待ちください</p>
        </div>
      </div>


      <div className={`pay-bill ${props.subShow === 3 ? "" : "hide"}`}>
        <div className={`really ${really ? "hide" : ""}`}>
          <p>お会計に進みすか？</p>
          <button onClick={OK}>お会計に進む</button>
        </div>
        <div className={really ? "" : "hide"}>
          <p>お会計は<span>{result}</span>円です</p>
          <p>割り勘の場合、一人<span>{result / props.num}</span>円です</p>
          <p>お支払いはレジでお願いします</p>
        </div>
      </div>
      

      <div className={`select-confirm ${props.subShow === 4 ? "" : "hide"}`}>
        <h3>注文確認</h3>
        <p className='confirm-total-amount'>合計：{props.result}円</p>
        <ul className='select-confirm-list'>
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
        <button className='yes' onClick={confirm}>注文確定</button>
      </div>
      <button className={`close-btn ${props.subShow === 1 ? "" : "hide"}`} onClick={close}>閉じる</button>
      <button className={`close-btn ${props.subShow === 1 ? "hide" : ""}`} onClick={cancel}>キャンセル</button>

    </div>
  )
}

export default MenuSub
