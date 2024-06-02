import { useEffect, useState } from "react"
import "./App.css"
import SingleCard from "./SingleCard";

const cardImages=[
  {"src":"/image/monkey.jpg","match":false},
  {"src":"/image/panda.jpg","match":false},
  {"src":"/image/cat.png","match":false},
  {"src":"/image/elephant.jpg","match":false},
  {"src":"/image/tiger.jpg","match":false},
  {"src":"/image/lion.jpg","match":false}
]
const cardInitial=[...cardImages,...cardImages]
.sort(()=> Math.random() - 0.5).map((card)=>({...card,id:Math.random()}))

export default function App(){
  const [cards,setCards]=useState(cardInitial);
  const [turns,setTurns]=useState(0)
  const [choiseOne,setChoiseOne]=useState(null);
  const [choiseTwo,setChoiseTwo]=useState(null);
   const [disable,setDisable]=useState(false);
  const [count,setCount]=useState(0);

 function shufflecard(){
  const shuffleCard=[...cardImages,...cardImages]
  .sort(()=> Math.random() - 0.5).map((card)=>({...card,id:Math.random()}))
  setCards(shuffleCard)
  setChoiseOne(null)
  setChoiseTwo(null)
  setTurns(0);
  setCount(0)
}
function handleChoise(card){
  choiseOne?setChoiseTwo(card):setChoiseOne(card)
}

useEffect(()=>{
  if(choiseOne && choiseTwo)
    {
      setDisable(true)
    if(choiseOne.src===choiseTwo.src)
    {
    
      setCards(cards=>{
      return cards.map(card=>{
        if(card.src === choiseOne.src){
          return {...card,match:true}
        }
        else {return card}
      })
      })
      setTimeout(()=>{

        setCount(count=>count+1)
      },500)
      resetTurn()
    }
    else{
     
      setTimeout(()=>resetTurn(),1000)
      
    }
  }
},[choiseOne,choiseTwo])
function resetTurn(){
  setChoiseOne(null)
  setChoiseTwo(null)
  setTurns(turns+1)
   setDisable(false);
}

return (
<div className="Gamemain">
<h2 style={{color:"white",textAlign:"center"}}> {count === 6?"🥳 Good job Click on new game to agian start":""} </h2>
  <div className="Header"><h1>Memory Game</h1>
<button className="newgame" style={{cursor:"pointer"}} onClick={shufflecard}>New game</button>

<div className="Cards-grid">
  {cards.map(card=>(
  <SingleCard key={card.id} card={card}
  handleChoise={handleChoise}
  flipped={card === choiseOne||card === choiseTwo||card.match}
  disable={disable}
  ></SingleCard>
  ))}

</div>
</div>


</div>)
}