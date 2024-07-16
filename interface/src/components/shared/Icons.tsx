import { RiDraftLine, RiSpamLine } from "react-icons/ri";
import {
  FaRegStar,
  FaStar,
  FaPenFancy,
  FaRegEnvelope,
  FaEnvelopeOpenText,
  FaReply,
} from "react-icons/fa";
import {
  IoTrashBinOutline,
  IoSettingsOutline,
  IoDocumentTextOutline,
  IoArrowBackOutline,
} from "react-icons/io5";
import { TbAlarmSnooze, TbSend } from "react-icons/tb";
import {
  MdOutlineCreate,
  MdOutlineArchive,
  MdAttachFile,
  MdClose,
  MdLabelImportantOutline,
  MdLabel,
  MdDeleteOutline,
  MdInbox,
  MdOutlineMarkEmailRead,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";
import {
  IoMdRefresh,
  IoIosOptions,
  IoMdHelpCircleOutline,
} from "react-icons/io";
import { CiMinimize1 } from "react-icons/ci";
import { GiExpand } from "react-icons/gi";
import { GoTriangleDown } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import { BsFileEarmarkPptFill } from "react-icons/bs";
import { TiDocumentText } from "react-icons/ti";

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
export const MarkReadIcon = ({ size, className }: Props) => (
  <MdOutlineMarkEmailRead size={size} className={className} />
);
export const MakrUnreadIcon = ({ size, className }: Props) => (
  <MdOutlineMarkEmailUnread size={size} className={className} />
);
export const SnoozeIcon = ({ size, className }: Props) => (
  <TbAlarmSnooze size={size} className={className} />
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

export const AttachmentIcon = ({ size, className }: Props) => (
  <MdAttachFile size={size} className={className} />
);
export const LabelOutlineIcon = ({ size, className }: Props) => (
  <MdLabelImportantOutline size={size} className={className} />
);
export const LabelSolidIcon = ({ size, className }: Props) => (
  <MdLabel size={size} className={className} />
);
export const DeleteIcon = ({ size, className }: Props) => (
  <MdDeleteOutline size={size} className={className} />
);
export const ReplyIcon = ({ size, className }: Props) => (
  <FaReply size={size} className={className} />
);
export const TriangleDownIcon = ({ size, className }: Props) => (
  <GoTriangleDown size={size} className={className} />
);
export const OptionsVerticalIcon = ({ size, className }: Props) => (
  <SlOptionsVertical size={size} className={className} />
);
export const SearchOptions = ({ size, className }: Props) => (
  <IoIosOptions size={size} className={className} />
);
export const PowerPointIcon = ({ size, className }: Props) => (
  <BsFileEarmarkPptFill size={size} className={className} />
);
export const GoogleDocIcon = ({ size, className }: Props) => (
  <IoDocumentTextOutline size={size} className={className} />
);
export const DocumentIcon = ({ size, className }: Props) => (
  <TiDocumentText size={size} className={className} />
);
export const GoBackIcon = ({ size, className }: Props) => (
  <IoArrowBackOutline size={size} className={className} />
);
export const FilterIcon = ({ size, className }: Props) => (
  <IoArrowBackOutline size={size} className={className} />
);
