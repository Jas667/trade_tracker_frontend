import Alert from 'react-bootstrap/Alert';

function DismissibleAlert({ message, show, onClose }) {
  return (
    show ? (
      <Alert variant="danger" onClose={onClose} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        <p>{message}</p>
      </Alert>
    ) : null
  );
}

export default DismissibleAlert;
