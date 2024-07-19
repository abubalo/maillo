import { Email } from "../../types";
import { FaStar, FaReply, FaForward } from "react-icons/fa";
import { useEmailStoreState } from "../../stores/stateStores";
import Avatar from "../profile/Avatar";
import {
  OptionsVerticalIcon,
  ReplyIcon,
  TriangleDownIcon,
} from "../shared/Icons";
import Tooltip from "../ui/tooltip/Tooltip";
import { formatDate } from "../../utils/formatDate";
import Attachments from "./Attachment";
import EmailActions from "./EmailAction";
import Dropdown from "../ui/Dropdown/Dropdown";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import Button from "../ui/button/Button";
import { Link } from "react-router-dom";

type Props = {
  email: Email;
};

const DetailView: React.FC<Props> = ({ email }) => {
  const { onStarEmail, onReply, onForward } = useEmailStoreState();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = email.subject || "Maillo";
    return () => {
      document.title = previousTitle;
    };
  }, [email.subject]);

  const sanitizeBody = DOMPurify.sanitize(email.body || "", {
    USE_PROFILES: { html: true },
  });

  return (
    <section className="w-full min-h-screen px-4 rounded-lg">
      <EmailActions email={email} />
      <div className="box-border flex flex-col h-screen p-6 space-y-8 overflow-scroll bg-neutral-500/10">
        <div className="h-full rounded-tl-md rounded-tr-md">
          <h2 className="text-2xl">{email.subject}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Avatar
              src={`https://ui-avatars.com/api/?name=${email.sender}&background=random`}
              alt={email.sender}
            />
            <div>
              <div className="flex gap-1 text-black ">
                <p className="font-semibold">{email.sender}</p>
                <p className="text-sm opacity-80">{`<${email.address}>`}</p>
              </div>
              <div>
                <span className="text-sm">
                  To me{" "}
                  <button className="text-white">
                    <TriangleDownIcon />
                  </button>
                </span>
                <Dropdown>
                  hhh
                  <p className="text-sm">
                    To: {email.address}
                    {email.cc && email.cc.length > 0 && (
                      <div>CC: {email.cc.join(", ")}</div>
                    )}
                    {email.bcc && email.bcc.length > 0 && (
                      <div>BCC: {email.bcc.join(", ")}</div>
                    )}
                  </p>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">{formatDate(email.timestamp)}</span>
            <Tooltip text={email.isStarred ? "Starred" : "Not starred"}>
              <button
                onClick={() => onStarEmail(email.id)}
                className={`${
                  email.isStarred ? "text-yellow-400" : "text-gray-400"
                } hover:text-yellow-400 transition-colors`}
              >
                <FaStar />
              </button>
            </Tooltip>
            <Tooltip text="reply">
              <button onClick={() => onReply(email.id)}>
                <ReplyIcon />
              </button>
            </Tooltip>
            <Tooltip text="More options">
              <button>
                <OptionsVerticalIcon />
              </button>
            </Tooltip>
          </div>
        </div>

        <div
          className="box-border min-w-full prose prose-p:text-slate-700 prose-a:text-back-500 dark:prose-a:text-yellow-500 prose-a:no-underline dark:prose-p:text-white dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: sanitizeBody }}
        />

        <div className="space-y-4">
          <div className="flex gap-2">
            <span>Scanned by:</span>
            <Link to="" target="_blank" className="opacity-80">
              ClamAV
            </Link>
          </div>
          {email.attachments && email.attachments.length > 0 && (
            <div className="flex flex-wrap w-full gap-3 mt-8">
              <Attachments attachments={email.attachments} />
            </div>
          )}

          {email.inReplyTo && email.inReplyTo.length > 0 && (
            <div className="pt-4 border-t">
              <h3 className="mb-2 text-lg font-semibold">In reply to:</h3>
              {email.inReplyTo.map((replyEmail) => (
                <div
                  key={replyEmail.id}
                  className="p-4 mb-2 bg-gray-100 rounded-md"
                >
                  <p className="font-semibold">{replyEmail.sender}</p>
                  <p className="text-sm text-gray-600">{replyEmail.preview}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onReply(email.id)}
            className="px-4 py-2 transition-colors rounded-md text-nowrap w-min hover:bg-blue-600"
          >
            <FaReply className="inline mr-2" /> Reply
          </Button>

          <Button
            onClick={() => onForward(email.id)}
            className="px-4 py-2 transition-colors rounded-md text-nowrap w-min hover:bg-blue-600"
          >
            <FaForward className="inline mr-2" /> Forward
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DetailView;
