export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ENDPOINT);
  const data = response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(ENDPOINT);
  const data = response.json();
  return data;
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}

export async function getProductById(productId) {
  const ENDPOINT = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(ENDPOINT);
  const data = response.json();
  return data;
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
