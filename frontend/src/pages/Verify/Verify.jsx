import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    console.log("🎈", "Inside verify Payment function");

    const response = await axios.post(`${url}api/order/verify`, {
      success,
      orderId,
    });

    console.log("🎁🎁Response is : 🎁", `${url}api/order/verify`);

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("PAYMENT FUNCDTION : ");
    verifyPayment();
  }, []);

  console.log("🎁🎁🎁", success, orderId);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
