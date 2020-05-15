import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, Accordion, useAccordionToggle } from 'react-bootstrap';

const StyledButton = styled.button`
  height: 80px;
  width: 150px;
  width: 100%;
  background: transparent;
  transition: background 0.2s;
  color: #000;
  font-size: 24px;
`;

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey);

  return (
    <>
      <StyledButton type="button" onClick={decoratedOnClick}>
        {children}
      </StyledButton>
    </>
  );
}

function ToggleSections({ content, name, img }) {
  return (
    <Accordion>
      <Card>
        <Card.Header style={{ padding: '0' }}>
          <CustomToggle eventKey="0">
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '240px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <img
                  style={{ marginRight: '15px' }}
                  alt=""
                  width="30"
                  src={img}
                />
                {name}
              </div>
            </div>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ padding: '80px 50px', background: '#fff' }}>
            {content}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
export default ToggleSections;
