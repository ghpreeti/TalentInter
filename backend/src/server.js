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

// mount inngest endpoint (no `functions` object available here)
app.use("/api/inngest", serve({ client: inngest }))

app.get('/health', (req, res) => {
  res.status(200).json({msg:'Hello, World!'});
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  // Serve static files from the frontend build output.
  // __dirname is set to project root via path.resolve(), so use relative 'frontend/dist'.
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  // For SPA client-side routing, return index.html for any unmatched route.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}


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

startServer();

