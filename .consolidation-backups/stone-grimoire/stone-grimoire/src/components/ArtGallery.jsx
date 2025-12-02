import React from 'react';

const artPieces = [
  {
    title: 'Golden Sigil',
    image: '/public/art/golden-sigil.png',
    description: 'A radiant sigil representing healing and power.'
  },
  {
    title: 'Violet Mirror',
    image: '/public/art/violet-mirror.png',
    description: 'A mysterious mirror reflecting the shadow self.'
  },
  {
    title: 'Moonlit Garden',
    image: '/public/art/moonlit-garden.png',
    description: 'A tranquil garden under the moon, home of prophecy.'
  },
  {
    title: 'Crystal Chamber',
    image: '/public/art/crystal-chamber.png',
    description: 'A chamber filled with magical crystals and ancient wisdom.'
  },
  {
    title: 'Dragon Flight',
    image: '/public/art/dragon-flight.png',
    description: 'A soaring dragon above the grimoire, symbolizing freedom.'
  }
];

export default function ArtGallery() {
  return (
    <div className="max-w-3xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      {artPieces.map((piece, i) => (
        <div key={i} className="bg-[#1a1e27] bg-opacity-90 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src={piece.image} alt={piece.title} className="w-64 h-64 object-cover rounded border-2 border-[#FFD700] mb-4" />
          <h2 className="text-xl font-bold text-[#FFD700] mb-2">{piece.title}</h2>
          <p className="text-white text-sm text-center">{piece.description}</p>
        </div>
      ))}
    </div>
  );
}
