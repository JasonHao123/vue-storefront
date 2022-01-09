import { ProductVariant } from '@vue-storefront/commercetools-api';
import { useProductFactory, UseProduct, Context } from '@vue-storefront/core';
import { ProductsSearchParams } from '../types';
import {mapPaginationParams, getChannelId } from './../helpers/internals';

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#ProductVariant}
 */
const useProductFactoryParams = {
  productsSearch: async (context: Context, { customQuery, ...searchParams }): Promise<ProductVariant[]> => {
    console.log('-----------useProduct.productSearch-------------');
    const apiSearchParams = {
      ...searchParams,
      ...mapPaginationParams(searchParams),
      channelId: getChannelId(context.$ct.config.store)
    };

    const productResponse = await context.$ct.api.getProduct(apiSearchParams, customQuery);
    // const enhancedProductResponse = enhanceProduct(productResponse, context);
    // const products = (enhancedProductResponse.data as any)._variants;
    const products = productResponse.data.products.results;
    // (enhancedProductResponse.data as any)._variants as ProductVariant[];
    console.log(products);
    console.log('-----------useProduct.productSearch-------------');

    return products;
  }
};

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#ProductVariant}, {@link ProductsSearchParams}
 */
const useProduct: (cacheId: string) => UseProduct<ProductVariant[], ProductsSearchParams> = useProductFactory<ProductVariant[], ProductsSearchParams>(useProductFactoryParams);

export {
  useProduct,
  useProductFactoryParams
};
