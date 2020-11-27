import defaultConfig from '@vue-storefront/commercetools/nuxt/defaultConfig';
import { createIntegrationPlugin } from '@vue-storefront/core';
import { createApiClient } from '@vue-storefront/commercetools-api';

const getLocaleSettings = (moduleOptions, app) => {

  let localeSettings = {};

  if (moduleOptions.cookies) {
    localeSettings = {
      locale: app.$cookies.get(moduleOptions.cookies.localeCookieName),
      country: app.$cookies.get(moduleOptions.cookies.currencyCookieName),
      currency: app.$cookies.get(moduleOptions.cookies.countryCookieName)
    };
  }

  return {
    locale: app.i18n.locale || (localeSettings.locale || moduleOptions.locale || defaultConfig.locale),
    country: localeSettings.country || moduleOptions.country || defaultConfig.country,
    currency: localeSettings.currency || moduleOptions.currency || defaultConfig.currency
  };
};

export const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => {
  return {
    ...defaultConfig,
    ...moduleOptions,
    ...additionalProperties,
    ...getLocaleSettings(moduleOptions, app)
  };
};

export const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';

export const createIntegration = createIntegrationPlugin(createApiClient);