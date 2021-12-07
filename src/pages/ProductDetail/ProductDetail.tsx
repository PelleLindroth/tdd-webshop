import { IProduct } from '../../mocks/products'
import { useParams } from 'react-router'

const ProductDetail = (props: { products: IProduct[] }) => {
  const { products } = props

  const id = '1'
  const product = products.find(prod => prod.id === id)

  return product ? <h1>{product.name}</h1> : <h1>No product found</h1>
}

export default ProductDetail
