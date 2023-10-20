import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { addNoteToTrade } from "../../services/noteService";
import { useGlobalState } from "../../../context/GlobalStateContext";

const NotesBox = ({ selectedTrade, isSettingNote, setIsSettingNote }) => {
  const { isTradeNoteBeingAltered, setIsTradeNoteBeingAltered } =
    useGlobalState();

  const [isNoteTooLong, setIsNoteTooLong] = useState(false);
  const [modifiedNote, setModifiedNote] = useState(selectedTrade.notes || "");
  const [originalNote, setOriginalNote] = useState(selectedTrade.notes);
  const [displayedNote, setDisplayedNote] = useState(selectedTrade.notes);

  const saveNote = async () => {
    if (modifiedNote !== originalNote) {
      const noteObject = { notes: modifiedNote };

      const response = await addNoteToTrade(selectedTrade.id, noteObject);

      if (response.message === "Trade updated") {
        setIsSettingNote(false);
        setOriginalNote(modifiedNote);
        setDisplayedNote(modifiedNote);
        setIsTradeNoteBeingAltered(!isTradeNoteBeingAltered);
      }
    }
  };

  useEffect(() => {
    setModifiedNote(selectedTrade.notes || "");
    setDisplayedNote(selectedTrade.notes || "");
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
            onChange={(e) => {
              setModifiedNote(e.target.value)
              setIsNoteTooLong(e.target.value.length >= 2500);
            }}
            className="mt-4 w-full p-2"
            rows="5"
            maxLength="2500"
          />
          <Button
            variant="success"
            className="mt-2"
            onClick={saveNote}
            disabled={modifiedNote === originalNote || isNoteTooLong}
          >
            Save
          </Button>
          {isNoteTooLong && <p className="text-red-500 mt-2">Note is too long! Note must be less than 2500 characters.</p>}
        </div>
      ) : (
        // When isSettingNote is false, show the current notes or the "No Notes" message.
        <p className="mt-4">
          {displayedNote ? (
            displayedNote
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
