import express from 'express';
import path from 'path';
import {ENV} from './lib/env.js';
import {connectDB} from './lib/db.js';


const app = express();

const __dirname = path.resolve();

app.get('/health', (req, res) => {
  res.status(200).json({msg:'Hello, World!'});
});

// make our app ready for deployment
if(ENV.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}


const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
  console.log('Server is running on port', ENV.PORT);
  connectDB();
});
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();

