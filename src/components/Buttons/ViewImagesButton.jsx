import Button from "react-bootstrap/Button";
import TooltipComponent from "../Tooltips/TooltipComponent";

function ViewImagesButton({ openImagesClick, images }) {
  return (
    <div className="flex justify-end mt-3">
      {images.length === 0 ? (
        <TooltipComponent message="No images for trade" placement="bottom">
          <span className="d-inline-block">
            <Button
              onClick={openImagesClick}
              className="max-w-md mb-2"
              variant="secondary"
              disabled
            >
              View Trade Images
            </Button>
          </span>
        </TooltipComponent>
      ) : (
        <Button
          onClick={openImagesClick}
          className="max-w-md mb-2"
          variant="secondary"
        >
          View Trade Images
        </Button>
      )}
    </div>
  );
}

export default ViewImagesButton;
