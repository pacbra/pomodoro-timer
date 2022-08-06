import './App.css';
import './clouds.jpg';
import Timer from './Timer'
import Settings from './Settings';
import { useState } from 'react';
import SettingsContext from './SettingsContext';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(10);

  return (
    <main>
      <div>
        <SettingsContext.Provider value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}>
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </div>
    </main>
  );
}

export default App;
