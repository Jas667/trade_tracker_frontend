// TooltipComponent.jsx
import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const TooltipComponent = ({ message, children, placement = 'top', ...props }) => {
  const renderTooltip = (props) => (
    <Tooltip id={`tooltip-${placement}`} {...props}>
      {message}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={placement} overlay={renderTooltip} {...props}>
      {children}
    </OverlayTrigger>
  );
};

export default TooltipComponent;
