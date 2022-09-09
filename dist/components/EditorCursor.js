import * as React from "react";
import styled from "styled-components";
const StyledSpan = styled.span `
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-color: ${(props) => props.userColor};
  word-break: normal;
  pointer-events: none;
`;
const NameDiv = styled.div `
  position: absolute;
  top: -1.05em;
  left: -1px;
  font-size: 13px;
  background-color: ${(props) => props.userColor};
  border-radius: 2px;
  font-family: serif;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  user-select: none;
  color: white;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
  white-space: nowrap;
`;
const EditorCursor = ({ userColor, userName }) => {
    return (React.createElement(StyledSpan, { userColor: userColor },
        React.createElement(NameDiv, { userColor: userColor }, userName)));
};
export default EditorCursor;
//# sourceMappingURL=EditorCursor.js.map