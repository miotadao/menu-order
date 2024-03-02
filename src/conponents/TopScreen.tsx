import React, { useState } from 'react'

const TopScreen = (props: any) => {

  type Nums = {
    num: number;
    isSelected: boolean;
  }

  let isPush = false;

  const [peopleNums, setPeopleNums] = useState<Nums[]>([
    { num: 1, isSelected: false },
    { num: 2, isSelected: false },
    { num: 3, isSelected: false },
    { num: 4, isSelected: false },
    { num: 5, isSelected: false },
    { num: 6, isSelected: false },
    { num: 7, isSelected: false },
    { num: 8, isSelected: false },
    { num: 9, isSelected: false },
  ]);

  const handleNum = (e: any, num: number) => {
    const newNums = peopleNums.map((pn) => {
      if (num === pn.num) {
        pn.isSelected = true;
      } else {
        pn.isSelected = false;
      }
      return pn;
    });
    setPeopleNums(newNums);
  }


  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    let selectNum: number;
    peopleNums.forEach((pn) => {
      if (pn.isSelected === true) {
        selectNum = pn.num;
        if (pn.num === 1 || pn.num === 2 || pn.num === 3) {
          props.setSeatSymbol("A");
        } else if (pn.num === 4 || pn.num === 5 || pn.num === 6) {
          props.setSeatSymbol("B");
        } else {
          props.setSeatSymbol("C");
        }
        props.setNum(selectNum);
        props.setScreen(2);
      } 
      
    });
  }



  return (
    <div className={`top-screen ${props.screen === 1 ? "" : "hide"}`}>
      <p>人数を選択してください</p>
      <ul className='num-btns'>
        {peopleNums.map((peopleNum: any, index: number) => {
          return <li
            key={index}
            className={`num-li ${peopleNum.isSelected ? "selected" : ""}`}
            onClick={(e) => handleNum(e, peopleNum.num)}
          >{peopleNum.num}</li>
        })}
      </ul>
      <form>
        <input type="submit" onClick={(e) => handleSubmit(e)} value="確定"/>
      </form>
    </div>
  )
}

export default TopScreen