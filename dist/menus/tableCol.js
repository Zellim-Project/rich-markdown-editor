import { TrashIcon, AlignLeftIcon, AlignRightIcon, AlignCenterIcon, InsertLeftIcon, InsertRightIcon, } from "outline-icons";
import isNodeActive from "../queries/isNodeActive";
export default function tableColMenuItems(state, index, rtl, dictionary) {
    const { schema } = state;
    return [
        {
            name: "setColumnAttr",
            tooltip: dictionary.alignLeft,
            icon: AlignLeftIcon,
            attrs: { index, alignment: "left" },
            active: isNodeActive(schema.nodes.th, {
                colspan: 1,
                rowspan: 1,
                alignment: "left",
            }),
        },
        {
            name: "setColumnAttr",
            tooltip: dictionary.alignCenter,
            icon: AlignCenterIcon,
            attrs: { index, alignment: "center" },
            active: isNodeActive(schema.nodes.th, {
                colspan: 1,
                rowspan: 1,
                alignment: "center",
            }),
        },
        {
            name: "setColumnAttr",
            tooltip: dictionary.alignRight,
            icon: AlignRightIcon,
            attrs: { index, alignment: "right" },
            active: isNodeActive(schema.nodes.th, {
                colspan: 1,
                rowspan: 1,
                alignment: "right",
            }),
        },
        {
            name: "separator",
        },
        {
            name: rtl ? "addColumnAfter" : "addColumnBefore",
            tooltip: rtl ? dictionary.addColumnAfter : dictionary.addColumnBefore,
            icon: InsertLeftIcon,
            active: () => false,
        },
        {
            name: rtl ? "addColumnBefore" : "addColumnAfter",
            tooltip: rtl ? dictionary.addColumnBefore : dictionary.addColumnAfter,
            icon: InsertRightIcon,
            active: () => false,
        },
        {
            name: "separator",
        },
        {
            name: "deleteColumn",
            tooltip: dictionary.deleteColumn,
            icon: TrashIcon,
            active: () => false,
        },
    ];
}
//# sourceMappingURL=tableCol.js.map