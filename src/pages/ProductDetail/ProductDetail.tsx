import { IProduct, getProductById } from '../../mocks/products'
import { useParams } from 'react-router'

interface ProductDetailProps {
  cart: IProduct[]
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const ProductDetail = (props: ProductDetailProps) => {
  const { cart, setCart } = props

  const { id } = useParams()

  const product = getProductById(id!)

  const handleAddToCart = () => {
    setCart([...cart, product!])
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
