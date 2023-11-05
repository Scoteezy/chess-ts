import React from 'react'
import styled from 'styled-components'
import { Figure } from '../models/figures/Figure';

const Lost = styled.div`
    width: 50%;
    padding: 10px;
    margin: 0 auto;
    background-color: #8f8f8f;
`;
interface LostFiguresProps {
    title: string;
    figures: Figure[];

}
const LostFigures = ({title,figures}: LostFiguresProps) => {
  return (
    <Lost>
        <h3>{title}</h3>
        {figures.map(figure=>
            <div key={figure.id}>
                {figure.name} {figure.logo && <img width={20} height={20}  src={figure.logo} alt={figure.name}/>}
            </div>
            )}
    </Lost>
  )
}

export default LostFigures