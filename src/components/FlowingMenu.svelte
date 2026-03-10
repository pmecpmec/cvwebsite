<script>
  import { onMount } from 'svelte';

  /**
   * @type {{ text: string; href: string; image: string }[]}
   */
  export let items = [];
  export let marqueeSpeed = 12;

  let menuItems = [];

  onMount(async () => {
    const gsap = (await import('gsap')).default;

    const animDefaults = { duration: 0.6, ease: 'expo' };

    const distMetric = (x, y, x2, y2) => {
      const dx = x - x2, dy = y - y2;
      return dx * dx + dy * dy;
    };

    const closestEdge = (mx, my, w, h) => {
      return distMetric(mx, my, w / 2, 0) < distMetric(mx, my, w / 2, h) ? 'top' : 'bottom';
    };

    menuItems.forEach(({ item, marquee, inner, parts }) => {
      if (!item || !marquee || !inner) return;

      const firstPart = parts[0];
      if (firstPart) {
        const cw = firstPart.offsetWidth;
        if (cw > 0) {
          gsap.to(inner, { x: -cw, duration: marqueeSpeed, ease: 'none', repeat: -1 });
        }
      }

      item.addEventListener('mouseenter', (e) => {
        const rect = item.getBoundingClientRect();
        const edge = closestEdge(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
        gsap.timeline({ defaults: animDefaults })
          .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
          .set(inner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
          .to([marquee, inner], { y: '0%' }, 0);
      });

      item.addEventListener('mouseleave', (e) => {
        const rect = item.getBoundingClientRect();
        const edge = closestEdge(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
        gsap.timeline({ defaults: animDefaults })
          .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
          .to(inner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
      });
    });
  });

  function bindItem(i) {
    return (el) => {
      if (!menuItems[i]) menuItems[i] = {};
      menuItems[i].item = el;
    };
  }
  function bindMarquee(i) {
    return (el) => {
      if (!menuItems[i]) menuItems[i] = {};
      menuItems[i].marquee = el;
    };
  }
  function bindInner(i) {
    return (el) => {
      if (!menuItems[i]) menuItems[i] = {};
      menuItems[i].inner = el;
    };
  }
  function bindPart(i, j) {
    return (el) => {
      if (!menuItems[i]) menuItems[i] = {};
      if (!menuItems[i].parts) menuItems[i].parts = [];
      menuItems[i].parts[j] = el;
    };
  }
</script>

<div class="w-full overflow-hidden rounded-2xl border border-[var(--border-color)]
            bg-[var(--bg-glass)] backdrop-blur-sm">
  <div class="flex flex-col">
    {#each items as item, i}
      <a
        use:bindItem={i}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        class="relative overflow-hidden text-center border-t border-[var(--border-color)]
               first:border-t-0 group"
        style="height: 80px;"
      >
        <span class="flex items-center justify-center h-full relative z-10
                     text-lg font-semibold text-[var(--text-primary)] uppercase tracking-wider
                     transition-colors duration-300 group-hover:text-transparent">
          {item.text}
        </span>

        <div
          use:bindMarquee={i}
          class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none
                 bg-primary"
          style="transform: translate3d(0, 101%, 0);"
        >
          <div
            use:bindInner={i}
            class="flex items-center h-full w-max will-change-transform"
            style="transform: translate3d(0, 101%, 0);"
          >
            {#each Array(6) as _, j}
              <div use:bindPart={[i, j]} class="flex items-center flex-shrink-0">
                <span class="whitespace-nowrap text-lg font-medium text-white px-4">
                  {item.text}
                </span>
                <div
                  class="w-[180px] h-[50px] mx-4 rounded-full bg-cover bg-center flex-shrink-0"
                  style="background-image: url('{item.image}');"
                ></div>
              </div>
            {/each}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
