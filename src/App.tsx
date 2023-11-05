import styled from 'styled-components'
import './App.css'

import { useState,useEffect } from 'react'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import LostFigures from './components/LostFigures'
import Timer from './components/Timer'
const Container = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
  `
const Title = styled.h1`
  text-align: center;
`
function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);


  function restart(){
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }
  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])
 
  function swapPlayer (){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer: whitePlayer)
  }
  
  return (
    <>
      <Title>Текущий игрок {currentPlayer?.color}</Title>
      <Timer 
      currentPlayer={currentPlayer}
      restart={restart}
      />
     
      <Container> 
        
        <BoardComponent 
        board={board} 
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        />
        <div style={{margin:'15px'}}>
      <LostFigures
          title='Черные фигуры'
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title='Белые фигуры'
          figures={board.lostWhiteFigures}
        />
      </div>
      </Container>
    </>
  )
}

export default App
