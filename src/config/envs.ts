import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;
    PRODUCTS_MICROSRVICE_HOST: string;
    PRODUCTS_MICROSRVICE_PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    PRODUCTS_MICROSRVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSRVICE_PORT: joi.number().required()
})
.unknown(true);

const { error, value } = envSchema.validate(process.env);

if(error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value; //Una forma de validar la variable (value) en la destucturacion

export const envs = { 
    port: envVars.PORT,
    dataBaseUrl: envVars.DATABASE_URL,
    productsMicroserviceHost: envVars.PRODUCTS_MICROSRVICE_HOST,
    productsMicroservicePort: envVars.PRODUCTS_MICROSRVICE_PORT
}