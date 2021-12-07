import { IProduct } from '../../mocks/products'
interface CartProps {
  cart: IProduct[]
}

const Cart: React.FC<CartProps> = (props: CartProps) => {
  return <h1>Cart</h1>
}

export default Cart
