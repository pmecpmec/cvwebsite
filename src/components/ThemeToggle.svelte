<script>
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';

  let isDark = true;
  let mounted = false;

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
    mounted = true;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('theme')) {
        isDark = e.matches;
        apply();
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  function apply() {
    document.documentElement.classList.toggle('dark', isDark);
  }

  function toggle() {
    isDark = !isDark;
    apply();
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
</script>

<button
  on:click={toggle}
  class="relative p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)]
         backdrop-blur-sm transition-all duration-300
         hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10
         hover:scale-105 active:scale-95 focus-ring"
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <div class="relative w-5 h-5 overflow-hidden">
    {#if mounted}
      <div
        class="absolute inset-0 flex items-center justify-center transition-all duration-500"
        class:translate-y-0={isDark}
        class:-translate-y-8={!isDark}
        class:opacity-100={isDark}
        class:opacity-0={!isDark}
      >
        <Sun size={18} strokeWidth={2} class="text-amber-400" />
      </div>
      <div
        class="absolute inset-0 flex items-center justify-center transition-all duration-500"
        class:translate-y-0={!isDark}
        class:translate-y-8={isDark}
        class:opacity-100={!isDark}
        class:opacity-0={isDark}
      >
        <Moon size={18} strokeWidth={2} class="text-primary" />
      </div>
    {/if}
  </div>
</button>
