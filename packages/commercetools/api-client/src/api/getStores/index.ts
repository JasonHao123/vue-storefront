import { Context, CustomQuery } from '@vue-storefront/core';

import { StoreQueryResult } from '../../types/GraphQL';
import { storesData } from './defaultQuery';

export interface GetStoresParams {
  customQuery: CustomQuery;
}

/**
 * @remarks References:
 * {@link GetStoresParams}, {@link StoreQueryResult}
 */
export default async function getStores(context: Context, params?: GetStoresParams): Promise<StoreQueryResult> {
  // const variables = { locale: context.config.locale, domain: context.config.domain };
  const { customQuery } = Object(params);

  const url = new URL('/storefront/control/stores', context.config.api.url);

  const { getStoresData } = context.extendQuery(customQuery, {
    getStoresData: { query: storesData, domain: context.config.domain }
  });

  // const response = await (context.client as ApolloClient<any>).query<ApiResponseWrapper<'stores', StoreQueryResult>>({
  //   query: gql`${getStoresData.query}`,
  //   variables: getStoresData.variables,
  //   fetchPolicy: 'no-cache'
  // });
  // Create URL object containing full endpoint URL
  const options = {
    headers: {'x-forwarded-host': context.config.domain, 'Accept-Language': context.config.locale}
  };

  // Use axios to send a GET request
  const response = await context.axios.post(url.href, getStoresData, options);
  return response.data.stores;
}
