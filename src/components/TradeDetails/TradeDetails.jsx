import React from "react";
import TagsBox from "./TagsBox";
import NotesBox from "./NotesBox";
import TradeDetailsBox from "./TradeDetailsBox";
import AppContext from "../../../context/ContextProvider";
import { useContext } from "react";
import { useState } from "react";
import { deleteTagFromTrade } from "../../services/tagService";

const TradeDetails = ({ fetchTagsForTrade }) => {
  const { selectedTrade, tags, isEditing, setIsEditing } =
    useContext(AppContext);

  const [tagsToDelete, setTagsToDelete] = useState([]);

  const markForDeletion = (tagId) => {
    setTagsToDelete((prevTags) => [...prevTags, tagId]);
  };

  const handleCancel = () => {
    setTagsToDelete([]);
    setIsEditing(false);
  };

  const handleEditTags = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (tagsToDelete.length === 0) {
      handleCancel();
      return;
    }
    const tagIdsObject = { tagIds: tagsToDelete };

    const response = await deleteTagFromTrade(tagIdsObject, selectedTrade.id);
    if (response.status === 204) {
      setIsEditing(false);
      setTagsToDelete([]);
      fetchTagsForTrade(selectedTrade.id);
    } else {
      console.error(response);
    }
  };

  return (
    <div className="flex mb-4">
      {/* Left-hand section (vertical layout) */}
      <div className="flex flex-col mr-4 w-1/3">
        {/* Trade details box */}
        <TradeDetailsBox selectedTrade={selectedTrade} />
        {/* Tags box */}
        <TagsBox
          tags={tags}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          markForDeletion={markForDeletion}
          handleCancel={handleCancel}
          tagsToDelete={tagsToDelete}
          handleSave={handleSave}
        />
      </div>
      {/* Right-hand section for the notes */}
      <NotesBox
        notes={selectedTrade.notes}
        tradeId={selectedTrade.id}
        selectedTrade={selectedTrade}
      />
    </div>
  );
};

export default TradeDetails;
