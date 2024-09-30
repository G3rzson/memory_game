
import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './Components/SingleCard/SingleCard'

const cardImg = [
  { "src": "/memory_game/pics/alma.png", matched: false },
  { "src": "/memory_game/pics/banan.png", matched: false },
  { "src": "/memory_game/pics/dinnye.png", matched: false },
  { "src": "/memory_game/pics/eper.png", matched: false },
  { "src": "/memory_game/pics/kivi.png", matched: false },
  { "src": "/memory_game/pics/meggy.png", matched: false },
  { "src": "/memory_game/pics/narancs.png", matched: false },
  { "src": "/memory_game/pics/szolo.png", matched: false }
];

export default function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState('')

    // shuffle cards
  const shuffleCards = ()=> {
    const shuffledCards = [...cardImg, ...cardImg]
      .sort( ()=> Math.random() - 0.5 )
      .map( (card)=> ( { ...card, id: Math.random() } ) )

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setMessage('')
  }

    // handle a choice
  const handleChoice = (card)=> {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
    // compare 2 selected cards
  useEffect( ()=> {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout( ()=> resetTurn(), 1000 /*1s*/)
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setMessage('A játéknak vége');
    } 
  }, [cards]);

    // reset choices & increase turn
  const resetTurn = ()=> {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

    // start a new game automatically
  useEffect( ()=> {
    shuffleCards()
  }, [] )

  return (
    <div className='App'>
      <h1>Memória Játék</h1>
      <button onClick={shuffleCards}>Új játék</button>
      <p>{message}</p>

      <div className="card-grid">
        {cards.map( card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Tippek: {turns}</p>
    </div>
  )
}
