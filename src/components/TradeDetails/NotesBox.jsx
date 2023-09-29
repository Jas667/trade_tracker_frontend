import Button from "react-bootstrap/Button";


const NotesBox = ({ notes, tradeId, selectedTrade }) => (
      <div className="border border-gray-300 p-4 flex-grow">
        <Button
          variant="secondary"
          onClick={() => console.log("Add notes to - ", selectedTrade.id)}
        >
          Add Notes
        </Button>
        {selectedTrade.notes ? (
          <p>{selectedTrade.notes}</p>
        ) : (
          <p>
            <br />
            No Notes...
          </p>
        )}
      </div>
);
    
export default NotesBox;
    