import React, { useRef, useState } from 'react'
import namabiru from "../imgs/namabiru.jpg"
const MenuScreen = (props: any) => {

  type Food = {
    genre: "rice" | "soup" | "main" | "side" | "dessert" | "drink";
    name: string;
    img: string;
    price: number;
    remaining: number;
    isRecommended: boolean;
    select: boolean;
  }

  const recommends: Food[] = [];
  const rices: Food[] = [];
  const soups: Food[] = [];
  const mains: Food[] = [];
  const sides: Food[] = [];
  const desserts: Food[] = [];
  const drinks: Food[] = [];
  props.foods.forEach((food: Food) => {
    switch (food.genre) {
      case "rice":
        rices.push(food);
        break;
      case "soup":
        soups.push(food);
        break;
      case "main":
        mains.push(food);
        break;
      case "side":
        sides.push(food);
        break;
      case "dessert":
        desserts.push(food);
        break;
      case "drink":
        drinks.push(food);
        break;
    }
  });
  props.foods.forEach((food: Food) => {
    if (food.isRecommended) {
      recommends.push(food);
    } else {
      return;
    }
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  let currentFoods: Food[] = [];
  switch (currentPage) {
    case 0:
      currentFoods = recommends;
      break;
    case 1:
      currentFoods = rices;
      break;
    case 2:
      currentFoods = soups;
      break;
    case 3:
      currentFoods = mains;
      break;
    case 4:
      currentFoods = sides;
      break;
    case 5:
      currentFoods = desserts;
      break;
    case 6:
      currentFoods = drinks;
      break;
  }

  const slideNum: number = Math.floor(currentFoods.length / 8 + 1)


  // ---------------画面スライド----------------

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  let newCurrentIndex: number;
  let ulRef = useRef<HTMLUListElement>(null!);

  const handleNext = () => {
    if (currentIndex < slideNum - 1) {
      newCurrentIndex = currentIndex + 1;
      ulRef.current.style.transform = `translateX(${-1 * 755 * newCurrentIndex}px)`;
      setCurrentIndex(newCurrentIndex);
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      newCurrentIndex = currentIndex - 1;
      ulRef.current.style.transform = `translateX(${-1 * 755 * newCurrentIndex}px)`;
      setCurrentIndex(newCurrentIndex);
    }
  }


  // -----------ページ切り替え------------

  const [pages, setPages] = useState<Page[]>([
    { name: "おすすめ", id: 0, iscurrent: true },
    { name: "ご飯系", id: 1, iscurrent: false },
    { name: "汁物", id: 2, iscurrent: false },
    { name: "おかず", id: 3, iscurrent: false },
    { name: "サイド", id: 4, iscurrent: false },
    { name: "デザート", id: 5, iscurrent: false },
    { name: "ドリンク", id: 6, iscurrent: false },
  ]);

  type Page = {
    name: string;
    id: number;
    iscurrent: boolean;
  }

  const handlepage = (e: any, id: number) => {
    const newPages = pages.map((page) => {
      if (id === page.id) {
        page.iscurrent = true;
      } else {
        page.iscurrent = false;
      }
      return page;
    });
    setPages(newPages);
    setCurrentPage(id);
    ulRef.current.style.transform = `translateX(${-1 * 755 * 0}px)`;
    setCurrentIndex(0);
  }

  // --------SelectScreenに送る------------
  
  const handleSelect = (e: any, name: string, price: number, genre: string, select: boolean) => {
    if (select === false) {
      props.setSelectFoods([
        {
          name: name,
          num: 1,
          price: price,
          remaining: NaN,
          genre: genre,
          seat: "C",
        },
        ...props.selectFoods
      ]);
      const newFoods = props.foods.map((food: Food) => {
        if (food.name === name) {
          food.select = true;
        }
        return food
      });
      props.setFoods(newFoods);
    }
  }

  return (
    <div className='menu-container'>
      <div className='adv-seat'>
        <div className='advertisement'>
          <img src={namabiru} alt="" />
          <img src={namabiru} alt="" />
          <img src={namabiru} alt="" />
          <img src={namabiru} alt="" />
          <img src={namabiru} alt="" />
          <img src={namabiru} alt="" />
          <p>生ビール半額！！</p>
        </div>
        <h4>{props.seatSymbol}</h4>
      </div>
      <ul className='page-btn-container'>
        {pages.map((page, index) => {
          return <li key={index}>
            <button className={page.iscurrent ? "current-page" : ""}
              onClick={(e) => handlepage(e, page.id)}
            >
              {page.name}
            </button>
          </li>
        })}
      </ul>
      <div className='menus'>
        <div className='slide-container'>
          <ul className="menu-list" ref={ulRef}>
            {currentFoods.map((currentFood: Food, index: number) => {
              return <li
                key={index}
                onClick={(e) => handleSelect(e, currentFood.name, currentFood.price, currentFood.genre, currentFood.select)}
              >
                <img src={currentFood.img} alt="" />
                <span className={`end ${currentFood.remaining < 1 ? "" : "hide"}`}>売り切れ</span>
                <p>{currentFood.name}</p>
                <p className={currentFood.name === "生ビール半額！！" ? "nama" : ""}>{currentFood.price}円</p>
                <p className='rest'>{Number.isNaN(currentFood.remaining) || currentFood.remaining < 1 ? "" : `残り ${currentFood.remaining}食!!`}</p>
              </li>
            })}
          </ul>
        </div>
      </div>
      <div className='arrow-container'>
        <button className='prev' onClick={handlePrev}>＜＜</button>
        <p>{currentIndex + 1} / {slideNum}</p>
        <button className='next' onClick={handleNext}>＞＞</button>
      </div>
    </div>
  )
}

export default MenuScreen
