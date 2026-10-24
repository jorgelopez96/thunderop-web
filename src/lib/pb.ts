import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$app/env/public';

export const pb = new PocketBase(PUBLIC_PB_URL); // en el navegador, authStore persiste en localStorage
