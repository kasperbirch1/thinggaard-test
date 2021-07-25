import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import { useStyles } from "../styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

const OrderConfirmationForm = ({ tailwindCSS }) => {
  const classes = useStyles();
  const history = useHistory();
  const { order, token, fetchOrder, customerData, dispatch } =
    useContext(globalContext);
  const [quickpayForm, setQuickpayForm] = useState([]);
  const [orderFetched, setOrderFetched] = useState(false);

  let query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!orderFetched && token && query) {
      fetchOrder(query.get("orderid"), query.get("pincode"));
      setOrderFetched(true);
    }
  }, [token, query]);

  console.log(order);

  useEffect(() => {
    if (order && order.id) {
      getQuickpayForm();
    }
  }, [order]);

  const getQuickpayForm = async () => {
    try {
      const { data } = await axios({
        url:
          "https://thinggaard.dk/wp-json/thinggaard/v1/orders/payments/quickpay?order_id=" +
          order.id +
          "&amount=" +
          order.booking_amount_remaining * 100,
        method: "GET",
      });
      setQuickpayForm(data.form);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={` ${tailwindCSS}`}>
      <h2 className="p-2 text-4xl text text-center font-bold mb-4">
        Bekræftelse
      </h2>
      <p className="text-center">
        Tak for din bestilling. Du vil modtage en email hurtigst muligt med
        yderligere information
      </p>
      {quickpayForm && (
        <form method="POST" action="https://payment.quickpay.net">
          <>
            {quickpayForm.map((formItem, formKey) => (
              <input
                type="hidden"
                name={formItem.field_key}
                value={formItem.field_value}
              />
            ))}
            <Button
              variant="outlined"
              type="submit"
              value="Continue to payment..."
            >
              Betal
            </Button>
          </>
        </form>
      )}
    </div>
  );
};

export default OrderConfirmationForm;
