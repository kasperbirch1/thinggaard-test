import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useContext } from "react";
import globalContext from "../../context/global/globalContext";
import { SET_CURRENT_TRANSPORT } from "../../context/types";

const TransportsSelect = () => {
  const { transports, currentTransport, dispatch } = useContext(globalContext);

  const GetTransportTitle = (props) => {
    let returnTitle = props.title.toLowerCase();
    switch (returnTitle) {
      case "car":
        returnTitle = "Egen Transport";
        break;
      case "flight":
        returnTitle = "Fly";
        break;
      default:
        returnTitle = "Bus";
        break;
    }
    return returnTitle;
  };

  return (
    <FormControl variant="outlined" className="col-span-1">
      <InputLabel id="label-transport">Transport</InputLabel>
      <Select
        disabled={transports ? false : true}
        labelId="label-transport"
        label="transport"
        id="select-transport"
        className="mr-2"
        displayEmpty
        value={currentTransport}
        onChange={(e) => {
          dispatch({
            type: SET_CURRENT_TRANSPORT,
            payload: e.target.value,
          });
        }}
      >
        {transports?.map((item) => (
          <MenuItem
            key={item.transport_category_id}
            value={"transport_" + item.transport_category_id}
          >
            <GetTransportTitle title={item.transport_category_name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TransportsSelect;
