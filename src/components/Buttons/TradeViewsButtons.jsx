import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function TradeViewsButtons({ currentView, setCurrentView }) {
  const [checked, setChecked] = useState(false);
  const [buttonValue, setButtonValue] = useState("chartView");

  const buttons = [
    { name: "Standard View", value: "chartView" },
    { name: "Trades View", value: "tradeView" },
    { name: "Win VS Loss Days View", value: "winVsLossDays" },
    { name: "Tags View", value: "tagsView" },
  ];

  return (
    <>
      <br />
      <ButtonGroup>
        {buttons.map((button, idx) => (
          <ToggleButton
            key={idx}
            id={`tradeViewradio-${idx}`}
            type="radio"
            variant={"outline-success"}
            name="tradeViewradio"
            value={button.value}
            checked={buttonValue === button.value}
            onChange={(e) => {
              setButtonValue(e.currentTarget.value);
              setCurrentView(e.currentTarget.value);
            }}
          >
            {button.name}
          </ToggleButton>
        ))}
              </ButtonGroup>
              <br />
    </>
  );
}

export default TradeViewsButtons;
