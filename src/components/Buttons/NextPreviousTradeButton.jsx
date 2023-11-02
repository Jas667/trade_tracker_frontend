import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import TooltipComponent from "./Tooltips/TooltipComponent";

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

  const showPrevTooltip = currentIndex === 0;
  const showNextTooltip = currentIndex === rawTradeData.length - 1;

  return (
    <div className="flex justify-between mt-4">
      {showPrevTooltip ? (
        <TooltipComponent
          message="You are at the beginning of selected trades"
          placement="bottom"
        >
          <span>
            <Button
              onClick={handlePrevious}
              className="max-w-md mb-2"
              variant="secondary"
              disabled
            >
              ← Prev
            </Button>
          </span>
        </TooltipComponent>
      ) : (
        <Button
          onClick={handlePrevious}
          className="max-w-md mb-2"
          variant="secondary"
        >
          ← Prev
        </Button>
      )}

      {showNextTooltip ? (
        <TooltipComponent
          message="You are at the end of selected trades"
          placement="bottom"
        >
          <span>
            <Button
              onClick={handleNext}
              className="max-w-md mb-2"
              variant="secondary"
              disabled
            >
              Next →
            </Button>
          </span>
        </TooltipComponent>
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
