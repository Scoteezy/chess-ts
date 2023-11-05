import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
 const BoardStyled= styled.div`
    width: calc(64px*8);
    height: calc(64px*8);
    display:flex;
    flex-wrap:wrap;

`
interface BoardProps { 
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: ()=>void;
}

const BoardComponent= ({board, setBoard, currentPlayer, swapPlayer}: BoardProps) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell:Cell)=>{
    if(selectedCell && selectedCell !==cell && selectedCell.figure?.canMove(cell)){
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    }else{ 
      if(cell.figure?.color === currentPlayer?.color){
        setSelectedCell(cell);

      }
    }
  }
  useEffect(()=>{
    highlightCells();
  },[selectedCell])
  const highlightCells = ()=>{
    board.highlightCells(selectedCell)
    updateBoard();
  }

  const updateBoard=()=> { 
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <BoardStyled>
      {board.cells.map((row,index)=>
        <React.Fragment key={index}>
          {row.map(cell=>
            <CellComponent 
            cell={cell}
            click={click}
            selected={cell.x ===selectedCell?.x && cell.y ===selectedCell?.y}
            key={cell.id}
            />
            )}
        </React.Fragment>
      )}
    </BoardStyled>
  )
}

export default BoardComponent