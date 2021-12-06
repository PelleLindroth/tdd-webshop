export interface IProduct {
  id: string // unikt värde för varje produkt
  name: string // produktens namn
  price: number // produktens pris i SEK
}

export const productsDb: IProduct[] = [
  { id: '1', name: 'A book', price: 120 },
  { id: '2', name: 'A table', price: 1400 },
  { id: '3', name: 'A car', price: 150000 },
  { id: '4', name: 'desk', price: 1200 },
  { id: '5', name: 'laptop', price: 7800 },
  { id: '6', name: 'tv', price: 6920 },
]
