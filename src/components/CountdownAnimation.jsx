import React, { useContext, useEffect } from 'react'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { SettingContext } from '../context/SettingsContext'

const CountdownAnimation = ({key=1, timer=20, animate=true, mode, children}) => {
  
  const {
    stopTimer, 
    executing, 
    setCurrentTimer, 
    startTimer, 
    updateExecute}=useContext(SettingContext)

  useEffect(() => {
    if (executing.active === 'break') {
      // Azioni da compiere quando si passa a "break"
      startTimer();
    } else if (executing.active === 'work') {
      // Azioni da compiere quando si passa a "work"
      startTimer();
    }
  }, [executing.active]);

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={timer*60}
      colors={mode === 'cicle' ? ['transparent'] : ['#8EC5FC', '#E0C3FC']}
      strokeWidth={6}
      size={290}
      trailColor='#151932'

      onComplete={() => {
        if (executing.active === 'work') {
            setCurrentTimer('break')
            startTimer();
        } else if (executing.active === 'break') {
            if (executing.cicle > 1) {
                updateExecute({
                    ...executing,
                    active: 'work', 
                    cicle: executing.cicle - 1 
                });
                startTimer();  
            } else {
                stopTimer();
            }
        }
        return [true, 0]; 
    }}
    >
      {children}
    </CountdownCircleTimer>
  )
}

export default CountdownAnimation