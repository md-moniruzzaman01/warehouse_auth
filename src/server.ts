import { Server } from 'http';
import mongoose from 'mongoose';
import config from './config';
import app from './app';


process.on('uncaughtException', error => {
//   errorlogger.error(error);
  console.error(error)
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {

    await mongoose.connect(config.database_url as string);
    // logger.info(`🛢   Database is connected successfully`);
    console.log(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      // logger.info(`Application  listening on port ${config.port}`);
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect database',err)
    // errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error)
        // errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();