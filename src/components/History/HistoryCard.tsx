import { type HistoryModel } from "../../models";
import { ImageLazy } from "../Common";

type HistoryCardProps = {
  historyItem: HistoryModel;
};
export const HistoryCard = ({ historyItem }: HistoryCardProps) => {
  return (
    <article className="card p-5  grid gap-2">
      <header className=" grid grid-cols-2 ">
        <h3 className="font-semibold">#{historyItem.id}</h3>
        <div className="flex flex-col gap-1 text-end text-text-secondary dark:text-text-secondary-dark text-sm">
          <p>{historyItem.date}</p>
          <p>{historyItem.paymentMethod}</p>
        </div>
      </header>
      <section className="grid gap-2 ">
        {historyItem.Cart.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[64px_1fr] gap-2 items-center border-b border-border dark:border-border-dark pb-2 text-text dark:text-text-dark font-semibold"
          >
            <ImageLazy
              alt={`Product Image: ${product.thumbnail}`}
              src={product.thumbnail}
              className="w-16 h-16 aspect-square rounded-md"
              height={64}
              width={64}
            />

            <div className="flex max-sm:flex-col md:justify-between md:items-center">
              <p>{product.title}</p>
              <div className="md:text-end">
                <p>Quantity: {product.quantity}</p>

                <p>{`Total: $${product.finalPrice}`}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <footer className="flex max-sm:flex-col md:justify-between md:items-center text-sm gap-2">
        <p className="text-text-secondary dark:text-text-secondary-dark">
          {historyItem.address}
        </p>

        <p className="font-bold text-end">{`Total: $${historyItem.totalPrice}`}</p>
      </footer>
    </article>
  );
};
