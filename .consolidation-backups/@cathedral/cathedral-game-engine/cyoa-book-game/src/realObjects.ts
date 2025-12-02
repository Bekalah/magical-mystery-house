import { RealObject, BookData } from './types';

export const REAL_BOOKS: Record<string, BookData> = {
  'codex-seraphinianus': {
    title: 'Codex Seraphinianus',
    author: 'Luigi Serafini',
    genre: 'Surreal Art Book',
    publicationYear: 1981,
    description: 'An illustrated encyclopedia of an imaginary world, written in an unknown script.',
    themes: ['surrealism', 'imagination', 'unknown languages', 'fantasy worlds'],
    gameConnection: 'Contains the true language of angels and demons',
    significance: 'A gateway to understanding the language of the spirit realm'
  },
  'hypnerotomachia-poliphili': {
    title: 'Hypnerotomachia Poliphili',
    author: 'Francesco Colonna',
    genre: 'Renaissance Romance',
    publicationYear: 1499,
    description: 'A dream-like journey through architectural wonders and romantic quests.',
    themes: ['architecture', 'dreams', 'renaissance', 'symbolism'],
    gameConnection: 'The architectural blueprints for the Cathedral itself',
    significance: 'Contains the original designs for sacred geometry used in the game'
  },
  'voynich-manuscript': {
    title: 'Voynich Manuscript',
    author: 'Unknown',
    genre: 'Mysterious Codex',
    publicationYear: 1400,
    description: 'An undeciphered book written in an unknown script with bizarre illustrations.',
    themes: ['cryptography', 'botany', 'astronomy', 'medicine'],
    gameConnection: 'The cipher key for decoding angelic messages',
    significance: 'Holds the secrets of plant-based healing and celestial navigation'
  },
  'book-of-kells': {
    title: 'Book of Kells',
    author: 'Celtic Monks',
    genre: 'Illuminated Gospel',
    publicationYear: 800,
    description: 'An ornately decorated version of the four Gospels in Latin.',
    themes: ['illumination', 'celtic art', 'christianity', 'medieval art'],
    gameConnection: 'Contains living illuminated letters that guide the way',
    significance: 'The letters themselves come alive to show hidden paths'
  },
  'alice-in-wonderland': {
    title: 'Alice\'s Adventures in Wonderland',
    author: 'Lewis Carroll',
    genre: 'Fantasy Novel',
    publicationYear: 1865,
    description: 'A girl falls down a rabbit hole into a fantastical world.',
    themes: ['fantasy', 'logic', 'identity', 'nonsense'],
    gameConnection: 'The white rabbit that leads between worlds',
    significance: 'Teaches how to navigate between the mundane and magical'
  }
};

export const REAL_ARTWORKS: Record<string, RealObject> = {
  'creation-of-adam': {
    id: 'creation-of-adam',
    name: 'The Creation of Adam',
    type: 'artwork',
    description: 'Michelangelo\'s fresco depicting God giving life to Adam.',
    significance: 'Shows the divine spark of consciousness',
    gameConnection: 'The moment when human consciousness awakens',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/800px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    externalLink: 'https://en.wikipedia.org/wiki/The_Creation_of_Adam'
  },
  'girl-with-pearl-earring': {
    id: 'girl-with-pearl-earring',
    name: 'Girl with a Pearl Earring',
    type: 'artwork',
    description: 'Johannes Vermeer\'s painting of a girl turning toward the viewer.',
    significance: 'Captures a moment of awakening consciousness',
    gameConnection: 'The pearl that grants inner vision',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
    externalLink: 'https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring'
  },
  'starry-night': {
    id: 'starry-night',
    name: 'The Starry Night',
    type: 'artwork',
    description: 'Vincent van Gogh\'s swirling depiction of the night sky.',
    significance: 'Shows the living, breathing cosmos',
    gameConnection: 'The night sky comes alive with guidance',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    externalLink: 'https://en.wikipedia.org/wiki/The_Starry_Night'
  }
};

