import { EditorView } from "prosemirror-view";
import {
  embedProjectPlaceholder,
  findPlaceholder,
} from "../lib/embedSimplePlaceHolder";
import { ToastType } from "../types";
import baseDictionary from "../dictionary";

export type IProject = {
  projectImg?: string;
  projectColor?: string;
  members: string;
  projectName: string;
  projectId: string;
};

const embedAProject = function(
  view: EditorView,
  event: Event,
  pos: number,
  options: {
    dictionary: typeof baseDictionary;
    embedAProject?: () => Promise<IProject>;
    onShowToast?: (message: string, code: string) => void;
  }
): void {
  const { dictionary, embedAProject, onShowToast } = options;

  if (!embedAProject) {
    console.warn(
      "embedAProject callback must be defined to handle image uploads."
    );
    return;
  }

  // okay, we have some dropped images and a handler – lets stop this
  // event going any further up the stack
  event.preventDefault();

  const { schema } = view.state;
  const id = `embedProject`;
  const { tr } = view.state;

  // insert a placeholder at this position, or mark an existing image as being
  // replaced
  tr.setMeta(embedProjectPlaceholder, {
    add: {
      id,
      pos,
    },
  });
  view.dispatch(tr);

  // start uploading the image file to the server. Using "then" syntax
  // to allow all placeholders to be entered at once with the uploads
  // happening in the background in parallel.
  embedAProject()
    .then(({ projectImg, projectName, projectId, projectColor, members }) => {
      const pos = findPlaceholder(view.state, id, "project");

      // if the content around the placeholder has been deleted
      // then forget about inserting this file
      if (pos === null) return;

      const transaction = view.state.tr
        .replaceWith(
          pos,
          pos,
          schema.nodes.container_project.create({
            projectImg,
            projectName,
            projectId,
            projectColor,
            members,
          })
        )
        .setMeta(embedProjectPlaceholder, { remove: { id } });

      view.dispatch(transaction);
    })
    .catch(error => {
      console.error(error);

      // cleanup the placeholder if there is a failure
      const transaction = view.state.tr.setMeta(embedProjectPlaceholder, {
        remove: { id },
      });
      view.dispatch(transaction);

      // let the user know
      if (onShowToast) {
        onShowToast(dictionary.imageUploadError, ToastType.Error);
      }
    });
};

export default embedAProject;
