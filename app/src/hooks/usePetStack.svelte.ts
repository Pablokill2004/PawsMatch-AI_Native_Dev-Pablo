import { getRandomPetProfile } from '../services/petProvider';
import type { PetProfile } from '../types/pet';

export function usePetStack() {
  let stack = $state<PetProfile[]>([]);
  let loading = $state(true);

  async function fillStack() {
    const promises = [];
    while (stack.length + promises.length < 3) {
      promises.push(getRandomPetProfile());
    }
    const newPets = await Promise.all(promises);
    stack.push(...newPets);
    loading = false;
  }

  function init() {
    loading = true;
    fillStack();
  }

  function next() {
    if (stack.length > 0) {
      stack.shift();
      fillStack();
    }
  }

  return {
    get current() {
      return stack[0] || null;
    },
    get upcoming() {
      return stack.slice(1);
    },
    get loading() {
      return loading;
    },
    init,
    next
  };
}