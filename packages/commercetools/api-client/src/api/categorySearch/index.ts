import { CategorySearchResult } from '../../types/GraphQL';
import { CustomQuery } from '@vue-storefront/core';
import { CategoryWhereSearch } from '@vue-storefront/commercetools-api';

export interface CategoryData {
  categorySearch: CategorySearchResult;
}

export interface CategorySearchParams {
  filter?: CategoryWhereSearch;
  limit?: number;
  offset?: number;
}

const categorySearch = async (context, params?: CategorySearchParams, customQuery?: CustomQuery) => {
  // const { acceptLanguage } = context.config;
  // const defaultVariables = params ? {
  //   filter: buildCategoryFilter(context.config, params),
  //   limit: params.limit,
  //   offset: params.offset,
  //   acceptLanguage
  // } : { acceptLanguage };
  //
  // const { categorySearch } = context.extendQuery(customQuery,
  //   { categorySearch: { query: defaultQuery, variables: defaultVariables } }
  // );
  // const request = await (context.client as ApolloClient<any>).query<CategoryData>({
  //   query: gql`${categorySearch.query}`,
  //   variables: categorySearch.variables,
  //   fetchPolicy: 'no-cache'
  // });
  const url = new URL('/storefront/control/categorySearch', context.config.api.url);

  // const { getStoresData } = context.extendQuery(customQuery, {
  //   getStoresData: { query: storesData, domain: context.config.domain }
  // });

  // Create URL object containing full endpoint URL
  const options = {
    headers: {'x-forwarded-host': context.config.domain, 'Accept-Language': context.config.acceptLanguage}
  };

  // Use axios to send a GET request
  const request = await context.axios.post(url.href, params, options);
  // return response.data.stores;
  console.log('------------categorySearch-------------');
  console.log(params);
  console.log(customQuery);

  console.log(request.data);
  console.log('------------categorySearch-------------');
  return request.data;
  // return request;
};

export default categorySearch;
