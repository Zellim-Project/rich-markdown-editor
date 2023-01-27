import { embedTaskPlaceholder, findPlaceholder, } from "../lib/embedSimplePlaceHolder";
import { ToastType } from "../types";
const embedATask = function (view, event, pos, options) {
    const { dictionary, embedATask, onShowToast } = options;
    if (!embedATask) {
        console.warn("embedATask callback must be defined to handle image uploads.");
        return;
    }
    event.preventDefault();
    const { schema } = view.state;
    const id = `embedTask`;
    const { tr } = view.state;
    tr.setMeta(embedTaskPlaceholder, {
        add: {
            id,
            pos,
        },
    });
    view.dispatch(tr);
    embedATask()
        .then(({ taskName, projectName, taskId, projectId }) => {
        const pos = findPlaceholder(view.state, id, "task");
        if (pos === null)
            return;
        const transaction = view.state.tr
            .replaceWith(pos, pos, schema.nodes.container_task.create({
            taskName,
            projectName,
            taskId,
            projectId,
        }))
            .setMeta(embedTaskPlaceholder, { remove: { id } });
        view.dispatch(transaction);
    })
        .catch(error => {
        console.error(error);
        const transaction = view.state.tr.setMeta(embedTaskPlaceholder, {
            remove: { id },
        });
        view.dispatch(transaction);
        if (onShowToast) {
            onShowToast(dictionary.imageUploadError, ToastType.Error);
        }
    });
};
export default embedATask;
//# sourceMappingURL=embedATask.js.map