import { useEffect, useState } from 'react'
import { IProduct } from '../../mocks/products'
import Card from '../../components/Card/Card'

const Home = (props: { products: IProduct[] }) => {
  const { products } = props
  const [searchPhrase, setSearchPhrase] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.name.includes(searchPhrase))
    )
  }, [products, searchPhrase])

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchPhrase(e.currentTarget.value)
  }

  return (
    <main>
      <div>
        <label htmlFor="search">Search product:</label>
        <input
          onChange={handleSearch}
          value={searchPhrase}
          id="search"
          type="search"
        />
      </div>
      {products.length === 0 && <h3>Something went wrong</h3>}
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
