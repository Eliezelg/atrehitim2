import { handler as ssrHandler } from '../dist/server/entry.mjs';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the dist/client directory
app.use(express.static('../dist/client'));

// Use the SSR handler for all other routes
app.use(ssrHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
