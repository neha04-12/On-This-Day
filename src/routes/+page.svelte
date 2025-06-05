<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f3e8ff; /* lavender background */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    padding: 2rem;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1 {
    font-size: 2.5rem;
    color: #4b0082; /* deep purple */
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }

  p {
    font-size: 1.25rem;
    color: #5c2d91; /* soft purple */
    margin-bottom: 2rem;
    transition: color 0.3s ease;
  }

  a.button {
    background-color: #8e44ad; /* purple */
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    text-decoration: none;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  a.button:hover {
    background-color: #732d91; /* darker purple */
  }

  /* 🌙 Dark mode overrides using :global(.dark) */
  :global(.dark) main {
    background: #1a1a2e;
  }

  :global(.dark) h1 {
    color: #f0eaff;
  }

  :global(.dark) p {
    color: #d3cce3;
  }

  :global(.dark) a.button {
    background-color: #5e3b94;
  }

  :global(.dark) a.button:hover {
    background-color: #4b2c7a;
  }
</style>

<main>
  <h1>Welcome to On-This-Day🌟</h1>
  <p>Where we tell you some interesting facts from the past.</p>
  <a class="button" href="/login">Login</a>
</main>
