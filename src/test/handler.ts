import { HttpResponse, delay, http } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api/people/*', async () => {
    await delay(150);
    return HttpResponse.json({ value: 'data' });
  }),
];
