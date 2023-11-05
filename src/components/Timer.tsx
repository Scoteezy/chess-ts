import React,{useState,useEffect, useRef} from 'react'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors';
import styled from 'styled-components';

interface TimerProps { 
    currentPlayer: Player | null;
    restart: ()=> void;
}
const TimerStyle = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin: 15px auto;
`
const Timer = ({currentPlayer,restart}: TimerProps) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime,setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(()=>{
        startTimer();
    },[currentPlayer])

    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer: decrementBlackTimer;
        timer.current = (setInterval(callback, 1000))
    }
    function decrementBlackTimer(){
        setBlackTime(prev=>prev-1)
    }
    function decrementWhiteTimer(){
        setWhiteTime(prev=>prev-1)

    }
    const handleRestart = ()=>{
        setBlackTime(300);
        setWhiteTime(300);
        restart();
    }

  return (
    <TimerStyle>
        <h2>Черные - {blackTime}</h2>
        <h2>Белые - {whiteTime}</h2>
        <div>
            <button onClick={handleRestart}>Restart game</button>
        </div>
    </TimerStyle>
  )
}

export default Timer