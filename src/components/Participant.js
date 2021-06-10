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
          <Select id="køn" label="køn">
            <MenuItem disabled>-- Køn --</MenuItem>
            <MenuItem value="1">Mand</MenuItem>
            <MenuItem value="2">Kvinde</MenuItem>
          </Select>
        </FormControl>

        {participant?.services_ordered.map((item) => (
          <FormControl
            key={item.id}
            className={classes.formControl}
            variant="outlined"
          >
            <InputLabel id={item.title}>{item.title}</InputLabel>
            <Select id={item.title}>
              <MenuItem disabled>-- Vælg --</MenuItem>
              {item.results.map((subItem, index) => (
                <MenuItem key={index}>{subItem.description}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </div>
    </li>
  );
};

export default Participant;
