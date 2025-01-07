export const ROUTES = {
  home: '/',
  about: '/about',
  shipping: '/shipping',
  terms: '/terms',
  category: (slug: string) => `/category/${slug}`,
  subcategory: (category: string, subcategory: string) => `/category/${category}/${subcategory}`,
  product: (id: string) => `/product/${id}`
};