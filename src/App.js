import './App.css';
import { useEffect, useState} from 'react';
import Card from './component/Card';
import Header from './component/Header';
import EndGame from './component/EndGame';

function App() {
  const[meme,setMeme] = useState([{description:"",url:""}]); 
  const[selected,setSelected] = useState([])
  const[loading,setLoading] = useState(true);
  const[randomNumber,setRandomNumber] = useState([]);
  const[score,setScore] = useState(0);
  const[best,setBest] = useState(0);
  const[win,setwin] = useState(null);

  async function randomNum(){
    const list = [];
    let isIn=0;
    for(let i=0;i<4;i++){
      const num = Math.floor(Math.random() * 30 );
      for(let a=0;a<selected.length;a++){
        if(selected[a] === num){
          isIn=isIn+1;
        }
      }
      list.indexOf(num) === -1 ? list.push(num) : i--;
    }
    console.log(isIn)
    if(isIn<4){
      setRandomNumber(list);
    }else{
      randomNum();
    }
    
  }

  async function getMeme() {
    try {
      const response = await fetch(`https://meme-api.herokuapp.com/gimme/30`, { mode: 'cors' });
      const data = await response.json();
      addMeme(data);
      setLoading(false);
      randomNum();
    } catch {
      console.log('Error during the image load!');
    }
  }
  
  async function addMeme(data){
    const list = [];
    for(let i=0;i<30;i++){
      const getdata = {
        url : `${data.memes[i].preview[2]}`,
        description: `${data.memes[i].title}`,
        id: i
      }
      list.push(getdata);
    }
    setMeme(list);
  }

  useEffect(() => {
   
    getMeme();
    
  }, []);

  useEffect(()=>{
    console.log(selected.length)
    if(selected.length === 30){
      setwin(true);
    }else{
      randomNum();
    }
    
  },[selected])

  useEffect(()=>{
    if(score>best){
      setBest(score);
    }
  },[score])

  let handleClick = (e) => {
    const id = e.target.id;
    let isIn =false;
    const getdata = +id
    for(let i=0;i<selected.length;i++){
      if(selected[i] === getdata){
        isIn=true;
      }
    }
    if(isIn===false && selected.length < 30){
      setSelected([...selected , getdata]);
      setScore(score+1);
    }else{
      setwin(false);
    }
  }

  let handleVictory = (e) =>{
    setScore(0)
    setSelected([]);
    setLoading(true);
    setwin(null);
    getMeme();
  }

  return (
    <div className="App">
      <Header actual={score} best={best}/>
      {loading === false && (
        <div className='cardsContainer'>
          {randomNumber.map((num,index) => (
            <Card key={index} meme={meme[num]} handleClick = {(e) => handleClick(e)}/>
          ))}
        </div>
      )}
      {loading === true && (
        <div className='loading'><div className='memeLoad'>L</div> Loading...</div>
      )}
      {win === true && (
        <EndGame result={win} handleVictory = {(e) => handleVictory(e)}/>
      )} 
      {win === false && (
        <EndGame result={win} handleVictory = {(e) => handleVictory(e)}/>
      )}
    </div>
  );
}

export default App;
