import "./Singlecard.css"
export default function SingleCard({card,handleChoise,flipped,disable}){
function handleClick(){
if(!disable) {   
handleChoise(card)
}
}
    return(
    <div style={{cursor:"pointer"}} className="card" key={card.id}>
        <div className={flipped&&"flip"}>
          <img className="front" src={card.src} style={{border:"3px solid black"}} alt="fron image"/>
          <img className="back" src="/image/bg.jpg" 
          onClick={handleClick}
          alt="back image"/>
        </div>
     </div>
    )
}