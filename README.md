# Nixaweb - A Modern and Powerful Web Framework

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**Nixaweb** is a high-performance, modern, and extensible web framework built on top of [Fastify](https://www.fastify.io/). It provides a robust foundation for building scalable and secure web applications with ease. Nixaweb comes packed with a variety of built-in middlewares and features, streamlining the development process and allowing you to focus on building your application's core logic.

## Key Features

*   **Blazing Fast:** Built on Fastify, one of the fastest Node.js web frameworks available.
*   **Secure by Default:** Includes middlewares like `@fastify/helmet` and `@fastify/rate-limit` to enhance security.
*   **Highly Extensible:** Easily add custom middleware and plugins to tailor the framework to your needs.
*   **Built-in Template Engine:** Uses EJS for server-side rendering, with built-in HTML minification and JavaScript obfuscation.
*   **CORS Support:** Configurable Cross-Origin Resource Sharing (CORS) via `@fastify/cors`.
*   **Form Handling:** Seamlessly process form data with `@fastify/formbody`.
*   **Compression:** Out-of-the-box response compression using `@fastify/compress`.
*   **Static File Serving:** Serve static assets efficiently with `@fastify/static`.
*   **Developer Friendly:** Clean and intuitive API with helpful console logging powered by `colors`.
*   **Instant Page Loads:** Mimics Next.js-style instant page loads by intelligently preloading links within the viewport, resulting in a seamless and snappy user experience.

## Included Middlewares

Nixaweb comes pre-configured with the following essential middlewares:

*   **`@fastify/compress`:** Compresses responses with various encoding algorithms (gzip, deflate, brotli) to reduce bandwidth usage and improve performance.
*   **`@fastify/cors`:** Enables Cross-Origin Resource Sharing, allowing requests from different origins.
*   **`@fastify/express`:** Provides compatibility with Express middleware, enabling a smoother transition for existing projects. (Consider migrating to native Fastify plugins for optimal performance.)
*   **`@fastify/formbody`:** Parses form data submitted through `POST`, `PUT`, and `PATCH` requests.
*   **`@fastify/helmet`:** Sets various HTTP headers to secure your application from common web vulnerabilities.
*   **`@fastify/rate-limit`:** Protects your application from brute-force attacks and abuse by limiting the rate of incoming requests.
*   **`@fastify/sensible`:** Adds helpful utilities and error handling capabilities to enhance the development experience.
*   **`@fastify/static`:** Serves static files (e.g., images, CSS, JavaScript) directly from a specified directory.

## Getting Started

1.  **Installation:**

    ```bash
    git clone https://github.com/Netreon/nixaweb
    cd nixaweb
    npm install
    ```

2.  **Create Your CSS with PostCSS (using Tailwind CSS):**
    Update the `tailwind.config.cjs` file in the root with your desired configuration. Then, add your styles to `src/global.css`.
    Run the following command to build your CSS:

    ```bash
    npm run build
    ```

3.  **Run the Application:**

    *   **Development Mode:** `npm run dev` (uses `nodemon` for automatic reloading)
    *   **Production Mode:** `npm start`

4.  **Access the Application:**
    Open your browser and navigate to `http://localhost:3000` (or the port configured in `nixaweb.config.js`).

## Configuration

The `nixaweb.config.js` file allows you to customize various aspects of the framework, including:

*   **`port`:** The port on which the server will listen.
*   **`security.cors`:** CORS options.
*   **`security.rateLimit`:** Rate limiting settings.
*   **`security.helmet`:** Helmet middleware options.
*   **`speed.compression`:** Compression options.

## Customization

*   **Adding Routes:** Create new `.ejs` files in the `src/views` directory. The framework automatically creates routes based on the filenames. You can also add more complex routing logic in `src/routes.js`.
*   **Adding Middleware:** Extend the `middlewares.js` file to include additional Fastify plugins or custom middleware functions.
*   **Template Engine:** Modify the `layout.ejs` file in `src/views` to change the overall layout of your application. Customize individual pages by creating new `.ejs` files in the same directory.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](https://opensource.org/licenses/Apache-2.0) file for details.
