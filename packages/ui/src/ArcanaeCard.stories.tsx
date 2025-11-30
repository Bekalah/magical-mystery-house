import type { Meta, StoryObj } from '@storybook/react';
import { ArcanaeCard } from './ArcanaeCard';

const meta: Meta<typeof ArcanaeCard> = {
  title: 'Cathedral/ArcanaeCard',
  component: ArcanaeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    arcana: {
      name: 'The Fool - Rebecca Respawn',
      guardian_spirit: 'Wuji Void Master',
      tradition_engine: 'Tao Te Ching + Giordano Bruno Cosmology',
      core_teaching: 'Every ending is a beginning. Every trauma can become wisdom.',
      science_correspondences: {
        frequency: 0,
        color: '#0B0B0B',
        crystal: 'Obsidian',
        geometry: 'Perfect Circle'
      },
      fusion_kink_abilities: ['Reset Function', 'Cosmic Gateway', 'Trauma Alchemy'],
      lab_environment: 'Void Laboratory',
      artistic_lineage: 'Leonora Carrington surrealism, Björk void soundscapes'
    }
  },
};

export const HighPriestess: Story = {
  args: {
    arcana: {
      name: 'The High Priestess - Dion Fortune + Emma Kunz',
      guardian_spirit: 'Sacred Geometry Healing Master',
      tradition_engine: 'Kabbalistic Psychology + Geometric Healing',
      core_teaching: 'The unconscious speaks through sacred patterns and geometric harmony.',
      science_correspondences: {
        frequency: 442.95,
        color: '#F8F8FF',
        crystal: 'Selenite',
        geometry: 'Vesica Piscis'
      },
      fusion_kink_abilities: ['Geometric Overlay', 'Harmonic Grid', 'Intuitive Enhancement'],
      lab_environment: 'Sacred Geometry Healing Studio',
      artistic_lineage: 'Emma Kunz pendulum art, Dion Fortune visionary psychology'
    }
  },
};

export const Lovers: Story = {
  args: {
    arcana: {
      name: 'The Lovers - Leonora Carrington',
      guardian_spirit: 'Alchemical Union Master',
      tradition_engine: 'Surrealist Alchemy + Sacred Relationship',
      core_teaching: 'True love is the alchemical marriage of conscious and unconscious.',
      science_correspondences: {
        frequency: 396,
        color: '#E5989B',
        crystal: 'Rhodonite',
        geometry: 'Interlaced Circles'
      },
      fusion_kink_abilities: ['FUSION KINK MASTER', 'Sacred Union', 'Alchemical Synthesis'],
      lab_environment: 'Alchemical Union Chamber',
      artistic_lineage: 'Leonora Carrington surrealist alchemy, Remedios Varo visionary art'
    }
  },
};
