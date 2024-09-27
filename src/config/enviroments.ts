import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentVariables {
  PORT: number;
  DATABASE_URL: string;
}

const environmentSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = environmentSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const environmentVariables: EnvironmentVariables = value;

export const enviroments = {
  port: environmentVariables.PORT,
  databaseUrl: environmentVariables.DATABASE_URL,
};
