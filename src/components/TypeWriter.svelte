<script>
  import { onMount } from 'svelte';

  /** @type {string[]} */
  export let texts = [];
  /** @type {string} */
  export let className = '';

  let displayText = texts[0] || '';
  let showCursor = true;

  onMount(() => {
    let textIndex = 0;
    let charIndex = texts[0]?.length || 0;
    let isDeleting = false;

    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 530);

    let timeout;
    function type() {
      const fullText = texts[textIndex];

      if (isDeleting) {
        charIndex--;
        displayText = fullText.substring(0, charIndex);
      } else {
        charIndex++;
        displayText = fullText.substring(0, charIndex);
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === fullText.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 400;
      }

      timeout = setTimeout(type, speed);
    }

    timeout = setTimeout(type, 2200);

    return () => {
      clearInterval(cursorInterval);
      clearTimeout(timeout);
    };
  });
</script>

<span class="inline-flex items-baseline {className}">
  <span class="text-accent font-semibold">{displayText}</span>
  <span
    class="ml-0.5 inline-block w-[2px] h-[1.1em] bg-accent transition-opacity duration-100"
    class:opacity-0={!showCursor}
    aria-hidden="true"
  ></span>
</span>
