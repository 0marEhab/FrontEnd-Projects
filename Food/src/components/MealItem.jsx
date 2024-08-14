import Button from "./Ui/Button";
import useHttp from "../hooks/useHttp";
import { lazy, useContext } from "react";
import CartContext from "../store/CartContext";

const config = {
  method: "GET",
};

export default function MealItem() {
  const cartCtx = useContext(CartContext);
  function handleAddMealToCart(meal) {
    cartCtx.addItem(meal);
  }
  const {
    data: meals,
    loading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);

  return (
    <>
    {meals.map((meal) => (
        <div key={meal.id}>
          <div className="bg-zinc-600 w-[300px] h-[500px]  shadow-md overflow-hidden  rounded-md m-8">
            <img
              onLoad={lazy}
              src={`http://localhost:3000/${meal.image}`}
              alt=""
              className="w-full h-60 object-fit rounded-md "
            />
            <div className="text-center  text-zinc-300">
              <p>{meal.name}</p>
              <p>Price: {meal.price}</p>

              <p className=""> {meal.description}</p>

              <Button onClick={() => handleAddMealToCart(meal)}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
