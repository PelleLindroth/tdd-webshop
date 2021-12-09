import { useEffect, useState } from 'react'
import { getAllProducts, IProduct } from '../../mocks/products'
import Card from '../../components/Card/Card'

// interface HomeProps {
//   products: IProduct[]
// }

const Home = () => {
  const products = getAllProducts()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchPhrase)
      )
    )
  }, [products, searchPhrase])

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const phrase = e.currentTarget.value.toLowerCase()
    setSearchPhrase(phrase)
  }

  return (
    <main>
      <h1>HOME</h1>
      <div>
        <label htmlFor="search">Search product:</label>
        <input
          onChange={handleSearch}
          value={searchPhrase}
          id="search"
          type="search"
        />
      </div>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </ul>
      ) : (
        <h3>No matching products found</h3>
      )}
    </main>
  )
}

export default Home
