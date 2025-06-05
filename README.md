This project is a solution to our final task as a part of the Frontend Frmakeworks course for the masters software engineering program at FH Technikum Wien. 

This application's main fucntionality is that, on a chosen date it gives you a list of major event that happened in the past on that particular day. It uses an API call On-this-Day to fetch the events that happened on a given date. Here is the link to the API, https://byabbe.se/on-this-day/ . The API, finds important events, birthdays and deaths of people but the application only focuses on the major events.

The application is deployed at https://on-this-day-self.vercel.app/

The login credentials are give below:
Username: admin
Password: holymoly

Some of the features taht have been implemented are:
Dark mode and Light mode switching
Login and session cookies
sorting the list of events based on timeline
displaying images from the wikipedia thumbnails of the rendered events.

You can reproduce this project by cloning or downloading this repo and following the steps given below.

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
