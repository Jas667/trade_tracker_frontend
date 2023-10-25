import Button from "react-bootstrap/Button";
import InputForCreateNew from "./InputForCreateNew";
import { useEffect } from "react";


const TagsBox = ({
  tags,
  isEditing,
  setIsEditing,
  handleCancel,
  markForDeletion,
  tagsToDelete,
  handleSave,
  isCreatingNew,
  setIsCreatingNew,
  handleCancelCreatNew,
  handleCreateNewSave,
  handleTagsToCreateChange,
  tagsToCreate,
  isAddingTags,
  setIsAddingTags,
  tagsToAdd,
  setTagsToAdd,
  handleFetchAvailableTagsToAdd,
  tagsFromFetch,
  handleAddTagsSave,
  selectedTrade,
  onTradeNextPrevious
}) => {

  useEffect(() => { 
    onTradeNextPrevious(selectedTrade.id);
  }, [selectedTrade]);

  const renderDisplay = () => {
    if (isEditing && !isCreatingNew && !isAddingTags) {
      return (
        <>
          <Button variant="success" className="mr-2 mb-2" onClick={handleSave}>
            Save
          </Button>
          <Button variant="danger" className="mr-2 mb-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="mr-2 mb-2"
            onClick={() => {
              setIsAddingTags(true);
              handleFetchAvailableTagsToAdd();
            }}
          >
            Add
          </Button>
          <Button
            variant="secondary"
            className="mr-2 mb-2"
            onClick={() => setIsCreatingNew(true)}
          >
            Create New
          </Button>
        </>
      );
    } else if (isCreatingNew) {
      return (
        <>
          <InputForCreateNew
            value={tagsToCreate}
            onChange={handleTagsToCreateChange}
          />
          <div className="mt-2">
            <Button
              variant="primary"
              className="mr-2"
              onClick={handleCreateNewSave}
            >
              Save
            </Button>
            <Button variant="secondary" onClick={handleCancelCreatNew}>
              Cancel
            </Button>
          </div>
        </>
      );
    } else if (isAddingTags) {
      return (
        <>
          <div className="mt-2">
            <div className="mb-4">
              {" "}
              {/* Tags div */}
              <div className="border border-blue-300 p-4 rounded shadow-md">
              <p>Click tags to add:</p>
              {tagsFromFetch
                .filter(
                  (tagFromFetch) =>
                    !tags.some((tag) => tag.id === tagFromFetch.id)
                )
                .map((tag) => (
                  <span
                    key={tag.id}
                    className={`inline-block mr-2 mb-2 cursor-pointer p-1 rounded text-white ${
                      tagsToAdd.includes(tag.id)
                        ? "bg-green-600 border-2 border-black border-solid"
                        : "bg-gray-500"
                    }`}
                    onClick={() => {
                      if (tagsToAdd.includes(tag.id)) {
                        setTagsToAdd((prevTags) =>
                          prevTags.filter((tid) => tid !== tag.id)
                        );
                      } else {
                        setTagsToAdd((prevTags) => [...prevTags, tag.id]);
                      }
                    }}
                  >
                    {tag.tag_name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex">
              {" "}
              {/* Buttons div */}
              <Button
                variant="primary"
                className="mr-2"
                onClick={() => handleAddTagsSave()}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsAddingTags(false);
                  setTagsToAdd([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit Tags
        </Button>
      );
    }
  };

  return (
    <div className="border border-gray-300 p-4">
      <p className="font-bold">Tags:</p>
      {tags.length > 0 ? (
        tags.map((tag) => (
          <div key={tag.id} className="inline-block mr-2 mb-2">
            <span
              className={`bg-blue-500 p-1 rounded text-white ${
                tagsToDelete.includes(tag.id) && isEditing
                  ? "line-through bg-gray-400"
                  : ""
              }`}
            >
              {tag.tag_name}
              {isEditing && !isAddingTags && !isCreatingNew && (
                <span
                  className="cursor-pointer ml-3 mr-1 text-black"
                  onClick={() => markForDeletion(tag.id)}
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
      {renderDisplay()}
    </div>
  );
};

export default TagsBox;
