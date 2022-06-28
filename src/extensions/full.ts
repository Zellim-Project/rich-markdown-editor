import Highlight from "../marks/Highlight";
import TemplatePlaceholder from "../marks/Placeholder";
import Blockquote from "../nodes/Blockquote";
import BulletList from "../nodes/BulletList";
import CheckboxItem from "../nodes/CheckboxItem";
import CheckboxList from "../nodes/CheckboxList";
import CodeBlock from "../nodes/CodeBlock";
import CodeFence from "../nodes/CodeFence";
import Embed from "../nodes/Embed";
// import FileDoc from "../nodes/FileDoc";
import Heading from "../nodes/Heading";
import HorizontalRule from "../nodes/HorizontalRule";
import ListItem from "../nodes/ListItem";
import Notice from "../nodes/Notice";
import OrderedList from "../nodes/OrderedList";
import Table from "../nodes/Table";
import TableCell from "../nodes/TableCell";
import TableHeadCell from "../nodes/TableHeadCell";
import TableRow from "../nodes/TableRow";
import BlockMenuTrigger from "../plugins/BlockMenuTrigger";
import Folding from "../plugins/Folding";
import Keys from "../plugins/Keys";
import basicPackage from "./basic";

const fullPackage = [
  ...basicPackage,
  CodeBlock,
  CodeFence,
  CheckboxList,
  CheckboxItem,
  Blockquote,
  BulletList,
  OrderedList,
  Embed,
  // FileDoc,
  ListItem,
  Notice,
  Heading,
  HorizontalRule,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  Highlight,
  TemplatePlaceholder,
  Folding,
  Keys,
  BlockMenuTrigger,
];

export default fullPackage;
