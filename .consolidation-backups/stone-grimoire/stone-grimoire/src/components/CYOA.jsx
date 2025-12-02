import React, { useState } from 'react';

const storyNodes = [
  {
    id: 'start',
    text: 'You awaken in the ancient Stone Grimoire, surrounded by glowing runes and shifting shadows. A voice whispers: "Choose your path, seeker."',
    choices: [
      { text: 'Enter the Hall of Mirrors', next: 'mirrors' },
      { text: 'Descend to the Crypt of Secrets', next: 'crypt' }
    ]
  },
  {
    id: 'mirrors',
    text: 'The Hall of Mirrors reflects infinite versions of yourself. One mirror glows with golden light, another pulses with deep violet.',
    choices: [
      { text: 'Touch the golden mirror', next: 'golden' },
      { text: 'Touch the violet mirror', next: 'violet' }
    ]
  },
  {
    id: 'crypt',
    text: 'The Crypt of Secrets is cold and silent. Ancient tomes line the walls. A spectral figure offers you a book.',
    choices: [
      { text: 'Accept the book', next: 'book' },
      { text: 'Refuse and explore further', next: 'explore' }
    ]
  },
  {
    id: 'golden',
    text: 'You are bathed in golden light. Your wounds heal, and you remember a lost power. The grimoire opens a new page for you.',
    choices: [
      { text: 'Write your own spell', next: 'spell' },
      { text: 'Return to the entrance', next: 'start' }
    ]
  },
  {
    id: 'violet',
    text: 'The violet mirror shows your shadow self. You gain insight into your hidden fears. A secret passage opens.',
    choices: [
      { text: 'Enter the passage', next: 'passage' },
      { text: 'Return to the entrance', next: 'start' }
    ]
  },
  {
    id: 'book',
    text: 'The book glows with ancient wisdom. You learn a forgotten ritual and gain a new ally: the spectral figure joins you.',
    choices: [
      { text: 'Perform the ritual', next: 'ritual' },
      { text: 'Return to the entrance', next: 'start' }
    ]
  },
  {
    id: 'explore',
    text: 'You find a hidden door behind a tome. It leads to a chamber filled with crystals and a sleeping dragon.',
    choices: [
      { text: 'Wake the dragon', next: 'dragon' },
      { text: 'Steal a crystal', next: 'crystal' }
    ]
  },
  {
    id: 'spell',
    text: 'Your spell reshapes the grimoire. You are now the author of your own legend. The story continues as you wish.',
    choices: [
      { text: 'Restart your journey', next: 'start' }]
  },
  {
    id: 'passage',
    text: 'The passage leads to a moonlit garden. Here, you meet the High Priestess, who offers you a prophecy.',
    choices: [
      { text: 'Accept the prophecy', next: 'prophecy' },
      { text: 'Return to the entrance', next: 'start' }
    ]
  },
  {
    id: 'ritual',
    text: 'The ritual reveals your true name. You gain mastery over the grimoire and its secrets. The spectral ally bows to you.',
    choices: [
      { text: 'Restart your journey', next: 'start' }]
  },
  {
    id: 'dragon',
    text: 'The dragon awakens and offers you a ride to the stars. You soar above the grimoire, seeing all its stories unfold.',
    choices: [
      { text: 'Restart your journey', next: 'start' }]
  },
  {
    id: 'crystal',
    text: 'The crystal pulses with power. You gain a new magical ability and the chamber transforms into a library of endless knowledge.',
    choices: [
      { text: 'Restart your journey', next: 'start' }]
  },
  {
    id: 'prophecy',
    text: 'The prophecy reveals your destiny: to become the next keeper of the Stone Grimoire. The garden fades, and you awaken anew.',
    choices: [
      { text: 'Restart your journey', next: 'start' }]
  }
];

function getNode(id) {
  return storyNodes.find(node => node.id === id);
}

export default function CYOA() {
  const [currentId, setCurrentId] = useState('start');
  const node = getNode(currentId);

  return (
    <div className="max-w-xl w-full bg-[#1a1e27] bg-opacity-90 rounded-lg shadow-2xl p-8 text-white">
      <div className="mb-6 text-lg font-semibold text-[#FFD700] drop-shadow">{node.text}</div>
      <div className="flex flex-col gap-4">
        {node.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => setCurrentId(choice.next)}
            className="bg-[#9370DB] hover:bg-[#FFD700] text-white hover:text-[#1a1e27] px-4 py-2 rounded font-bold transition-colors shadow"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
