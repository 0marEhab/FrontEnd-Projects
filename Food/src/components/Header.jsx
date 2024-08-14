import Button from "./Ui/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";
export default function Header() {
  const cartCtx = useContext(CartContext);
  function handleAddMealToCart(meal) {
    cartCtx.addItem(meal);
  }
  const totalCartItem = cartCtx.items.reduce((totalCartItem, item) => {
    return totalCartItem + item.quantity;
  }, 0);
  return (
    <header className=" flex flex-row  justify-between mx-10 items-center mb-8">
      <h1 className=" text-zinc-50 text-4xl ">Logo</h1>
      <Button>Cart ({totalCartItem})</Button>
    </header>
  );
}
