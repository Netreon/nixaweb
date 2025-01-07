import config from "../nixaweb.config.js"
import fastify from 'fastify';
import path from 'path';
import { promises as fs } from 'fs';
import colors from 'colors';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import JavaScriptObfuscator from "javascript-obfuscator"
import { minify } from "html-minifier";

const server = await fastify({ charset: "utf-8" });
import middlewares from './middlewares.js';

colors.setTheme({
  info: 'cyan',
  success: 'green',
  warn: 'yellow',
  error: 'red',
  highlight: 'magenta'
});

console.log('\n' + '='.repeat(50).gray);
console.log('Nixaweb - Proffesional Web Framework'.highlight.bold);
console.log('='.repeat(50).gray + '\n');

async function registerPlugins() {
  console.log('[Nixaweb] Registering plugins...'.info);
  try {
    for (const [name, plugin] of Object.entries(middlewares)) {
      if (Array.isArray(plugin)) {
        await server.register(plugin[0], plugin[1]);
      } else {
        await server.register(plugin);
      }
    }
    console.log('[Nixaweb] All plugins registered successfully.'.success);
  } catch (err) {
    console.error('[Nixaweb] Error registering plugins:'.error, err);
    throw err;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupTemplateEngine() {
  console.log('[Nixaweb] Setting up template engine...'.info);
  const pages = {};
  const pagesDir = path.join(__dirname, 'views');
  const layoutPath = path.join(__dirname, 'layout.ejs');

  try {
    const [pageFiles, layoutTemplate] = await Promise.all([
      fs.readdir(pagesDir),
      fs.readFile(layoutPath, 'utf-8')
    ]);

    for (const file of pageFiles) {
      if (file.endsWith('.ejs')) {
        const route = '/' + file.replace('.ejs', '');
        const templatePath = path.join(pagesDir, file);
        pages[route] = await fs.readFile(templatePath, 'utf-8');
      }
    }

    console.log('[Nixaweb] Template engine setup complete.'.success);
    return { pages, layoutTemplate };
  } catch (err) {
    console.error('[Nixaweb] Error setting up template engine:'.error, err);
    throw err;
  }
}

async function setupRoutes(pages, layoutTemplate) {
  console.log('[Nixaweb] Setting up routes...'.info);
  server.get('/*', async (request, reply) => {
    let route = request.url === '/' ? '/index' : request.url;

    if (route.endsWith('/')) {
      route = route.slice(0, -1);
    }

    if (pages[route]) {
      const title = route === '/index' ? config.siteTitle : route.slice(1).charAt(0).toUpperCase() + route.slice(2);
      const fullPage = ejs.render(layoutTemplate, { content: pages[route], title });

      if (request.headers.accept === 'application/json') {
        return { content: pages[route], title };
      } else {
        return reply.type('text/html').send(fullPage);
      }
    } else {
      reply.code(404).send('Sayfa bulunamadı');
    }
  });
  console.log('[Nixaweb] Routes are ready.'.success);
}

server.addHook('onSend', (request, reply, payload, done) => {
  if (reply.getHeader('content-type') && reply.getHeader('content-type').includes('text/html')) {
    let html = payload.toString();

    const obfuscatedHTML = html.replace(/<script>([\s\S]*?)<\/script>/g, (match, p1) => {
      const obfuscatedJS = JavaScriptObfuscator.obfuscate(p1, {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: false,
        simplify: true,
        splitStrings: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.1,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
      }).getObfuscatedCode();
      return `<script>${obfuscatedJS}</script>`;
    });

    const minifiedHTML = minify(obfuscatedHTML, {
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });

    done(null, minifiedHTML);
  } else {
    done(null, payload);
  }
});

async function start() {
  try {
    await registerPlugins();
    const { pages, layoutTemplate } = await setupTemplateEngine();
    await setupRoutes(pages, layoutTemplate);
    await server.listen({ port: config.port });

    console.log('[Nixaweb] Server is running on'.info, `http://localhost:${config.port}`.underline.blue);
    console.log('\n' + '='.repeat(50).gray);
    console.log('Nixaweb is ready to serve!'.success.bold);
    console.log('='.repeat(50).gray);
  } catch (err) {
    console.error('[Nixaweb] Server start error:'.error.bold, err);
    process.exit(1);
  }
}

start();

process.on('uncaughtException', (err) => {
  console.log('\n' + '='.repeat(50).gray);
  console.log(' Uncaught Exception Error '.bgRed.white.bold);
  console.log('Error:'.error, err);
  console.log('='.repeat(50).gray + '\n');
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('\n' + '='.repeat(50).gray);
  console.log(' Unhandled Rejection Error '.bgYellow.black.bold);
  console.log('Error:'.warn, err);
  console.log('='.repeat(50).gray + '\n');
  process.exit(1);
});

export default server