import { Button, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import globalContext from "../context/global/globalContext";
import { useStyles } from "../styles";
import { useHistory } from "react-router-dom";
import { SET_CUSTOMER_DATA } from "../context/types";
import { SET_CUSTOMER_CONFIRM } from "../context/types";

const OrderAccountHolderForm = ({ tailwindCSS }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    order,
    customerData,
    setCustomerData,
    customerConfirm,
    setCustomerConfirm,
    participantsdata,
    dispatch,
  } = useContext(globalContext);

  const [customerNameFirst, setCustomerNameFirst] = useState(
    customerData.first_name ? customerData.first_name : ""
  );
  const [customerNameLast, setCustomerNameLast] = useState(
    customerData.last_name ? customerData.last_name : ""
  );
  const [customerEmail, setCustomerEmail] = useState(
    customerData.email_address ? customerData.email_address : ""
  );
  const [customerPhone, setCustomerPhone] = useState(
    customerData.phone ? customerData.phone : ""
  );
  const [customerAddress1, setCustomerAddress1] = useState(
    customerData.address1 ? customerData.address1 : ""
  );
  const [customerAddress2, setCustomerAddress2] = useState(
    customerData.address2 ? customerData.address2 : ""
  );
  const [customerZip, setCustomerZip] = useState(
    customerData.zip ? customerData.zip : ""
  );
  const [customerCity, setCustomerCity] = useState(
    customerData.city ? customerData.city : ""
  );

  const [customerStatus, setCustomerStatus] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (
      customerEmail &&
      customerNameFirst &&
      customerNameLast &&
      customerPhone &&
      customerAddress1 &&
      customerZip &&
      customerCity
    ) {
      setCustomerStatus(true);
    } else {
      setCustomerStatus(false);
    }
  }, [
    customerNameFirst,
    customerNameLast,
    customerEmail,
    customerPhone,
    customerAddress1,
    customerAddress2,
    customerZip,
    customerCity,
  ]);

  const handleCustomerFinalize = () => {
    let customerDataTemp = customerData ? customerData : {};
    customerDataTemp.pin_code = order.pin_code;
    customerDataTemp.first_name = customerNameFirst;
    customerDataTemp.last_name = customerNameLast;
    customerDataTemp.email_address = customerEmail;
    customerDataTemp.phone = customerPhone;
    customerDataTemp.address1 = customerAddress1;
    customerDataTemp.address2 = customerAddress2;
    customerDataTemp.zip = customerZip;
    customerDataTemp.city = customerCity;

    setCustomerData(customerDataTemp);

    dispatch({
      type: SET_CUSTOMER_DATA,
      payload: customerDataTemp,
    });

    dispatch({
      type: SET_CUSTOMER_CONFIRM,
      payload: customerDataTemp,
    });

    history.push(
      "orderconfirmation?orderid=" + order.id + "&pincode=" + order.pin_code
    );
  };

  return (
    <div className={` ${tailwindCSS}`}>
      <h2 className="p-2 text-4xl text text-center font-bold mb-4">
        Bestiller
      </h2>
      <form className="mb-4">
        <div className="p-4 border border-solid rounded border-gray-400 grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">Fornavn</h2>
            <TextField
              fullWidth
              id="firstname"
              label="Fornavn"
              variant="outlined"
              type="text"
              name="firstname"
              value={customerNameFirst}
              onChange={(e) => {
                setCustomerNameFirst(e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">Efternavn</h2>
            <TextField
              fullWidth
              id="lastname"
              label="Efternavn"
              variant="outlined"
              type="text"
              name="lastname"
              value={customerNameLast}
              onChange={(e) => {
                setCustomerNameLast(e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">Email</h2>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={customerEmail}
              onChange={(e) => {
                setCustomerEmail(e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">Telefon</h2>
            <TextField
              fullWidth
              id="phone"
              label="Telefon"
              variant="outlined"
              type="text"
              name="phone"
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">Addresse 1</h2>
            <TextField
              fullWidth
              id="address1"
              label="Addresse Linie 1"
              variant="outlined"
              type="text"
              name="address1"
              value={customerAddress1}
              onChange={(e) => {
                setCustomerAddress1(e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">Addresse 2</h2>
            <TextField
              fullWidth
              id="address2"
              label="Addresse Linie 2"
              variant="outlined"
              type="text"
              name="address2"
              value={customerAddress2}
              onChange={(e) => {
                setCustomerAddress2(e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">Postnummer</h2>
            <TextField
              fullWidth
              id="zip"
              label="Postnummer"
              variant="outlined"
              type="text"
              name="zip"
              value={customerZip}
              onChange={(e) => {
                setCustomerZip(e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <h2 className="font-semibold text-sm mb-4">By</h2>
            <TextField
              fullWidth
              id="city"
              label="By"
              variant="outlined"
              type="text"
              name="city"
              value={customerCity}
              onChange={(e) => {
                setCustomerCity(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            history.goBack();
          }}
          variant="outlined"
          size="large"
        >
          Tilbage
        </Button>
        <Button
          onClick={() => {
            handleCustomerFinalize();
          }}
          color="primary"
          size="large"
          disabled={customerStatus ? false : true}
          variant="contained"
        >
          Bekræft
        </Button>
      </div>
    </div>
  );
};

export default OrderAccountHolderForm;
