import Table from "react-bootstrap/Table";

function TableForStats() {
  return (
    <div className="flex justify-center">
    <Table striped bordered hover variant="light">
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>Test</td>
          <td>Test</td>
        </tr>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>Test</td>
          <td>Test</td>
        </tr>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>Test</td>
          <td>Test</td>
        </tr>
      </tbody>
      </Table>
    </div>
  );
}

export default TableForStats;
