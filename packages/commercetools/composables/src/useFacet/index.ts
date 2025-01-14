import { useFacetFactory, FacetSearchResult, Context } from '@vue-storefront/core';
import { AttributeType } from '@vue-storefront/commercetools-api';
import { getChannelId } from './../helpers/internals';
import { FacetResultsData } from './../types';

// TODO: move to the config file
const ITEMS_PER_PAGE = [20, 40, 100];

/**
 * @remarks References:
 * {@link FacetResultsData}
 */
const useFacetFactoryParams = {
  search: async (context: Context, params: FacetSearchResult<FacetResultsData>): Promise<FacetResultsData> => {
    const itemsPerPage = params.input.itemsPerPage;
    console.log('------useFacet search-------');
    const categoryResponse = await context.$ct.api.categorySearch({ slug: params.input.categorySlug });
    console.log('------useFacet categories-------');
    console.log(categoryResponse);
    const categories = categoryResponse.data.categorySearch.results;
    const inputFilters = params.input.filters;
    const filters = Object.keys(inputFilters).reduce((prev, curr) => ([
      ...prev,
      ...inputFilters[curr].map(value => ({ type: AttributeType.STRING, name: curr, value }))
    ]), []);
    console.log(categories);
    const productResponse = await context.$ct.api.getProduct({
      catId: categories[0].id,
      limit: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage,
      filters,
      channelId: getChannelId(context.$ct.config.store)
      // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4857
      // sort: params.sort
    });
    console.log('-------enhanced productResponse--------');
    console.log(JSON.stringify(productResponse));
    // const enhancedProductResponse = enhanceProduct(productResponse, context);
    const products = productResponse.data.products.results;
    // (enhancedProductResponse.data as any)._variants as ProductVariant[];
    const facets = productResponse.data.products.facets;
    // getFiltersFromProductsAttributes(products);
    console.log('-------enhanced products--------');
    console.log(JSON.stringify(products));
    console.log('-------facets--------');
    console.log(JSON.stringify(facets));
    return {
      products,
      categories,
      facets,
      total: productResponse.data.products.total,
      perPageOptions: ITEMS_PER_PAGE,
      itemsPerPage
    };
  }
};

/**
 * @remarks References:
 * {@link FacetResultsData}
 */
const useFacet = useFacetFactory<FacetResultsData>(useFacetFactoryParams);

export {
  useFacet,
  useFacetFactoryParams
};
