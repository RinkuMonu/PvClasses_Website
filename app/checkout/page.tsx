"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, CreditCard, Truck, MapPin, Plus } from "lucide-react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaRupeeSign } from "react-icons/fa";

// Example data
const basePlanPrice = 29.99;
const yearlyDiscountPercentage = 0.2;

const dummySelectedPlan = {
  name: "Pro Hosting Plan",
  price: basePlanPrice,
  billingDuration: "monthly",
  yearlyDiscountPercentage,
};

const dummySelectedAddons = [
  { id: "ssl", name: "Premium SSL Certificate", price: 5 },
  { id: "backups", name: "Daily Automated Backups", price: 7.5 },
];

const dummySavedAddresses = [
  {
    id: "home",
    name: "Home",
    addressLine1: "123 Hosting Lane",
    city: "Cloudville",
    state: "TX",
    zip: "75001",
  },
  {
    id: "office",
    name: "Office",
    addressLine1: "456 Server Blvd",
    city: "Datacenter City",
    state: "CA",
    zip: "90210",
  },
];

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Delivery",
    price: 0,
    description: "3-5 business days",
  },
  {
    id: "express",
    name: "Expedited Setup",
    price: 15,
    description: "1-2 business days",
  },
];

export default function CheckoutPage() {
  const [selectedAddressId, setSelectedAddressId] = useState(
    dummySavedAddresses[0]?.id || ""
  );
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState(
    shippingMethods[0].id
  );
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  // States for new address form
  const [newName, setNewName] = useState("");
  const [newLine1, setNewLine1] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newConsent, setNewConsent] = useState(false);

  const basePlanAdjustedPrice = useMemo(() => {
    let price = dummySelectedPlan.price;
    if (dummySelectedPlan.billingDuration === "yearly") {
      setCouponCode("yearly-discount");
      price = price * (1 - dummySelectedPlan.yearlyDiscountPercentage);
    }
    return price;
  }, []);

  const addonsTotalPrice = useMemo(
    () => dummySelectedAddons.reduce((sum, addon) => sum + addon.price, 0),
    []
  );
  const currentShippingCost = useMemo(
    () =>
      shippingMethods.find((s) => s.id === selectedShippingMethodId)?.price ||
      0,
    [selectedShippingMethodId]
  );

  const subtotal =
    basePlanAdjustedPrice + addonsTotalPrice + currentShippingCost;
  const taxRate = 0.18;
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const totalDue = subtotal - discountAmount + taxAmount;

  const handleApplyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscountAmount(10);
    } else if (couponCode === "FREESHIP") {
      setDiscountAmount(currentShippingCost);
    } else {
      setDiscountAmount(0);
      alert("Invalid coupon code!");
    }
  };

  return (
    <>
      <section className="page-title">
        <div className="auto-container">
          <h1>Checkout Page</h1>

          {/* Search Boxed */}
          {/* <div className="search-boxed">
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
                    </div> */}
        </div>
      </section>
      <div className="bg-light py-5 sidebar-page-container ">
        <div
          className="patern-layer-one paroller"
          style={{ backgroundImage: "url(/images/icons/icon-1.png)" }}
        ></div>
        <div
          className="patern-layer-two paroller"
          style={{ backgroundImage: "url(/images/icons/icon-2.png)" }}
        ></div>
        {/* Steps Indicator */}
        <div className="container mb-4 d-flex justify-content-center">
          <div className="d-flex gap-3 align-items-center text-secondary fw-medium mt-5">
            <div className="d-flex align-items-center gap-2">
              <span
                className="d-flex align-items-center justify-content-center rounded-circle text-white"
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#0B679B",
                }}
              >
                1
              </span>
              Address
            </div>
            <span>→</span>
            <div className="d-flex align-items-center gap-2">
              <span
                className="d-flex align-items-center justify-content-center rounded-circle text-white"
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#0B679B",
                }}
              >
                2
              </span>
              Shipping
            </div>
            <span>→</span>
            <div className="d-flex align-items-center gap-2">
              <span
                className="d-flex align-items-center justify-content-center rounded-circle text-white"
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#0B679B",
                }}
              >
                3
              </span>
              Payment
            </div>
          </div>
        </div>

        <div
          className="container d-flex flex-column flex-lg-row gap-4"
          style={{ overflow: "visible" }}
        >
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-lg-8 bg-white rounded-3 shadow p-4 position-relative"
          >
            <h2 className="h1 fw-bold text-dark mb-4">Checkout</h2>

            {/* Address */}
            <div className="mb-4">
              <h3 className="h4 fw-semibold text-dark d-flex align-items-center gap-2 mb-3">
                <MapPin size={20} style={{ color: "#0B679B" }} /> Delivery
                Address
              </h3>
              <div className="d-flex flex-column gap-3">
                {dummySavedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`border rounded-3 p-3 cursor-pointer transition ${
                      selectedAddressId === addr.id
                        ? "border-primary bg-light-orange"
                        : "border-light-subtle hover-border-gray-300"
                    }`}
                    onClick={() => setSelectedAddressId(addr.id)}
                  >
                    <div className="fw-medium text-dark">{addr.name}</div>
                    <div className="small text-secondary">
                      {addr.addressLine1}, {addr.city}, {addr.state} {addr.zip}
                    </div>
                  </div>
                ))}
                <div
                  className={`border rounded-3 p-3 text-center cursor-pointer transition d-flex align-items-center justify-content-center gap-2 ${
                    selectedAddressId === "new"
                      ? "border-primary bg-light-orange"
                      : "border-light-subtle hover-border-gray-300"
                  }`}
                  onClick={() => setSelectedAddressId("new")}
                >
                  <Plus className="" size={20} />
                  <div className="fw-medium text-dark">Add New Address</div>
                </div>
              </div>

              {/* New Address Form */}
              <AnimatePresence>
                {selectedAddressId === "new" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <select
                          className="form-select"
                          value={newCountry}
                          onChange={(e) => setNewCountry(e.target.value)}
                        >
                          <option value="">Select a Country</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">UK</option>
                          <option value="Russia">Russia</option>
                          <option value="France">France</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                        value={newLine1}
                        onChange={(e) => setNewLine1(e.target.value)}
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="State/Province"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Zip Code"
                          value={newZip}
                          onChange={(e) => setNewZip(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        placeholder="A brief description about your consultation"
                        rows={3}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="consent"
                        checked={newConsent}
                        onChange={(e) => setNewConsent(e.target.checked)}
                      />
                      <label
                        className="form-check-label small text-secondary"
                        htmlFor="consent"
                      >
                        By submitting your information you provide written
                        consent to elitehost and its family of brands contacting
                        you.
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping */}
            <div className="mb-4">
              <h3 className="h4 fw-semibold text-dark d-flex align-items-center gap-2 mb-3">
                <Truck className="" size={20} style={{ color: "#0B679B" }} />{" "}
                Shipping
              </h3>
              <div className="d-flex flex-column gap-3">
                {shippingMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-3 p-3 cursor-pointer transition ${
                      selectedShippingMethodId === method.id
                        ? "border-primary bg-light-orange"
                        : "border-light-subtle hover-border-gray-300"
                    }`}
                    onClick={() => setSelectedShippingMethodId(method.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium text-dark">{method.name}</div>
                        <div className="small text-secondary">
                          {method.description}
                        </div>
                      </div>
                      <div className="fw-medium text-dark">
                        {method.price === 0
                          ? "Free"
                          : `₹${method.price.toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="h4 fw-semibold text-dark d-flex align-items-center gap-2 mb-3">
                <CreditCard style={{ color: "#0B679B" }} size={20} /> Payment
              </h3>
              <div className="d-flex flex-column gap-3">
                {["stripe", "paypal", "razorpay"].map((method) => (
                  <div
                    key={method}
                    className={`border rounded-3 p-3 text-center cursor-pointer transition ${
                      paymentMethod === method
                        ? "border-primary bg-light-orange"
                        : "border-light-subtle hover-border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    <div className="fw-medium text-dark text-capitalize">
                      {method}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-lg-4 bg-light-orange rounded-3 shadow p-4 "
            style={{ height: "fit-content" }}
          >
            <h3 className="h2 fw-bold text-dark d-flex align-items-center gap-2">
              <div className="text-primary" />
              <FaRupeeSign />
              Order Summary
            </h3>

            <div className="mt-3">
              <div className="d-flex justify-content-between text-secondary mb-2">
                <span>
                  {dummySelectedPlan.name} ({dummySelectedPlan.billingDuration})
                </span>
                <span>₹{basePlanAdjustedPrice.toFixed(2)}</span>
              </div>
              {dummySelectedAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="d-flex justify-content-between text-secondary mb-2"
                >
                  <span className="d-flex align-items-center gap-1">
                    <CheckCircle2 style={{ color: "#0B679B" }} size={16} />
                    {addon.name}
                  </span>
                  <span>+₹{addon.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between text-secondary mb-2">
                <span>Shipping</span>
                <span>
                  {currentShippingCost === 0
                    ? "Free"
                    : `₹${currentShippingCost.toFixed(2)}`}
                </span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between fw-medium text-dark mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="d-flex justify-content-between text-primary fw-semibold mb-2">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between text-secondary mb-2">
                <span>Tax (18%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between h4 fw-bold text-dark">
                <span>Total</span>
                <span>₹{totalDue.toFixed(2)}</span>
              </div>
            </div>
            

            <button
              className="w-100 border-0 text-white fw-semibold py-2 rounded-2 shadow mt-4"
              style={{ backgroundColor: "#0B679B", color: "#fff" , display:"none" }}
              onClick={handleApplyCoupon}
            >
              Coupon Code
            </button>
            <button
              className="w-100 border-0 text-white fw-semibold py-2 rounded-2 shadow mt-4"
              style={{ backgroundColor: "#0B679B", color: "#fff" }}
            >
              Place Order
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
