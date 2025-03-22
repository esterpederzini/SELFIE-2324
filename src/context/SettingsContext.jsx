import React, { createContext, useState, useEffect } from 'react'

export const SettingContext=createContext()

const SettingsContextProvider = (props) => {

    const [pomodoro, setPomodoro]=useState(0)
    const [executing, setExecuting]=useState({})
    const [startAnimate, setStartAnimate]=useState(false)

    // Aggiunge uno stato per memorizzare il tempo rimanente per ciascuna modalità
    const [remainingTime, setRemainingTime] = useState({
        work: 0,
        break: 0,
        cicle: 0
    });

    function startTimer(){
        setStartAnimate(true)
    }

    function pauseTimer(){
        setStartAnimate(false)
    }

    function stopTimer(){
        setStartAnimate(false)
        setRemainingTime({
            work: executing.work * 60,
            break: executing.break * 60,
            cicle: executing.cicle * 60
        });
    }

    const SettingBtn = () => {
        setExecuting({})
        setPomodoro(0)
        setRemainingTime({
            work: 0,
            break: 0,
            cicle: 0
        });
    }

    const setCurrentTimer = (active_state) => {
        // Salva il tempo rimanente se stai cambiando stato
        if (executing.active === 'work' && active_state !== 'work') {
            updateRemainingTime('work', pomodoro);
        } else if (executing.active === 'break' && active_state !== 'break') {
            updateRemainingTime('break', pomodoro);
        }
        
        // Imposta il timer corrente
        setExecuting((prev) => ({
            ...prev,
            active: active_state,
        }));

        // Riprendi il pomodoro dal tempo rimanente
        setPomodoro(remainingTime[active_state] || (active_state === 'work' ? executing.work * 60 : executing.break * 60));
    };

    const updateExecute=(updatedSettings) => {
        setExecuting(updatedSettings)
        setTimerTime(updatedSettings)
        setRemainingTime({
            work: updatedSettings.work * 60,
            break: updatedSettings.break * 60,
            cicle: updatedSettings.cicle * 60
        });
    }

    const setTimerTime = evalute => {
        switch (evalute.active) {
            case 'work':
                setPomodoro(evalute.work)
                break;
        
            case 'break':
                setPomodoro(evalute.break)
                break;
                
            case 'cicle':
                setPomodoro(evalute.cicle)
                break;

            default:
                setPomodoro(0)
                break;
        }
    }
    
    const children = ({remainingTime}) => {
        const minutes =Math.floor(remainingTime/60)
        const seconds = remainingTime%60
        const sum=minutes+seconds
        if(executing.active === 'work'){
        return `${minutes}:${seconds}`
        }else if(executing.active === 'break'){
            return `${minutes}:${seconds}`
        }else{
            return `${executing.cicle}`
        }
        
    }

    const updateRemainingTime = (mode, timeLeft) => {
        setRemainingTime((prev) => ({
            ...prev,
            [mode]: timeLeft
        }));
    };

  return (
    <SettingContext.Provider 
        value={{
            stopTimer, 
            updateExecute,
            pomodoro,
            executing,
            startAnimate,
            startTimer,
            pauseTimer,
            SettingBtn,
            setCurrentTimer,
            setTimerTime,
            updateExecute,
            children,
            updateRemainingTime,
            remainingTime
            }}>
        {props.children}
    </SettingContext.Provider>
  )
}

export default SettingsContextProvider