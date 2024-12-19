import type { Product } from "~/custom-types";
import { useState, type SetStateAction } from "react";

import { addToCart } from "~/cart";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface QSProps {
  quantity: number;
  setQuantity: React.Dispatch<SetStateAction<number>>;
}

interface AddToCartProps {
  product: Product;
  sizeIndex: number;
  detailed?: boolean;
}

export function AddToCart({ product, sizeIndex, detailed }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex gap-4 flex-wrap">
      {detailed && (
        <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
      )}
      <button
        type="button"
        className="p-[0.5em] bg-indigo-400 rounded-md grow-[100] hover:-translate-y-2  active:translate-y-0 transition-transform"
        onClick={() =>
          addToCart(product.itemId, product.sizes[sizeIndex], quantity)
        }
      >
        Add to Cart
      </button>
    </div>
  );
}

function QuantitySelect({ quantity, setQuantity }: QSProps) {
  const btnStyle =
    "py-2 px-4 h-full hover:-translate-y-1 active:!translate-y-1 transition-transform ";
  const inBounds = (num: number) => Math.min(Math.max(num, 0), 99);

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
