import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface AnnotatedElementProps {
  itemtype: string
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

export default function AnnotatedElement({ itemtype, label }: AnnotatedElementProps): ReactElement {
  const [hover, setHover] = useState(false)

  // The itemtype attribute may, according to specification, contain multiple unordered values spearated by a space
  // The values of this attribute must be valid URLs that are defined to use the same vocabulary - in our case only schema.org
  // https://html.spec.whatwg.org/multipage/microdata.html#attr-itemtype
  const itemType = itemtype.split(", ").filter(type => type.startsWith("Schema:")).map(type => type.replace("Schema:", "https://schema.org/")).join(' ')
  
  function enableHover() {
    setHover(true)
  }

  function disableHover() {
    setHover(false)
  }

  return (
    <React.Fragment>
      <AnnotatedItem onMouseEnter={enableHover} onMouseLeave={disableHover} itemScope={true} itemType={itemType}>
        {label}
        {
          hover && (
            <HoverBubble>{itemtype}</HoverBubble>
          )
        }
      </AnnotatedItem>
    </React.Fragment>
  );
}