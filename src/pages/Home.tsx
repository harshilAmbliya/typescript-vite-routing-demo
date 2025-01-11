import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { projects } from "@/static/data";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-rose-600 to-rose-100 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Hello I AM, <br /> Harshil Ambliya.
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Get the best advices from our experts, including expert artists,
          painters, marathon enthusiasts and RDX, totally free.
        </p>
      </BackgroundLines>

      <div>
        <div className="container mx-auto px-8">
          <HoverEffect items={projects} boxClassName="bg-rose-400" />
        </div>
      </div>
    </div>
  );
};

export default Home;
