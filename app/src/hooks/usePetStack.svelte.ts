import { getRandomPetProfile } from '../services/petProvider';
import type { PetProfile } from '../types/pet';

export function usePetStack(initialFilters: { type?: string; location?: string } = {}) {
  let stack = $state<PetProfile[]>([]);
  let loading = $state(true);

  let filters = { ...initialFilters };
  let generation = 0;
  let fillInFlight: Promise<void> | null = null;

  function fillStack() {
    if (fillInFlight) return fillInFlight;

    const gen = generation;
    const promise = (async () => {
      while (generation === gen && stack.length < 3) {
        const pet = await getRandomPetProfile(filters).catch(() => null);
        if (generation !== gen) return;
        if (!pet) return;
        stack.push(pet);
      }
    })();

    fillInFlight = promise;

    promise.finally(() => {
      if (fillInFlight === promise) fillInFlight = null;
      if (generation === gen) loading = false;
    });

    return promise;
  }

  function init() {
    generation += 1;
    stack = [];
    loading = true;
    fillInFlight = null;
    void fillStack();
  }

  function next() {
    if (stack.length > 0) {
      stack.shift();
      void fillStack();
    }
  }

  function updateFilters(newFilters: { type?: string; location?: string }) {
    filters = { ...newFilters };
    init();
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
    next,
    updateFilters
  };
}