<script>
  let selectedMonth = '';
  let selectedDay = '';

  const months = [
    { name: 'January', value: '01', days: 31 },
    { name: 'February', value: '02', days: 29 },
    { name: 'March', value: '03', days: 31 },
    { name: 'April', value: '04', days: 30 },
    { name: 'May', value: '05', days: 31 },
    { name: 'June', value: '06', days: 30 },
    { name: 'July', value: '07', days: 31 },
    { name: 'August', value: '08', days: 31 },
    { name: 'September', value: '09', days: 30 },
    { name: 'October', value: '10', days: 31 },
    { name: 'November', value: '11', days: 30 },
    { name: 'December', value: '12', days: 31 }
  ];

  $: selectedMonthData = months.find(m => m.value === selectedMonth);
  $: days = selectedMonthData ? Array.from({ length: selectedMonthData.days }, (_, i) => String(i + 1).padStart(2, '0')) : [];
  $: formattedDate = selectedMonth && selectedDay ? `${selectedMonth}-${selectedDay}` : '';

  async function logout() {
    const res = await fetch('/api/logout', { method: 'POST' });
    if (res.ok) location.href = '/';
    else alert('Logout failed');
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f3e8ff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    padding: 2rem;
    transition: background 0.3s ease, color 0.3s ease;
  }

  :global(.dark) main {
    background: #1a1a2e;
    color: #f0eaff;
  }

  h1 {
    font-size: 2.5rem;
    color: #4b0082;
  }

  :global(.dark) h1 {
    color: #dcd6f7;
  }

  h2 {
    margin-top: 2rem;
    font-size: 1.8rem;
    color: #5e3a96;
  }

  :global(.dark) h2 {
    color: #c9b6e4;
  }

  select {
    padding: 0.75rem;
    margin: 0.5rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 200px;
    outline: none;
    background: white;
    color: black;
  }

  select:focus {
    border-color: #9b59b6;
  }

  :global(.dark) select {
    background: #2d2d44;
    color: #f0eaff;
    border-color: #555;
  }

  a {
    display: inline-block;
    margin-top: 1.5rem;
    text-decoration: none;
    background-color: #8e44ad;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }

  a:hover {
    background-color: #732d91;
  }

  :global(.dark) a {
    background-color: #5e3b94;
  }

  :global(.dark) a:hover {
    background-color: #472a7a;
  }

  p {
    margin-top: 1.5rem;
    color: #2c2c54;
  }

  :global(.dark) p {
    color: #e0d7f7;
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
</style>

<div class="logout-container">
  <button class="btn" on:click={logout}>Logout</button>
</div>

<main>
  <h1>Welcome to your Dashboard!</h1>
  <p>You're successfully logged in. 🎉</p>

  <h2>Pick a Date</h2>

  <select bind:value={selectedMonth}>
    <option value="" disabled selected>Select Month</option>
    {#each months as month}
      <option value={month.value}>{month.name}</option>
    {/each}
  </select>

  {#if selectedMonth}
    <select bind:value={selectedDay}>
      <option value="" disabled selected>Select Day</option>
      {#each days as day}
        <option value={day}>{day}</option>
      {/each}
    </select>
  {/if}

  {#if formattedDate}
    <p>
      <a href={`/date/${formattedDate}`}>
        View Events for {selectedDay} {selectedMonthData?.name}
      </a>
    </p>
  {/if}
</main>
