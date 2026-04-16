<script lang="ts">
  import { MapPin, Clock, Phone, CalendarHeart, Undo2 } from 'lucide-svelte';
  import type { PetProfile } from "../types/pet";

  let { profile, onContinue } = $props<{ 
    profile: PetProfile; 
    onContinue: () => void; 
  }>();

  function handleSchedule() {
    alert(`Redirigiendo a reserva de cita para conocer a ${profile.name}...`);
  }
</script>

<div class="h-[80vh] min-h-[500px] w-full max-w-sm mx-auto flex flex-col p-6 bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white overflow-y-auto">
  <!-- Profile Header -->
  <div class="w-32 h-32 rounded-full overflow-hidden border-[6px] border-white shadow-xl mx-auto shrink-0 mb-4 bg-primary-100 relative">
    <img src={profile.imageUrl} alt={profile.name} class="absolute inset-0 w-full h-full object-cover" />
  </div>
  
  <div class="text-center mb-6">
    <div class="inline-flex items-center gap-2 bg-friendly-100 text-friendly-600 px-4 py-1.5 rounded-full font-bold text-sm tracking-wide self-center mx-auto mb-3 shadow-inner">
      <Heart fill="currentColor" size={16} /> ¡Match!
    </div>
    <h2 class="text-3xl font-extrabold text-warm-900 tracking-tight">¡Felicidades!</h2>
    <p class="text-lg text-warm-600 mt-2 font-medium">
      A <span class="font-extrabold text-primary-600">{profile.name}</span> también le gustaste.
    </p>
  </div>

  <!-- Information Card -->
  <div class="bg-warm-50/80 p-5 rounded-3xl border border-warm-100 space-y-4 mb-6 shadow-inner flex-1">
    <h3 class="text-xl font-bold text-warm-900 border-b border-warm-200 pb-3 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
      Refugio Huellitas
    </h3>
    
    <div class="flex items-start text-warm-700 gap-3 pt-1">
      <MapPin size={22} strokeWidth={2.5} class="text-primary-500 shrink-0 mt-0.5" />
      <span class="text-[15px] font-medium leading-relaxed">Zona 14, Ciudad de Guatemala, Calle de los Perros 10-24</span>
    </div>
    
    <div class="flex items-start text-warm-700 gap-3">
      <Clock size={22} strokeWidth={2.5} class="text-primary-500 shrink-0 mt-0.5" />
      <span class="text-[15px] font-medium leading-relaxed">Lunes a Sábado<br/><span class="text-sm text-warm-500 font-normal">8:00 AM - 4:00 PM</span></span>
    </div>

    <div class="flex items-center text-warm-700 gap-3">
      <Phone size={22} strokeWidth={2.5} class="text-primary-500 shrink-0" />
      <span class="text-[15px] font-bold tracking-wider">+502 2444-1234</span>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="flex flex-col gap-3 mt-auto shrink-0">
    <button 
      onclick={handleSchedule}
      class="w-full flex items-center justify-center gap-3 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-transform active:scale-[0.98] shadow-xl text-lg"
    >
      <CalendarHeart size={24} strokeWidth={2.5} />
      Agendar Cita
    </button>
    
    <button 
      onclick={onContinue}
      class="w-full flex items-center justify-center gap-2 py-3 text-warm-500 hover:text-warm-600 hover:bg-warm-100/50 font-bold rounded-2xl transition-all active:scale-[0.98] text-base"
    >
      <Undo2 size={20} strokeWidth={2.5} />
      Seguir buscando
    </button>
  </div>
</div>

<script lang="ts" module>
  // Context module lets us import Heart cleanly despite not needing it exported in template initially 
  import { Heart } from 'lucide-svelte';
</script>