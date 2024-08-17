import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const TeamCard = ({ team }) => {
  return (
    <Link href={`/team/${team.id}`} passHref>
      <Card
        className="group relative overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl h-full"
        style={{ background: 'linear-gradient(135deg, #00cc66 0%, #008040 100%)' }}
      >
        <CardContent className="p-6 flex flex-col items-center justify-between h-full">
          <div className="relative w-32 h-32 mb-4 bg-white rounded-full p-2">
            <Image
              src={team.logo}
              alt={`${team.name} logo`}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h3 className="text-lg font-semibold text-center text-white group-hover:text-gray-100 transition-colors duration-300 mt-2">
            {team.name}
          </h3>
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="inline-block bg-white text-gray-800 text-xs px-3 py-1 rounded-full font-semibold">
              Shop Now
            </span>
          </div>
        </CardContent>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </Card>
    </Link>
  );
};

const ShopByTeamSection = ({ teams }) => {
  const groupedTeams = teams?.reduce((acc, team, index) => {
    const groupIndex = Math.floor(index / 5);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(team);
    return acc;
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <Carousel>
          <CarouselContent>
            {groupedTeams?.map((group, index) => (
              <CarouselItem key={index}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {group.map((team) => (
                    <TeamCard key={team.id} team={team} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ShopByTeamSection;