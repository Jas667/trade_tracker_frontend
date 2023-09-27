import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function GrossNetButton({ radioValue, setRadioValue }) {
  const [checked, setChecked] = useState(false);

  const radios = [
    { name: "Net", value: true },
    { name: "Gross", value: false },
  ];

  return (
    <>
      <Row className="justify-content-end mt-3">
        <Col xs="auto" className="mr-3">
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={radio.value ? "outline-secondary" : "outline-success"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) =>
                  setRadioValue(e.currentTarget.value === "true")
                }
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
}

export default GrossNetButton;
