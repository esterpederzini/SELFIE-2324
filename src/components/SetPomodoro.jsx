import React, {useContext, useState} from 'react'
import Button from './Button'
import { SettingContext } from '../context/SettingsContext'
import '../CSS/SetPomodoro.css';

const SetPomodoro = () => {
    const {updateExecute}= useContext(SettingContext)
    const [newTimer, setNewTimer]= useState({
        work: 30,
        break: 5,
        cicle: 5,
        active: 'work'
    })

    const handleChange= input => {
        const {name, value}= input.target
        switch(name){
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            
            case 'break':
                setNewTimer({
                    ...newTimer,
                    break: parseInt(value)
                })
                break;  
            
            case 'cicle':
                setNewTimer({
                    ...newTimer,
                    cicle: parseInt(value)
                })
                break;

            default:
                break;
        }
    }

    const handleSubmit= e =>{
        e.preventDefault()
        updateExecute(newTimer)
    }
    
  return (
    <div className='set-form-container'>
        <form noValidate>
            <div className='input-wrapper'>
                <input className='input' name='work' onChange={handleChange} value={newTimer.work}/>
                <input className='input' name='break' onChange={handleChange} value={newTimer.break}/>
                <input className='input' name='cicle' onChange={handleChange} value={newTimer.cicle}/>
            </div>
            <Button className="setTimer" title="Avvia Timer" _callback={handleSubmit}/>
        </form>
    </div>
  )
}

export default SetPomodoro