import Button from "react-bootstrap/Button";
import InputForCreateNew from "./InputForCreateNew";

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
}) => {
  const renderDisplay = () => {
    if (isEditing && !isCreatingNew) {
      return (
        <>
          <Button variant="success" className="mr-2 mb-2" onClick={handleSave}>
            Save
          </Button>
          <Button variant="danger" className="mr-2 mb-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="secondary" className="mr-2 mb-2">
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
                tagsToDelete.includes(tag.id) ? "line-through bg-gray-400" : ""
              }`}
            >
              {tag.tag_name}
              {isEditing && (
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
