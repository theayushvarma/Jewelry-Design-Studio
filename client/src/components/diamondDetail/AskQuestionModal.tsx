import { useConfig } from "@/hooks/useConfig";
import { useDiamondInquiry } from "@/hooks/useDiamondInquiry";
import { getDiamondTitle } from "@/utils/common";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Form,
} from "@heroui/react";
import { MailQuestionMark } from "lucide-react";
import { useEffect, useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  mobile: "",
  message: "",
};

export default function AskQuestionModal({
  data,
  buttonText = "Request Quote",
  icon = <MailQuestionMark size={16} />,
  variant = "flat",
  color = "default",
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const { loading, submitInquiry, resetState, success } = useDiamondInquiry();

  const { token } = useConfig();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    else if (formData.name.toLowerCase() === "admin")
      newErrors.name = "Nice try! Choose a different username";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setShouldSubmit(true);
  };

  useEffect(() => {
    if (!shouldSubmit) return;

    submitInquiry({
      token: token,
      certificate_no: data?.certificate_no,
      diamond_type: data?.diamond_type,
      ...formData,
    });

    setShouldSubmit(false);
  }, [shouldSubmit]);

  useEffect(() => {
    if (success) {
      setFormData(initialFormData);
      setErrors({});
      resetState();
      onClose();
    }
  }, [success]);

  return (
    <>
      <Button
        color={color}
        variant={variant}
        onPress={onOpen}
        startContent={icon}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent className="w-full">
          {() => (
            <Form
              className="w-full"
              onSubmit={handleSubmit}
              onReset={() => {
                setFormData(initialFormData);
                setErrors({});
              }}
            >
              <ModalHeader className="w-full">
                {getDiamondTitle(data)}
              </ModalHeader>

              <ModalBody className="flex flex-col gap-4 w-full">
                <Input
                  isRequired
                  name="name"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  errorMessage={errors.name}
                />
                <Input
                  isRequired
                  name="email"
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  errorMessage={errors.email}
                />
                <Input
                  isRequired
                  name="mobile"
                  type="tel"
                  label="Mobile"
                  labelPlacement="outside"
                  placeholder="Enter your mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  errorMessage={errors.mobile}
                />
                <Textarea
                  isRequired
                  name="message"
                  label="Message"
                  labelPlacement="outside"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  errorMessage={errors.message}
                />
              </ModalBody>

              <ModalFooter className="w-full">
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" isLoading={loading}>
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
