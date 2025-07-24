"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, CheckCircle } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import { FaSearch } from "react-icons/fa";

const initialCartItems = [
  {
    id: "1",
    name: "Don’t Make Me Think",
    price: 230.0,
    quantity: 1,
    image: "/images/book-1.jpg",
  },
  {
    id: "2",
    name: "Essential of Interaction Design",
    price: 360.0,
    quantity: 2,
    image: "/images/book-1.jpg",
  },
  {
    id: "3",
    name: "Rocket Surgery Made Easy",
    price: 170.0,
    quantity: 7,
    image: "/images/book-1.jpg",
  },
  {
    id: "4",
    name: "Non Designer Design Book",
    price: 540.0,
    quantity: 5,
    image: "/images/book-1.jpg",
  },
];

const savedPaymentMethods = [
  { id: "card1", name: "Visa **** 4242" },
  { id: "card2", name: "Mastercard **** 5823" },
  { id: "card3", name: "Razorpay UPI" },
];

const recommendedItems = [
  {
    id: "r1",
    name: "Wireframes Protos",
    price: 499,
    image: "/images/course-6.jpg",
  },
  {
    id: "r2",
    name: "Interactive Design",
    price: 799,
    image: "/images/course-6.jpg",
  },
  { id: "r3", name: "Typography", price: 399, image: "/images/course-6.jpg" },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(
    savedPaymentMethods[0].id
  );
  const { width, height } = useWindowSize();
  const [showPopup, setShowPopup] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscountAmount(10);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setDiscountAmount(0);
      alert("Invalid coupon code!");
    }
  };

  const increaseQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const taxRate = 0.18;
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + taxAmount;

  return (
    <>
      <section className="page-title">
        <div className="auto-container">
          <h1>Your Cart</h1>

          <div className="search-boxed">
            <div className="search-box">
              <form method="post" action="contact.html">
                <div className="form-group">
                  <input
                    type="search"
                    name="search-field"
                    placeholder="What do you want to learn?"
                    required
                  />
                  <button type="submit">
                    <span className="icon">
                      <FaSearch />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div
        className="py-5 sidebar-page-container"
        style={{ backgroundColor: "#f0f5fb" }}
      >
        <div className="container mt-5">
          {/* <h1 className="inner-column text-center mb-5 fw-bold">Your Shopping Cart</h1> */}
          <div
            className="patern-layer-one paroller"
            style={{ backgroundImage: "url(/images/icons/icon-1.png)" }}
          ></div>
          <div
            className="patern-layer-two paroller"
            style={{ backgroundImage: "url(/images/icons/icon-2.png)" }}
          ></div>

          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <ShoppingCart size={64} style={{ color: "#0B679B" }} />
              <h2 className="h4 mt-3">Your cart is empty</h2>
              <p>Looks like you haven’t added anything yet.</p>
              <button
                className="btn"
                style={{ backgroundColor: "#0B679B", color: "#fff" }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-8">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card mb-3 shadow-sm"
                    >
                      <div className="card-body d-flex justify-content-between align-items-center shadow-sm">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail"
                            style={{ width: 80, height: 100 }}
                          />
                          <div>
                            <h5 className="mb-3 text-muted">{item.name}</h5>
                            <p className="mb-4">
                              Price: ₹{item.price.toFixed(2)}
                            </p>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => decreaseQty(item.id)}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="btn btn-light btn-sm disabled">
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => increaseQty(item.id)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="col-md-4">
                <div className="card shadow-sm sticky-top">
                  <div className="card-body">
                    <h5 className="card-title">Order Summary</h5>
                    <ul className="list-group list-group-flush mb-3 ps-0">
                      <li className="list-group-item d-flex justify-content-between px-0">
                        Subtotal <span>₹{subtotal.toFixed(2)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between px-0">
                        Tax (18%) <span>₹{taxAmount.toFixed(2)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between px-0 fw-bold">
                        Total <span>₹{total.toFixed(2)}</span>
                      </li>
                    </ul>

                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="form-control mb-2"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="btn w-100 mb-2"
                      style={{ backgroundColor: "#0B679B", color: "#fff" }}
                    >
                      Apply
                    </button>
                    {discountAmount > 0 && (
                      <div
                        className="fw-semibold mb-2"
                        style={{ color: "#00B31D" }}
                      >
                        Discount applied: -${discountAmount.toFixed(2)}
                      </div>
                    )}

                    <div className="mb-2">
                      <strong>Saved Payment Methods</strong>
                    </div>
                    {savedPaymentMethods.map((method) => (
                      <div className="form-check mb-2" key={method.id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id={method.id}
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={method.id}>
                          {method.name}
                        </label>
                      </div>
                    ))}

                    <Link
                      href="/checkout"
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#0B679B", color: "#fff" }}
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h2 className="h4 my-4 fw-bold">You might also like</h2>

          <div className="row clearfix">
            {recommendedItems.map((item) => (
              <div
                className="cource-block-two col-lg-4 col-md-6 col-sm-12"
                key={item.id}
              >
                <div className="inner-box">
                  <div className="image">
                    <Link href="/coursedetails">
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.name}
                      />
                    </Link>
                  </div>
                  <div className="lower-content">
                    <h5>
                      <Link href="/coursedetails">{item.name}</Link>
                    </h5>
                    <div className="price-rating d-flex justify-content-between">
                      <span className="price">{item.price}</span>
                      <span className="rating">
                      </span>
                    </div>
                    <button
                      className="btn w-100 mt-5"
                      style={{
                        color: "#0B679B",
                        borderColor: "#0B679B",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showPopup && (
              <>
                <Confetti
                  width={width}
                  height={height}
                  recycle={false}
                  numberOfPieces={300}
                  gravity={0.3}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.4 }}
                  className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                >
                  <div className="bg-white p-4 rounded shadow text-center">
                    <CheckCircle
                      size={48}
                      className="mb-2"
                      style={{ color: "#00B31D" }}
                    />
                    <h4 className="mb-1">Hurray! 🎉</h4>
                    <p className="mb-0">Coupon code applied successfully.</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
