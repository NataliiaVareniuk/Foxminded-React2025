const routes = {
  home: '/',
  cart: {
    index: '/cart',
    contact: '/cart/contact',
    shipment: '/cart/shipment',
  },
  order: '/order',
};

export default {
  pages: routes,
  navigate: routes,
};