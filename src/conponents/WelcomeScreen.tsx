import React from 'react'

const WelcomeScreen = (props: any) => {

  const handleTap = () => {
    props.setScreen(3);
  }


  return (
    <div
      className={`welcome-screen ${props.screen === 2 ? "" : "hide"}`}
      onClick={handleTap}
    >
      <p className='welcome'>いらっしゃいませ</p>
      <p className='touch'>画面をタッチしてください</p>
    </div>
  )
}

export default WelcomeScreen
