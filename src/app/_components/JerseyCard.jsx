import Image from 'next/image';
import Link from 'next/link';

const JerseyCard = ({ imageUrl, title, subtitle, path }) => {
  return (
    <Link href={`/products/category/${path}`} className="relative w-full  h-48 sm:h-64 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 glow">{title}</h2>
        <p className="text-xs sm:text-sm text-gray-300 w-4/5">{subtitle}</p>
      </div>
    </Link>
  );
};

const JerseyCardGrid = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 xl:px-0 md:flex">
      {cards.map((card, index) => (
        <JerseyCard key={index} {...card} />
      ))}
    </div>
  );
};

export { JerseyCard, JerseyCardGrid };