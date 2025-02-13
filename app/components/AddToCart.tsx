import { useState, type SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useCartContext, useProductContext } from "~/contexts";
import { SlideButton } from "./Button";
import { addToCart } from "~/cart";

interface QSProps {
  quantity: number;
  setQuantity:
    | React.Dispatch<SetStateAction<number>>
    | ((arg0: number) => void);
}

interface AddToCartProps {
  detailed?: boolean;
}

export function AddToCart({ detailed }: AddToCartProps) {
  const { product, sizeIndex } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart, setShowCart } = useCartContext();
  return (
    <div className="flex gap-8 flex-wrap">
      {detailed && (
        <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
      )}
      <SlideButton
        onClick={() => {
          setCart([
            ...addToCart(cart, product, product.sizes[sizeIndex], quantity),
          ]);
          setShowCart(true);
        }}
        classes="!p-[0.5em] !grow-[100] !text-lg !shadow-md dark:bg-indigo-900 dark:outline-indigo-900 dark:border-slate-300 dark:saturate-50 active:translate-y-2 "
      >
        <span className=" ">Add to Cart</span>
      </SlideButton>
    </div>
  );
}

export function QuantitySelect({ quantity, setQuantity }: QSProps) {
  const btnStyle =
    "relative text-lg py-auto px-4 h-full hover:-translate-y-1 active:!translate-y-1 transition-transform ";
  const inBounds = (num: number) => Math.min(Math.max(num, 1), 99);

  return (
    <div className="display flex grow border-4 border-double border-heather-900 dark:border-heather-200 rounded-lg items-center">
      <button
        type="button"
        onClick={() => setQuantity(inBounds(quantity - 1))}
        aria-label="Increase quantity"
        className={btnStyle + "rounded-l-lg"}
      >
        <FaMinus />
      </button>
      <input
        name="item-quantity"
        aria-label="Input quantity"
        value={quantity}
        className="border-x-2 border-heather-500 dark:border-heather-200 p-2 text-center w-20 h-full grow overflow-hidden "
        onChange={(e) => {
          // Control and validate input: only quantities above 0
          const validateInt = parseInt(e.target.value);
          return isNaN(validateInt)
            ? setQuantity(quantity)
            : setQuantity(inBounds(validateInt));
        }}
      />
      <button
        type="button"
        onClick={() => setQuantity(inBounds(quantity + 1))}
        aria-label="Decrease quantity"
        className={btnStyle + "rounded-r-lg"}
      >
        <FaPlus />
      </button>
    </div>
  );
}
