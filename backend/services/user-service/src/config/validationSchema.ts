import Joi from 'joi';

export const classicSignUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().allow('', null),
    company: Joi.string().allow('', null),
});

export const web3SignUpSchema = Joi.object({
    wallet: Joi.string().required(),
    signature: Joi.string().required(),
    name: Joi.string().allow('', null),
    company: Joi.string().allow('', null),
});

export const fullSignUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    wallet: Joi.string().required(),
    signature: Joi.string().required(),
    name: Joi.string().allow('', null),
    company: Joi.string().allow('', null),
});

export const classicSignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const web3SignInSchema = Joi.object({
    wallet: Joi.string().required(),
    signature: Joi.string().required(),
});