"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embedSimplePlaceHolder_1 = require("../lib/embedSimplePlaceHolder");
const types_1 = require("../types");
const embedAProject = function (view, event, pos, options) {
    const { dictionary, embedAProject, onShowToast } = options;
    if (!embedAProject) {
        console.warn("embedAProject callback must be defined to handle image uploads.");
        return;
    }
    event.preventDefault();
    const { schema } = view.state;
    const id = `embedProject`;
    const { tr } = view.state;
    tr.setMeta(embedSimplePlaceHolder_1.embedProjectPlaceholder, {
        add: {
            id,
            pos,
        },
    });
    view.dispatch(tr);
    embedAProject()
        .then(({ projectImg, projectName, projectId, projectColor, members }) => {
        const pos = embedSimplePlaceHolder_1.findPlaceholder(view.state, id, "project");
        if (pos === null)
            return;
        const transaction = view.state.tr
            .replaceWith(pos, pos, schema.nodes.container_project.create({
            projectImg,
            projectName,
            projectId,
            projectColor,
            members,
        }))
            .setMeta(embedSimplePlaceHolder_1.embedProjectPlaceholder, { remove: { id } });
        view.dispatch(transaction);
    })
        .catch(error => {
        console.error(error);
        const transaction = view.state.tr.setMeta(embedSimplePlaceHolder_1.embedProjectPlaceholder, {
            remove: { id },
        });
        view.dispatch(transaction);
        if (onShowToast) {
            onShowToast(dictionary.imageUploadError, types_1.ToastType.Error);
        }
    });
};
exports.default = embedAProject;
//# sourceMappingURL=embedAProject.js.map