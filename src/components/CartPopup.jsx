import { FaTimes, FaTrash } from "react-icons/fa";
import "./CartPopup.css";

function CartPopup({
    setCartPopup,
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
}) {

    const subtotal = cart.reduce((total, phone) => {
        return total + (phone.price * phone.quantity);
    }, 0);

    const totalItems = cart.reduce((total, phone) => {
        return total + phone.quantity;
    }, 0);

    return (
        <main
            className="backdrop"
            onClick={() => setCartPopup(false)}
        >
            <div
                className="cartPopup-container"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="cartHeader">

                    <div className="cartTitle">
                        <h2>Shopping Cart</h2>

                        <span className="itemBadge">
                            {totalItems} Item{totalItems !== 1 ? "s" : ""}
                        </span>

                    </div>

                    <button
                        className="closeBtn"
                        onClick={() => setCartPopup(false)}
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className="cartItems">

                    {cart.length === 0 ? (

                        <div className="emptyCart">

                            <h2>🛒</h2>

                            <h3>Your cart is empty</h3>

                            <p className="ItemText">
                                Looks like you haven't added anything yet.
                            </p>

                            <button
                                onClick={() => setCartPopup(false)}
                                className="checkoutBtn"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    ) : (

                        cart.map((phone) => (

                            <div
                                key={phone.id}
                                className="cartItem"
                            >

                                <img
                                    src={phone.thumbnail}
                                    alt={phone.title}
                                />

                                <div className="cartInfo">

                                    <h3>{phone.title}</h3>

                                    <p>₦{phone.price.toLocaleString()}</p>

                                </div>

                                <div className="cartActions">

                                    <div className="quantityControls">

                                        <button
                                            onClick={() => decreaseQuantity(phone.id)}
                                        >
                                            −
                                        </button>

                                        <span>{phone.quantity}</span>

                                        <button
                                            onClick={() => increaseQuantity(phone.id)}
                                        >
                                            +
                                        </button>

                                    </div>

                                    <button
                                        className="deleteBtn"
                                        onClick={() => removeFromCart(phone.id)}
                                    >
                                        <FaTrash />
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                <div className="cartFooter">

                    <div className="summary">

                        <div>
                            <span>Subtotal</span>
                            <span>₦{subtotal.toLocaleString()}</span>
                        </div>

                        <div>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="grandTotal">
                            <strong>Total</strong>
                            <strong>₦{subtotal.toLocaleString()}</strong>
                        </div>

                    </div>

                    <button className="checkoutBtn">
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </main>
    );
}

export default CartPopup;