import { IProduct } from '../../mocks/products'
import { useParams } from 'react-router'

const ProductDetail = (props: {
  products: IProduct[]
  cart: IProduct[]
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>
}) => {
  const { products, cart, setCart } = props

  const { id } = useParams()

  const product = products.find((prod) => prod.id === id)

  const handleAddToCart = () => {
    if (product) {
      setCart([...cart, product])
    }
  }

  return (
    <>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <h2>SEK{product.price}</h2>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      ) : (
        <h1>No product found</h1>
      )}
    </>
  )
}

export default ProductDetail
