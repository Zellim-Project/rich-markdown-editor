/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from "react";
import Editor from "../";

const EditorContext = React.createContext<Editor>({} as Editor);

export const useEditor = () => React.useContext(EditorContext);

export default EditorContext;
