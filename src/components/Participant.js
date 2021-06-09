import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";

import { useStyles } from "../styles";

const Participant = ({ participant, personCount }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(false);
  const [select, setSelect] = useState(0);
  const [select1, setSelect1] = useState(0);
  const [select2, setSelect2] = useState(0);

  console.log(
    "🚀 ~ file: Participant.js ~ line 4 ~ Participant ~ participant",
    participant
  );

  return (
    <li className="p-2 shadow">
      <h2 className="font-semibold text-sm">{`Person ${personCount + 1}`}</h2>
      <div className="w-full md:flex md:flex-row md:flex-wrap">
        <TextField
          className={classes.formControl}
          id="name"
          label="name"
          variant="outlined"
          type="text"
          name="name"
        />
        <TextField
          className={classes.formControl}
          id="age"
          label="age"
          variant="outlined"
          type="number"
          name="age"
        />
        <FormControl
          className={classes.formControl}
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="køn">Køn</InputLabel>
          <Select
            id="køn"
            label="køn"
            value={select}
            onChange={(e) => {
              setSelect(e.target.value);
            }}
          >
            <MenuItem disabled value="0">
              -- Køn --
            </MenuItem>
            <MenuItem value="1">Mand</MenuItem>
            <MenuItem value="2">Kvinde</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="liftkort">Liftkort</InputLabel>
          <Select
            id="liftkort"
            value={select1}
            onChange={(e) => {
              setSelect1(e.target.value);
            }}
          >
            <MenuItem disabled value="0">
              -- Vælg --
            </MenuItem>
            {participant?.services.map((item, index) => {
              if (item.service_group_id == 1) {
                return (
                  <MenuItem
                    key={item.service_price_id}
                    value={item.service_price_id}
                  >
                    {item.description}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="Parking">Parking</InputLabel>
          <Select
            id="Parking"
            value={select2}
            onChange={(e) => {
              setSelect2(e.target.value);
            }}
          >
            <MenuItem disabled value="0">
              -- Vælg --
            </MenuItem>
            {participant?.services.map((item, index) => {
              if (item.service_group_id == 66) {
                return (
                  <MenuItem
                    key={item.service_price_id}
                    value={item.service_price_id}
                  >
                    {item.description}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </div>
    </li>
  );
};

export default Participant;
