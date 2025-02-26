import { KeyboardEvent, ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Loader, Send } from "lucide-react";
import axios from "axios";
import { formatDate, formatDistanceToNow } from "date-fns";

// custom
import Typography from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/tooltip";
import { Island, Message } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "@/contexts/app";
import { cn, getDateObject } from "@/lib/utils";
import { useSocketContext } from "@/contexts/socket";
import { Skeleton } from "@/components/ui/skeleton";

const ChatContainer: React.FC<ChatContainerProperties> = ({ islandInfo }) => {
  // hooks
  const { userId, token } = useAppContext();
  const { socket } = useSocketContext();
  const scrollAreaReference = useRef<HTMLDivElement>(null);

  // states
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [page, setPage] = useState<string | null>("");
  const [firstFetched, setFirstFetched] = useState<boolean>(false);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleMessageSend = async () => {
    try {
      if (message.length === 0 || token?.length === 0 || socket === undefined)
        return;
      setSending(true);
      let { data: newMessage } = await axios.post<Message>(
        "/messages/new",
        {
          chatId: islandInfo.id,
          msg: message,
          receiver:
            islandInfo.creator === userId
              ? islandInfo.invitee
              : islandInfo.creator,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      newMessage = {
        ...newMessage,
        id: getDateObject(newMessage.id).toISOString(),
      };
      setMessages((previous) => [...previous, newMessage]);
      setMessage("");
      socket.emit("newMessage", {
        roomId: islandInfo.id,
        msgObj: newMessage,
      });
    } finally {
      setSending(false);
    }
  };

  const fetchMessages = useCallback(async () => {
    try {
      if (page === null || token?.length === 0) return;
      setFetching(true);
      const requestBody: { chatId: string; page?: string } = {
        chatId: islandInfo.id,
      };
      if (page?.length) requestBody.page = page;
      const { data } = await axios.post(
        "/messages/by_chat_id",
        { ...requestBody },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages((previous) => [...data.messages, ...previous]);
      setPage(data.pageState);
      setFetching(false);
    } finally {
      setFetching(false);
    }
  }, [islandInfo.id, page, token]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !sending) {
      event.preventDefault();
      handleMessageSend();
    }
  };

  // fetch messages initially
  useEffect(() => {
    if (firstFetched) return;
    setFirstFetched(true);
    fetchMessages();
  }, [fetchMessages, firstFetched]);

  // scrolling to bottom on messages update
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaReference.current) {
        // Get the viewport element (the actual scrollable container)
        const viewport = scrollAreaReference.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        ) as HTMLElement;
        if (viewport) {
          // Add smooth scrolling behavior
          viewport.style.scrollBehavior = "smooth";
          // Scroll to the bottom
          viewport.scrollTop = viewport.scrollHeight;
          // Optional: Reset scroll behavior after animation
          setTimeout(() => {
            viewport.style.scrollBehavior = "auto";
          }, 1000);
        }
      }
    };
    scrollToBottom();
  }, [messages]);

  // listening to socket events
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (event: Message) => {
      setMessages((previous) => [...previous, event]);
    };

    socket.off("newMessage", handleNewMessage);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  return (
    <div className="flex flex-col gap-1">
      <Typography
        variant="h3"
        className="self-center font-pirate-kids tracking-widest"
      >
        Chat
      </Typography>
      <ScrollArea
        type="always"
        ref={scrollAreaReference}
        className="pr-3 [&>[data-radix-scroll-area-viewport]]:max-h-32"
      >
        <div className="flex flex-col gap-1">
          {fetching &&
            [..."1234"].map((v) => (
              <Skeleton
                key={v}
                className={cn(
                  "h-7 w-48 self-start",
                  +v % 2 === 0 && "self-end"
                )}
              />
            ))}
          {messages.map((message_) => (
            <div
              key={message_.id}
              className={cn(
                "flex flex-col max-w-48 self-start bg-bg rounded-base px-2 py-1 border-2 border-border",
                userId !== message_.sender && "self-end bg-bw"
              )}
            >
              <Typography
                variant="small"
                className="text-justify font-inter"
              >
                {message_.message}
              </Typography>
              <ToolTip
                content={formatDistanceToNow(message_.id, { addSuffix: true })}
              >
                <div>
                  <Typography
                    variant="muted"
                    className={cn(
                      "text-justify font-inter self-start",
                      userId !== message_.sender && "self-end"
                    )}
                  >
                    {formatDate(message_.id, "hh:mm a")}
                  </Typography>
                </div>
              </ToolTip>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center gap-3">
        <Input
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter message"
          disabled={sending}
          onKeyDown={handleKeyDown}
        />
        <ToolTip
          content={
            message.length === 0 ? "Message can't be empty" : "Send message"
          }
        >
          <div>
            <Button
              disabled={message.length === 0 || sending}
              size="icon"
              onClick={handleMessageSend}
            >
              {sending ? <Loader className="animate-spin" /> : <Send />}
            </Button>
          </div>
        </ToolTip>
      </div>
    </div>
  );
};

export default ChatContainer;

interface ChatContainerProperties {
  islandInfo: Island;
}
