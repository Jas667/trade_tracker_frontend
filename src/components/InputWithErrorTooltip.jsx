import OverlayTrigger from "react-bootstrap/OverlayTrigger";


export function InputWithErrorTooltip({
  name,
  label,
  type,
  value,
  errorMessage,
  onChange,
}) {
  return (
    <div className="flex flex-col py-2">
      <label>{label}</label>
      <OverlayTrigger
        placement="right"
        show={!!errorMessage}
        overlay={(props) =>
          errorMessage ? renderTooltip(props, errorMessage) : <></>
        }
      >
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="border p-2"
          type={type}
        />
      </OverlayTrigger>
    </div>
  );
}
