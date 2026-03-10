<script>
  import { onMount, onDestroy } from 'svelte';

  /**
   * @type {{ icon: string; href: string; label: string }[]}
   */
  export let items = [];
  export let speed = 80;
  export let gap = 48;
  export let iconSize = 24;
  export let pauseOnHover = true;

  let track;
  let container;
  let copyCount = 3;
  let raf;
  let offset = 0;
  let velocity = 0;
  let lastTime = null;
  let hovered = false;
  let seqWidth = 0;

  function measure() {
    if (!container || !track) return;
    const firstList = track.querySelector('.logo-seq');
    if (!firstList) return;
    seqWidth = firstList.scrollWidth;
    const containerWidth = container.clientWidth;
    if (seqWidth > 0) {
      copyCount = Math.max(3, Math.ceil(containerWidth / seqWidth) + 2);
    }
  }

  function animate(ts) {
    if (lastTime === null) lastTime = ts;
    const dt = Math.max(0, ts - lastTime) / 1000;
    lastTime = ts;

    const target = hovered && pauseOnHover ? 0 : speed;
    const ease = 1 - Math.exp(-dt / 0.25);
    velocity += (target - velocity) * ease;

    if (seqWidth > 0) {
      offset = ((offset + velocity * dt) % seqWidth + seqWidth) % seqWidth;
      if (track) track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    raf = requestAnimationFrame(animate);
  }

  onMount(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  });
</script>

<div
  bind:this={container}
  class="relative overflow-hidden w-full"
  role="marquee"
  aria-label="Social links"
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
>
  <div
    class="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none
           bg-gradient-to-r from-[var(--bg-secondary)] to-transparent"
  ></div>
  <div
    class="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none
           bg-gradient-to-l from-[var(--bg-secondary)] to-transparent"
  ></div>

  <div
    bind:this={track}
    class="flex items-center w-max will-change-transform select-none"
    style="gap: {gap}px"
  >
    {#each Array(copyCount) as _, copy}
      <div class="logo-seq flex items-center" style="gap: {gap}px">
        {#each items as item}
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            class="flex items-center justify-center w-12 h-12 rounded-xl
                   border border-[var(--border-color)] bg-[var(--bg-glass)]
                   text-[var(--text-secondary)] backdrop-blur-sm
                   transition-all duration-300
                   hover:text-primary hover:border-primary/50
                   hover:scale-110 hover:shadow-lg hover:shadow-primary/10
                   active:scale-95 focus-ring"
          >
            {@html item.icon}
          </a>
        {/each}
      </div>
    {/each}
  </div>
</div>
