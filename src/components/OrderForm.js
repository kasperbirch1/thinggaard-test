import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import { useStyles } from "../styles";
import Participant from "./Participant";
import { SET_CUSTOMER_DATA } from "../context/types";

const OrderForm = ({ tailwindCSS }) => {
  const classes = useStyles();
  const history = useHistory();

  const { order, customerData, setCustomerData, dispatch } =
    useContext(globalContext);

  const [customerNameFirst, setCustomerNameFirst] = useState(
    customerData.first_name ? customerData.first_name : ""
  );
  const [customerNameLast, setCustomerNameLast] = useState(
    customerData.last_name ? customerData.last_name : ""
  );
  const [customerEmail, setCustomerEmail] = useState(
    customerData.email_address ? customerData.email_address : ""
  );

  const [customerStatus, setCustomerStatus] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCustomerSave = () => {
    let customerDataTemp = customerData ? customerData : {};
    customerDataTemp.pin_code = order.pin_code;
    customerDataTemp.first_name = customerNameFirst;
    customerDataTemp.last_name = customerNameLast;
    customerDataTemp.email_address = customerEmail;
    if (customerEmail && customerNameFirst && customerNameLast) {
      setCustomerStatus(true);
    }
    setCustomerData(customerDataTemp);
    dispatch({
      type: SET_CUSTOMER_DATA,
      payload: customerData,
    });
  };

  return (
    <div className={` ${tailwindCSS}`}>
      <h2 className="bg-gray-100 p-4 text-4xl text text-center font-bold text-themeColor mb-4 rounded shadow">
        Deltagere
      </h2>
      <form className="">
        <div className="p-4 border border-solid rounded border-gray-400">
          <h2 className="font-semibold text-sm mb-4">Bestiller Information</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <TextField
                fullWidth
                id="nameFirst"
                label="Fornavn"
                variant="outlined"
                type="text"
                name="nameFirst"
                value={customerNameFirst}
                onChange={(e) => {
                  setCustomerNameFirst(e.target.value);
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                id="nameLast"
                label="Efternavn"
                variant="outlined"
                type="text"
                name="nameLast"
                value={customerNameLast}
                onChange={(e) => {
                  setCustomerNameLast(e.target.value);
                }}
              />
            </div>
            <div>
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
          </div>
          <div className="mt-4 text-right">
            {customerStatus ? (
              <Button
                disabled={
                  customerEmail && customerNameFirst && customerNameLast
                    ? false
                    : true
                }
                size="large"
                onClick={() => {
                  handleCustomerSave();
                }}
                color="secondary"
                variant="contained"
              >
                Opdater bestiller
              </Button>
            ) : (
              <Button
                disabled={
                  customerEmail && customerNameFirst && customerNameLast
                    ? false
                    : true
                }
                size="large"
                onClick={() => {
                  handleCustomerSave();
                }}
                color="secondary"
                variant="contained"
              >
                Gem bestiller
              </Button>
            )}
            {customerStatus && <h3 className="mt-4">Bestiller gemt</h3>}
          </div>
        </div>

        {customerStatus && (
          <ul>
            {order?.participants.map((item, index) => (
              <Participant participant={item} personCount={index} />
            ))}
          </ul>
        )}
      </form>
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => {
            history.goBack();
          }}
          variant="outlined"
        >
          Tilbage
        </Button>
        <Button
          onClick={() => {
            history.push("orderdetails");
          }}
          color="primary"
          variant="contained"
        >
          Fortsæt
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
