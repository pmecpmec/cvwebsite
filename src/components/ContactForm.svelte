<script>
  import { Send, Check, AlertCircle, Loader2 } from 'lucide-svelte';

  let name = '';
  let email = '';
  let message = '';
  let status = 'idle';
  let errors = {};
  let touched = {};

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = 'Please enter a valid email';
    if (!message.trim()) errors.message = 'Message is required';
    else if (message.trim().length < 10)
      errors.message = 'Message must be at least 10 characters';
    return Object.keys(errors).length === 0;
  }

  function touch(field) {
    touched[field] = true;
    touched = touched;
    validate();
  }

  async function handleSubmit() {
    touched = { name: true, email: true, message: true };
    if (!validate()) return;

    status = 'sending';

    try {
      await new Promise((r) => setTimeout(r, 1500));
      status = 'success';
      name = '';
      email = '';
      message = '';
      touched = {};
      errors = {};
      setTimeout(() => {
        status = 'idle';
      }, 4000);
    } catch {
      status = 'error';
      setTimeout(() => {
        status = 'idle';
      }, 4000);
    }
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="space-y-6"
  novalidate
>
  <div>
    <label
      for="contact-name"
      class="block text-sm font-medium text-[var(--text-secondary)] mb-2"
    >
      Name
    </label>
    <input
      id="contact-name"
      type="text"
      bind:value={name}
      on:blur={() => touch('name')}
      class="w-full px-4 py-3 rounded-xl bg-[var(--bg-glass)] border
             text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50
             backdrop-blur-sm transition-all duration-200 focus-ring
             {touched.name && errors.name
        ? 'border-red-500/50 focus:border-red-500'
        : 'border-[var(--border-color)] focus:border-primary/50'}"
      placeholder="Your name"
      required
      aria-invalid={touched.name && !!errors.name}
      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
    />
    {#if touched.name && errors.name}
      <p id="name-error" class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
        <AlertCircle size={14} />
        {errors.name}
      </p>
    {/if}
  </div>

  <div>
    <label
      for="contact-email"
      class="block text-sm font-medium text-[var(--text-secondary)] mb-2"
    >
      Email
    </label>
    <input
      id="contact-email"
      type="email"
      bind:value={email}
      on:blur={() => touch('email')}
      class="w-full px-4 py-3 rounded-xl bg-[var(--bg-glass)] border
             text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50
             backdrop-blur-sm transition-all duration-200 focus-ring
             {touched.email && errors.email
        ? 'border-red-500/50 focus:border-red-500'
        : 'border-[var(--border-color)] focus:border-primary/50'}"
      placeholder="your@email.com"
      required
      aria-invalid={touched.email && !!errors.email}
      aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
    />
    {#if touched.email && errors.email}
      <p id="email-error" class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
        <AlertCircle size={14} />
        {errors.email}
      </p>
    {/if}
  </div>

  <div>
    <label
      for="contact-message"
      class="block text-sm font-medium text-[var(--text-secondary)] mb-2"
    >
      Message
    </label>
    <textarea
      id="contact-message"
      bind:value={message}
      on:blur={() => touch('message')}
      rows="5"
      class="w-full px-4 py-3 rounded-xl bg-[var(--bg-glass)] border
             text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50
             backdrop-blur-sm transition-all duration-200 resize-y min-h-[120px] focus-ring
             {touched.message && errors.message
        ? 'border-red-500/50 focus:border-red-500'
        : 'border-[var(--border-color)] focus:border-primary/50'}"
      placeholder="Tell me about your project or just say hi..."
      required
      aria-invalid={touched.message && !!errors.message}
      aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
    ></textarea>
    {#if touched.message && errors.message}
      <p id="message-error" class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
        <AlertCircle size={14} />
        {errors.message}
      </p>
    {/if}
  </div>

  <div class="pt-2">
    <button
      type="submit"
      disabled={status === 'sending'}
      class="group w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white
             bg-gradient-to-r from-primary to-primary-500 hover:from-primary-700 hover:to-primary
             transition-all duration-300 hover:-translate-y-0.5
             hover:shadow-lg hover:shadow-primary/25
             active:translate-y-0 active:shadow-none
             disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
             disabled:hover:shadow-none focus-ring
             flex items-center justify-center gap-2.5"
    >
      {#if status === 'sending'}
        <Loader2 size={18} class="animate-spin" />
        Sending...
      {:else if status === 'success'}
        <Check size={18} />
        Message sent!
      {:else}
        <Send size={18} class="transition-transform group-hover:translate-x-0.5" />
        Send Message
      {/if}
    </button>
  </div>
</form>

{#if status === 'success'}
  <div
    class="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-green-500/90
           text-white font-medium shadow-2xl backdrop-blur-sm
           flex items-center gap-2.5 animate-fade-up"
    role="alert"
  >
    <Check size={18} />
    Message sent successfully!
  </div>
{/if}

{#if status === 'error'}
  <div
    class="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-red-500/90
           text-white font-medium shadow-2xl backdrop-blur-sm
           flex items-center gap-2.5 animate-fade-up"
    role="alert"
  >
    <AlertCircle size={18} />
    Something went wrong. Please try again.
  </div>
{/if}
