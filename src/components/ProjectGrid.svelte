<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import { fade } from 'svelte/transition';
  import {
    ExternalLink,
    Github,
    X,
    Code2,
    Layers,
    Monitor,
    Smartphone,
    Globe,
    ChevronRight,
  } from 'lucide-svelte';

  /**
   * @type {{
   *   slug: string;
   *   title: string;
   *   description: string;
   *   longDescription?: string;
   *   image?: string;
   *   tags: string[];
   *   type: string;
   *   link?: string;
   *   github?: string;
   *   featured?: boolean;
   *   color?: string;
   * }[]}
   */
  export let projects = [];
  export let showFilters = true;

  let selectedProject = null;
  let modalOpen = false;
  let filter = 'all';
  let gridEl;
  let visible = false;

  const modalScale = spring(0.95, { stiffness: 0.15, damping: 0.8 });
  const modalOpacity = spring(0, { stiffness: 0.2, damping: 0.9 });

  const typeIcons = {
    'Web App': Globe,
    'Full Stack': Layers,
    Mobile: Smartphone,
    Frontend: Monitor,
    default: Code2,
  };

  const gradients = [
    'from-violet-600 to-indigo-600',
    'from-blue-600 to-cyan-500',
    'from-emerald-600 to-teal-500',
    'from-orange-500 to-amber-500',
    'from-pink-600 to-rose-500',
    'from-purple-600 to-fuchsia-500',
  ];

  function getGradient(i) {
    return gradients[i % gradients.length];
  }

  function getTypeIcon(type) {
    return typeIcons[type] || typeIcons.default;
  }

  function openModal(project) {
    selectedProject = project;
    modalOpen = true;
    modalScale.set(1);
    modalOpacity.set(1);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalScale.set(0.95);
    modalOpacity.set(0);
    document.body.style.overflow = '';
    setTimeout(() => {
      modalOpen = false;
      selectedProject = null;
    }, 250);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && modalOpen) closeModal();
  }

  $: types = ['all', ...new Set(projects.map((p) => p.type))];
  $: filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (gridEl) observer.observe(gridEl);
    return () => observer.disconnect();
  });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if showFilters && types.length > 2}
  <div class="flex flex-wrap justify-center gap-2 mb-12">
    {#each types as type}
      <button
        on:click={() => (filter = type)}
        class="px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-300
               {filter === type
          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
          : 'bg-[var(--bg-glass)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-primary/40 hover:text-primary'}"
      >
        {type === 'all' ? 'All Projects' : type}
      </button>
    {/each}
  </div>
{/if}

<div
  bind:this={gridEl}
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
>
  {#each filteredProjects as project, i (project.slug)}
    <button
      on:click={() => openModal(project)}
      class="group text-left rounded-2xl border border-[var(--border-color)]
             bg-[var(--bg-glass)] backdrop-blur-sm overflow-hidden
              transition-all duration-500 hover:-translate-y-2
              hover:shadow-2xl hover:shadow-primary/10
              hover:border-primary/30 focus-ring
              project-card
              {visible ? 'card-visible' : ''}"
      style="transition-delay: {visible ? i * 100 : 0}ms"
      aria-label="View project: {project.title}"
    >
      <div
        class="relative h-48 bg-gradient-to-br {getGradient(i)}
               flex items-center justify-center overflow-hidden"
      >
        {#if project.image}
          <img
            src={project.image}
            alt={project.title}
            class="absolute inset-0 w-full h-full object-cover
                   transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
                   transition-opacity duration-300 group-hover:opacity-80"
          ></div>
        {:else}
          <div
            class="absolute inset-0 opacity-20
                   bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_60%)]"
          ></div>
          <svelte:component
            this={getTypeIcon(project.type)}
            size={48}
            class="text-white/80 transition-transform duration-500
                   group-hover:scale-110 group-hover:rotate-3"
          />
        {/if}

        <div
          class="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-medium
                 bg-black/40 text-white/90 backdrop-blur-sm border border-white/10"
        >
          {project.type}
        </div>
      </div>

      <div class="p-6">
        <h3
          class="text-lg font-bold text-[var(--text-primary)] mb-2
                 group-hover:text-primary transition-colors duration-200"
        >
          {project.title}
        </h3>
        <p class="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {project.description}
        </p>
        <div class="flex flex-wrap gap-1.5">
          {#each project.tags.slice(0, 4) as tag}
            <span
              class="px-2.5 py-0.5 rounded-md text-xs font-medium
                     bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          {/each}
          {#if project.tags.length > 4}
            <span
              class="px-2.5 py-0.5 rounded-md text-xs font-medium
                     text-[var(--text-secondary)]"
            >
              +{project.tags.length - 4}
            </span>
          {/if}
        </div>
      </div>

      <div
        class="px-6 pb-5 flex items-center gap-1.5 text-sm font-medium text-primary
               opacity-0 -translate-x-2 transition-all duration-300
               group-hover:opacity-100 group-hover:translate-x-0"
      >
        View Details
        <ChevronRight size={16} class="transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  {/each}
</div>

{#if filteredProjects.length === 0}
  <div class="text-center py-16">
    <Code2 size={48} class="mx-auto text-[var(--text-secondary)] opacity-40 mb-4" />
    <p class="text-[var(--text-secondary)]">No projects found for this filter.</p>
  </div>
{/if}

{#if modalOpen && selectedProject}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      on:click={closeModal}
    ></div>

    <div
      class="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto
             rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]
             shadow-2xl"
      style="transform: scale({$modalScale}); opacity: {$modalOpacity}"
      role="dialog"
      aria-modal="true"
      aria-label={selectedProject.title}
    >
      <div
        class="relative h-56 sm:h-64 bg-gradient-to-br
               {getGradient(projects.indexOf(selectedProject))}
               flex items-center justify-center overflow-hidden"
      >
        {#if selectedProject.image}
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        {:else}
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_60%)]"></div>
          <svelte:component
            this={getTypeIcon(selectedProject.type)}
            size={64}
            class="text-white/60"
          />
        {/if}

        <button
          on:click={closeModal}
          class="absolute top-4 right-4 p-2 rounded-xl bg-black/40 text-white/90
                 backdrop-blur-sm border border-white/10
                 transition-all duration-200 hover:bg-black/60
                 hover:scale-105 active:scale-95 focus-ring"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
      </div>

      <div class="p-6 sm:p-8">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <span
              class="inline-block px-3 py-1 rounded-lg text-xs font-medium
                     bg-primary/10 text-primary border border-primary/20 mb-3"
            >
              {selectedProject.type}
            </span>
            <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {selectedProject.title}
            </h2>
          </div>
        </div>

        <p class="text-[var(--text-secondary)] leading-relaxed mb-6">
          {selectedProject.longDescription || selectedProject.description}
        </p>

        <div class="mb-6">
          <h3 class="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
            Tech Stack
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each selectedProject.tags as tag}
              <span
                class="px-3 py-1.5 rounded-lg text-sm font-medium
                       bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            {/each}
          </div>
        </div>

        <div class="flex flex-wrap gap-3 pt-4 border-t border-[var(--border-color)]">
          {#if selectedProject.link}
            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                     font-semibold text-white text-sm
                     bg-gradient-to-r from-primary to-primary-500
                     transition-all duration-300 hover:-translate-y-0.5
                     hover:shadow-lg hover:shadow-primary/25
                     active:translate-y-0 focus-ring"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          {/if}
          {#if selectedProject.github}
            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                     font-semibold text-sm border-2 border-primary text-primary
                     transition-all duration-300 hover:bg-primary hover:text-white
                     hover:-translate-y-0.5 active:translate-y-0 focus-ring"
            >
              <Github size={16} />
              Source Code
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .project-card {
    opacity: 0;
    transform: translateY(2rem);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out, 
                box-shadow 0.5s ease, border-color 0.5s ease, -translate-y-2 0.5s ease;
  }

  .project-card.card-visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
