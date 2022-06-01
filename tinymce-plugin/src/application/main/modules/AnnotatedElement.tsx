import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface AnnotatedElementProps {
  itemprop: string
  label: string
}

const AnnotatedItem = styled.span`
  background-color: #ff000010;
  border: 1px solid #00000020;
  position: relative;
`

const HoverBubble = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  position: absolute;
  padding: 15px;
  background-color: #fff;
  color: #000;
  z-index: 10001;
`

export default function AnnotatedElement({ itemprop, label }: AnnotatedElementProps): ReactElement {
  const [hover, setHover] = useState(false)

  // The itemprop attribute may, according to specification, contain multiple unordered values spearated by a space
  // https://html.spec.whatwg.org/multipage/microdata.html#names%3A-the-itemprop-attribute
  const itemPropValue = itemprop.split(", ").join(' ')
  
  function enableHover() {
    setHover(true)
  }

  function disableHover() {
    setHover(false)
  }

  return (
    <React.Fragment>
      <AnnotatedItem onMouseEnter={enableHover} onMouseLeave={disableHover} itemProp={itemPropValue}>
        {label}
        {
          hover && (
            <HoverBubble>{itemprop}</HoverBubble>
          )
        }
      </AnnotatedItem>
    </React.Fragment>
  );
}