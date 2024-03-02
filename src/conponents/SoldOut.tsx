import React from 'react'

const SoldOut = (props: any) => {

  const btns: string[] = [
    "ご飯系",
    "汁物",
    "おかず",
    "サイド",
    "デザート",
    "ドリンク",
  ];

  const handlePage = (e: any, name:string) => {
    switch (name) {
      case "ご飯系":
        props.setDisplay(1);
        break;
      case "汁物":
        props.setDisplay(2);
        break;
      case "おかず":
        props.setDisplay(3);
        break;
      case "サイド":
        props.setDisplay(4);
        break;
      case "デザート":
        props.setDisplay(5);
        break;
      case "ドリンク":
        props.setDisplay(6);
        break;
    }
  }


  return (
    <div className={`sold-out ${props.display === 0 ? "" : "hide"}`}>
      <div className='sold-out-btn-container'>
        {btns.map((btn: string, index: number) => {
          return <button key={index} onClick={(e) => handlePage(e, btn)}>{btn}</button>
        })}
      </div>
    </div>
  )
}

export default SoldOut
