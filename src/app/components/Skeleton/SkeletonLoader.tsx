import { Card, Skeleton } from '@nextui-org/react';

const SkeletonLoader: React.FC = () => {
  return (
    <main className="w-full justify-center flex flex-col gap-4 px-12 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, idx) => (
            <Card className="w-full space-y-5 p-4" radius="lg" key={idx}>
              <Skeleton className="rounded-lg">
                <div className="h-48 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ))}
      </div>
      <div className="w-full flex justify-center mt-6" />
    </main>
  );
};

export default SkeletonLoader;