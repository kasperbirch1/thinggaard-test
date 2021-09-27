import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import Participant from "./Participant";
import "animate.css";

const OrderForm = ({ tailwindCSS }) => {
  const history = useHistory();

  const { order, customerData, createCustomerData, participantsData } =
    useContext(globalContext);

  const [customerSaved, setCustomerSaved] = useState(false);

  const [continueStatus, setContinueStatus] = useState(true);

  const [customerNameFirst, setCustomerNameFirst] = useState(
    customerData.first_name ? customerData.first_name : ""
  );
  const [customerNameLast, setCustomerNameLast] = useState(
    customerData.last_name ? customerData.last_name : ""
  );
  const [customerEmail, setCustomerEmail] = useState(
    customerData.email_address ? customerData.email_address : ""
  );

  const [customerStatus, setCustomerStatus] = useState(
    customerEmail && customerNameFirst && customerNameLast ? true : false
  );

  useEffect(() => {
    let participantsFilled = false;
    if (participantsData && customerStatus) {
      participantsFilled = true;
      participantsData.map((item) => {
        if (!item.name || !item.age || !item.gender) {
          participantsFilled = false;
        }
      });
    }
    setContinueStatus(participantsFilled);
  }, [customerStatus, participantsData, Object.values(participantsData)]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleCustomerSave = () => {
    setCustomerSaved(true);
    let customerDataTemp = customerData ? customerData : {};
    customerDataTemp.pin_code = order.pin_code;
    customerDataTemp.first_name = customerNameFirst;
    customerDataTemp.last_name = customerNameLast;
    customerDataTemp.email_address = customerEmail;
    if (customerEmail && customerNameFirst && customerNameLast) {
      setCustomerStatus(true);
    }
    createCustomerData(customerDataTemp);
    window.setTimeout(() => {
      setCustomerSaved(false);
    }, 3000);
  };

  return (
    <div className={` ${tailwindCSS}`}>
      <h2 className="p-0 text-4xl text text-center font-bold mb-4">
        Deltagere
      </h2>
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
        </div>
        {customerStatus && customerSaved && (
          <div className="mt-4 text-center">
            <h3 className="animate__animated animate__shakeX animate__slow">
              Bestiller gemt
            </h3>
          </div>
        )}
      </div>
      {customerStatus &&
        order?.participants &&
        order.participants.map((item, index) => (
          <Participant key={index} participant={item} personCount={index} />
        ))}

      <div className="mt-4 flex justify-between">
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
          disabled={continueStatus ? false : true}
          onClick={() => {
            history.push("orderdetails");
          }}
          color="primary"
          variant="contained"
          size="large"
        >
          Fortsæt
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
