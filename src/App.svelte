<script lang="ts">
  import { onMount } from "svelte";
  import PetCard from "./components/PetCard.svelte";
  import AdoptionConfirmation from "./components/AdoptionConfirmation.svelte";
  import { usePetStack } from "./hooks/usePetStack.svelte";
  import type { PetProfile } from "./types/pet";

  const petStack = usePetStack();

  type AppScreen = "browse" | "adoption";
  let currentScreen = $state<AppScreen>("browse");
  let matchedPet = $state<PetProfile | null>(null);

  let selectedType = $state<string>("");
  let selectedLocation = $state<string>("");

  // Filters logic
  function applyFilters() {
    petStack.updateFilters({
      type: selectedType || undefined,
      location: selectedLocation || undefined,
    });
  }

  onMount(() => {
    petStack.init();
  });

  function handleLike() {
    matchedPet = petStack.current;
    currentScreen = "adoption";
    
    // Asynchronously advance the stack. When the user returns to browse, a new pet is waiting.
    setTimeout(() => petStack.next(), 300);
  }

  function handlePass() {
    petStack.next();
  }

  function handleContinueBrowsing() {
    matchedPet = null;
    currentScreen = "browse";
  }

  function handleKeydown(event: KeyboardEvent) {
    if (currentScreen !== "browse" || petStack.loading || !petStack.current) return;
    if (event.key === "ArrowRight") handleLike();
    if (event.key === "ArrowLeft") handlePass();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- The main wrapper employs a mobile-first native feel with fixed screen height and gradient bg -->
<main class="w-full max-w-lg mx-auto h-[100dvh] bg-warm-100 overflow-hidden relative flex flex-col items-center justify-center shadow-2xl xl:rounded-3xl xl:h-[90dvh]">
  
  <!-- Fancy Background ambient lights -->
  <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
  <div class="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-friendly-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

  {#if currentScreen === "browse"}
    <div class="absolute top-4 z-20 flex gap-2 w-full px-4 justify-center bg-white/50 backdrop-blur-sm p-3 rounded-b-xl shadow-sm">
      <select bind:value={selectedType} onchange={applyFilters} class="p-2 rounded-lg border border-warm-300 text-sm font-medium bg-white">
        <option value="">Todos los Tipos</option>
        <option value="Dog">Perro (Dog)</option>
        <option value="Cat">Gato (Cat)</option>
        <option value="Rabbit">Conejo (Rabbit)</option>
        <option value="Bird">Ave (Bird)</option>
      </select>
      <select bind:value={selectedLocation} onchange={applyFilters} class="p-2 rounded-lg border border-warm-300 text-sm font-medium bg-white">
        <option value="">Cualquier Lugar</option>
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
        <option value="Houston">Houston</option>
        <option value="Phoenix">Phoenix</option>
      </select>
    </div>
  {/if}

  {#if petStack.loading}
    <!-- Loading State -->
    <div class="flex flex-col items-center gap-4 text-warm-500 font-bold text-xl animate-pulse z-10">
      <div class="w-16 h-16 rounded-full border-4 border-t-primary-500 border-warm-200 animate-spin"></div>
      <p>Buscando hocicos...</p>
    </div>
  {:else if !petStack.current && currentScreen === "browse"}
    <!-- Empty State -->
    <div class="flex flex-col items-center gap-4 text-warm-500 text-center font-medium z-10 p-8 bg-white/80 rounded-xl">
      <p class="text-2xl">😢</p>
      <p>No se encontraron mascotas con esos filtros.</p>
      <button onclick={() => {
        selectedType = ""; selectedLocation = ""; applyFilters();
      }} class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg font-bold shadow hover:bg-primary-600 transition">
        Ver Todas
      </button>
    </div>
  {:else if currentScreen === "browse"}
    <!-- Swipe Interface -->
    <div class="w-full max-w-sm flex items-center justify-center z-10 h-full relative">
       <PetCard 
         profile={petStack.current} 
         onLike={handleLike} 
         onPass={handlePass}
       />
    </div>
  {:else if currentScreen === "adoption" && matchedPet}
    <!-- Match Confirmation / Shelter Info -->
    <div class="w-full max-w-md h-full flex flex-col items-center justify-center z-10">
       <AdoptionConfirmation 
         profile={matchedPet} 
         onContinue={handleContinueBrowsing} 
       />
    </div>
  {/if}

  <!-- Hidden preload images to guarantee zero-latency transitions -->
  <div class="hidden">
    {#each petStack.upcoming as pet (pet.id)}
      <img src={pet.imageUrl} alt="preload {pet.name}" />
    {/each}
  </div>
</main>

