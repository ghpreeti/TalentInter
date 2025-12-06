import express from 'express';
import path from 'path';
import {ENV} from './lib/env.js';
import {connectDB} from './lib/db.js';
import cors from 'cors';
import {serve} from 'inngest/express';
import {inngest} from './lib/inngest.js';


const app = express();

const __dirname = path.resolve();

//middleware to parse JSON requests
app.use(express.json());
//creadentials:true?? => server allow browser to include cookies to be sent in cross-origin requests
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

// mount inngest endpoint. Inngest expects a `functions` option (array),
// so pass an empty array if you don't have functions to register here.
app.use("/api/inngest", serve({ client: inngest, functions: [] }))

app.get('/health', (req, res) => {
  res.status(200).json({msg:'Hello, World!'});
});

// make our app ready for production when running as a standalone server
if (ENV.NODE_ENV === "production") {
  // Serve static files from the frontend build output when running locally as a server.
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  // For SPA client-side routing, return index.html for any unmatched route when running standalone.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Helper to start an actual HTTP server (used when running locally)
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log('Server is running on port', ENV.PORT);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

// If we're running on Vercel (serverless), do NOT call startServer().
// Vercel will import this file and expect a request handler export instead.
const isVercel = !!process.env.VERCEL;
if (!isVercel) startServer();

// Export a serverless-friendly handler for Vercel. This allows Vercel to call
// the Express app directly for each incoming request without creating a long-lived listener.
let _dbConnected = false;
async function ensureDb() {
  if (!_dbConnected) {
    await connectDB();
    _dbConnected = true;
  }
}

export default async function handler(req, res) {
  try {
    await ensureDb();
    return app(req, res);
  } catch (err) {
    console.error('Serverless handler error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

