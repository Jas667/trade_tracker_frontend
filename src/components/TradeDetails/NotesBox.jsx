import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { addNoteToTrade } from "../../services/noteService";

const NotesBox = ({ selectedTrade, isSettingNote, setIsSettingNote }) => {
  const [modifiedNote, setModifiedNote] = useState(selectedTrade.notes);
  const [originalNote, setOriginalNote] = useState(selectedTrade.notes);

  const saveNote = async () => {
    if (modifiedNote !== originalNote) {
      const noteObject = { notes: modifiedNote };

      const response = await addNoteToTrade(selectedTrade.id, noteObject);

      if (response.message === "Trade updated") {
        setIsSettingNote(false);
        setOriginalNote(modifiedNote);
      }
    }
  };

  useEffect(() => {
    setModifiedNote(selectedTrade.notes);
    setOriginalNote(selectedTrade.notes);
  }, [selectedTrade.notes]);

  return (
    <div className="border border-gray-300 p-4 flex-grow">
      <Button
        variant="secondary"
        onClick={() => {
          setIsSettingNote(!isSettingNote);
          if (isSettingNote) setModifiedNote(selectedTrade.notes);
        }}
      >
        {isSettingNote ? "Cancel" : "Add/Edit Notes"}
      </Button>

      {isSettingNote ? (
        <div>
          <textarea
            value={modifiedNote}
            type="text"
            onChange={(e) => setModifiedNote(e.target.value)}
            className="mt-4 w-full p-2"
            rows="5"
          />
          <Button
            variant="success"
            className="mt-2"
            onClick={saveNote}
            disabled={modifiedNote === originalNote}
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
