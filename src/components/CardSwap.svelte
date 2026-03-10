<script>
  import { onMount } from 'svelte';

  /**
   * @type {{ title: string; subtitle: string; description: string; gradient: string; icon: string }[]}
   */
  export let cards = [];
  export let cardWidth = 340;
  export let cardHeight = 240;
  export let cardDistance = 50;
  export let verticalDistance = 60;
  export let delay = 4000;
  export let pauseOnHover = true;
  export let skew = 5;

  let containerEl;
  let cardEls = [];

  onMount(async () => {
    const gsap = (await import('gsap')).default;
    if (!containerEl || cards.length < 2) return;

    const total = cards.length;
    let order = Array.from({ length: total }, (_, i) => i);
    let interval;
    let tl;

    const makeSlot = (i) => ({
      x: i * cardDistance,
      y: -i * verticalDistance,
      z: -i * cardDistance * 1.5,
      zIndex: total - i,
    });

    const place = (el, slot) => {
      gsap.set(el, {
        x: slot.x, y: slot.y, z: slot.z,
        xPercent: -50, yPercent: -50,
        skewY: skew, transformOrigin: 'center center',
        zIndex: slot.zIndex, force3D: true,
      });
    };

    cardEls.forEach((el, i) => place(el, makeSlot(i)));

    const ease = 'elastic.out(0.6,0.9)';
    const dur = 2;

    const swap = () => {
      if (order.length < 2) return;
      const [front, ...rest] = order;
      const elFront = cardEls[front];

      tl = gsap.timeline();
      tl.to(elFront, { y: '+=500', duration: dur, ease });
      tl.addLabel('promote', `-=${dur * 0.9}`);

      rest.forEach((idx, i) => {
        const slot = makeSlot(i);
        tl.set(cardEls[idx], { zIndex: slot.zIndex }, 'promote');
        tl.to(cardEls[idx], {
          x: slot.x, y: slot.y, z: slot.z,
          duration: dur, ease,
        }, `promote+=${i * 0.15}`);
      });

      const backSlot = makeSlot(total - 1);
      tl.addLabel('return', `promote+=${dur * 0.05}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(elFront, {
        x: backSlot.x, y: backSlot.y, z: backSlot.z,
        duration: dur, ease,
      }, 'return');
      tl.call(() => { order = [...rest, front]; });
    };

    swap();
    interval = setInterval(swap, delay);

    if (pauseOnHover && containerEl) {
      const pause = () => { tl?.pause(); clearInterval(interval); };
      const resume = () => { tl?.play(); interval = setInterval(swap, delay); };
      containerEl.addEventListener('mouseenter', pause);
      containerEl.addEventListener('mouseleave', resume);

      return () => {
        containerEl.removeEventListener('mouseenter', pause);
        containerEl.removeEventListener('mouseleave', resume);
        clearInterval(interval);
      };
    }

    return () => clearInterval(interval);
  });
</script>

<div
  bind:this={containerEl}
  class="relative flex items-center justify-center"
  style="width: {cardWidth + cardDistance * cards.length}px;
         height: {cardHeight + verticalDistance * cards.length}px;
         perspective: 1200px;"
>
  {#each cards as card, i}
    <div
      bind:this={cardEls[i]}
      class="absolute rounded-2xl overflow-hidden border border-[var(--border-color)]
             shadow-2xl cursor-pointer select-none"
      style="width: {cardWidth}px; height: {cardHeight}px;"
    >
      <div class="absolute inset-0 bg-gradient-to-br {card.gradient}"></div>
      <div class="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <div class="mb-3 text-white/90">
          {@html card.icon}
        </div>
        <h3 class="text-xl font-bold text-white mb-1">{card.title}</h3>
        <p class="text-sm text-white/70 mb-3">{card.subtitle}</p>
        <p class="text-xs text-white/60 leading-relaxed max-w-[260px]">{card.description}</p>
      </div>
    </div>
  {/each}
</div>
