import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

const getPrice = (price) => Number(price.replace(/[^\d.]/g, ""));

export default function CartDrawer({
    isOpen,
    items,
    onClose,
    onRemove,
    onUpdateQuantity
}) {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = items.reduce(
        (total, item) => total + getPrice(item.price) * item.quantity,
        0
    );

    return isOpen ? (
            <div className="fixed inset-0 z-[1100] flex justify-end">
                <button
                    type="button"
                    aria-label="Close cart"
                    className="absolute inset-0 h-full w-full cursor-default bg-black/50"
                    onClick={onClose}
                />
                    <aside
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-title"
                        className="relative z-10 flex h-full w-full max-w-md flex-col bg-[var(--cream-light)] shadow-2xl"
                    >
                        <header className="flex items-center justify-between border-b border-[var(--brown-700)]/15 px-6 py-5">
                            <div>
                                <h2 id="cart-title" className="text-2xl font-bold text-[var(--brown-900)]">
                                    Your Cart
                                </h2>
                                <p className="text-sm text-[var(--brown-600)]">
                                    {itemCount} {itemCount === 1 ? "item" : "items"}
                                </p>
                            </div>
                            <button
                                type="button"
                                aria-label="Close cart"
                                onClick={onClose}
                                className="rounded-full p-2 text-[var(--brown-700)] transition-colors hover:bg-[var(--brown-700)]/10"
                            >
                                <X size={22} />
                            </button>
                        </header>

                        {items.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                                <ShoppingBag size={42} className="mb-4 text-[var(--brown-500)]" />
                                <h3 className="mb-2 text-xl font-semibold text-[var(--brown-900)]">
                                    Your cart is empty
                                </h3>
                                <p className="mb-6 text-sm text-[var(--brown-600)]">
                                    Find your next favorite coffee in our curated selection.
                                </p>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-full bg-[var(--brown-700)] px-5 py-2.5 text-sm font-semibold text-[var(--cream)] transition-colors hover:bg-[var(--brown-600)]"
                                >
                                    Continue shopping
                                </button>
                            </div>
                        ) : (
                            <>
                                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                                    {items.map((item) => (
                                        <li
                                            key={item.name}
                                            className="flex gap-4 border-b border-[var(--brown-700)]/15 pb-4"
                                        >
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="h-24 w-20 rounded-lg bg-white object-contain p-1"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-semibold text-[var(--brown-900)]">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-sm text-[var(--brown-600)]">
                                                            {item.price} each
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${item.name} from cart`}
                                                        onClick={() => onRemove(item.name)}
                                                        className="rounded p-1 text-[var(--brown-500)] transition-colors hover:text-red-700"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <div className="inline-flex items-center gap-3 rounded-full border border-[var(--brown-700)]/20 px-2 py-1">
                                                        <button
                                                            type="button"
                                                            aria-label={`Decrease ${item.name} quantity`}
                                                            onClick={() => onUpdateQuantity(item.name, item.quantity - 1)}
                                                            className="rounded p-1 text-[var(--brown-700)] hover:bg-[var(--brown-700)]/10"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="min-w-4 text-center text-sm font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            aria-label={`Increase ${item.name} quantity`}
                                                            onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}
                                                            className="rounded p-1 text-[var(--brown-700)] hover:bg-[var(--brown-700)]/10"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="font-semibold text-[var(--brown-900)]">
                                                        ${(getPrice(item.price) * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <footer className="border-t border-[var(--brown-700)]/15 px-6 py-5">
                                    <div className="mb-4 flex items-center justify-between text-lg font-bold text-[var(--brown-900)]">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <p className="mb-4 text-xs text-[var(--brown-600)]">
                                        Shipping and taxes are calculated at checkout.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full rounded-full bg-[var(--brown-700)] px-5 py-3 font-semibold text-[var(--cream)] transition-colors hover:bg-[var(--brown-600)]"
                                    >
                                        Continue shopping
                                    </button>
                                </footer>
                            </>
                        )}
                    </aside>
            </div>
    ) : null;
}
