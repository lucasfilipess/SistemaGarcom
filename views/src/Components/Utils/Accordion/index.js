import React from 'react';
import styled from 'styled-components';
import { Card, Accordion, useAccordionToggle } from 'react-bootstrap';

const StyledButton = styled.button`
  background: #252f3f;
  width: 100%;
  border-radius: 0;
  border: 0;
  padding: 0;
  margin: 0;
`;

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey);

  return (
    <StyledButton variant="dark" type="button" onClick={decoratedOnClick}>
      {children}
    </StyledButton>
  );
}

function Toggle({ content, name }) {
  return (
    <Accordion>
      <Card style={{ padding: '0', border: '0', borderRadius: '0' }}>
        <Card.Header
          style={{
            padding: '0',
            border: '0',
            borderRadius: '0',
          }}
        >
          <CustomToggle eventKey="0">{name}</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ background: '#252f3f', padding: '0 0 17px 0' }}>
            {content}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
export default Toggle;
