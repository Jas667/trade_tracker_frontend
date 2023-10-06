import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function ViewsMenu({ currentView, setCurrentView}) {
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => setCurrentView("chartView")}>Overview</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={currentView === "tradeView"} onClick={() => setCurrentView("tradeView")} >Trades</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={currentView === "winVsLossDays"} onClick={() => setCurrentView("winVsLossDays")}>Win vs Loss Days</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={currentView === "tagsView"} onClick={() => setCurrentView("tagsView")}>
            Tags
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default ViewsMenu;