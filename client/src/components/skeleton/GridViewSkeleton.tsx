import { useConfig } from "@/hooks/useConfig";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export default function GridViewSkeleton({ times = 12 }) {
  const { data: configData } = useConfig();
  return (
    <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: times }).map((_, index) => (
        <Card key={index} className="w-full " radius="lg">
          <CardBody className="overflow-hidden p-0">
            <Skeleton className="rounded-lg">
              <div className="h-[296px] w-full rounded-lg animate-pulse" />
            </Skeleton>
          </CardBody>
          <CardFooter className="flex flex-col items-center gap-2 p-3">
            <Skeleton className="w-2/3 rounded-lg">
              <div className="h-6 w-full rounded-lg  animate-pulse" />
            </Skeleton>
            {configData?.display_price == 1 && (
              <Skeleton className="w-1/3 rounded-lg">
                <div className="h-5 w-full rounded-lg  animate-pulse" />
              </Skeleton>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
