import { useState, useEffect } from "react";
import { getDiamondTitle } from "@/utils/common";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Input,
  Form,
} from "@heroui/react";
import { Mail, MailIcon } from "lucide-react";
import { useShareOnEmail } from "@/hooks/useShareOnEmail";
import { useConfig } from "@/hooks/useConfig";

export default function ShareOnEmailModal({
  data = {},
  buttonText = "Email",
  tooltipText = "Share on Email",
  icon = <Mail size={16} />,
  variant = "solid",
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { token } = useConfig();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const {
    submitShare,
    resetState,
    loading,
    success,
    error: serverError,
  } = useShareOnEmail();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    submitShare({
      token: token,
      certificate_no: data?.certificate_no,
      diamond_type: data?.diamond_type,
      email,
    });
  };

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

  const handleClose = () => {
    setEmail("");
    setError("");
    resetState();
    onClose();
  };

  return (
    <>
      <Tooltip content={tooltipText} showArrow={true}>
        <Button
          variant={variant}
          color="primary"
          onPress={onOpen}
          endContent={icon}
        >
          {buttonText}
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          <Form onSubmit={handleSubmit} className="w-full">
            <ModalHeader className="w-full">
              {getDiamondTitle(data)}
            </ModalHeader>

            <ModalBody className="w-full">
              <Input
                isRequired
                type="email"
                name="email"
                label="Email"
                placeholder="Enter recipient's email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                errorMessage={error}
                variant="bordered"
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none" />
                }
              />
            </ModalBody>

            <ModalFooter className="w-full">
              <Button variant="flat" onPress={handleClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={loading}>
                Send Email
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
