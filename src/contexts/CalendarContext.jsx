// react
import { useState, useMemo } from "react";
import { createContext } from "react";

export const CalendarContext = createContext({
  theme: null,
  setTheme: () => {},
  moods: null,
  setMoods: () => {},
  popupPosition: null,
  setPopupPosition: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  lang: null,
});

export const CalendarContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [moods, setMoods] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: null, y: null });
  const [selectedDate, setSelectedDate] = useState({ month: null, day: null });
  const lang = navigator.language;

  const values = useMemo(
    () => ({
      theme,
      setTheme,
      moods,
      setMoods,
      popupPosition,
      setPopupPosition,
      selectedDate,
      setSelectedDate,
      lang,
    }),
    [theme, moods, popupPosition, selectedDate, lang]
  );

  return (
    <CalendarContext.Provider value={values}>
      {children}
    </CalendarContext.Provider>
  );
};
