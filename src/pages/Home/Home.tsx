import { useState } from 'react'
import { IProduct } from '../../mocks/products'

const Home = (props: { products: IProduct[] }) => {
  const { products } = props

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)

  return (
    <main>
      <div>
        <label htmlFor="search">Search product:</label>
        <input id="search" type="search" />
      </div>
      {products.length === 0 && <h3>Something went wrong</h3>}
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map(product => (
            <div key={product.id} role="listitem">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </ul>
      ) : (
        <h3>No matching products found</h3>
      )}
    </main>
  )
}

export default Home
