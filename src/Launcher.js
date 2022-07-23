import { config } from 'dotenv';
import { Client } from './Client.js';

config({ path: '../.env' });

new Client().start();
