import { Button, Divider, Image, Tooltip, Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CopyIcon,
  CopyCheck,
  FileTextIcon,
  VideoIcon,
  ImageIcon,
} from "lucide-react";

import {
  formatPrice,
  getDiamondTitle,
  getMeasurement,
  getRatio,
} from "@/utils/common";
import { getFullForm } from "@/utils/data";
import VideoView from "@/components/common/VideoView";
import ImageView from "@/components/common/ImageView";
import { useDiamondRingSelection } from "@/hooks/useDiamondRingSelection";
import DefaultLayout from "@/layouts/default";

export default function RingPage() {
  const navigate = useNavigate();
  const {
    diamond,
    setting,
    clearAllSelections,
    removeDiamondSelection,
    removeSettingSelection,
  } = useDiamondRingSelection();
  const [isCopied, setIsCopied] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  // 🧭 Redirect logic if data missing
  useEffect(() => {
    if (!diamond) {
      navigate("/diamonds"); // redirect if diamond missing
    } else if (!setting) {
      navigate("/settings"); // redirect if setting missing
    }
  }, [diamond, setting, navigate]);

  if (!diamond || !setting) return null; // block render while redirecting

  const copyLink = () => {
    if (diamond?.video) {
      navigator.clipboard.writeText(diamond.video);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mb-8 text-center">Review Your Ring</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 💎 Diamond Section */}
        <section className="border rounded-xl p-6 shadow-sm bg-white">
          <header className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{getDiamondTitle(diamond)}</h2>
              <p className="text-sm mt-1">
                SKU: {diamond?.id} | Certificate: {diamond?.lab}{" "}
                {diamond?.certificate_no}
              </p>
            </div>

            <div className="flex gap-2">
              {diamond?.video && (
                <Tooltip content={isCopied ? "Copied!" : "Copy Video Link"}>
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={copyLink}
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
            </div>
          </header>

          <Divider className="mb-4" />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Image / Video */}
            <div className="flex-1 space-y-4">
              <div className="relative w-full aspect-square border rounded-lg overflow-hidden">
                {isVideoActive ? (
                  <VideoView url={diamond?.video} />
                ) : (
                  <ImageView data={diamond} />
                )}
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  size="sm"
                  variant="solid"
                  color={!isVideoActive ? "primary" : "default"}
                  onClick={() => setIsVideoActive(false)}
                  startContent={<ImageIcon size={16} />}
                >
                  Image
                </Button>

                {diamond?.video && (
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

                {diamond?.certi_link && (
                  <a
                    href={diamond.certi_link}
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

            {/* Right side - Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">
                Diamond Specifications
              </h3>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <DetailItem label="Shape" value={diamond?.shape} />
                <DetailItem
                  label="Carat"
                  value={getFullForm("carat", diamond?.carat)}
                />
                <DetailItem
                  label="Color"
                  value={getFullForm("color", diamond?.color)}
                />
                <DetailItem
                  label="Clarity"
                  value={getFullForm("clarity", diamond?.clarity)}
                />
                <DetailItem
                  label="Cut"
                  value={getFullForm("cut", diamond?.cut)}
                />
              </div>

              {diamond?.priceAUD && (
                <div className="mt-4 flex justify-between items-center">
                  <b>Price:</b>
                  <span className="text-xl font-bold">
                    {formatPrice(diamond?.priceAUD, diamond?.currency_symbol)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 💍 Setting Section */}
        <section className="border rounded-xl p-6 shadow-sm bg-white">
          <header className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{setting?.title}</h2>
              <p className="text-sm mt-1">SKU: {setting?.sku}</p>
            </div>
          </header>

          <Divider className="mb-4" />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Image */}
            <div className="flex-1">
              <div className="w-full aspect-square border rounded-lg overflow-hidden">
                <Image
                  src={setting?.image || "/placeholder-setting.jpg"}
                  alt={setting?.title || "Setting"}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">
                Setting Specifications
              </h3>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <DetailItem label="Metal" value={setting?.metal} />
                <DetailItem label="Style" value={setting?.ring_style} />
                <DetailItem label="Shape" value={setting?.shape} />
              </div>

              {setting?.price && (
                <div className="mt-4 flex justify-between items-center">
                  <b>Price:</b>
                  <span className="text-xl font-bold">
                    {formatPrice(setting?.price, setting?.currency_symbol)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Divider className="my-10" />

      {/* ✅ Combined Summary Section */}
      <div className="text-center space-y-4">
        <p className="text-lg">
          Your custom ring includes the selected diamond and setting.
        </p>
        <Button color="primary" size="lg">
          Proceed to Checkout
        </Button>
      </div>
    </DefaultLayout>
  );
}

// ✅ Reusable detail display
function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between border-b py-2">
      <span>{label || "-"}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}
