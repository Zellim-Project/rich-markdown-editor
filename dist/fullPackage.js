import Doc from "./nodes/Doc";
import Text from "./nodes/Text";
import Blockquote from "./nodes/Blockquote";
import BulletList from "./nodes/BulletList";
import CodeBlock from "./nodes/CodeBlock";
import CodeFence from "./nodes/CodeFence";
import CheckboxList from "./nodes/CheckboxList";
import Emoji from "./nodes/Emoji";
import CheckboxItem from "./nodes/CheckboxItem";
import Embed from "./nodes/Embed";
import HardBreak from "./nodes/HardBreak";
import Heading from "./nodes/Heading";
import HorizontalRule from "./nodes/HorizontalRule";
import Image from "./nodes/Image";
import ListItem from "./nodes/ListItem";
import Notice from "./nodes/Notice";
import FileDoc from "./nodes/FileDoc";
import EmbedTask from "./nodes/embedTask";
import EmbedProject from "./nodes/embedProject";
import LinkDocument from "./nodes/linkDocument";
import OrderedList from "./nodes/OrderedList";
import Paragraph from "./nodes/Paragraph";
import Table from "./nodes/Table";
import TableCell from "./nodes/TableCell";
import TableHeadCell from "./nodes/TableHeadCell";
import TableRow from "./nodes/TableRow";
import Bold from "./marks/Bold";
import Code from "./marks/Code";
import Highlight from "./marks/Highlight";
import Italic from "./marks/Italic";
import Link from "./marks/Link";
import Strikethrough from "./marks/Strikethrough";
import TemplatePlaceholder from "./marks/Placeholder";
import Underline from "./marks/Underline";
import Sync from "./plugins/Sync";
import BlockMenuTrigger from "./plugins/BlockMenuTrigger";
import EmojiTrigger from "./plugins/EmojiTrigger";
import Folding from "./plugins/Folding";
import History from "./plugins/History";
import Keys from "./plugins/Keys";
import MaxLength from "./plugins/MaxLength";
import Placeholder from "./plugins/Placeholder";
import SmartText from "./plugins/SmartText";
import TrailingNode from "./plugins/TrailingNode";
import PasteHandler from "./plugins/PasteHandler";
import baseDictionary from "./dictionary";
const dictionary = baseDictionary;
export const fullPackage = props => [
    new Doc(),
    new HardBreak(),
    new Paragraph(),
    new Blockquote(),
    new CodeBlock({
        dictionary,
        onShowToast: props.onShowToast
    }),
    new CodeFence({
        dictionary,
        onShowToast: props.onShowToast
    }),
    new Emoji(),
    new Text(),
    new CheckboxList(),
    new CheckboxItem(),
    new BulletList(),
    new Embed({ embeds: props.embeds }),
    new ListItem(),
    new Notice({
        dictionary
    }),
    new FileDoc({
        dictionary,
        uploadFile: props.uploadFile,
        downloadAFile: props.downloadAFile,
        onFileUploadStart: props.onFileUploadStart,
        onFileUploadStop: props.onFileUploadStop,
        onShowToast: props.onShowToast
    }),
    new EmbedTask({
        dictionary,
        embedATask: props.embedATask,
        openATask: props.openATask,
        onShowToast: props.onShowToast
    }),
    new EmbedProject({
        dictionary,
        embedAProject: props.embedAProject,
        openAProject: props.openAProject,
        onShowToast: props.onShowToast
    }),
    new LinkDocument({
        dictionary,
        linkDocument: props.linkDocument,
        openDocument: props.openDocument,
        onShowToast: props.onShowToast
    }),
    new Heading({
        dictionary,
        onShowToast: props.onShowToast,
        offset: props.headingsOffset
    }),
    new HorizontalRule(),
    new Image({
        dictionary,
        uploadImage: props.uploadImage,
        onImageUploadStart: props.onImageUploadStart,
        onImageUploadStop: props.onImageUploadStop,
        onShowToast: props.onShowToast
    }),
    new Table(),
    new TableCell({
        onSelectTable: props.handleSelectTable,
        onSelectRow: props.handleSelectRow
    }),
    new TableHeadCell({
        onSelectColumn: props.handleSelectColumn
    }),
    new TableRow(),
    new Bold(),
    new Code(),
    new Highlight(),
    new Italic(),
    new TemplatePlaceholder(),
    new Underline(),
    new Link({
        onKeyboardShortcut: props.handleOpenLinkMenu,
        onClickLink: props.onClickLink,
        onClickHashtag: props.onClickHashtag,
        onHoverLink: props.onHoverLink
    }),
    new Strikethrough(),
    new OrderedList(),
    new Sync({
        yProvider: props.yProvider,
        yXmlFragment: props.yXmlFragment
    }),
    new History(),
    new Folding(),
    new SmartText(),
    new TrailingNode(),
    new PasteHandler(),
    new Keys({
        onBlur: props.handleEditorBlur,
        onFocus: props.handleEditorFocus,
        onSave: props.handleSave,
        onSaveAndExit: props.handleSaveAndExit,
        onCancel: props.onCancel
    }),
    new BlockMenuTrigger({
        dictionary,
        onOpen: props.handleOpenBlockMenu,
        onClose: props.handleCloseBlockMenu
    }),
    new EmojiTrigger({
        onOpen: (search) => {
            props?.setState({ emojiMenuOpen: true, blockMenuSearch: search });
        },
        onClose: () => {
            props?.setState({ emojiMenuOpen: false });
        }
    }),
    new Placeholder({
        placeholder: props.placeholder
    }),
    new MaxLength({
        maxLength: props.maxLength
    })
];
//# sourceMappingURL=fullPackage.js.map