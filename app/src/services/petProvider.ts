import { mockPets } from '../data/mockData';
import type { PetProfile, Pet } from '../types/pet';

const FALLBACK_IMAGE = 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg';

const types = ['Dog', 'Cat', 'Rabbit', 'Bird'];
const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

// Seed mock data with deterministic types and locations if empty
mockPets.forEach((pet) => {
  if (!pet.type) pet.type = types[(pet.id - 1) % types.length];
  if (!pet.location) pet.location = locations[(pet.id - 1) % locations.length];
});

export const getRandomPetProfile = async (
  filters: { type?: string; location?: string } = {}
): Promise<PetProfile> => {
  const filteredPets = mockPets.filter((pet) => {
    let match = true;
    if (filters.type && pet.type !== filters.type) match = false;
    if (filters.location && pet.location !== filters.location) match = false;
    return match;
  });

  if (filteredPets.length === 0) {
    throw new Error('No pets match the selected filters');
  }

  const basePet: Pet = filteredPets[Math.floor(Math.random() * filteredPets.length)];

  let imageUrl: string = FALLBACK_IMAGE;
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    if (res.ok) {
      const json = await res.json();
      if (json && json.message) {
        imageUrl = json.message;
      }
    }
  } catch {
    // Fallback image is used when the network request fails.
  }

  return {
    ...basePet,
    imageUrl
  };
};