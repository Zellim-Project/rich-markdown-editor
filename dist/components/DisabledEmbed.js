import { OpenIcon } from "outline-icons";
import * as React from "react";
import Widget from "./Widget";
export default function DisabledEmbed(props) {
    return (React.createElement(Widget, { title: props.embed.title, href: props.attrs.href, icon: props.embed.icon(undefined), context: props.attrs.href.replace(/^https?:\/\//, ""), isSelected: props.isSelected, theme: props.theme },
        React.createElement(OpenIcon, { color: "currentColor", size: 20 })));
}
//# sourceMappingURL=DisabledEmbed.js.map