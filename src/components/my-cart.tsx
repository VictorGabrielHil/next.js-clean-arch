import * as React from 'react';
import { CartContext } from '../context/cart.provider';
type Props = {
};
export const MyCart: React.FC = (props: Props) => {
  const cartContext = React.useContext(CartContext);

  return (
    <nav>
      Cart - Total {cartContext.total} | Items {cartContext.products.length} 
    </nav>
  )
}       