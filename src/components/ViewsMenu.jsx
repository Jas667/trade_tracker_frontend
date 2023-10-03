import Nav from 'react-bootstrap/Nav';

function ViewsMenu({ currentView, setCurrentView}) {
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => setCurrentView("chartView")}>Overview</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCurrentView("tradeView")} >Trades</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCurrentView("winVsLossDays")}>Win vs Loss Days</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default ViewsMenu;