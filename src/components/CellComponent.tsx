import styled from 'styled-components';
import { Cell } from '../models/Cell';
const FigureImg = styled.img`
  width: 48px;
  height: 48px;
  position:relative;
`;
 const CellStyled = styled.div<{color:string, selected: boolean}>`
    width: 64px;
    height: 64px;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:${props=>props.selected==true ?'brown': props.color=='white'? "#eed4ac": "deepskyblue" };
`;
 const AvailableCell = styled.div`
  height: 12px;
  width: 12px;;
  border-radius:50%;
  background-color:#22c022;
 `
interface CellProps { 
  cell: Cell;
  selected: boolean;
  click:(cell:Cell)=>void
}
const CellComponent = ({cell, selected, click}: CellProps) => {
  return (
    <CellStyled 
    color={cell.color}
     selected={selected}
     style={{background:cell.available && cell.figure ? 'green' : ''}}
     onClick={()=>click(cell)}

     >
      {cell.available && !cell.figure && <AvailableCell/>}
      {cell.figure?.logo && <FigureImg src={cell.figure.logo} alt=""/>}
    </CellStyled>
  )
}

export default CellComponent