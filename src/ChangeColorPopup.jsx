import { useContext } from "react";
import { CalendarContext } from "./contexts/CalendarContext";

export default function ChangeColorPopup({ colors, year }) {
  const { theme, popupPosition, moods, setMoods, selectedDate } =
    useContext(CalendarContext);

  const changeMood = (newMoodIndex) => {
    let newMoods = JSON.parse(JSON.stringify(moods));
    const currentMood = newMoods[selectedDate.month][selectedDate.day];
    if (currentMood) {
      let newMood = { ...currentMood, mood: newMoodIndex };
      newMoods[selectedDate.month][selectedDate.day] = newMood;
      localStorage.setItem(
        "mood-calendar-data",
        JSON.stringify({ [year]: newMoods })
      );
      setMoods(newMoods);
    }
  };

  if (!popupPosition.x || !popupPosition.y) return;
  return (
    <div
      className="color-select-popup"
      style={{
        backgroundColor:
          theme === "dark" ? "rgb(65, 65, 65)" : "rgba(216, 216, 216, 1)",
        border: `1px solid ${
          theme === "dark" ? "rgba(207, 207, 207, 1)" : "rgba(180, 180, 180, 1)"
        }`,
        top: popupPosition.y - 60,
        left: popupPosition.x,
      }}
    >
      {colors.map((cl) => (
        <div // a color for each mood
          key={cl.index}
          className="popup-color-option"
          style={{
            background: cl.color,
          }}
          onClick={() => changeMood(cl.index)}
        />
      ))}
      <div // no color option
        className="popup-color-option popup-color-option-empty"
        style={{}}
        onClick={() => changeMood(null)}
      >
        <div className="popup-color-option-empty-line" />
      </div>
    </div>
  );
}
