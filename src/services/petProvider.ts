import { mockPets } from '../data/mockData';
import type { PetProfile, Pet } from '../types/pet';

const FALLBACK_IMAGE = 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg';

const types = ['Dog', 'Cat', 'Rabbit'];
const locations = ['New York', 'Los Angeles', 'Chicago'];

// Seed mock data with random types and locations if empty
mockPets.forEach(pet => {
  if (!pet.type) pet.type = types[Math.floor(Math.random() * types.length)];
  if (!pet.location) pet.location = locations[Math.floor(Math.random() * locations.length)];
});

export const getRandomPetProfile = async (filters: { type?: string, location?: string } = {}): Promise<PetProfile> => {
  const filteredPets = mockPets.filter(pet => {
    let match = true;
    if (filters.type && pet.type !== filters.type) match = false;
    if (filters.location && pet.location !== filters.location) match = false;
    return match;
  });

  const pool = filteredPets.length > 0 ? filteredPets : mockPets;
  const basePet: Pet = pool[Math.floor(Math.random() * pool.length)];

  let imageUrl: string = FALLBACK_IMAGE;
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    if (res.ok) {
      const json = await res.json();
      if (json && json.message) {
        imageUrl = json.message;
      }
    }
  } catch (error) {
    console.error('Error fetching image from Dog API:', error);
  }

  return {
    ...basePet,
    imageUrl
  };
};
