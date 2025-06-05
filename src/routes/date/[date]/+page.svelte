<script lang="ts">
  import { onMount } from 'svelte';

  export let data: {
    date: string;
    events: Array<{
      year: string;
      description: string;
      wikipedia: Array<{
        title: string;
        wikipedia: string;
        language: string;
      }>;
    }>;
  };

  let sortOrder = 'asc';

  $: sortedEvents = [...data.events].sort((a, b) => {
    return sortOrder === 'asc'
      ? Number(a.year) - Number(b.year)
      : Number(b.year) - Number(a.year);
  });

  let images: Record<string, string> = {};

  async function fetchImage(title: string) {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      if (json.thumbnail?.source) {
        images[title] = json.thumbnail.source;
      }
    } catch (err) {
      console.error(`Image fetch failed for ${title}`, err);
    }
  }

  onMount(() => {
    data.events.forEach((event) => {
      const title = event.wikipedia[0]?.title;
      if (title) {
        fetchImage(title);
      }
    });
  });

  function formatDate(dateStr: string) {
    const [month, day] = dateStr.split('-').map(Number);
    const suffix = (d => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    })(day);

    const monthName = new Date(2000, month - 1, day).toLocaleString('default', { month: 'long' });
    return `${day}${suffix} ${monthName}`;
  }

  async function logout() {
    const res = await fetch('/api/logout', { method: 'POST' });
    if (res.ok) location.href = '/';
    else alert('Logout failed');
  }
</script>

<style>
  :global(body) {
    background-color: #f3e8ff; /* Lavender background  #f3e8ff*/
    margin: 0;
  }

  :global(body.dark) {
  background-color: #1a1a2e;
  margin: 0;
  }

  .btn {
    background-color: #8e44ad;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #732d91;
  }

  :global(.dark) .btn {
    background-color: #5e3b94;
  }

  :global(.dark) .btn:hover {
    background-color: #472a7a;
  }

  .logout-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #4b0082;
    background: transparent;
    border-radius: 12px;
  }

  :global(.dark) main {
    //color: #e5ddff;
     color: #4b0082;
  }

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #5e3a96;
  }

  :global(.dark) h1 {
  color: #dcd6f7;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 1.5rem;
    background: #ffffff; /* White cards */
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  p {
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
  }

  a {
    color: #7e57c2;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }

  :global(.dark) a {
  color: #bb86fc;
  }



  select {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
  }

  select:focus {
    border-color: #9b59b6;
    outline: none;
  }

  :global(.dark) select {
  background-color: #2d2d44;
  color: #f0eaff;
  border-color: #555;
  }

  img {
    display: block;
    margin-bottom: 0.5rem;
    max-width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 6px;
  }
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.sort-wrapper {
  display: flex;
  align-items: center;
}
.sort-wrapper label {
  color:  #9b59b6; /* light mode text color */
  margin-right: 0.5rem; /* you had inline margin, better here */
}
  
</style>


<div class="logout-container">
  <button class="btn" on:click={logout}>Logout</button>
</div>

<main>
  <h1>Events on {formatDate(data.date)}</h1>

  <div class="top-controls">
  <button class="btn" on:click={() => (location.href = '/dashboard')}>
    Choose New Date
  </button>

  <div class="sort-wrapper">
    <label for="sortSelect" style="margin-right: 0.5rem;">Sort by:</label>
    <select id="sortSelect" bind:value={sortOrder}>
      <option value="asc">Oldest to Latest</option>
      <option value="desc">Latest to Oldest</option>
    </select>
  </div>
</div>


  {#if sortedEvents.length > 0}
    <ul>
      {#each sortedEvents as event}
        <li>
          {#if event.wikipedia.length > 0 && images[event.wikipedia[0].title]}
            <img src={images[event.wikipedia[0].title]} alt="Event image for {event.wikipedia[0].title}" />
          {/if}
          <p><strong>{event.year}</strong> – {event.description}</p>
          {#if event.wikipedia.length > 0}
            <a href={event.wikipedia[0].wikipedia} target="_blank" rel="noopener noreferrer">
              🔗 Wikipedia: {event.wikipedia[0].title}
            </a>
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <p style="text-align: center;">No events found for this date.</p>
  {/if}

</main>
