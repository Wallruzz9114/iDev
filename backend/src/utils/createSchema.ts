import { buildSchema } from 'type-graphql';
import { UserResolver } from './../resolvers/userResolver';

const createSchema = async () =>
  await buildSchema({
    validate: false,
    resolvers: [UserResolver],
  });

export default createSchema;
