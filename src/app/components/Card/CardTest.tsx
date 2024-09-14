import React from 'react';

// Mock data สำหรับการ์ดอนิเมะ
const animeList = [
  {
    id: 1,
    title: 'Attack on Titan',
    category: 'Action',
    studio: 'MAPPA',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 2,
    title: 'My Hero Academia',
    category: 'Action',
    studio: 'Bones',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 3,
    title: 'Demon Slayer',
    category: 'Action',
    studio: 'Ufotable',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 4,
    title: 'One Piece',
    category: 'Adventure',
    studio: 'Toei Animation',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 5,
    title: 'Jujutsu Kaisen',
    category: 'Action',
    studio: 'MAPPA',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 6,
    title: 'Naruto',
    category: 'Adventure',
    studio: 'Pierrot',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 7,
    title: 'Death Note',
    category: 'Thriller',
    studio: 'Madhouse',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 8,
    title: 'Sword Art Online',
    category: 'Fantasy',
    studio: 'A-1 Pictures',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 9,
    title: 'Tokyo Ghoul',
    category: 'Horror',
    studio: 'Pierrot',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 10,
    title: 'Dragon Ball Z',
    category: 'Action',
    studio: 'Toei Animation',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 11,
    title: 'Fullmetal Alchemist',
    category: 'Adventure',
    studio: 'Bones',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
  {
    id: 12,
    title: 'Bleach',
    category: 'Action',
    studio: 'Pierrot',
    image: 'https://images2.alphacoders.com/126/thumb-1920-1261482.png',
  },
];

// Component สำหรับแสดงการ์ดอนิเมะ
const AnimeCard: React.FC<{
  title: string;
  category: string;
  studio: string;
  image: string;
}> = ({ title, category, studio, image }) => {
  return (
    <div className="bg-slate-900 shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">Category: {category}</p>
        <p className="text-gray-600">Studio: {studio}</p>
      </div>
    </div>
  );
};

// Component สำหรับแสดงการ์ดอนิเมะทั้งหมด
const AnimeCardGrid: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animeList.map((anime) => (
          <AnimeCard
            key={anime.id}
            title={anime.title}
            category={anime.category}
            studio={anime.studio}
            image={anime.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeCardGrid;
