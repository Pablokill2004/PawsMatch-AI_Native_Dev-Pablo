<script lang="ts">
  import { spring } from 'svelte/motion';
  import { Heart, X } from 'lucide-svelte';
  import type { PetProfile } from '../types/pet';

  let { profile, onLike, onPass } = $props<{
    profile: PetProfile;
    onLike: () => void;
    onPass: () => void;
  }>();

  // Spring animation for smooth dragging
  const x = spring(0, { stiffness: 0.1, damping: 0.4 });
  const y = spring(0, { stiffness: 0.1, damping: 0.4 });
  const rotation = spring(0, { stiffness: 0.1, damping: 0.4 });

  let isDragging = $state(false);
  let startX = 0;
  let startY = 0;

  function handlePointerDown(e: PointerEvent) {
    isDragging = true;
    startX = e.clientX - $x;
    startY = e.clientY - $y;
    e.target?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return;
    const newX = e.clientX - startX;
    const newY = e.clientY - startY;
    x.set(newX);
    y.set(newY);
    rotation.set(newX * 0.05); // Tilt card left/right
  }

  function handlePointerUp(e: PointerEvent) {
    isDragging = false;
    e.target?.releasePointerCapture(e.pointerId);
    
    // Swipe threshold
    if ($x > 100) {
      onLike();
    } else if ($x < -100) {
      onPass();
    } else {
      // Snap back if threshold not met
      x.set(0);
      y.set(0);
      rotation.set(0);
    }
  }

  // Effect to instantly reset the card position when a new pet profile loads
  $effect(() => {
    profile; // trigger reactivity
    x.set(0, { hard: true });
    y.set(0, { hard: true });
    rotation.set(0, { hard: true });
  });
</script>

<div 
  class="relative w-full max-w-sm h-[70vh] max-h-[600px] select-none touch-none will-change-transform mt-8"
  style="transform: translate({$x}px, {$y}px) rotate({$rotation}deg);"
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
  onpointercancel={handlePointerUp}
>
  <div class="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-warm-100 bg-white/70 backdrop-blur-xl flex flex-col relative group">
    
    <div class="absolute inset-0 -z-10">
      <img src={profile.imageUrl} alt={profile.name} draggable="false" class="w-full h-full object-cover object-center pointer-events-none" />
    </div>

    <!-- Glassmorphism overlay at the bottom with extra bottom padding to avoid button overlap -->
    <div class="mt-auto p-6 pb-16 pt-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col pointer-events-none">
      <h2 class="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
        {profile.name}
      </h2>
      <p class="text-warm-50 text-base leading-relaxed mt-2 drop-shadow-sm font-medium">
        {profile.bio}
      </p>
    </div>
  </div>

  <!-- Absolute Action Buttons overlaying the bottom slightly further down -->
  <div class="absolute -bottom-10 left-0 right-0 flex justify-center gap-8 z-10 w-full px-6">
    <button 
      onclick={onPass}
      aria-label="No me interesa"
      class="bg-white text-warm-500 hover:text-warm-600 hover:bg-warm-50 transition-all p-5 rounded-full shadow-2xl border-4 border-warm-100 flex items-center justify-center cursor-pointer active:scale-90"
    >
      <X size={36} strokeWidth={3} />
    </button>
    
    <button 
      onclick={onLike}
      aria-label="¡Me encanta!"
      class="bg-white text-friendly-500 hover:text-friendly-600 hover:bg-friendly-50 transition-all p-5 rounded-full shadow-2xl border-4 border-friendly-100 flex items-center justify-center cursor-pointer active:scale-90"
    >
      <Heart size={36} strokeWidth={3} />
    </button>
  </div>
</div>