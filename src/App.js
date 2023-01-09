import React, { useState } from 'react'

import './App.css'

const App = () => {
  const [cardList, setCardList] = useState([
    {id: 1, order: 3, text: 'card 3'},
    {id: 2, order: 1, text: 'card 1'},
    {id: 3, order: 2, text: 'card 2'},
    {id: 4, order: 4, text: 'card 4'},
  ])

  const [current, setCurrent] = useState(null)

  function dragStartHandler(e, card) {
    console.log(card)
    setCurrent(card)

  }

  function dragEndHandler(e) {
    e.target.style.background = 'white'
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.target.style.background = 'lightgray' 

  }

  function dropHandler(e, card) {
    e.preventDefault()
    e.target.style.background = 'white'
    setCardList(cardList.map(item => {
      if (item.id == card.id) return {...item, order: current.order}
      if (item.id == current.id) return {...item, order: card.order}
      return item
    }))
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else return -1
  }

  return (
    <div className='app'>
      {cardList.sort(sortCards).map(card => (
        <div 
        className='card' 
        key={card.id}
        draggable
        onDragStart={(e) => dragStartHandler(e, card)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, card)}>
          {card.text}
        </div>))}
    </div>
  )
}

export default App
