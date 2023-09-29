import Button from "react-bootstrap/Button";

const TagsBox = ({
  tags,
  isEditing,
  setIsEditing,
  handleCancel,
  markForDeletion,
  tagsToDelete,
  handleSave,
}) => {
  return (
    <div className="border border-gray-300 p-4">
      <p className="font-bold">Tags:</p>
      {tags.length > 0 ? (
        tags.map((tag) => (
          <div key={tag.id} className="inline-block mr-2 mb-2">
            <span className={`bg-blue-500 p-1 rounded text-white ${tagsToDelete.includes(tag.id) ? 'line-through bg-gray-400' : ''}`}>
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
      {isEditing ? (
        <>
          <Button
            variant="success"
            className="mr-2 mb-2"
            onClick={() => {
              // Logic to save changes goes here
              handleSave();
            }}
          >
            Save
          </Button>
          <Button
            variant="danger"
            className="mr-2 mb-2"
            onClick={() => {
              // Logic to cancel editing goes here
              handleCancel();
            }}
          >
            Cancel
          </Button>
          <Button variant="secondary" className="mr-2 mb-2">
            Add
          </Button>
          <Button variant="secondary" className="mr-2 mb-2">
            Create New
          </Button>
        </>
      ) : (
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit Tags
        </Button>
      )}
    </div>
  );
};

export default TagsBox;
