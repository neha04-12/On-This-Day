import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const [month, day] = params.date.split('-');
  const res = await fetch(`https://byabbe.se/on-this-day/${+month}/${+day}/events.json`);

  if (!res.ok) {
    throw new Error(`Failed to fetch events for ${params.date}`);
  }

  const data = await res.json();

  return {
    date: params.date,
    events: data.events // contains array of event objects
  };
};
