import { Link } from 'lucide-react';
import { Button } from './button';

type PropType = {
  title?: string;
  description: string;
  callToAction?: string;
};

export default function HeroContainer(props: PropType) {
  return (
    <div
      className="div w-[100%] mobile:max-lg:w-full h-[40vh]  bg-cover bg-center self-center text-center"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2023/01/07/08/41/leaves-7702829_1280.jpg')`
      }}
    >
      <div className="bg-black/40 h-full w-full pt-28 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center pt-16">
            <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
              {props.title} Services
            </h2>
            <p className="max-w-2xl mx-auto text-gray-100">{props.description}</p>

            <div className="flex justify-center items-center text-gray-400 text-sm">
              <Link href={'/workspace/setup'}>
                <Button variant={'secondary'} className="bg-primarytheme/80 w-[40vw] text-xl py-10">
                  Start Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
