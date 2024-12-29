import { useState, type SetStateAction } from "react";

import { useCart } from "~/cart";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useProductContext } from "~/contexts";
import { SlideButton } from "./Button";

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
  const { addToCart } = useCart();
  return (
    <div className="flex gap-4 flex-wrap">
      {detailed && (
        <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
      )}
      <SlideButton
        onClick={() => addToCart(product, product.sizes[sizeIndex], quantity)}
        classes="!p-[0.5em] !grow-[100] !text-lg"
      >
        <span>Add to Cart</span>
      </SlideButton>
    </div>
  );
}

export function QuantitySelect({ quantity, setQuantity }: QSProps) {
  const btnStyle =
    "py-2 px-4 h-full hover:-translate-y-1 active:!translate-y-1 transition-transform ";
  const inBounds = (num: number) => Math.min(Math.max(num, 1), 99);

  return (
    <div className="display flex grow border border-slate-50 rounded-lg items-center">
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
        className="border-x border-slate-50 p-2 text-center w-20 h-full grow overflow-hidden "
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
