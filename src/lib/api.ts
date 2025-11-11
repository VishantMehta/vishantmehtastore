import { Product, Category } from "@/types/product";

// Load data from JSON files
export async function loadProducts(): Promise<Product[]> {
  const response = await fetch('/data/products.json');
  return response.json();
}

export async function loadCategories(): Promise<Category[]> {
  const response = await fetch('/data/categories.json');
  return response.json();
}

export async function loadBanners() {
  const response = await fetch('/data/banners.json');
  return response.json();
}

export async function loadTestimonials() {
  const response = await fetch('/data/testimonials.json');
  return response.json();
}

// Search products
export async function searchProducts(query: string, filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const products = await loadProducts();
  let filtered = products.filter((product) => {
    const matchesQuery = query
      ? product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      : true;
    
    const matchesCategory = filters.category
      ? product.category.toLowerCase() === filters.category.replace("-", " & ")
      : true;
    
    const matchesPrice =
      (filters.minPrice ? product.price >= filters.minPrice : true) &&
      (filters.maxPrice ? product.price <= filters.maxPrice : true);
    
    const matchesRating = filters.rating
      ? product.rating >= filters.rating
      : true;

    return matchesQuery && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort
  switch (filters.sort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "featured":
    default:
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  // Pagination
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 12;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filtered.slice(start, end);

  return {
    products: paginated,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.ceil(filtered.length / pageSize),
  };
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await loadProducts();
  return products.find((p) => p.slug === slug) || null;
}

// Get suggestions for typeahead
export async function getSuggestions(query: string): Promise<string[]> {
  if (!query || query.length < 2) return [];
  const products = await loadProducts();
  const suggestions = new Set<string>();
  
  products.forEach((product) => {
    if (product.title.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.title);
    }
    product.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5);
}

// Get related products
export async function getRelatedProducts(product: Product): Promise<Product[]> {
  const products = await loadProducts();
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
}
