import { MdInbox } from "react-icons/md";
import { RiDraftLine, RiSpamLine } from "react-icons/ri";
import {
  FaRegStar,
  FaStar,
  FaPenFancy,
  FaRegEnvelope,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { IoTrashBinOutline, IoSettingsOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { MdOutlineCreate, MdOutlineArchive, MdAttachFile, MdClose } from "react-icons/md";
import {  } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { CiMinimize1 } from "react-icons/ci";
import { GiExpand } from "react-icons/gi";

type Props = {
  size?: number;
  className?: string;
};
export const InboxIcon = ({ size, className }: Props) => (
  <MdInbox size={size} className={className} />
);
export const DraftIcon = ({ size, className }: Props) => (
  <RiDraftLine size={size} className={className} />
);
export const StarIcon = ({ size, className }: Props) => (
  <FaRegStar size={size} className={className} />
);
export const StarSolidIcon = ({ size, className }: Props) => (
  <FaStar size={size} className={className} />
);
export const TrashIcon = ({ size, className }: Props) => (
  <IoTrashBinOutline size={size} className={className} />
);
export const SentIcon = ({ size, className }: Props) => (
  <IoTrashBinOutline size={size} className={className} />
);
export const ComposeIcon = ({ size, className }: Props) => (
  <MdOutlineCreate size={size} className={className} />
);
export const WriteIcon = ({ size, className }: Props) => (
  <FaPenFancy size={size} className={className} />
);
export const SpamIcon = ({ size, className }: Props) => (
  <RiSpamLine size={size} className={className} />
);
export const SendIcon = ({ size, className }: Props) => (
  <TbSend size={size} className={className} />
);
export const ReadIcon = ({ size, className }: Props) => (
  <FaEnvelopeOpenText size={size} className={className} />
);
export const UnreadIcon = ({ size, className }: Props) => (
  <FaRegEnvelope size={size} className={className} />
);
export const ArchiveIcon = ({ size, className }: Props) => (
  <MdOutlineArchive size={size} className={className} />
);
export const RefreshIcon = ({ size, className }: Props) => (
  <IoMdRefresh size={size} className={className} />
);
export const HelpIcon = ({ size, className }: Props) => (
  <IoMdHelpCircleOutline size={size} className={className} />
);
export const SettingsIcon = ({ size, className }: Props) => (
  <IoSettingsOutline size={size} className={className} />
);
export const MinimizeIcon = ({ size, className }: Props) => (
  <CiMinimize1 size={size} className={className} />
);
export const ExpandIcon = ({ size, className }: Props) => (
  <GiExpand size={size} className={className} />
);
export const CloseIcon = ({ size, className }: Props) => (
  <MdClose size={size} className={className} />
);
// export const SendIcon = ({ size, className }: Props) => (
//   <MdSend size={size} className={className} />
// );
export const AttatchmentIcon = ({ size, className }: Props) => (
  <MdAttachFile size={size} className={className} />
);
