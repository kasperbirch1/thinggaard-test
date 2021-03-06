import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import axios from "axios";
import { Button } from "@material-ui/core";

const OrderConfirmationForm = ({ tailwindCSS }) => {
  const { order, token, fetchOrder } = useContext(globalContext);
  const [quickpayForm, setQuickpayForm] = useState(false);
  const [quickpayFormDeposit, setQuickpayFormDeposit] = useState(false);
  const [orderFetched, setOrderFetched] = useState(false);

  let query = new URLSearchParams(useLocation().search);

  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

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
  }, [token, query, fetchOrder, orderFetched]);

  const getQuickpayForm = async () => {
    try {
      const { data } = await axios({
        url:
          "https://thinggaard.dk/wp-json/thinggaard/v1/orders/payments/quickpay?order_id=" +
          order.id +
          "&type=0" +
          "&token=" +
          token +
          "&pincode=" +
          query.get("pincode") +
          "&amount=" +
          order.booking_amount_remaining * 100,
        method: "GET",
      });
      setQuickpayForm(data.form);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuickpayFormDeposit = async () => {
    try {
      const { data } = await axios({
        url:
          "https://thinggaard.dk/wp-json/thinggaard/v1/orders/payments/quickpay?order_id=" +
          order.id +
          "&type=0" +
          "&token=" +
          token +
          "&pincode=" +
          query.get("pincode") +
          "&amount=" +
          order.deposit_amount_remaining * 100,
        method: "GET",
      });
      setQuickpayFormDeposit(data.form);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (orderFetched && order && order.id && !quickpayForm) {
      if (order.booking_amount_remaining > 0) {
        getQuickpayForm();
      }
      if (order.deposit_amount_remaining > 0 && !quickpayFormDeposit) {
        getQuickpayFormDeposit();
      }
    }
  }, [order, orderFetched, quickpayForm, quickpayFormDeposit]);

  return (
    <div className={` ${tailwindCSS}`}>
      {!query.get("status") && (
        <>
          <h2 className="p-2 text-4xl text text-center font-bold mb-4">
            Bekr??ftelse
          </h2>
          <p className="text-center">
            Tak for din bestilling. Du vil modtage en email hurtigst muligt med
            yderligere information
          </p>
        </>
      )}
      {query.get("status") === "confirm" && (
        <>
          <h2 className="p-2 text-4xl text text-center font-bold mb-4">
            Tak for din betaling
          </h2>
          <p className="text-center">
            Tak for din indbetaling. Vi har registreret f??lgende p?? din rejse
          </p>
        </>
      )}
      {query.get("status") === "cancel" && (
        <>
          <h2 className="p-2 text-4xl text text-center font-bold mb-4">
            Du har annuleret din betaling
          </h2>
          <p className="text-center">
            Gik der noget galt? Du kan pr??ve igen ved at klikke p?? et
            betalingslink i bunden af denne side.
          </p>
        </>
      )}
      <h2 className="p-2 text-4xl text text-center font-bold mb-4">Betaling</h2>
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 border border-solid rounded border-gray-400 text-xs md:text-sm">
        <div className="col font-bold">Registreret indbetalt totalt</div>
        <div className="col font-semibold">
          {order?.booking_amount_paid &&
            formatter.format(order.booking_amount_paid)}
        </div>
        <div className="col font-bold">Resterende bel??b til indbetaling</div>
        <div className="col font-semibold">
          {order?.booking_amount_remaining &&
            formatter.format(order.booking_amount_remaining)}
        </div>
      </div>

      {order?.customer?.first_name && (
        <div>
          <h2 className="p-2 text-4xl text text-center font-bold mb-4">
            Kunde
          </h2>
          <div className="grid grid-cols-12 mb-4 p-4 border border-solid rounded border-gray-400 text-xs md:text-sm">
            <div className="col-span-3 font-bold">Navn</div>
            <div className="col-span-9">
              {order?.customer?.first_name} {order?.customer?.last_name}
            </div>
            <div className="col-span-3 font-bold">Adresse</div>
            <div className="col-span-9">{order?.customer?.address}</div>
            <div className="col-span-3 font-bold">By</div>
            <div className="col-span-9">{order?.customer?.city}</div>
            <div className="col-span-3 font-bold">Postnr</div>
            <div className="col-span-9">{order?.customer?.postal_code}</div>
            <div className="col-span-3 font-bold">Land</div>
            <div className="col-span-9">{order?.customer?.country}</div>
            <div className="col-span-3 font-bold">Telefon</div>
            <div className="col-span-9">{order?.customer?.phone_number}</div>
            <div className="col-span-3 font-bold">Email</div>
            <div className="col-span-9">{order?.customer?.email_address}</div>
          </div>
          <div>
            <h2 className="p-2 text-4xl text text-center font-bold mb-4">
              Deltagere
            </h2>
            {order?.participants.map((participantItem, participantKey) => (
              <div
                className="mb-4 p-4 border border-solid rounded border-gray-400 text-xs md:text-sm"
                key={participantKey}
              >
                <div className="grid grid-cols-12 participant_content mb-4 md:md-0">
                  <div className="col-span-12 md:col-span-3 font-bold">
                    Navn
                  </div>
                  <div className="col-span-8 md:col-span-6 font-semibold">
                    {participantItem.full_name}
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right font-light">
                    {participantItem.age} ??r -{" "}
                    {participantItem.gender === "M" ? "Mand" : "Kvinde"}
                  </div>
                </div>
                {participantItem.services.map(
                  (serviceItem, serviceKey) =>
                    serviceItem.selected === 1 && (
                      <div
                        className="grid grid-cols-12  mb-4 md:md-0"
                        style={{ fontSize: "12px" }}
                        key={serviceKey}
                      >
                        <div className="col-span-12 md:col-span-3 font-bold">
                          {serviceItem.service_group}
                        </div>
                        <div className="col-span-8 md:col-span-6">
                          {serviceItem.description}
                        </div>
                        <div className="col-span-4 md:col-span-3 text-right">
                          {formatter.format(serviceItem.service_price)}
                        </div>
                      </div>
                    )
                )}
                {order?.transport_code !== 0 &&
                  participantItem.location_for_departure && (
                    <div
                      className="grid grid-cols-12"
                      style={{ fontSize: "12px" }}
                    >
                      <div className="col-span-12 md:col-span-3 font-bold">
                        Afrejse opsamling
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        {participantItem.location_for_departure}{" "}
                      </div>
                      <div className="col-span-12 md:col-span-3 md:text-right">
                        {formatter.format(
                          participantItem.location_for_departure_price
                        )}
                      </div>
                    </div>
                  )}{" "}
                {order?.transport_code !== 0 &&
                  participantItem.location_for_departure && (
                    <div
                      className="grid grid-cols-12"
                      style={{ fontSize: "12px" }}
                    >
                      <div className="col-span-12 md:col-span-3 font-bold">
                        Hjemrejse destination
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        {participantItem.location_for_return}
                      </div>
                      <div className="col-span-12 md:col-span-3 md:text-right">
                        {formatter.format(
                          participantItem.location_for_return_price
                        )}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        {quickpayForm && (
          <form
            className="col-span-12 md:col-span-6"
            method="POST"
            action="https://payment.quickpay.net"
          >
            <>
              {quickpayForm.map((formItem, formKey) => (
                <input
                  type="hidden"
                  name={formItem.field_key}
                  value={formItem.field_value}
                  key={formKey}
                />
              ))}
              <Button
                className="w-full"
                variant="contained"
                color="primary"
                type="submit"
                value="Continue to payment..."
              >
                Betal
              </Button>
            </>
          </form>
        )}
        {quickpayFormDeposit && (
          <form
            className="col-span-12 md:col-span-6 text-right"
            method="POST"
            action="https://payment.quickpay.net"
          >
            <>
              {quickpayFormDeposit.map((formItem, formKey) => (
                <input
                  type="hidden"
                  name={formItem.field_key}
                  value={formItem.field_value}
                  key={formKey}
                />
              ))}
              <Button
                className="w-full"
                variant="outlined"
                type="submit"
                value="Continue to payment..."
              >
                Betal Depositum
              </Button>
            </>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationForm;
