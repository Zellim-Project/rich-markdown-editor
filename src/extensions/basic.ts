import Bold from "../marks/Bold";
import Code from "../marks/Code";
import Italic from "../marks/Italic";
import Link from "../marks/Link";
import Strikethrough from "../marks/Strikethrough";
import Underline from "../marks/Underline";
import Doc from "../nodes/Doc";
import Emoji from "../nodes/Emoji";
import HardBreak from "../nodes/HardBreak";
import Image from "../nodes/Image";
import Paragraph from "../nodes/Paragraph";
import Text from "../nodes/Text";
import History from "../plugins/History";
import MaxLength from "../plugins/MaxLength";
import PasteHandler from "../plugins/PasteHandler";
import Placeholder from "../plugins/Placeholder";
import SmartText from "../plugins/SmartText";
import TrailingNode from "../plugins/TrailingNode";

const basicPackage = [
  Doc,
  HardBreak,
  Paragraph,
  Emoji,
  Text,
  Image,
  Bold,
  Code,
  Italic,
  Underline,
  Link,
  Strikethrough,
  History,
  SmartText,
  TrailingNode,
  PasteHandler,
  Placeholder,
  MaxLength,
];

export default basicPackage;
