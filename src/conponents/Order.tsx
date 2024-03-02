import React, { useState } from 'react'

const Order = (props: any) => {
  type foodInfo = {
    name: string;
    startTime: number;
    num: number;
    seat: "A" | "B" | "C";
  }

  const [now, setNow] = useState<number>(new Date().getTime());
  setInterval(() => {
    setNow(new Date().getTime());
  }, 1000);

  // -------提供完了の確認--------
  const [confirmName, setConfirmName] = useState<string>();
  const [confirmSeat, setConfirmSeat] = useState<string>();
  const [confirmNum, setConfirmNum] = useState<number>();
  const [confirmTime, setConfirmTime] = useState<number>(0);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);

  const handleConfirm = (e: any, name: string, seat: string, num: number, startTime: number) => {
    setConfirmName(name);
    setConfirmSeat(seat);
    setConfirmNum(num);
    setConfirmTime(startTime);
    setConfirmShow(true);
  }

  const ConfirmCancel = () => {
    setConfirmShow(false);
  }

  // ----------提供完了-----------
  type orderHistory = {
    name: string;
    num: number;
    price: number;
    isProvide: boolean;
  }

  const provide = () => {

    const newOrderHistorys = props.orderHistorys.map((orderHistory: orderHistory) => {
      if (orderHistory.name === confirmName && orderHistory.isProvide === false) {
        orderHistory.isProvide = true;
      }
      return orderHistory;
    });
    props.setOrderHistorys(newOrderHistorys);

    const newSomeFood = props.someFood.filter((sF: foodInfo) => {
      return sF.name !== confirmName;
    });
    props.setSomeFood(newSomeFood);
    setConfirmShow(false);
  }


  return (
    <div className='Order'>
      <h2>{props.title}</h2>
      <div className='list-container'>
        <div className='list-top'>
          <p className='t-seat'>席</p>
          <p className='t-name'>オーダー</p>
          <p className='t-nop'>個</p>
          <p className='t-minutes'>分</p>
          <span className='space'></span>
        </div>
        <div className={`confirm-mask ${confirmShow ? "" : "hide"}`} onClick={ConfirmCancel}></div>
        <div
          className={`confirm-div ${confirmShow ? "" : "hide"}`}
          onClick={provide}
        >
          <p>{confirmSeat}</p>
          <p>{confirmName}</p>
          <p>{confirmNum}</p>
          <p>{Math.floor((now - confirmTime) / 60000)}</p>
        </div>
        <ul className='order-list'>
          {props.someFood.map((food: foodInfo, index: number) => {
            return <li
              key={index}
              onClick={(e) => handleConfirm(e, food.name, food.seat, food.num, food.startTime)}
            >
              <p className={`seat`}>{food.seat}</p>
              <p className='name'>{food.name}</p>
              <p className='nop'>{food.num}</p>
              <p className='minutes'>{Math.floor((now - food.startTime) / 60000)}</p>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Order
