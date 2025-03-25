
import '../CSS/Pomodoro.css';
import { useContext, useEffect } from 'react';
import SetPomodoro from '../components/SetPomodoro';
import CountdownAnimation from '../components/CountdownAnimation';
import {SettingContext} from '../context/SettingsContext';
import Button from '../components/Button';

function Pomodoro(){
  
  const {
    pomodoro, 
    executing, 
    setCurrentTimer, 
    SettingBtn, 
    children,
    startAnimate,
    startTimer,
    pauseTimer,
    updateExecute}= useContext(SettingContext)

  useEffect(()=> {updateExecute(executing)}, [executing, startAnimate])

  return (
    <div className="pom-container">
      <h1>Pomodoro</h1>
        {pomodoro === 0 ?
          <SetPomodoro/> :
          <>
            <ul className='labels'>
              <li>
                  <Button
                    title="Studio"
                    className='button-pom'
                    activeClass={executing.active === 'work' && 'active-label'}
                    _callback={() => setCurrentTimer('work')}
                  />
              </li>
              <li>
                  <Button
                    title="Pausa"
                    className='button-pom'
                    activeClass={executing.active === 'break' && 'active-label'}
                    _callback={() => setCurrentTimer('break')}
                  />
              </li>
              <li>
                  <Button
                    title="Ciclo"
                    className='button-pom'
                    activeClass={executing.active === 'cicle' && 'active-label'}
                    _callback={() => setCurrentTimer('cicle')}
                  />
              </li>
            </ul>
            <Button className='set' title='Impostazioni' _callback={SettingBtn}/>
            <div className='time-container'>
              <div className='time-wrapper'>
              {executing.active && (
                <CountdownAnimation
                  key={pomodoro}
                  timer={pomodoro}
                  animate={startAnimate}
                  mode={executing.active}
                >
                {children}
                </CountdownAnimation>
                )}
              </div>
            </div>
            <div className="button-wrapper">
              <Button title="Avvia" className={startAnimate && 'active'} _callback={startTimer}/>
              <Button title="Ferma" className={!startAnimate && 'active'} _callback={pauseTimer}/>
            </div>
          </>
        }

        <ul className="pom-background-animation">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
    </div>
  );
}

export default Pomodoro;
