<script>
  let username = '', password = '';

  async function login() {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) location.href = '/dashboard';
    else alert('Login failed');
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f3e8ff; /* light lavender */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    transition: background 0.3s, color 0.3s;
  }

  :global(.dark) main {
    background: #1a1a2e; /* dark background */
    color: #f0eaff;
  }

  h2 {
    font-size: 2rem;
    color: #4b0082;
    margin-bottom: 1.5rem;
  }

  :global(.dark) h2 {
    color: #dcd6f7;
  }

  input {
    padding: 0.75rem;
    margin: 0.5rem 0;
    width: 250px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    background: white;
    color: black;
  }

  input:focus {
    border-color: #9b59b6;
  }

  :global(.dark) input {
    background: #2d2d44;
    color: #f0eaff;
    border-color: #555;
  }

  button {
    background-color: #8e44ad;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #732d91;
  }

  :global(.dark) button {
    background-color: #5e3b94;
  }

  :global(.dark) button:hover {
    background-color: #472a7a;
  }
</style>

<main>
  <h2>Login</h2>
  <input bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={login}>Login</button>
</main>
