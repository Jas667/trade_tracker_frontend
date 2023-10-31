import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function ViewImagesButton({ openImagesClick, images }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      No images for trade
    </Tooltip>
  );

  return (
    <div className="flex justify-end mt-3">
      {images.length === 0 ? (
        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
          <span className="d-inline-block">
            {" "}
            {/* Wrap the button in a span to allow the tooltip to show when button is disabled */}
            <Button
              onClick={openImagesClick}
              className="max-w-md mb-2"
              variant="secondary"
              disabled
            >
              View Trade Images
            </Button>
          </span>
        </OverlayTrigger>
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
