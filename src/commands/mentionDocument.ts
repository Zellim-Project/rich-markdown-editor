import { EditorView } from "prosemirror-view";
import {
  mentionDocumentPlaceholder,
  findPlaceholder
} from "../lib/embedSimplePlaceHolder";
import { ToastType } from "../types";
import baseDictionary from "../dictionary";
import { IDoc } from "./linkDocument";

const mentionDocument = function(
  view: EditorView,
  event: Event,
  pos: number,
  options: {
    dictionary: typeof baseDictionary;
    mentionDocument?: () => Promise<IDoc>;
    onShowToast?: (message: string, code: string) => void;
  }
): void {
  const { dictionary, mentionDocument, onShowToast } = options;

  if (!mentionDocument) {
    console.warn(
      "mentionDocument callback must be defined to handle mention a Docuemnt."
    );
    return;
  }

  // okay, we have some dropped images and a handler – lets stop this
  // event going any further up the stack
  event.preventDefault();

  const { schema } = view.state;
  const id = `mentionDocument`;
  const { tr } = view.state;

  // insert a placeholder at this position, or mark an existing image as being
  // replaced
  tr.setMeta(mentionDocumentPlaceholder, {
    add: {
      id,
      pos
    }
  });
  view.dispatch(tr);

  // start uploading the image file to the server. Using "then" syntax
  // to allow all placeholders to be entered at once with the uploads
  // happening in the background in parallel.
  mentionDocument()
    .then(({ docId, docName, icon }) => {
      const pos = findPlaceholder(view.state, id, "mentionDocument");

      // if the content around the placeholder has been deleted
      // then forget about inserting this file
      if (pos === null) return;

      const transaction = view.state.tr
        .replaceWith(
          pos,
          pos,
          schema.nodes.mention_doc.create({ docId, docName, icon })
        )
        .setMeta(mentionDocumentPlaceholder, { remove: { id } });

      view.dispatch(transaction);
    })
    .catch(error => {
      console.error(error);

      // cleanup the placeholder if there is a failure
      const transaction = view.state.tr.setMeta(mentionDocumentPlaceholder, {
        remove: { id }
      });
      view.dispatch(transaction);

      // let the user know
      if (onShowToast) {
        onShowToast(dictionary.imageUploadError, ToastType.Error);
      }
    });
};

export default mentionDocument;
