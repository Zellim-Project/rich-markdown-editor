import { EditorView } from "prosemirror-view";
import {
  embedTaskPlaceholder,
  findPlaceholder,
} from "../lib/embedSimplePlaceHolder";
import { ToastType } from "../types";
import baseDictionary from "../dictionary";

export type ITask = {
  taskName: string;
  projectName: string;
  taskId: string;
  projectId: string;
};

const embedATask = function(
  view: EditorView,
  event: Event,
  pos: number,
  options: {
    dictionary: typeof baseDictionary;
    embedATask?: () => Promise<ITask>;
    onShowToast?: (message: string, code: string) => void;
  }
): void {
  const { dictionary, embedATask, onShowToast } = options;

  if (!embedATask) {
    console.warn(
      "embedATask callback must be defined to handle image uploads."
    );
    return;
  }

  // okay, we have some dropped images and a handler – lets stop this
  // event going any further up the stack
  event.preventDefault();

  const { schema } = view.state;
  const id = `embedTask`;
  const { tr } = view.state;

  // insert a placeholder at this position, or mark an existing image as being
  // replaced
  tr.setMeta(embedTaskPlaceholder, {
    add: {
      id,
      pos,
    },
  });
  view.dispatch(tr);

  // start uploading the image file to the server. Using "then" syntax
  // to allow all placeholders to be entered at once with the uploads
  // happening in the background in parallel.
  embedATask()
    .then(({ taskName, projectName, taskId, projectId }) => {
      const pos = findPlaceholder(view.state, id, "task");

      // if the content around the placeholder has been deleted
      // then forget about inserting this file
      if (pos === null) return;

      const transaction = view.state.tr
        .replaceWith(
          pos,
          pos,
          schema.nodes.container_task.create({
            taskName,
            projectName,
            taskId,
            projectId,
          })
        )
        .setMeta(embedTaskPlaceholder, { remove: { id } });

      view.dispatch(transaction);
    })
    .catch(error => {
      console.error(error);

      // cleanup the placeholder if there is a failure
      const transaction = view.state.tr.setMeta(embedTaskPlaceholder, {
        remove: { id },
      });
      view.dispatch(transaction);

      // let the user know
      if (onShowToast) {
        onShowToast(dictionary.imageUploadError, ToastType.Error);
      }
    });
};

export default embedATask;
