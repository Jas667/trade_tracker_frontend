import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

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

  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={handlePrevious}
        className="max-w-md mb-2"
        variant="secondary"
        disabled={currentIndex === 0}
      >
        ← Prev
      </Button>
      <Button
        onClick={handleNext}
        className="max-w-md mb-2"
        variant="secondary"
        disabled={currentIndex === rawTradeData.length - 1}
      >
        Next →
      </Button>
    </div>
  );
}

export default NextPreviousTradeButton;
