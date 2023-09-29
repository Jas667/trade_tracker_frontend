import React from "react";
import Button from "react-bootstrap/Button";

const TradeDetails = ({ selectedTrade, tags, isEditing, setIsEditing }) => {
  const handleEditTags = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex mb-4">
      {/* Left-hand section (vertical layout) */}
      <div className="flex flex-col mr-4 w-1/3">
        {/* Trade details box */}
        <div className="border border-gray-300 p-4 mb-4">
          <p className="font-bold">{selectedTrade.symbol}</p>
          <p className="font-bold">
            {selectedTrade.open_date} -- {selectedTrade.open_time} to{" "}
            {selectedTrade.close_time}
          </p>
          <p>
            Shares Traded:{" "}
            <span className="font-bold">
              {selectedTrade.total_shares_traded}
            </span>
          </p>
          <p>
            Closed Gross P&L:{" "}
            <span className="font-bold">
              {Number(selectedTrade.gross_profit_loss).toFixed(2)}
            </span>
          </p>
          <p></p>
          <p>
            Commissions/Fees:
            <span className="font-bold">
              {(
                Number(selectedTrade.total_commission) +
                Number(selectedTrade.total_fees)
              ).toFixed(2)}
            </span>
          </p>
          <p>
            Closed Net P&L:{" "}
            <span className="font-bold">{selectedTrade.profit_loss}</span>
          </p>
        </div>
        {/* Tags box */}
        <div className="border border-gray-300 p-4">
          <p className="font-bold">Tags:</p>
          {tags.length > 0 ? (
            tags.map((tag) => (
              // This outer wrapper ensures the entire tag behaves as a single unit for layout
              <div key={tag.id} className="inline-block mr-2 mb-2">
                <span className="bg-blue-500 p-1 rounded text-white">
                  {tag.tag_name}
                  {isEditing && (
                    <span
                      className="cursor-pointer ml-3 mr-1 text-black"
                      onClick={() => removeTag(tag)}
                    >
                      x
                    </span>
                  )}
                </span>
              </div>
            ))
          ) : (
            <div>No tags set for this trade.</div>
          )}
          <br />
          {isEditing ? (
            <>
              <Button
                variant="success"
                className="mr-2" // Added margin for spacing between buttons
                onClick={() => {
                  // ... Any save logic you might have ...
                  setIsEditing(false); // Turn off editing mode
                }}
              >
                Save
              </Button>
              <Button
                variant="dark"
                className="mr-2"
                onClick={() => {
                  // ... Any cancel logic you might have, like restoring the previous tags ...
                  setIsEditing(false); // Turn off editing mode without saving changes
                }}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                className="mr-2" // Added margin for spacing between buttons
                onClick={() => {
                  // ... Any save logic you might have ...
                  setIsEditing(false); // Turn off editing mode
                }}
              >
                Add
              </Button>
              <Button
                variant="secondary"
                className="mr-2" // Added margin for spacing between buttons
                onClick={() => {
                  // ... Any save logic you might have ...
                  setIsEditing(false); // Turn off editing mode
                }}
              >
                Create New
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Edit Tags
            </Button>
          )}
        </div>
      </div>

      {/* Right-hand section for the notes */}
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
    </div>
  );
};

export default TradeDetails;
