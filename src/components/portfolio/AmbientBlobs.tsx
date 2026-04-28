export const AmbientBlobs = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="blob w-[600px] h-[600px] bg-[hsl(211_100%_70%)] -top-40 -left-40 animate-blob-1" />
      <div className="blob w-[500px] h-[500px] bg-[hsl(260_100%_80%)] top-1/4 -right-32 animate-blob-2" />
      <div className="blob w-[550px] h-[550px] bg-[hsl(150_80%_75%)] bottom-0 left-1/4 animate-blob-3" />
      <div className="blob w-[400px] h-[400px] bg-[hsl(330_100%_82%)] top-2/3 right-1/3 animate-blob-4" />
    </div>
  );
};
