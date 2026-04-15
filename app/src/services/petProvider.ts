import { mockPets } from '../data/mockData';
import type { PetProfile, Pet } from '../types/pet';

const FALLBACK_IMAGE = 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg';

export const getRandomPetProfile = async (): Promise<PetProfile> => {
  // 1. Select a local random bio
  const randomIndex = Math.floor(Math.random() * mockPets.length);
  const basePet: Pet = mockPets[randomIndex];

  // 2. Fetch the random image from The Dog API
  let imageUrl: string = FALLBACK_IMAGE;
  
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    if (res.ok) {
      const json = await res.json();
      if (json && json.message) {
        imageUrl = json.message;
      }
    } else {
      console.warn('Failed to fetch from Dog API. Falling back to default image.');
    }
  } catch (error) {
    console.error('Error fetching image from Dog API:', error);
  }

  // 3. Merge base properties and the dynamically fetched image
  return {
    ...basePet,
    imageUrl
  };
};