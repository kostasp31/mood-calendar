import { useContext } from "react";
import { CalendarContext } from "./contexts/CalendarContext";

const HelpOverlay = () => {
  const { colors, theme, lang } = useContext(CalendarContext);

  return (
    <div
      className="color-legend"
      style={{
        backgroundColor:
          theme === "dark" ? "rgb(65, 65, 65)" : "rgba(216, 216, 216, 1)",
        color: theme === "dark" ? "#ffffff" : "#000000",
        border: `2px solid ${theme === "light" ? "rgb(65, 65, 65)" : "rgba(216, 216, 216, 1)"}`,
        boxShadow: `5px 3px 5px 1px ${theme === "light" ? "rgb(65, 65, 65)" : "rgba(216, 216, 216, 1)"}`
      }}
    >
      <span
        style={{
          borderBottom: `1px solid ${theme === "light" ? "rgb(65, 65, 65)" : "rgba(216, 216, 216, 1)"}`,
          paddingBottom: "5px",
          maxWidth: '200px'
        }}
      >
        {lang === "el-GR" ? 'Περιγράψτε τη μέρα σας με ένα χρώμα' : 'Describe your day with a color'}
      </span>
      {colors.toReversed().map((color, index) => (
        <div key={index} className="color-legend-flex">
          <div className="color-legend-flex">
            <div className="color-label" style={{ background: color.color }} />
            <p style={{ fontSize: "1.2em" }}>➜</p>
            <p style={{ fontSize: "1.2em" }}>{color.emoji}</p>
          </div>
          <p style={{ fontSize: "0.9em", width: "50px" }}>{color.mood}</p>
        </div>
      ))}
    </div>
  );
};

export default HelpOverlay;
