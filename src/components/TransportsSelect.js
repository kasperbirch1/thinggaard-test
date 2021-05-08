import axios from "axios";
import React, { useEffect, useState } from "react";

const TransportsSelect = ({ destinationId }) => {
  const [transports, setTransports] = useState(null);

  useEffect(() => {
    if (!destinationId) {
      return;
    }
    const fetch = async () => {
      try {
        const token = await axios.get(
          "https://thinggaard.dk/wp-json/thinggaard/v1/authentication"
        );

        if (token?.data?.result?.auth_token) {
          const { data } = await axios.get(
            `https://thinggaard.dk/wp-json/thinggaard/v1/transports?destination_id=${destinationId}&transport=${"0"}&token=${
              token?.data?.result?.auth_token
            }`
          );
          setTransports(data.result);
        }
      } catch (error) {}
    };
    fetch();
  }, [destinationId]);
  return (
    <>
      <label htmlFor="TransportsSelect">TransportsSelect</label>
      <select id="TransportsSelect">
        <option disabled selected value>
          -- select an option --
        </option>
        {transports?.map((date) => {
          console.log(
            "🚀 ~ file: TransportsSelect.js ~ line 35 ~ {transports?.map ~ date",
            date
          );
          return <option value="test">test</option>;
        })}
      </select>
    </>
  );
};

export default TransportsSelect;
