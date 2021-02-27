/**
 * App environment.
 * @file Environment 环境配置
 * @module app/environment
 */

export const environment = process.env.NODE_ENV;
export const isDevMode = Object.is(environment, 'development') || Object.is(environment, 'dev') || Object.is(environment, 'local');
export const isProdMode = Object.is(environment, 'production')  || Object.is(environment, 'prod');
export const isTestMode = Object.is(environment, 'test');

export default {
  isDevMode,
  isProdMode,
  isTestMode,
  environment,
};
