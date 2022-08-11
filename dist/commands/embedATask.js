"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const embedSimplePlaceHolder_1 = __importStar(require("../lib/embedSimplePlaceHolder"));
const types_1 = require("../types");
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
    tr.setMeta(embedSimplePlaceHolder_1.default, {
        add: {
            id,
            pos,
        },
    });
    view.dispatch(tr);
    embedATask()
        .then(({ taskName, projectName, taskId, projectId }) => {
        const pos = embedSimplePlaceHolder_1.findPlaceholder(view.state, id);
        if (pos === null)
            return;
        const transaction = view.state.tr
            .replaceWith(pos, pos, schema.nodes.container_task.create({
            taskName,
            projectName,
            taskId,
            projectId,
        }))
            .setMeta(embedSimplePlaceHolder_1.default, { remove: { id } });
        view.dispatch(transaction);
    })
        .catch(error => {
        console.error(error);
        const transaction = view.state.tr.setMeta(embedSimplePlaceHolder_1.default, {
            remove: { id },
        });
        view.dispatch(transaction);
        if (onShowToast) {
            onShowToast(dictionary.imageUploadError, types_1.ToastType.Error);
        }
    });
};
exports.default = embedATask;
//# sourceMappingURL=embedATask.js.map