import { FormControl, Typography, Button, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import globalContext from "../../context/global/globalContext";
import { SET_CHILDREN, SET_CHILDREN_AGES } from "../../context/types";

const ChildrenSelect = () => {
  const { children, childrenAges, dispatch } = useContext(globalContext);

  const countChildren = () => {
    let myChildren = [];
    for (let i = 0; i < children; i++) {
      myChildren.push("5");
    }
    return myChildren;
  };

  return (
    <>
      <FormControl variant="outlined" className="col-span-1">
        <div
          className="form-wrap mr-2"
          style={{
            padding: "0 10px",
            borderRadius: "5px",
            border: "1px solid #bbb",
            minHeight: "56px",
          }}
        >
          <Typography
            className="text-center text-gray-500"
            style={{ fontSize: 12 }}
            id="children-slider-label"
          >
            Antal børn
          </Typography>
          <div className="mb-1 grid grid-cols-3 justify-center">
            <div className="text-center col-span-1">
              <Button
                className="text-center"
                disabled={children > 0 ? false : true}
                style={{
                  borderRadius: "100%",
                  fontWeight: 900,
                  padding: 0,
                  minWidth: "16px",
                  width: "32px",
                  textAlign: "center",
                }}
                onClick={() => {
                  dispatch({
                    type: SET_CHILDREN,
                    payload: children - 1,
                  });
                }}
              >
                -
              </Button>
            </div>
            <span
              className="col-span-1"
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              {children}
            </span>
            <div className="text-center col-span-1">
              <Button
                className="text-center"
                style={{
                  borderRadius: "100%",
                  fontWeight: 900,
                  padding: 0,
                  minWidth: "16px",
                  width: "32px",
                }}
                disabled={children < 10 ? false : true}
                onClick={() => {
                  dispatch({
                    type: SET_CHILDREN,
                    payload: children + 1,
                  });
                }}
              >
                +
              </Button>
            </div>
          </div>
          {children > 0 && (
            <div className="grid grid-cols-2">
              {countChildren(children).map((item, count) => (
                <div className="my-2 col-span-2" key={count}>
                  <TextField
                    fullWidth
                    size="small"
                    label={"Barn " + (count + 1) + " alder"}
                    type="number"
                    inputProps={{
                      max: 17,
                      min: 0,
                      style: { fontSize: 15 },
                    }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                    variant="outlined"
                    value={childrenAges[count] ? childrenAges[count] : 2}
                    onChange={(myEvent) => {
                      childrenAges[count] = myEvent.target.value;
                      dispatch({
                        type: SET_CHILDREN_AGES,
                        payload: childrenAges,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </FormControl>
    </>
  );
};

export default ChildrenSelect;
