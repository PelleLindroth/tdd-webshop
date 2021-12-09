import { useEffect, useState } from 'react'
import { IProduct, productsDb } from '../../mocks/products'
interface CartProps {
  cart: IProduct[]
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>
}

interface CartWithAmount extends IProduct {
  amount?: number
}

const Cart: React.FC<CartProps> = (props: CartProps) => {
  const { cart, setCart } = props
  const [grandTotal, setGrandTotal] = useState(0)

  const [cartObject, setCartObject] = useState({})

  useEffect(() => {
    setCartObject(
      cart.reduce((acc: any, currItem) => {
        if (acc[currItem.id]) {
          acc[currItem.id].amount++
          acc[currItem.id].price += currItem.price
        } else {
          acc[currItem.id] = { ...currItem, amount: 1 }
        }
        return acc
      }, {})
    )
    setGrandTotal(cart.reduce((acc: any, currItem) => acc + currItem.price, 0))
  }, [cart])

  const handleIncrement = (id: string) => {
    const product = productsDb.find((item) => item.id === id)
    setCart([...cart, product!])
  }

  const handleDecrement = (id: string) => {
    const cartItemIndex = cart.findIndex((item) => item.id === id)
    cart.splice(cartItemIndex, 1)
    setCart([...cart])
  }

  const handleDelete = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart([...updatedCart])
  }

  const cartArr: CartWithAmount[] = Object.values(cartObject)

  return (
    <>
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <ul>
          {cartArr.map((el) => {
            return (
              <li key={el.id}>
                <CartRow cartItem={el} />
                <button
                  data-testid={`increment-${el.name}`}
                  onClick={() => handleIncrement(el.id)}
                >
                  +
                </button>
                <button
                  data-testid={`decrement-${el.name}`}
                  onClick={() => handleDecrement(el.id)}
                >
                  -
                </button>
                <button
                  data-testid={`delete-${el.name}`}
                  onClick={() => handleDelete(el.id)}
                >
                  Delete
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <h2>Cart is empty. Buy something!</h2>
      )}
      <h2>Grand total: SEK {grandTotal}</h2>
    </>
  )
}

export default Cart

const CartRow = (props: { cartItem: CartWithAmount }) => {
  const { cartItem } = props
  return (
    <div data-testid={`${cartItem.name}-item`}>
      <h2>{cartItem.name}</h2>
      <p data-testid={`${cartItem.name}-amount`}>Amount: {cartItem.amount}</p>
      <p data-testid={`${cartItem.name}-price`}>SEK {cartItem.price}</p>
    </div>
  )
}

// [
//   { name: 'Bike', id: '234', price: 3456 },
//   { id: '4', name: 'desk', price: 1200 },
//   { id: '2', name: 'A table', price: 1400 },
//   { id: '3', name: 'A car', price: 150000 },
//   { id: '4', name: 'desk', price: 1200 },
//   { id: '2', name: 'A table', price: 1400 },
// ]
