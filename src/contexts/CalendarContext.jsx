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
  helpOpen: null,
  setHelpOpen: () => {},
  lang: null,
  months: null,
  colors: null,
});

export const CalendarContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [moods, setMoods] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: null, y: null });
  const [selectedDate, setSelectedDate] = useState({ month: null, day: null });
  const [helpOpen, setHelpOpen] = useState(false); // help popup with explanations
  const lang = navigator.language;

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
  const colors = useMemo(() => [
    {
      index: 1,
      mood: lang === "el-GR" ? "ΑΠΑΙΣΙΑ" : "TERRIBLE",
      color: "#4B5563",
      emoji: "☹️",
    },
    {
      index: 2,
      mood: lang === "el-GR" ? "ΚΑΚΗ" : "BAD",
      color: "#9CA3AF",
      emoji: "😕",
    },
    {
      index: 3,
      mood: lang === "el-GR" ? "ΜΕΤΡΙΑ" : "NEUTRAL",
      color: "#FDE68A",
      emoji: "😑",
    },
    {
      index: 4,
      mood: lang === "el-GR" ? "ΚΑΛΗ" : "GOOD",
      color: "#86EFAC",
      emoji: "🙂",
    },
    {
      index: 5,
      mood: lang === "el-GR" ? "ΤΕΛΕΙΑ" : "PERFECT",
      color: "#93C5FD",
      emoji: "😄",
    },
  ], [lang]);

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
      helpOpen,
      setHelpOpen,
      lang,
      months,
      colors,
    }),
    [theme, moods, popupPosition, selectedDate, helpOpen, lang, months, colors],
  );

  return (
    <CalendarContext.Provider value={values}>
      {children}
    </CalendarContext.Provider>
  );
};
