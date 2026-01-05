import React, { useEffect, useContext } from "react";
import { CalendarContext } from "./contexts/CalendarContext";
import "./App.css";

import ChangeTheme from "./ChangeTheme";
import Footer from "./Footer";
import Title from "./Title";
import ChangeColorPopup from "./ChangeColorPopup";

function App() {
  const {
    theme,
    setTheme,
    moods,
    setMoods,
    popupPosition,
    setPopupPosition,
    setSelectedDate,
    lang,
  } = useContext(CalendarContext);

  let date = new Date();
  let year = date.getFullYear();

  const months_en = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months_el = [
    "Ιανουάριος",
    "Φεβρουάριος",
    "Μάρτιος",
    "Απρίλιος",
    "Μάιος",
    "Ιούνιος",
    "Ιούλιος",
    "Αύγουστος",
    "Σεπτέμβριος",
    "Οκτώβριος",
    "Νοέμβριος",
    "Δεκέμβριος",
  ];
  const months = lang === "el-GR" ? months_el : months_en;

  const colors = [
    {
      index: 1,
      mood: lang === "el-GR" ? "ΑΠΑΙΣΙΑ" : "TERRIBLE",
      color: "#4B5563",
    },
    { index: 2, mood: lang === "el-GR" ? "ΚΑΚΗ" : "BAD", color: "#9CA3AF" },
    {
      index: 3,
      mood: lang === "el-GR" ? "ΜΕΤΡΙΑ" : "NEUTRAL",
      color: "#FDE68A",
    },
    { index: 4, mood: lang === "el-GR" ? "ΚΑΛΗ" : "GOOD", color: "#86EFAC" },
    {
      index: 5,
      mood: lang === "el-GR" ? "ΤΕΛΕΙΑ" : "PERFECT",
      color: "#93C5FD",
    },
  ];

  useEffect(() => {
    const cachedData = localStorage.getItem("mood-calendar-data");

    if (cachedData) {
      if (JSON.parse(cachedData)?.[year]) {
        setMoods(JSON.parse(cachedData)[year]);
        return;
      }
    }

    const _moods = months.map((month, index) => {
      let lastdate = new Date(year, index + 1, 0).getDate();

      let moodsArayMonth = [];
      for (let j = 1; j <= lastdate; j++) {
        moodsArayMonth.push({
          day: j,
          mood: null, // Math.floor(Math.random() * (5 - 1 + 1)) + 1
        });
      }
      return moodsArayMonth;
    });

    localStorage.setItem(
      "mood-calendar-data",
      JSON.stringify({ [year]: _moods })
    );

    setMoods(_moods);
  }, []);

  useEffect(() => {
    const cachedTheme = localStorage.getItem("mood-calendar-theme");
    if (cachedTheme) {
      setTheme(cachedTheme);
      document.documentElement.style.setProperty(
        "--text-color",
        cachedTheme === "light"
          ? "rgba(29, 29, 29, 0.87)"
          : "rgba(255, 255, 255, 0.87)"
      );
      document.documentElement.style.setProperty(
        "--bg-color",
        cachedTheme === "light" ? "#ececec" : "#242424"
      );
    } else {
      localStorage.setItem("mood-calendar-theme", "light");
    }
  }, []);

  // const changeMoodAuto = (event, month, day) => {
  //   let newMoods = JSON.parse(JSON.stringify(moods));

  //   const currentMood = newMoods[month][day];
  //   if (currentMood) {
  //     let newMood = { ...currentMood, mood: currentMood.mood + 1 };
  //     if (newMood.mood > 5) newMood.mood = null;
  //     else if (newMood.mood === null) newMood.mood = 1;

  //     newMoods[month][day] = newMood;
  //     localStorage.setItem('mood-calendar-data', JSON.stringify({ [year]: newMoods }));
  //     setMoods(newMoods);
  //   }
  // }

  const changeMoodPopup = (event, month, day) => {
    let x = event.clientX;
    let y = event.clientY;
    setPopupPosition({ x: x, y: y });
    setSelectedDate({ month: month, day: day });
  };

  if (!moods) return;

  return (
    <div
      className="grandparent-container"
      onClick={() => {
        popupPosition.x &&
          popupPosition.y &&
          setPopupPosition({ x: null, y: null });
      }}
    >
      <Title />
      <ChangeTheme />
      <ChangeColorPopup colors={colors} year={year} />
      <div className="parent-container">
        <div
          className="calendar"
          style={{
            backgroundColor:
              theme === "dark" ? "rgb(65, 65, 65)" : "rgba(216, 216, 216, 1)",
          }}
        >
          {Array.from({ length: 32 }).map((_, dayIndex) =>
            dayIndex === 0 ? (
              <React.Fragment key={dayIndex}>
                {Array.from({ length: 13 }).map((_, _monthIndex) => {
                  return (
                    <div
                      className="calendar-item calendar-month"
                      key={`${_monthIndex}-${dayIndex}`}
                    >
                      {_monthIndex === 0
                        ? ""
                        : months?.[_monthIndex - 1]?.substring(0, 2)}
                    </div>
                  );
                })}
              </React.Fragment>
            ) : (
              <React.Fragment key={dayIndex}>
                {Array.from({ length: 13 }).map((_, _monthIndex) => {
                  const monthIndex = _monthIndex - 1;

                  if (monthIndex === -1) {
                    return (
                      <div
                        className="calendar-item calendar-day"
                        key={`${monthIndex}-${dayIndex}`}
                      >
                        {dayIndex}
                      </div>
                    );
                  } else {
                    if (moods[monthIndex]?.[dayIndex - 1]) {
                      return (
                        <div
                          className="calendar-item calendar-mood-box"
                          key={`${monthIndex}-${dayIndex - 1}`}
                          onClick={(e) =>
                            changeMoodPopup(e, monthIndex, dayIndex - 1)
                          }
                          style={{
                            animationDelay: `${Math.round(
                              (2000 / 31) * Math.round(Math.random() * dayIndex)
                            )}ms`,
                            background: moods[monthIndex]?.[dayIndex - 1]?.mood
                              ? colors[
                                  moods[monthIndex]?.[dayIndex - 1]?.mood - 1
                                ]?.color
                              : theme === "light"
                              ? "#ececec"
                              : "#242424",
                          }}
                        >
                          {/* {moods[monthIndex]?.[dayIndex - 1]?.mood ?? null} */}
                        </div>
                      );
                    } else
                      return (
                        <div
                          className="calendar-item calendar-empty"
                          key={`${monthIndex}-${dayIndex - 1}`}
                        />
                      );
                  }
                })}
              </React.Fragment>
            )
          )}
        </div>

        {/* <div className='color-legend'>
          {colors.map((color, index) =>
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '-20px' }}>
              <div className='color-label' style={{ background: color.color }} />
              <p>{color.mood}</p>
            </div>
          )}
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
