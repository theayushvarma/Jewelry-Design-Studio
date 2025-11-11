import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  Divider,
  Chip,
  Image,
} from "@heroui/react";
import { useEffect, useState } from "react";

// Assuming these icons are available or replaced with actual icons
import {
  CopyIcon,
  VideoIcon,
  FileTextIcon,
  ImageIcon,
  Gem,
  CopyCheck,
  Video,
  ShoppingCart,
} from "lucide-react";
import SharePopup from "./diamondDetail/SharePopup";
import ShareOnEmailModal from "./diamondDetail/ShareOnEmailModal";
import AskQuestionModal from "./diamondDetail/AskQuestionModal";
import VideoView from "./common/VideoView";
import ImageView from "./common/ImageView";
import {
  formatPrice,
  getDiamondTitle,
  getMeasurement,
  getRatio,
} from "@/utils/common";
import { useConfig } from "@/hooks/useConfig";
import { getFullForm } from "@/utils/data";
import AddToCompareButton from "./AddToCompareButton";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useDiamondRingSelection } from "@/hooks/useDiamondRingSelection";

export default function DiamondDetailModal({
  isOpen,
  onOpenChange,
  activeData,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const { addDiamond } = useDiamondRingSelection();
  const { data: configData } = useConfig();

  useEffect(() => {
    setIsVideoActive(false);
  }, [activeData]);

  const { addItem } = useRecentlyViewed();

  useEffect(() => {
    addItem(activeData);
  }, [activeData]);

  const copyLink = () => {
    navigator.clipboard.writeText(activeData?.video);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="outside"
      backdrop="blur"
    >
      <ModalContent className="overflow-hidden  backdrop-blur-md rounded-xl max-w-5xl mx-auto">
        {(onClose) => (
          <main className="container mx-auto p-0 m-0 flex-grow overflow-y-auto overflow-x-hidden">
            <>
              <ModalHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl  font-bold">
                    {getDiamondTitle(activeData)}
                  </h2>
                  {/* <div className="flex flex-wrap gap-2 mt-2">
                    <Chip color="default" variant="flat" size="sm">
                      Carat: {activeData?.carat}
                    </Chip>
                    <Chip color="default" variant="flat" size="sm">
                      Color: {activeData?.color}
                    </Chip>
                    <Chip color="default" variant="flat" size="sm">
                      Clarity: {activeData?.clarity}
                    </Chip>
                    <Chip color="default" variant="flat" size="sm">
                      Cut: {activeData?.cut}
                    </Chip>
                  </div> */}
                  <p className="text-sm  mt-2">
                    SKU: {activeData?.id} | Certificate: {activeData?.lab}{" "}
                    {activeData?.certificate_no}
                  </p>
                  {/* <PriceDisplay data={activeData} /> */}
                </div>
                <div className="flex gap-2">
                  {activeData?.video && (
                    <Tooltip content={isCopied ? "Copied!" : "Copy Video Link"}>
                      <Button
                        isIconOnly
                        variant="flat"
                        onPress={copyLink}
                        aria-label="Copy video link"
                        color={isCopied ? "success" : "default"}
                      >
                        {isCopied ? (
                          <CopyCheck size={18} />
                        ) : (
                          <CopyIcon size={18} />
                        )}
                      </Button>
                    </Tooltip>
                  )}
                  <AddToCompareButton diamond={activeData} />

                  {/* <SharePopup data={activeData} /> */}
                </div>
              </ModalHeader>

              <Divider />

              <ModalBody className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Left: Image/Video & Icons */}
                <div className="flex-1 space-y-4">
                  <div className="relative group w-full aspect-square border rounded max-w-md mx-auto">
                    {isVideoActive ? (
                      <VideoView url={activeData?.video} />
                    ) : (
                      <ImageView data={activeData} />
                    )}

                    {/* <div className="absolute inset-0 rounded-lg" /> */}
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <Button
                      size="sm"
                      variant="solid"
                      color={!isVideoActive ? "primary" : "default"}
                      onClick={() => setIsVideoActive(false)}
                      startContent={<ImageIcon size={16} />}
                    >
                      Image
                    </Button>
                    {!!activeData?.video && (
                      <Button
                        size="sm"
                        variant="solid"
                        color={isVideoActive ? "primary" : "default"}
                        onClick={() => setIsVideoActive(true)}
                        startContent={<VideoIcon size={16} />}
                      >
                        Video
                      </Button>
                    )}
                    {activeData?.certi_link && (
                      <a
                        href={activeData?.certi_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="solid"
                          color="default"
                          startContent={<FileTextIcon size={16} />}
                        >
                          Certificate
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold  mb-4">
                    Diamond Specifications
                  </h3>
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-2 mb-2">
                    <div className="col-span-1 md:col-span-3 text-base leading-6 ">
                      <p className="mb-2">
                        This{" "}
                        <strong className="font-semibold">
                          {activeData?.carat} carat
                        </strong>{" "}
                        <strong className="font-semibold">
                          {activeData?.shape.toLowerCase()}
                        </strong>{" "}
                        diamond with{" "}
                        <strong className="font-semibold">
                          {activeData?.color}
                        </strong>{" "}
                        color and{" "}
                        <strong className="font-semibold">
                          {activeData?.clarity}
                        </strong>{" "}
                        clarity features{" "}
                        <strong className="font-semibold">
                          {activeData?.polish}
                        </strong>{" "}
                        polish and a grading report from{" "}
                        <strong className="font-semibold">
                          {activeData?.lab}
                        </strong>
                        .
                      </p>
                    </div>
                    {configData?.display_price == 1 && (
                      <div className="col-span-1 flex md:flex-col gap-2 md:gap-0 justify-start items-end">
                        <b aria-label="Price label">Price</b>
                        <span className="text-xl font-bold">
                          {formatPrice(
                            activeData?.priceAUD,
                            activeData?.currency_symbol
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <DetailItem label="Shape" value={activeData?.shape} />
                    <DetailItem
                      label="Carat"
                      value={getFullForm("carat", activeData?.carat)}
                    />
                    <DetailItem
                      label="Color"
                      value={getFullForm("color", activeData?.color)}
                    />
                    <DetailItem
                      label="Clarity"
                      value={getFullForm("clarity", activeData?.clarity)}
                    />
                    <DetailItem
                      label="Cut"
                      value={getFullForm("cut", activeData?.cut)}
                    />
                    <DetailItem
                      label="Polish"
                      value={getFullForm("polish", activeData?.polish)}
                    />
                    <DetailItem
                      label="Symmetry"
                      value={getFullForm("symmetry", activeData?.symmetry)}
                    />
                    <DetailItem
                      label="Fluorescence"
                      value={getFullForm(
                        "fluorescence",
                        activeData?.fluorescence
                      )}
                    />
                    <DetailItem
                      label="Table %"
                      value={activeData?.table ? activeData?.table + " %" : "-"}
                    />
                    <DetailItem
                      label="Depth %"
                      value={activeData?.depth ? activeData?.depth + " %" : "-"}
                    />
                    <DetailItem
                      label="Measurement"
                      value={getMeasurement(activeData)}
                    />
                    <DetailItem
                      label="L/W Ratio"
                      value={getRatio(activeData)}
                    />
                    <DetailItem label="Lab" value={activeData?.lab} />
                    <DetailItem
                      label="Certificate"
                      value={activeData?.certificate_no}
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="mt-6 flex md:flex-row flex-col-reverse">
                {/* <Button variant="flat" onPress={onClose} color="default">
                  Close
                </Button> */}
                <AskQuestionModal data={activeData} />

                <Button
                  color="primary"
                  variant="solid"
                  onPress={() => addDiamond(activeData)}
                >
                  Choose this diamond
                </Button>
              </ModalFooter>
            </>
          </main>
        )}
      </ModalContent>
    </Modal>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="flex justify-between gap-2 border-b  py-2">
      <span className="">{label || "-"}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}
