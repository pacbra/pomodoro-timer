import React, { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

const red = '#F0645E';
const green = '#55BD37';

function Timer () {

    const settingsInfo = useContext(SettingsContext)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState('work') // work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0)

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode)

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

        setMode(nextMode)
        modeRef.current = nextMode

        setSecondsLeft(nextSeconds)
        secondsLeftRef.current = nextSeconds
    }

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        secondsLeftRef.current = settingsInfo.workMinutes * 60
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        initTimer();

        const interval = setInterval( () => {
            if (isPausedRef.current) {
                return;
            }

            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000)

        return () => clearInterval(interval);
    }, [settingsInfo])

    const totalSeconds = mode === 'work' 
    ? settingsInfo.workMinutes * 60 
    : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;

    if (seconds<10) seconds = '0' + seconds

    return (
        <div className='timerBlock'>
            <div className='timer'>
                <CircularProgressbar
                value={percentage} 
                text={minutes + ':' + seconds}
                strokeWidth={3}
                styles={buildStyles({
                    pathColor: mode === 'work' ? red : green,
                    textColor: '#3D3D3D',
                    trailColor: '#98D4FF',
                    strokeLinecap: "butt",
                })} />
            </div>
            <div>
                {isPaused 
                ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false;}} /> 
                : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true;}} />} 
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>
        </div>
    )
}

export default Timer