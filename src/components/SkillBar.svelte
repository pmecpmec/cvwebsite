<script>
  import { onMount } from 'svelte';

  /**
   * @type {{ name: string; level: number; icon?: string }[]}
   */
  export let skills = [];

  let visible = false;
  let element;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div bind:this={element} class="grid grid-cols-1 md:grid-cols-2 gap-5">
  {#each skills as skill, i}
    <div
      class="group p-5 rounded-2xl border border-[var(--border-color)]
             bg-[var(--bg-glass)] backdrop-blur-sm
             transition-all duration-300 hover:-translate-y-1
             hover:shadow-lg hover:shadow-primary/5
             hover:border-primary/30"
      style="transition-delay: {visible ? i * 80 : 0}ms"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="font-semibold text-sm text-primary group-hover:text-primary-500 transition-colors">
          {skill.name}
        </span>
        <span
          class="text-xs font-medium text-[var(--text-secondary)] tabular-nums
                 transition-all duration-700"
          class:opacity-0={!visible}
          class:opacity-100={visible}
        >
          {visible ? skill.level : 0}%
        </span>
      </div>
      <div class="h-2 rounded-full bg-[var(--border-color)] overflow-hidden">
        <div
          class="h-full rounded-full bg-gradient-to-r from-primary to-secondary
                 transition-all ease-out"
          style="width: {visible ? skill.level : 0}%;
                 transition-duration: {800 + i * 100}ms;
                 transition-delay: {i * 80}ms;"
        ></div>
      </div>
    </div>
  {/each}
</div>