export const REAL_PLACES: Record<string, RealObject> = {
  'chartres-cathedral': {
    id: 'chartres-cathedral',
    name: 'Chartres Cathedral',
    type: 'place',
    description: 'A Gothic cathedral in France famous for its stained glass and labyrinth.',
    location: 'Chartres, France',
    significance: 'A masterpiece of Gothic architecture with sacred geometry',
    gameConnection: 'The blueprint for our digital cathedral',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chartres_Cathedral.jpg/800px-Chartres_Cathedral.jpg',
    externalLink: 'https://en.wikipedia.org/wiki/Chartres_Cathedral'
  },
  'rosslyn-chapel': {
    id: 'rosslyn-chapel',
    name: 'Rosslyn Chapel',
    type: 'place',
    description: 'A 15th-century chapel in Scotland filled with intricate carvings.',
    location: 'Roslin, Scotland',
    significance: 'Contains hidden symbols and Masonic connections',
    gameConnection: 'Holds the secrets of the stone grimoire',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Rosslyn_Chapel_Stained_Glass.jpg/800px-Rosslyn_Chapel_Stained_Glass.jpg',
    externalLink: 'https://en.wikipedia.org/wiki/Rosslyn_Chapel'
  }
};

export const REAL_OBJECTS: Record<string, RealObject> = {
  ...REAL_ARTWORKS,
  ...REAL_PLACES,

  'philosophers-stone': {
    id: 'philosophers-stone',
    name: 'The Philosopher\'s Stone',
    type: 'artifact',
    description: 'A legendary alchemical substance said to transmute base metals into gold.',
    significance: 'The ultimate goal of alchemy and spiritual transformation',
    gameConnection: 'The key to unlocking all hidden knowledge',
    externalLink: 'https://en.wikipedia.org/wiki/Philosopher%27s_stone'
  },

  'holy-grail': {
    id: 'holy-grail',
    name: 'The Holy Grail',
    type: 'artifact',
    description: 'The cup used by Jesus at the Last Supper, symbolizing divine wisdom.',
    significance: 'Represents the quest for spiritual enlightenment',
    gameConnection: 'The vessel that contains the waters of wisdom',
    externalLink: 'https://en.wikipedia.org/wiki/Holy_Grail'
  },

  'tarot-deck': {
    id: 'tarot-deck',
    name: 'Tarot de Marseille',
    type: 'artifact',
    description: 'A traditional tarot deck used for divination and spiritual guidance.',
    significance: '78 cards representing archetypal energies and life paths',
    gameConnection: 'The living cards that guide the player\'s journey',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Tarot_marseille_card_game.jpg/800px-Tarot_marseille_card_game.jpg',
    externalLink: 'https://en.wikipedia.org/wiki/Tarot_de_Marseille'
  }
};

export const SACRED_ARTIFACTS: Record<string, RealObject> = {
  'merkaba-vehicle': {
    id: 'merkaba-vehicle',
    name: 'Merkaba Vehicle',
    type: 'artifact',
    description: 'A star tetrahedron representing the vehicle of ascension in sacred geometry.',
    significance: 'The geometric form that enables interdimensional travel',
    gameConnection: 'The player\'s vehicle for traveling between realms',
    externalLink: 'https://en.wikipedia.org/wiki/Merkaba'
  },

  'flower-of-life': {
    id: 'flower-of-life',
    name: 'Flower of Life',
    type: 'artwork',
    description: 'A sacred geometric pattern consisting of overlapping circles.',
    significance: 'The fundamental pattern of creation in sacred geometry',
    gameConnection: 'The map of all possible realities and dimensions',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flower-of-Life-small.png/800px-Flower-of-Life-small.png',
    externalLink: 'https://en.wikipedia.org/wiki/Flower_of_life'
  }
};
