import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blue-500 font-sans dark:bg-black">
      <Image 
        src="/polygon-scatter-haikei.svg"
        alt="Circle Scatter"
        fill={true}
        className="z-0 opacity-10 object-cover"
      />
      <main className="z-10 flex w-full max-w-3xl h-128 gap-4 rounded-xl flex-row p-4 bg-white dark:bg-black items-center">
        <div className="relative h-full w-2/5 rounded-2xl">
          <Image 
            src="/edward-lawrence-unsplash.jpg"
            alt="Environment Study"
            fill={true}
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex h-full min-w-3/5 flex-col items-center p-4 rounded-md">
        </div>
      </main>
    </div>
  );
}
