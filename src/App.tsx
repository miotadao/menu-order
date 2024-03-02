import React, { useState } from 'react';
import TopScreen from './conponents/TopScreen';
import WelcomeScreen from './conponents/WelcomeScreen';
import MenuScreen from './conponents/MenuScreen';
import SideBtns from './conponents/SideBtns';
import SelectScreen from './conponents/SelectScreen';
import Order from './conponents/Order';
import Call from './conponents/Call';
import SoldOut from './conponents/SoldOut';
import FoodsSoldOut from './conponents/FoodsSoldOut';
import NumBord from './conponents/NumBord';
import MenuSub from './conponents/MenuSub';
import { imgs } from './conponents';

function App() {
  // --------タッチパネル最初の画面----------
  const [screen, setScreen] = useState< 1 | 2 | 3 >(1);

  // 人数設定
  const [num, setNum] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>(1);

  // 席番号
  const [seatSymbol, setSeatSymbol] = useState<"A" | "B" | "C">();


  // -------------注文履歴、呼び出し、会計、注文確定---------------

  // 画面表示
  const [subShow, setSubShow] = useState<0 | 1 | 2 | 3 | 4>(0);

  // 呼び出し中、会計
  const [isCall, setIsCall] = useState<boolean>(false);
  const [isBill, setIsBill] = useState<boolean>(false);


  // ------------  emploee2 画面切り替え ----------------

  const [display, setDisplay] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);



  // ------------ メニュー ------------
  const [foods, setFoods] = useState<Food[]>([
    { genre: "rice", name: "ごはん", img: imgs.gohan, price: 120, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "おにぎり", img: imgs.onigiri, price: 120, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "牛丼", img: imgs.gyudonn, price: 320, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "親子丼", img: imgs.oyakodon, price: 350, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "かつ丼", img: imgs.katudon, price: 450, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "カレー", img: imgs.kare, price: 400, remaining: NaN, isRecommended: true, select: false },
    { genre: "rice", name: "カツカレー", img: imgs.katukare, price: 550, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "オムライス", img: imgs.omuraisu, price: 500, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "チャーハン", img: imgs.tyahan, price: 450, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "海鮮チャーハン", img: imgs.kaisentyahan, price: 600, remaining: NaN, isRecommended: true, select: false },
    { genre: "rice", name: "ピラフ", img: imgs.pirahu, price: 400, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "炊き込みご飯", img: imgs.takikomi, price: 450, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "お茶漬け", img: imgs.otyaduke, price: 450, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "天津飯", img: imgs.tensinhan, price: 500, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "トマトリゾット", img: imgs.tomatorizotto, price: 460, remaining: NaN, isRecommended: true, select: false },
    { genre: "rice", name: "パエリア", img: imgs.paeria, price: 470, remaining: NaN, isRecommended: false, select: false },
    { genre: "rice", name: "海鮮丼", img: imgs.kaisendon, price: 800, remaining: NaN, isRecommended: true, select: false },
    { genre: "rice", name: "うな重", img: imgs.unaju, price: 1200, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "みそ汁", img: imgs.misosiru, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "豚汁", img: imgs.tonjiru, price: 300, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "クリームシチュー", img: imgs.kurimusityu, price: 450, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "ビーフシチュー", img: imgs.bihusityu, price: 450, remaining: NaN, isRecommended: true, select: false },
    { genre: "soup", name: "らーめん", img: imgs.ramen, price: 600, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "うどん", img: imgs.udonn, price: 550, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "そば", img: imgs.kakesoba, price: 500, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "中華スープ", img: imgs.tyukasoup, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "ミネストローネ", img: imgs.minesutorone, price: 320, remaining: NaN, isRecommended: true, select: false },
    { genre: "soup", name: "コンソメスープ", img: imgs.konnsomesoup, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "クラムチャウダー", img: imgs.kuramutyauda, price: 450, remaining: NaN, isRecommended: false, select: false },
    { genre: "soup", name: "肉すい", img: imgs.nikusui, price: 320, remaining: NaN, isRecommended: true, select: false },
    { genre: "soup", name: "ワンタンスープ", img: imgs.wantan, price: 270, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "ハンバーグ", img: imgs.hanbagu, price: 520, remaining: NaN, isRecommended: true, select: false },
    { genre: "main", name: "とんてき", img: imgs.tonnteki, price: 620, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "チキンソテー", img: imgs.tichikensote, price: 620, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "オムレツ", img: imgs.omuretu, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "カルパッチョ", img: imgs.karupatyo, price: 520, remaining: NaN, isRecommended: true, select: false },
    { genre: "main", name: "ゴーヤチャンプル", img: imgs.goyatyannpuru, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "麻婆豆腐", img: imgs.mabo, price: 520, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "とんかつ", img: imgs.tonnkatu, price: 620, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "グラタン", img: imgs.guratan, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "エビチリ", img: imgs.ebitiri, price: 440, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "レバニラ", img: imgs.rebanira, price: 450, remaining: NaN, isRecommended: true, select: false },
    { genre: "main", name: "ロールキャベツ", img: imgs.rorukyabetu, price: 500, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "だし巻き", img: imgs.dasimaki, price: 320, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "塩サバ", img: imgs.siosaba, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "もんじゃ焼き", img: imgs.monnja, price: 400, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "やきそば", img: imgs.yakisoba, price: 520, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "からあげ", img: imgs.karaage, price: 360, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "土手焼き", img: imgs.doteyaki, price: 480, remaining: NaN, isRecommended: false, select: false },
    { genre: "main", name: "チンジャオロース", img: imgs.tinnjaoloce, price: 460, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "チキンナゲット", img: imgs.nagetto, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "枝豆", img: imgs.edamame, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "ポテサラ", img: imgs.potesara, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "フライドポテト", img: imgs.huraidopotato, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "シーザーサラダ", img: imgs.sizasarada, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "白菜キムチ", img: imgs.kimuti, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "ミニピザ", img: imgs.pizza, price: 220, remaining: NaN, isRecommended: true, select: false },
    { genre: "side", name: "チーズフライ", img: imgs.tizuhurai, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "冷奴", img: imgs.hiyayakko, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "漬物セット", img: imgs.tukemori, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "たこ焼き", img: imgs.takoyaki, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "ギョーザ", img: imgs.gyoza, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "side", name: "チヂミ", img: imgs.tidimi, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "チョコレートパフェ", img: imgs.tyokopafe, price: 420, remaining: NaN, isRecommended: true, select: false },
    { genre: "dessert", name: "いちごパフェ", img: imgs.itigopafe, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "プリン", img: imgs.purin, price: 320, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "クレープ", img: imgs.kurepu, price: 460, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "たいやき", img: imgs.taiyaki, price: 150, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "スイートポテト", img: imgs.suitopotato, price: 270, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "アップルデニッシュ", img: imgs.appledenish, price: 350, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "マックシェイク", img: imgs.makushake, price: 200, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "チーズケーキ", img: imgs.tizucake, price: 380, remaining: NaN, isRecommended: false, select: false },
    { genre: "dessert", name: "ただお", img: imgs.tadao, price: 380, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "ウーロン茶", img: imgs.uron, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "カルピス", img: imgs.karupisu, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "コーラ", img: imgs.cola, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "オレンジジュース", img: imgs.orangejuuice, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "ファンタ", img: imgs.fanta, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "ジンジャエール", img: imgs.jinjaeru, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "リンゴジュース", img: imgs.applejuice, price: 220, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "生ビール半額！！", img: imgs.namabiru, price: 250, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "ハイボール", img: imgs.haiboll, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "レモンサワー", img: imgs.remonnsawa, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "赤ワイン", img: imgs.akawain, price: 420, remaining: NaN, isRecommended: false, select: false },
    { genre: "drink", name: "白ワイン", img: imgs.sirowainn, price: 420, remaining: NaN, isRecommended: false, select: false },
  ]);

  type Food = {
    genre: "rice" | "soup" | "main" | "side" | "dessert" | "drink";
    name: string;
    img: string;
    price: number;
    remaining: number;
    isRecommended: boolean;
    select: boolean;
  }


  // ----------選択中のメニュー--------------

  const [selectFoods, setSelectFoods] = useState<selectFood[]>([]);

  type selectFood = {
    name: string;
    num: number;
    price: number;
    remaining: number;
    genre: "rice" | "soup" | "main" | "side" | "dessert" | "drink";
    seat: "A" | "B" | "C";
  }

  // selectScreen MenuSubの関数

  const handlenum = (e: any, name: string) => {
    const newSelectFoods = selectFoods.map((selectFood: selectFood) => {
      if (selectFood.name === name) {
        selectFood.num = e.target.value;
      }
      return selectFood;
    });
    setSelectFoods(newSelectFoods);
  }

  const handleDelete = (e: any, name: string,) => {
    const newSelectFoods = selectFoods.filter((selectFood: selectFood) => {
      return selectFood.name !== name
    });
    setSelectFoods(newSelectFoods);

    const newFoods = foods.map((food: Food) => {
      if (food.name === name) {
        food.select = false;
      }
      return food
    });
    setFoods(newFoods);
  }


  const totals: number[] = [];
  selectFoods.forEach((selectFood: selectFood) => {
    const total = selectFood.price * selectFood.num;
    totals.push(total);
  });

  let result = totals.reduce(function (sum, element) {
    return sum + element;
  }, 0);

  // -----------注文履歴---------------

  const [orderHistorys, setOrderHistorys] = useState<orderHistory[]>([]);

  type orderHistory = {
    name: string;
    num: number;
    price: number;
    isProvide: boolean;
  }


  // -----------emploee Order-------------

  const [rices, setRices] = useState<foodInfo[]>([]);
  const [soups, setSoups] = useState<foodInfo[]>([]);
  const [mains, setMains] = useState<foodInfo[]>([]);
  const [sides, setSides] = useState<foodInfo[]>([]);
  const [desserts, setDesserts] = useState<foodInfo[]>([]);
  const [drinks, setDrinks] = useState<foodInfo[]>([]);
  type foodInfo = {
    name: string;
    startTime: number;
    num: number;
    seat: "A" | "B" | "C";
  }

  // --------- employee2 FoodsSoldOut ----------

  const rices2: Food[] = [];
  const soups2: Food[] = [];
  const mains2: Food[] = [];
  const sides2: Food[] = [];
  const desserts2: Food[] = [];
  const drinks2: Food[] = [];

  foods.forEach((food: Food) => {
    switch (food.genre) {
      case "rice":
        rices2.push(food);
        break;
      case "soup":
        soups2.push(food);
        break;
      case "main":
        mains2.push(food);
        break;
      case "side":
        sides2.push(food);
        break;
      case "dessert":
        desserts2.push(food);
        break;
      case "drink":
        drinks2.push(food);
        break;
    }
  });

  // 設定するメニューの名前
  const [selectFoodName, setSelectFoodName] = useState<string>();


  // ------ NumBord ----------

  // 表示
  const [numBordShow, setNumBordShow] = useState<boolean>(false);


  const [bordNum, setBordNum] = useState<number>();


  return (
    <>
      <div className="customer">
        <TopScreen
          screen={screen}
          setScreen={setScreen}
          num={num}
          setNum={setNum}
          setSeatSymbol={setSeatSymbol}
        />
        <WelcomeScreen
          screen={screen}
          setScreen={setScreen}
        />
        <div className={`main-container ${screen === 3 ? "" : "hide"}`}>
          <MenuSub
            num={num}
            subShow={subShow}
            setSubShow={setSubShow}
            result={result}
            foods={foods}
            setFoods={setFoods}
            setSelectFoods={setSelectFoods}
            orderHistorys={orderHistorys}
            setOrderHistorys={setOrderHistorys}
            setIsCall={setIsCall}
            setIsBill={setIsBill}
            selectFoods={selectFoods}
            handlenum={handlenum}
            handleDelete={handleDelete}
            rices={rices}
            setRices={setRices}
            soups={soups}
            setSoups={setSoups}
            mains={mains}
            setMains={setMains}
            sides={sides}
            setSides={setSides}
            desserts={desserts}
            setDesserts={setDesserts}
            drinks={drinks}
            setDrinks={setDrinks}
          />
          <MenuScreen
            foods={foods}
            setFoods={setFoods}
            selectFoods={selectFoods}
            setSelectFoods={setSelectFoods}
            seatSymbol={seatSymbol}
          />

          <div className='side-container'>
            <SideBtns
              selectFoods={selectFoods}
              subShow={subShow}
              setSubShow={setSubShow}
              setIsCall={setIsCall}
              setIsBill={setIsBill}
            />
            <SelectScreen
              selectFoods={selectFoods}
              setSubShow={setSubShow}
              handlenum={handlenum}
              handleDelete={handleDelete}
              result={result}
            />
          </div>
        </div>
      </div>

      <div className='employee'>
        <Call
          seatSymbol={seatSymbol}
          isCall={isCall}
          isBill={isBill}
        />
        <div className='Order-container'>
          <Order
            title={"ご飯系"}
            someFood={rices}
            setSomeFood={setRices}
            orderHistorys={orderHistorys}
            setOrderHistorys={setOrderHistorys}
          />
          <Order
            title={"汁物"}
            someFood={soups}
            setSomeFood={setSoups}
            orderHistorys={orderHistorys}
            setOrderHistorys={setOrderHistorys}
          />
          <Order
            title={"おかず"}
            someFood={mains}
            setSomeFood={setMains}
            orderHistorys={orderHistorys}
            setOrderHistorys={setOrderHistorys}
          />
          <Order
            title={"サイド"}
            someFood={sides}
            setSomeFood={setSides}
            orderHistorys={orderHistorys}
            setOrderHistorys={setOrderHistorys}
          />
          <Order
            title={"デザート"}
            someFood={desserts}
            setSomeFood={setDesserts}
            orderHistorys={orderHistorys}
            setOrderHistorys={setOrderHistorys}
          />
          <Order
            title={"ドリンク"}
            someFood={drinks}
            setSomeFood={setDrinks}
            orderHistorys={orderHistorys}
            setOrderHistorys={setOrderHistorys}
          />
        </div>
      </div>
      <div className='employee-2'>
        <SoldOut display={display} setDisplay={setDisplay} />
        <div className='foods-container'>
          <FoodsSoldOut
            title={"ご飯系"}
            pageNum={1}
            display={display}
            setDisplay={setDisplay}
            setBordNum={setBordNum}
            foods={foods}
            thisPageFoods={rices2}
            numBordShow={numBordShow}
            setNumBordShow={setNumBordShow}
            selectFoodName={selectFoodName}
            setSelectFoodName={setSelectFoodName}
          />
          <FoodsSoldOut
            title={"汁物"}
            pageNum={2}
            display={display}
            setDisplay={setDisplay}
            setBordNum={setBordNum}
            foods={foods}
            thisPageFoods={soups2}
            numBordShow={numBordShow}
            setNumBordShow={setNumBordShow}
            selectFoodName={selectFoodName}
            setSelectFoodName={setSelectFoodName}
          />
          <FoodsSoldOut
            title={"おかず"}
            pageNum={3}
            display={display}
            setDisplay={setDisplay}
            setBordNum={setBordNum}
            foods={foods}
            thisPageFoods={mains2}
            numBordShow={numBordShow}
            setNumBordShow={setNumBordShow}
            selectFoodName={selectFoodName}
            setSelectFoodName={setSelectFoodName}
          />
          <FoodsSoldOut
            title={"サイド"}
            pageNum={4}
            display={display}
            setDisplay={setDisplay}
            setBordNum={setBordNum}
            foods={foods}
            thisPageFoods={sides2}
            numBordShow={numBordShow}
            setNumBordShow={setNumBordShow}
            selectFoodName={selectFoodName}
            setSelectFoodName={setSelectFoodName}
          />
          <FoodsSoldOut
            title={"デザート"}
            pageNum={5}
            display={display}
            setDisplay={setDisplay}
            setBordNum={setBordNum}
            foods={foods}
            thisPageFoods={desserts2}
            setNumBordShow={setNumBordShow}
            selectFoodName={selectFoodName}
            setSelectFoodName={setSelectFoodName}
          />
          <FoodsSoldOut
            title={"ドリンク"}
            pageNum={6}
            display={display}
            setDisplay={setDisplay}
            setBordNum={setBordNum}
            foods={foods}
            thisPageFoods={drinks2}
            numBordShow={numBordShow}
            setNumBordShow={setNumBordShow}
            selectFoodName={selectFoodName}
            setSelectFoodName={setSelectFoodName}
          />
        </div>
        <NumBord
          numBordShow={numBordShow}
          setNumBordShow={setNumBordShow}
          bordNum={bordNum}
          setBordNum={setBordNum}
          selectFoodName={selectFoodName}
          setSelectFoodName={setSelectFoodName}
          foods={foods}
          setFoods={setFoods}
        />
      </div>
    </>
  );
}

export default App;

