import React from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Divider,
  Tooltip,
} from "@heroui/react";
import { Mail, MessageCircleWarning, ShareIcon } from "lucide-react";
import ShareOnEmailModal from "./ShareOnEmailModal";
import { getDiamondTitle } from "@/utils/common";
import { useConfig } from "@/hooks/useConfig";

export const UserTwitterCard = ({ data }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const { token } = useConfig();

  return (
    <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
      <CardHeader className="justify-between">
        <h2 className="text-lg  font-bold">{getDiamondTitle(data)}</h2>
      </CardHeader>
      <Divider />
      <CardFooter className="gap-3">
        <ShareOnEmailModal data={data} />
        <Tooltip content="Share on Whatsapp" showArrow={true}>
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?text=Found%20this%20diamond%20on%20https://thediamondp6.sg-host.com/${token}%20${getDiamondTitle(data)}`}
          >
            <Button
              variant="flat"
              color="success"
              endContent={<MessageCircleWarning size={16} />}
            >
              Whatsapp
            </Button>
          </a>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default function SharePopup({ data }) {
  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <Button isIconOnly variant="flat" aria-label="Share" color="default">
          <ShareIcon size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserTwitterCard data={data} />
      </PopoverContent>
    </Popover>
  );
}
