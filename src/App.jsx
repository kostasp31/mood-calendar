import { useEffect, useState } from 'react'
import './App.css'

import ChangeTheme from './ChangeTheme';
import Footer from './Footer';
import Title from './Title';

function App() {
  const [theme, setTheme] = useState('light');
  const [moods, setMoods] = useState(null);

  let date = new Date();
  let year = date.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const colors = [
    { index: 1, mood: 'TERRIBLE', color: '#4B5563' },
    { index: 2, mood: 'BAD',      color: '#9CA3AF' },
    { index: 3, mood: 'NEUTRAL',  color: '#FDE68A' },
    { index: 4, mood: 'GOOD',     color: '#86EFAC' },
    { index: 5, mood: 'PERFECT',  color: '#93C5FD' }
  ];

  useEffect(() => {
    const cachedData = localStorage.getItem('mood-calendar-data');

    if (cachedData) {
      if (JSON.parse(cachedData)?.[year]) {
        setMoods(JSON.parse(cachedData)[year]);
        return;
      }
    }

    const _moods = months.map((month, index) => {
      let lastdate = new Date(year, index+1, 0).getDate();

      let moodsArayMonth = [];
      for (let j=1; j<=lastdate; j++) {
        moodsArayMonth.push({
          day: j,
          mood: null // Math.floor(Math.random() * (5 - 1 + 1)) + 1
        })
      }
      return moodsArayMonth;
    });

    localStorage.setItem('mood-calendar-data', JSON.stringify({[year]: _moods}));

    setMoods(_moods);
  }, []);

  useEffect(() => {
    const cachedTheme = localStorage.getItem('mood-calendar-theme');
    if (cachedTheme) {
      setTheme(cachedTheme);
      document.documentElement.style.setProperty('--text-color', cachedTheme === 'light' ? 'rgba(29, 29, 29, 0.87)' : 'rgba(255, 255, 255, 0.87)');
      document.documentElement.style.setProperty('--bg-color', cachedTheme === 'light' ? '#ececec' : '#242424');
    } else {
      localStorage.setItem('mood-calendar-theme', 'light');
    }
  }, []);

  const changeMood = (month, day) => {
    let newMoods = JSON.parse(JSON.stringify(moods));

    const currentMood = newMoods[month][day];
    if (currentMood) {
      let newMood = {...currentMood, mood: currentMood.mood + 1};
      if (newMood.mood > 5) newMood.mood = 1;

      newMoods[month][day] = newMood;
      localStorage.setItem('mood-calendar-data', JSON.stringify({[year]: newMoods}));
      setMoods(newMoods);
    }
  }

  if (!moods) return;

  return (
    <div className='grandparent-container'>
      <Title />
      <div className='parent-container'>
        <ChangeTheme theme={theme} setTheme={setTheme} />
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <td>
              </td>
              {months.map((month, index) => 
                <th key={index}>
                  {month.substring(0,2)}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(31).keys()).map((day, index) => 
              <tr key={index}>
                <th>
                  {day+1}
                </th>
                
                {
                  Array.from(Array(12).keys()).map((month, index) => 
                    <td key={index} onClick={() => changeMood(month, day)} 
                    style={{
                      border: moods[month]?.[day]?.mood !== undefined ? `1px solid ${theme === 'dark' ? '#ececec' : '#242424'}` : 'none',
                      background: moods[month]?.[day]?.mood ? colors[moods[month]?.[day]?.mood - 1]?.color : theme === 'light' ? '#ececec' : '#242424'
                    }}>
                      {/* {moods[month]?.[day]?.mood ?? null} */}
                    </td>
                  )
                }

              </tr>
            )}
          </tbody>
        </table>

        <div style={{display: 'flex', flexDirection: 'column' ,justifyContent: 'center', marginLeft: '50px'}}>
          {colors.map((color, index) => 
            <div key={index} style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '-20px'}}>
              <div className='color-label' style={{ background: color.color }} />
              <p>{color.mood}</p>
            </div>  
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
