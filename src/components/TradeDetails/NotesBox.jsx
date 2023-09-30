import Button from "react-bootstrap/Button";

const NotesBox = ({ selectedTrade, isSettingNote, setIsSettingNote }) => {
  const handleNoteChange = (event) => {
    // You can use this function to handle the change in the note input or textarea.
    // For instance, updating the state.
  };

  return (
    <div className="border border-gray-300 p-4 flex-grow">
      <Button
        variant="secondary"
        onClick={() => setIsSettingNote(!isSettingNote)}
      >
        {isSettingNote ? "Cancel" : "Add/Edit Notes"}
      </Button>

      {isSettingNote ? (
        // When isSettingNote is true, render an input or textarea for the user to set the note.
        <div>
          <textarea
            value={selectedTrade.notes || ""}
            onChange={handleNoteChange}
            className="mt-4 w-full p-2"
            rows="5"
          />
          <Button
            variant="success"
            className="mt-2"
            onClick={() => {
              // Add logic here to save the note and toggle the isSettingNote
              setIsSettingNote(false);
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        // When isSettingNote is false, show the current notes or the "No Notes" message.
        <p className="mt-4">
          {selectedTrade.notes ? (
            selectedTrade.notes
          ) : (
            <>
              <br />
              No Notes...
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default NotesBox;
