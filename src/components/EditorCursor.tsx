import * as React from "react";
import styled from "styled-components";

const StyledSpan = styled.span<{
  userColor: string;
}>`
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-color: ${(props) => props.userColor};
  word-break: normal;
  pointer-events: none;
`;

const NameDiv = styled.div<{
  userColor: string;
}>`
  position: absolute;
  top: -1.3em;
  left: -1px;
  font-size: 12px;
  background-color: ${(props) => props.userColor};
  border-radius: 3px;
  font-family: nunito, helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  user-select: none;
  color: white;
  padding: 2px 5px;
  white-space: nowrap;
`;

type Props = {
  userName: string;
  userColor: string;
};

const EditorCursor: React.FC<Props> = ({ userColor, userName }) => {
  return (
    <StyledSpan userColor={userColor}>
      <NameDiv userColor={userColor}>{userName}</NameDiv>
    </StyledSpan>
  );
};

export default EditorCursor;
