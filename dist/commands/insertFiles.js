"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_state_1 = require("prosemirror-state");
const uploadPlaceholder_1 = __importStar(require("../lib/uploadPlaceholder"));
const types_1 = require("../types");
const findAttachmentById_1 = __importDefault(require("../queries/findAttachmentById"));
let uploadId = 0;
const insertFiles = function (view, event, pos, files, options) {
    const { dictionary, uploadFile, onFileUploadStart, onFileUploadStop, onShowToast, } = options;
    if (!uploadFile) {
        console.warn("uploadFile callback must be defined to handle uploads.");
        return;
    }
    event.preventDefault();
    if (onFileUploadStart) {
        onFileUploadStart();
    }
    const { schema } = view.state;
    let complete = 0;
    for (const file of files) {
        const id = `upload-${uploadId++}`;
        const isImage = file.type.startsWith("image/") && !options.isAttachment;
        const { tr } = view.state;
        if (isImage) {
            tr.setMeta(uploadPlaceholder_1.default, {
                add: {
                    id,
                    file,
                    pos,
                    isImage,
                    replaceExisting: options.replaceExisting,
                },
            });
            view.dispatch(tr);
        }
        else {
            const $pos = tr.doc.resolve(pos);
            view.dispatch(view.state.tr.replaceWith($pos.pos, $pos.pos + ($pos.nodeAfter?.nodeSize || 0), schema.nodes.attachment.create({
                id,
                title: file.name ?? "Untitled",
                size: file.size,
            })));
        }
        uploadFile(file)
            .then(src => {
            if (isImage) {
                const newImg = new Image();
                newImg.onload = () => {
                    const result = (0, uploadPlaceholder_1.findPlaceholder)(view.state, id);
                    if (result === null) {
                        return;
                    }
                    const [from, to] = result;
                    view.dispatch(view.state.tr
                        .replaceWith(from, to || from, schema.nodes.image.create({ src }))
                        .setMeta(uploadPlaceholder_1.default, { remove: { id } }));
                    if (view.state.selection.from === from) {
                        view.dispatch(view.state.tr.setSelection(new prosemirror_state_1.NodeSelection(view.state.doc.resolve(from))));
                    }
                };
                newImg.onerror = error => {
                    throw error;
                };
                newImg.src = src;
            }
            else {
                const result = (0, findAttachmentById_1.default)(view.state, id);
                if (result === null) {
                    return;
                }
                const [from, to] = result;
                view.dispatch(view.state.tr.replaceWith(from, to || from, schema.nodes.attachment.create({
                    href: src,
                    title: file.name ?? "Untitled",
                    size: file.size,
                })));
                if (view.state.selection.from === from) {
                    view.dispatch(view.state.tr.setSelection(new prosemirror_state_1.NodeSelection(view.state.doc.resolve(from))));
                }
            }
        })
            .catch(error => {
            if (isImage) {
                view.dispatch(view.state.tr.setMeta(uploadPlaceholder_1.default, {
                    remove: { id },
                }));
            }
            else {
                const result = (0, findAttachmentById_1.default)(view.state, id);
                if (result === null) {
                    return;
                }
                const [from, to] = result;
                view.dispatch(view.state.tr.deleteRange(from, to || from));
            }
            onShowToast(error.message || dictionary.fileUploadError, types_1.ToastType.Error);
        })
            .finally(() => {
            complete++;
            if (complete === files.length && onFileUploadStop) {
                onFileUploadStop();
            }
        });
    }
};
exports.default = insertFiles;
//# sourceMappingURL=insertFiles.js.map