<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category}`"
      :label="category.name"
      :link="localePath(`/c/${category.key}`)"
    />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category}`"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="category.name"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/c/${category.key}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import {
  useStore
} from '@vue-storefront/commercetools';
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();

    const { response } = useStore();
    function getSelected(stores) {
      if (stores._selectedStore) {
        return stores.results?.find((result) => result.key === String(stores._selectedStore));
      } else {
        return stores.results?.find((result) => result.selected);
      }
    }

    const selectedStore = computed(() => getSelected(response.value));
    const categories = selectedStore.value ? selectedStore.value.catalogs : [];

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
