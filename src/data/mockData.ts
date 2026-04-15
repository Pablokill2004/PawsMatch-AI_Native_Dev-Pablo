import petsData from './pets.json';
import type { Pet } from '../types/pet';

// We assert the type directly based on our generated mock schema.
export const mockPets: Pet[] = petsData.profiles as Pet[];
