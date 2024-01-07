import { HttpResponse, delay, http } from 'msw';
import COUNTRIES_SCHEMA, { COUNTRIES_API } from './schemes/countries';
import RICK_MORTY_SCHEMA, { RICK_MORTY_API } from './schemes/rick-and-morty';

export const handlers = [
  http.post(RICK_MORTY_API, async () => {
    await delay(150);
    return HttpResponse.json({ data: { __schema: RICK_MORTY_SCHEMA } });
  }),
  http.post(COUNTRIES_API, async () => {
    await delay(150);
    return HttpResponse.json({ data: { __schema: COUNTRIES_SCHEMA } });
  }),
];
