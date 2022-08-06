import React, { useContext } from "react";
import ReactSlider from "react-slider";
import './slider.css'
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";

function Settings () {
    const settingsInfo = useContext(SettingsContext)
    return(
        <div className="settings">
            SETTINGS
            <label>Work: {settingsInfo.workMinutes}:00</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={60} />
            <label>Break: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider 
                className="slider two"
                thumbClassName="thumb two"
                trackClassName="track"
                value={settingsInfo.breakMinutes}
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                min={1}
                max={30} />
            <div>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>
        </div>
    )
}

export default Settings