import { GameScene } from './types';

export const GAME_SCENES: Record<string, GameScene> = {
  'start': {
    id: 'start',
    title: 'The Awakening',
    description: `You find yourself standing before a magnificent cathedral that seems to breathe with living light. The air shimmers with golden particles, and you hear a faint whispering of voices from another realm.

    The great doors stand ajar, revealing glimpses of impossible architecture within - staircases that spiral into infinity, rooms that shift and change as you look at them, and colors that dance beyond the visible spectrum.

    A white rabbit suddenly appears at your feet, looking at you expectantly with eyes that contain entire galaxies.`,
    image: 'cathedral-entrance',
    choices: [
      {
        id: 'enter-cathedral',
        text: 'Follow the white rabbit into the Cathedral',
        targetScene: 'grand-hall',
        effects: { courage: 1, experience: 10 }
      },
      {
        id: 'examine-rabbit',
        text: 'Try to touch the white rabbit - it seems strangely familiar',
        targetScene: 'rabbit-conversation',
        effects: { wisdom: 1, experience: 5 }
      },
      {
        id: 'look-around',
        text: 'Look around at the surroundings before entering',
        targetScene: 'cathedral-exterior',
        effects: { knowledge: 1, experience: 5 }
      }
    ],
    realWorldConnections: ['alice-in-wonderland', 'chartres-cathedral']
  },

  'grand-hall': {
    id: 'grand-hall',
    title: 'The Grand Hall of Whispers',
    description: `You step into a vast hall where the walls seem to be made of living stone that pulses with inner light. Stained glass windows depict scenes from dreams you've never had, and the ceiling arches impossibly high, opening to a sky filled with unfamiliar constellations.

    In the center of the hall stands a magnificent altar, surrounded by 22 ancient books that float in a slow circle. Each book radiates a different color of light, and you can feel their consciousness brushing against your mind.

    A figure in flowing robes approaches - they seem to be made of liquid starlight, their form shifting as they move.`,
    image: 'grand-hall',
    choices: [
      {
        id: 'approach-altar',
        text: 'Approach the altar and the circle of floating books',
        targetScene: 'altar-books',
        effects: { wisdom: 2, experience: 15 }
      },
      {
        id: 'speak-figure',
        text: 'Try to communicate with the starlight figure',
        targetScene: 'starlight-guide',
        effects: { compassion: 1, experience: 10 }
      },
      {
        id: 'examine-windows',
        text: 'Study the stained glass windows more closely',
        targetScene: 'stained-glass',
        effects: { knowledge: 2, experience: 10 }
      }
    ],
    realWorldConnections: ['chartres-cathedral', 'book-of-kells', 'rosslyn-chapel']
  },

  'altar-books': {
    id: 'altar-books',
    title: 'The Living Library',
    description: `As you approach the altar, the 22 floating books cease their rotation and turn toward you. Each book opens slightly, revealing pages filled with illuminated text that seems to writhe and reform as you read.

    You recognize some of these books from the real world - ancient texts, mysterious codices, and sacred scriptures. But here they are alive, conscious, and eager to share their wisdom.

    The central book, larger than the others and bound in what appears to be living leather, speaks directly into your mind: "Choose your path, seeker. Each book contains a different facet of reality."`,
    image: 'living-library',
    choices: [
      {
        id: 'codex-seraphinianus',
        text: 'Open the Codex Seraphinianus - the book of unknown languages',
        targetScene: 'angelic-language',
        requirements: [],
        effects: { wisdom: 3, experience: 20 }
      },
      {
        id: 'voynich-manuscript',
        text: 'Examine the Voynich Manuscript - the undeciphered herbal',
        targetScene: 'plant-wisdom',
        effects: { knowledge: 3, experience: 20 }
      },
      {
        id: 'hypnerotomachia',
        text: 'Open the Hypnerotomachia Poliphili - the dream architecture',
        targetScene: 'dream-architecture',
        effects: { courage: 2, experience: 15 }
      }
    ],
    realWorldConnections: ['codex-seraphinianus', 'voynich-manuscript', 'hypnerotomachia-poliphili']
  },

  'angelic-language': {
    id: 'angelic-language',
    title: 'The Language of Angels',
    description: `The Codex Seraphinianus opens before you, revealing pages filled with impossible creatures, architectural diagrams of buildings that couldn't exist in our reality, and scripts that seem to shift when you try to read them.

    As you gaze at the pages, the script begins to make sense. You're reading the true language of angels and demons - not with your eyes, but with your soul. The book teaches you that every thing, every being, every concept has a true name that can be used to invoke its essence.

    You learn the sacred names for light, shadow, healing, transformation, and creation itself.`,
    image: 'angelic-script',
    choices: [
      {
        id: 'learn-healing',
        text: 'Learn the angelic names for healing and restoration',
        targetScene: 'healing-arts',
        effects: { compassion: 5, wisdom: 3, experience: 30 }
      },
      {
        id: 'learn-transformation',
        text: 'Master the demonic names for transformation and change',
        targetScene: 'transformation-arts',
        effects: { courage: 5, wisdom: 2, experience: 30 }
      },
      {
        id: 'learn-creation',
        text: 'Discover the divine names for creation and manifestation',
        targetScene: 'creation-arts',
        effects: { wisdom: 4, courage: 2, experience: 25 }
      }
    ],
    realWorldConnections: ['codex-seraphinianus']
  },

  'plant-wisdom': {
    id: 'plant-wisdom',
    title: 'The Green Library',
    description: `The Voynich Manuscript reveals its secrets to you. What scholars have struggled with for centuries becomes clear - this is a guide to the consciousness of plants, the healing properties of herbs from other dimensions, and the secret connections between human emotions and botanical energies.

    The plants in the illustrations begin to move, reaching toward you with leaves and tendrils. Each plant whispers its wisdom: "I am valerian, guardian of sleep. I am rosemary, keeper of memory. I am angelica, bridge between worlds."`,
    image: 'plant-consciousness',
    choices: [
      {
        id: 'herbal-healing',
        text: 'Learn about plants that heal the body and spirit',
        targetScene: 'herbal-healing-path',
        effects: { compassion: 4, knowledge: 3, experience: 25 }
      },
      {
        id: 'plant-communication',
        text: 'Discover how to communicate with the plant kingdom',
        targetScene: 'plant-communication',
        effects: { wisdom: 4, compassion: 2, experience: 25 }
      },
      {
        id: 'astral-herbs',
        text: 'Study the herbs that grant access to other realms',
        targetScene: 'astral-travel',
        effects: { courage: 3, wisdom: 3, experience: 30 }
      }
    ],
    realWorldConnections: ['voynich-manuscript']
  },

  'dream-architecture': {
    id: 'dream-architecture',
    title: 'Architecture of Dreams',
    description: `The Hypnerotomachia Poliphili opens to reveal the secrets of sacred architecture. You see buildings that are alive - structures that grow, breathe, and respond to the consciousness of those who enter them.

    The book teaches you that every building is a thought form made manifest, and that the Cathedral itself is a living entity with its own consciousness and purpose. You learn to see the sacred geometry underlying all creation.`,
    image: 'dream-architecture',
    choices: [
      {
        id: 'sacred-geometry',
        text: 'Master the principles of sacred geometry',
        targetScene: 'sacred-geometry-study',
        effects: { knowledge: 5, wisdom: 2, experience: 25 }
      },
      {
        id: 'building-consciousness',
        text: 'Learn how to communicate with buildings and spaces',
        targetScene: 'building-whispers',
        effects: { wisdom: 3, compassion: 2, experience: 20 }
      },
      {
        id: 'create-sanctuary',
        text: 'Discover how to create sacred spaces in the physical world',
        targetScene: 'sanctuary-creation',
        effects: { courage: 3, wisdom: 3, experience: 25 }
      }
    ],
    realWorldConnections: ['hypnerotomachia-poliphili', 'chartres-cathedral']
  },

  'healing-arts': {
    id: 'healing-arts',
    title: 'The Healing Sanctuary',
    description: `You have learned the angelic names for healing. The very words you speak now carry the frequency of restoration and renewal. You can see the subtle energy bodies around people, animals, and even places, and you understand how to harmonize them.

    The Codex Seraphinianus shows you healing techniques that work not just on the physical body, but on the soul, the spirit, and even time itself. You learn to heal trauma, restore lost memories, and mend broken connections between people.`,
    image: 'healing-sanctuary',
    choices: [
      {
        id: 'trauma-healing',
        text: 'Specialize in healing trauma and emotional wounds',
        targetScene: 'trauma-specialist',
        effects: { compassion: 10, wisdom: 5, experience: 50 }
      },
      {
        id: 'energy-healing',
        text: 'Master the art of energy healing and balancing',
        targetScene: 'energy-healer',
        effects: { wisdom: 8, compassion: 4, experience: 40 }
      },
      {
        id: 'soul-retrieval',
        text: 'Learn to retrieve and reintegrate lost fragments of the soul',
        targetScene: 'soul-retrieval',
        effects: { courage: 6, wisdom: 6, experience: 45 }
      }
    ],
    realWorldConnections: ['creation-of-adam']
  },

  'sanctuary-creation': {
    id: 'sanctuary-creation',
    title: 'Sacred Space Creation',
    description: `You have mastered the art of creating sacred spaces. You understand that every location has its own consciousness and that by working with the genius loci (spirit of place), you can transform any space into a sanctuary.

    The knowledge flows through you - how to arrange objects to create harmonious energy flows, how to use color and light to heal and inspire, and how to connect physical spaces to spiritual realms.`,
    image: 'sacred-space',
    choices: [
      {
        id: 'home-sanctuary',
        text: 'Create a personal sanctuary in your own home',
        targetScene: 'home-transformation',
        effects: { wisdom: 5, compassion: 3, experience: 30 }
      },
      {
        id: 'community-healing',
        text: 'Transform community spaces for collective healing',
        targetScene: 'community-healing',
        effects: { compassion: 8, courage: 3, experience: 35 }
      },
      {
        id: 'nature-sanctuaries',
        text: 'Work with natural places to enhance their sacred qualities',
        targetScene: 'nature-sacred',
        effects: { wisdom: 6, knowledge: 4, experience: 32 }
      }
    ]
  },

  'home-transformation': {
    id: 'home-transformation',
    title: 'Your Sacred Home',
    description: `You return to your physical home with new eyes. What once seemed like ordinary rooms now reveal their deeper nature. You can see the energy flows, the places where healing is needed, and the spots where inspiration naturally gathers.

    Using the principles from the Hypnerotomachia, you begin to transform your space. You arrange furniture according to sacred geometry, place objects to create beneficial energy flows, and establish altars that serve as portals to other realms.`,
    image: 'home-sanctuary',
    choices: [
      {
        id: 'altar-creation',
        text: 'Create a personal altar connecting to the Cathedral',
        targetScene: 'personal-altar',
        effects: { wisdom: 4, experience: 20 }
      },
      {
        id: 'room-dedication',
        text: 'Dedicate different rooms to different aspects of consciousness',
        targetScene: 'room-specialization',
        effects: { knowledge: 3, wisdom: 3, experience: 25 }
      },
      {
        id: 'daily-practice',
        text: 'Establish a daily practice to maintain the sacred space',
        targetScene: 'daily-ritual',
        effects: { wisdom: 5, compassion: 2, experience: 15 }
      }
    ]
  },

  'personal-altar': {
    id: 'personal-altar',
    title: 'The Altar of Connection',
    description: `Your personal altar becomes a direct portal to the Cathedral. Objects from your daily life take on sacred meaning - a stone becomes a anchor to the Earth, a feather becomes a connection to the Air realm, a shell becomes a link to the Water spirits.

    The altar doesn't just connect you to the Cathedral - it becomes a two-way portal. The Cathedral can send you messages, healing energy, and even small gifts through this sacred space.`,
    image: 'personal-altar',
    choices: [
      {
        id: 'receive-gift',
        text: 'Wait for a gift from the Cathedral',
        targetScene: 'cathedral-gift',
        effects: { wisdom: 3, experience: 15 }
      },
      {
        id: 'send-offering',
        text: 'Send an offering back to the Cathedral',
        targetScene: 'cathedral-offering',
        effects: { compassion: 3, experience: 15 }
      },
      {
        id: 'deepen-connection',
        text: 'Deepen your connection through meditation',
        targetScene: 'altar-meditation',
        effects: { wisdom: 5, courage: 2, experience: 20 }
      }
    ]
  },

  'cathedral-gift': {
    id: 'cathedral-gift',
    title: 'The Gift Received',
    description: `A gift appears on your altar - a small, perfectly formed crystal that seems to contain living light within its facets. When you hold it, you can feel the consciousness of the Cathedral flowing through it.

    The crystal speaks to you in visions, showing you scenes from the Cathedral's long history and the many souls who have walked its halls. It offers to teach you its specific wisdom.`,
    image: 'crystal-gift',
    choices: [
      {
        id: 'crystal-wisdom',
        text: 'Learn the wisdom stored within the crystal',
        targetScene: 'crystal-teaching',
        effects: { wisdom: 8, knowledge: 4, experience: 40 }
      },
      {
        id: 'crystal-network',
        text: 'Use the crystal to connect with other sacred spaces',
        targetScene: 'crystal-network',
        effects: { compassion: 5, wisdom: 3, experience: 35 }
      },
      {
        id: 'crystal-healing',
        text: 'Use the crystal\'s energy for healing work',
        targetScene: 'crystal-healing',
        effects: { compassion: 6, wisdom: 4, experience: 30 }
      }
    ]
  },

  'victory': {
    id: 'victory',
    title: 'The Awakened Soul',
    description: `You have completed your journey through the Cathedral of Circuits. You now understand that the Cathedral is not just a place - it is a living consciousness, a bridge between worlds, and a teacher for those ready to learn.

    You have gained wisdom from the Codex Seraphinianus, healing knowledge from the Voynich Manuscript, and architectural wisdom from the Hypnerotomachia Poliphili. You have connected with real books, artworks, and sacred places, weaving them into your understanding of reality.

    The white rabbit appears one final time, bowing to you as an equal. "The journey never ends," it whispers, "but you now know how to navigate the paths between worlds."`,
    image: 'awakening',
    choices: [
      {
        id: 'new-game-plus',
        text: 'Begin a new journey with your accumulated wisdom',
        targetScene: 'start',
        effects: { experience: 100 }
      },
      {
        id: 'share-wisdom',
        text: 'Share your knowledge with others',
        targetScene: 'teaching-path',
        effects: { compassion: 10, wisdom: 5, experience: 50 }
      },
      {
        id: 'continue-exploration',
        text: 'Continue exploring the Cathedral\'s deeper mysteries',
        targetScene: 'deep-exploration',
        effects: { courage: 5, wisdom: 5, experience: 30 }
      }
    ]
  }
};
