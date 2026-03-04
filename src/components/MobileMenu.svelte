<script>
  import { Menu, X } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#contact', label: 'Contact' },
  ];

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function close() {
    isOpen = false;
    document.body.style.overflow = '';
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape' && isOpen) close();
  }}
/>

<button
  on:click={toggle}
  class="md:hidden p-2 rounded-lg border border-[var(--border-color)]
         bg-[var(--bg-glass)] backdrop-blur-sm transition-all duration-200
         hover:border-primary/50 active:scale-95 focus-ring"
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={isOpen}
>
  {#if isOpen}
    <X size={22} class="text-[var(--text-primary)]" />
  {:else}
    <Menu size={22} class="text-[var(--text-primary)]" />
  {/if}
</button>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 top-[73px] z-40 bg-black/50 backdrop-blur-sm md:hidden"
    on:click={close}
    transition:slide={{ duration: 200 }}
  >
    <nav
      class="bg-[var(--bg-primary)] border-b border-[var(--border-color)] shadow-2xl"
      on:click|stopPropagation
    >
      <ul class="flex flex-col py-4">
        {#each links as link, i}
          <li style="animation-delay: {i * 50}ms" class="animate-fade-up">
            <a
              href={link.href}
              on:click={close}
              class="block px-6 py-3.5 text-lg font-medium text-[var(--text-secondary)]
                     transition-colors duration-200 hover:text-primary
                     hover:bg-primary/5 active:bg-primary/10"
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}
