import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { createConnection } from 'typeorm';
import User from './entities/User';
import createSchema from './utils/createSchema';

dotenv.config();

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redis }),
  });

  const port = process.env.PORT;
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

  app.use(
    session({
      name: 'cid',
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
      saveUninitialized: false,
      secret: String(process.env.SESSION_SECRET),
      resave: false,
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
