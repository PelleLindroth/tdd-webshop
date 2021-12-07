import { Link } from 'react-router-dom'
import { IProduct } from '../../mocks/products'

const Card = (props: { product: IProduct }) => {
  const { product } = props

  return (
    <div role="listitem">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <Link data-testid={product.name} to={`/product/${product.id}`}>
        Go to product
      </Link>
    </div>
  )
}

export default Card
