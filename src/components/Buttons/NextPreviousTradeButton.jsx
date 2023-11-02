import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function NextPreviousTradeButton({
  rawTradeData,
  selectedTrade,
  setSelectedTrade,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = rawTradeData.findIndex(
      (trade) => trade.id === selectedTrade.id
    );
    setCurrentIndex(index);
  }, [selectedTrade, rawTradeData]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedTrade(rawTradeData[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < rawTradeData.length - 1) {
      setSelectedTrade(rawTradeData[currentIndex + 1]);
    }
  };

  const renderTooltipNoPrev = (props) => (
    <Tooltip id="button-tooltip-prev" {...props}>
      You are at the beginning of selected trades
    </Tooltip>
  );

  const renderTooltipNoNext = (props) => (
    <Tooltip id="button-tooltip-next" {...props}>
      You are at the end of selected trades
    </Tooltip>
  );

  return (
    <div className="flex justify-between mt-4">
      {currentIndex === 0 ? (
        <OverlayTrigger placement="bottom" overlay={renderTooltipNoPrev}>
          <span className="d-inline-block">
            <Button
              onClick={handlePrevious}
              className="max-w-md mb-2"
              variant="secondary"
              disabled
            >
              ← Prev
            </Button>
          </span>
        </OverlayTrigger>
      ) : (
        <Button
          onClick={handlePrevious}
          className="max-w-md mb-2"
          variant="secondary"
        >
          ← Prev
        </Button>
      )}
      {currentIndex === rawTradeData.length - 1 ? (
        <OverlayTrigger placement="bottom" overlay={renderTooltipNoNext}>
          <span className="d-inline-block">
            <Button
              onClick={handleNext}
              className="max-w-md mb-2"
              variant="secondary"
              disabled
            >
              Next →
            </Button>
          </span>
        </OverlayTrigger>
      ) : (
        <Button
          onClick={handleNext}
          className="max-w-md mb-2"
          variant="secondary"
        >
          Next →
        </Button>
      )}
    </div>
  );
}

export default NextPreviousTradeButton;
