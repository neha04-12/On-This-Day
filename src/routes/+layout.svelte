<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  let isDark = false;

  onMount(() => {
    const storedTheme = localStorage.getItem('theme');
    isDark = storedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
  });

  function toggleDarkMode() {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
  }
</script>

<!-- Theme toggle button -->
<button class="toggle-theme" on:click={toggleDarkMode}>
  {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>

<!-- Transparent texture overlay -->
<div class="texture-overlay" aria-hidden="true"></div>

<!-- Page content -->
<slot />

<style>
  button.toggle-theme {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    color: #4b0082;
    background-color: #f3e8ff;
    border: 2px solid #4b0082;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .texture-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; /* ensure it stays behind page content */
    pointer-events: none;
    background-image: url("https://www.transparenttextures.com/patterns/arches.png");
    background-repeat: repeat;
    opacity: 1; /* you can adjust if needed */
  }

  :global(body) {
    margin: 0;
	
  }

  :global(.dark) .texture-overlay {
  background-image: url("https://www.transparenttextures.com/patterns/always-grey.png");
}

</style>
