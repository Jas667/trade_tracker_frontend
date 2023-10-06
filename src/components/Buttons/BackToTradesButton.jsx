import Button from "react-bootstrap/Button";

function BackToTradesButton({ handleBackToTradesClick }) {
  return (
    <div>
      <Button
        onClick={handleBackToTradesClick}
        className="max-w-md mb-2"
        variant="secondary"
      >
        ← Back to Trades
      </Button>
    </div>
  );
}

export default BackToTradesButton;
