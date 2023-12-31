import React from "react";
import TagsBox from "./TagsBox";
import NotesBox from "./NotesBox";
import TradeDetailsBox from "./TradeDetailsBox";
import AppContext from "../../../context/ContextProvider";
import { useContext } from "react";
import { useState, useEffect } from "react";
import {
  deleteTagFromTrade,
  createNewTag,
  addTagsToTrade,
  getTags,
} from "../../services/tagService";
import { individualTradeExecutions } from "../../services/tradeDetailsServices";
import { useGlobalState } from "../../../context/GlobalStateContext";
import TradeExecutions from "./TradeExecutions";
import BackToTradesButton from "../Buttons/BackToTradesButton";
import ImageUpload from "../ImageUpload";
import ImageGallery from "../ImageGallery";
import { getImagesForTrade } from "../../services/imageService";
import ViewImagesButton from "../Buttons/ViewImagesButton";

const TradeDetails = ({ fetchTagsForTrade, handleBackToTradesClick }) => {
  const {
    selectedTrade,
    tags,
    isEditing,
    setIsEditing,
    isCreatingNew,
    setIsCreatingNew,
  } = useContext(AppContext);

  const {
    isTradeTagBeingAltered,
    setIsTradeTagBeingAltered,
    setReRenderAfterTagUpdate,
  } = useGlobalState();

  const [tagsToDelete, setTagsToDelete] = useState([]);
  const [tagsToCreate, setTagsToCreate] = useState("");

  const [tagsFromFetch, setTagsFromFetch] = useState([]); //this is an array of tag objects
  const [tagsToAdd, setTagsToAdd] = useState([]); //this is an array of tag ids
  const [isAddingTags, setIsAddingTags] = useState(false);

  const [isSettingNote, setIsSettingNote] = useState(false);

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [individualTradeExecutionsData, setIndividualTradeExecutionsData] =
    useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await individualTradeExecutions({
        id: selectedTrade.id,
      });
      const filteredResponse = response.data.tradeWithDetails.trade_details;
      setIndividualTradeExecutionsData(filteredResponse);
    };
    fetchData();
  }, [selectedTrade]);

  useEffect(() => {
    fetchImagesForTrade();
  }, [selectedTrade]);

  const fetchImagesForTrade = async () => {
    const response = await getImagesForTrade(selectedTrade.id);
    if (response.message === "Images found") {
      // const imageUrls = response.data.imnages.map((img) => img.image_url);
      setImages(response.data.imnages);
    }
  };

  const openFirstImage = () => {
    setSelectedImageIndex(0);
    setSelectedImage(`${images[0].user_id}/${images[0].image_url}`);
  };

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

  const handleFetchAvailableTagsToAdd = async () => {
    const response = await getTags();

    if (response.message === "Tags found") {
      setTagsFromFetch(response.data.tags);
    }
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setIsEditing(false);
  };

  const handleAddTagsSave = async () => {
    if (tagsToAdd.length === 0) {
      setIsAddingTags(false);
      setTagsToAdd([]);
      return;
    }
    const tagsToAddObject = { tagIds: tagsToAdd };

    const addTagsResponse = await addTagsToTrade(
      tagsToAddObject,
      selectedTrade.id
    );

    if (addTagsResponse.message === "Tag added to trade") {
      setIsAddingTags(false);
      setTagsToAdd([]);
      setReRenderAfterTagUpdate((prev) => prev + 1);
      fetchTagsForTrade(selectedTrade.id);
    }
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
      setIsTradeTagBeingAltered(!isTradeTagBeingAltered);
      //get the ids of the newly created tags from the response, data, createdTagIds. Save them to an array and then pass that array to the addTagsToTrade function
      const createdTagIds = createNewResponse.data.createdTagIds;
      const tagsToAddObject = { tagIds: createdTagIds };

      const addTagsResponse = await addTagsToTrade(
        tagsToAddObject,
        selectedTrade.id
      );
    }
    setReRenderAfterTagUpdate((prev) => prev + 1);
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
      setReRenderAfterTagUpdate((prev) => prev + 1);
      fetchTagsForTrade(selectedTrade.id);
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <div>
        <ViewImagesButton openImagesClick={openFirstImage} images={images} />
      </div>
      <div className="flex mb-4">
        {/* Left-hand section (vertical layout) */}
        <div className="flex flex-col mr-4 w-1/3">
          {/* Trade details box */}
          <TradeDetailsBox selectedTrade={selectedTrade} />
          {/* Tags box */}
          <TagsBox
            selectedTrade={selectedTrade}
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
            isAddingTags={isAddingTags}
            setIsAddingTags={setIsAddingTags}
            tagsToAdd={tagsToAdd}
            setTagsToAdd={setTagsToAdd}
            handleFetchAvailableTagsToAdd={handleFetchAvailableTagsToAdd}
            tagsFromFetch={tagsFromFetch}
            setTagsFromFetch={setTagsFromFetch}
            handleAddTagsSave={handleAddTagsSave}
            onTradeNextPrevious={fetchTagsForTrade}
          />
        </div>
        {/* Right-hand section for the notes */}
        <NotesBox
          selectedTrade={selectedTrade}
          isSettingNote={isSettingNote}
          setIsSettingNote={setIsSettingNote}
        />
      </div>
      <BackToTradesButton handleBackToTradesClick={handleBackToTradesClick} />
      <TradeExecutions
        individualTradeExecutionsData={individualTradeExecutionsData}
      />
      <ImageUpload
        selectedTrade={selectedTrade}
        onImageUpload={fetchImagesForTrade}
      />
      <ImageGallery
        images={images}
        onDeleteImage={fetchImagesForTrade}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <BackToTradesButton handleBackToTradesClick={handleBackToTradesClick} />
    </>
  );
};

export default TradeDetails;
