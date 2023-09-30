import React from "react";
import TagsBox from "./TagsBox";
import NotesBox from "./NotesBox";
import TradeDetailsBox from "./TradeDetailsBox";
import AppContext from "../../../context/ContextProvider";
import { useContext } from "react";
import { useState } from "react";
import {
  deleteTagFromTrade,
  createNewTag,
  addTagsToTrade,
} from "../../services/tagService";

const TradeDetails = ({ fetchTagsForTrade }) => {
  const {
    selectedTrade,
    tags,
    isEditing,
    setIsEditing,
    isCreatingNew,
    setIsCreatingNew,
  } = useContext(AppContext);

  const [tagsToDelete, setTagsToDelete] = useState([]);
  const [tagsToCreate, setTagsToCreate] = useState("");

  const markForDeletion = (tagId) => {
    setTagsToDelete((prevTags) => [...prevTags, tagId]);
  };

  const handleTagsToCreateChange = (e) => {
    setTagsToCreate(e.target.value);
  };

  const handleCancel = () => {
    setTagsToDelete([]);
    setIsEditing(false);
  };

  const handleEditTags = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelCreatNew = () => {
    setIsCreatingNew(false);
    setIsEditing(true);
    setTagsToCreate("");
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setIsEditing(false);
  };

  const handleCreateNewSave = async () => {
    if (tagsToCreate.length === 0) {
      handleCancelCreatNew();
      return;
    }
    //split the tagsToCreate string into an array of strings, splitting at the commas and removing any whitespace
    const newTags = tagsToCreate.split(",").map((tag) => tag.trim());

    const newTagsObject = { tag_name: newTags };

    const createNewResponse = await createNewTag(newTagsObject);

    if (createNewResponse.message === "Tag(s) created") {
      //get the ids of the newly created tags from the response, data, createdTagIds. Save them to an array and then pass that array to the addTagsToTrade function
      const createdTagIds = createNewResponse.data.createdTagIds;
      const tagsToAddObject = { tagIds: createdTagIds };

      const addTagsResponse = await addTagsToTrade(
        tagsToAddObject,
        selectedTrade.id
      );
    }

    fetchTagsForTrade(selectedTrade.id);
    handleCancelCreatNew();
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
          isCreatingNew={isCreatingNew}
          setIsCreatingNew={setIsCreatingNew}
          handleCreateNew={handleCreateNew}
          handleCancelCreatNew={handleCancelCreatNew}
          handleCreateNewSave={handleCreateNewSave}
          handleTagsToCreateChange={handleTagsToCreateChange}
          tagsToCreate={tagsToCreate}
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
