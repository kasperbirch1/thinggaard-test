import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import globalContext from "../context/global/globalContext";
import { useStyles } from "../styles";
import { useHistory } from "react-router-dom";

const OrderAccountHolderForm = ({ tailwindCSS }) => {
  const classes = useStyles();
  const history = useHistory();
  const { order, participantsdata } = useContext(globalContext);

  return (
    <div className={` ${tailwindCSS}`}>
      <h2 className="bg-gray-100 p-4 text-4xl text text-center font-bold text-themeColor mb-4 rounded shadow">
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
            />
          </div>
        </div>
      </form>
      <div className="flex justify-around">
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
            history.push("orderconfirm");
          }}
          color="primary"
          variant="contained"
        >
          Bekræft
        </Button>
      </div>
    </div>
  );
};

export default OrderAccountHolderForm;
