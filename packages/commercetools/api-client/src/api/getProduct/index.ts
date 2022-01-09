import { CustomQuery, Context } from '@vue-storefront/core';

export interface ProductData {
  products: ProductQueryResult;
}

/**
 * @remarks References:
 * {@link ProductData}
 */
const getProduct = async (context: Context, params, customQuery?: CustomQuery) => {
  // const { locale, acceptLanguage, currency, country } = context.config;

  console.log('>>>>>>>>>>>>>api.getProduct>>>>>>>>>');
  console.log(params);
  // const defaultVariables = {
  //   where: buildProductWhere(context.config, params),
  //   skus: params.skus,
  //   limit: params.limit,
  //   offset: params.offset,
  //   channelId: params.channelId,
  //   locale,
  //   acceptLanguage,
  //   currency,
  //   country
  // };
  //
  // const { products } = context.extendQuery(
  //   customQuery, { products: { query: defaultQuery, variables: defaultVariables } }
  // );

  try {
    // const request = await (context.client as ApolloClient<any>).query<ProductData>({
    //   query: gql`${products.query}`,
    //   variables: products.variables,
    //   // temporary, seems like bug in apollo:
    //   // @link: https://github.com/apollographql/apollo-client/issues/3234
    //   fetchPolicy: 'no-cache'
    // });

    const url = new URL('/storefront/control/products', context.config.api.url);

    // const { getStoresData } = context.extendQuery(customQuery, {
    //   getStoresData: { query: storesData, domain: context.config.domain }
    // });

    // Create URL object containing full endpoint URL
    const options = {
      headers: {'x-forwarded-host': context.config.domain, 'Accept-Language': context.config.acceptLanguage}
    };
    console.log(customQuery);
    // Use axios to send a GET request
    const request = await context.axios.post(url.href, params, options);
    console.log(JSON.stringify(request.data));
    console.log('<<<<<<<<<<<api.getProduct<<<<<<<<<<<<<<');
    return request.data;
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }

};

export default getProduct;
