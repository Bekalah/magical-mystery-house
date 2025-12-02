/**
 * Gem Tower Engine
 * Crystal and gem visualization system
 */

export const gemTypes = {
  AMETHYST: { color: "#9966CC", frequency: 963, chakra: "crown" },
  CITRINE: { color: "#FFD700", frequency: 528, chakra: "solar-plexus" },
  ROSE_QUARTZ: { color: "#FFB6C1", frequency: 639, chakra: "heart" },
  CLEAR_QUARTZ: { color: "#FFFFFF", frequency: 432, chakra: "all" },
  LAPIS_LAZULI: { color: "#4169E1", frequency: 852, chakra: "third-eye" },
};

export const createGemTower = (gems = []) => {
  return {
    type: "gem-tower",
    gems,
    height: gems.length,
    timestamp: Date.now(),
  };
};

export const getGemProperties = (gemName) => {
  return gemTypes[gemName] || gemTypes.CLEAR_QUARTZ;
};

export default {
  gemTypes,
  createGemTower,
  getGemProperties,
};
