import config from "../nixaweb.config.js"

import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import compress from '@fastify/compress';
import formbody from '@fastify/formbody';
import rateLimit from '@fastify/rate-limit';
import express from '@fastify/express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  express: express,
  cors: [cors, config.security.cors],
  helmet: [helmet, config.security.helmet],
  sensible: sensible,
  compress: [compress, config.speed.compression],
  formbody: formbody,
  rateLimit: [rateLimit, config.security.rateLimit],
  static: [fastifyStatic, {
    root: path.join(__dirname, '../public/'),
    prefix: '/public/',
  }],
};