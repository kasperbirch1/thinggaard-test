import React, { useState, useContext } from "react";
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

import globalContext from "../context/global/globalContext";

import { SET_PARTICIPANTS_DATA } from "../context/types";

import { useStyles } from "../styles";

const Participant = ({ participant, personCount }) => {
  const classes = useStyles();

  const { participantsData, dispatch } = useContext(globalContext);

  const [participantsDataNew, setParticipantsDataNew] = useState(
    participantsData ? participantsData : []
  );

  console.log(participantsDataNew);

  return (
    <li className="p-2 shadow">
      <h2 className="font-semibold text-sm">
        {(participant.age > 17 ? "Voksen" : "Barn") +
          " (deltager " +
          (personCount + 1) +
          ")"}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <TextField
          className={classes.formControl}
          id="name"
          label="Navn"
          variant="outlined"
          type="text"
          name="name"
          defaultValue={participant.full_name}
        />
        <TextField
          className={classes.formControl}
          id="age"
          label="Alder"
          variant="outlined"
          type="number"
          name="age"
          defaultValue={participant.age}
        />
        <FormControl
          className={classes.formControl}
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="køn">Køn</InputLabel>
          <Select id="køn" label="køn">
            <MenuItem disabled>-- Køn --</MenuItem>
            <MenuItem value="M">Mand</MenuItem>
            <MenuItem value="K">Kvinde</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={"py-4"}>
        {participant?.services_ordered.map((serviceitem, servicekey) => (
          <div
            className="grid grid-cols-3 p-4 mb-4 gap-4 rounded"
            style={{ backgroundColor: "#f2f2f2" }}
          >
            <div className={"col-span-2"}>
              <h2>{serviceitem.title}</h2>
            </div>
            <FormControl
              key={serviceitem.id}
              className={classes.formControl}
              variant="outlined"
            >
              <InputLabel id={serviceitem.title}>
                {serviceitem.title}
              </InputLabel>
              <Select
                value={
                  Array.isArray(participantsDataNew) &&
                  Array.isArray(participantsDataNew[personCount]) &&
                  participantsDataNew[personCount][servicekey]
                    ? participantsDataNew[personCount][servicekey]
                    : serviceitem.results[0].description
                }
                id={serviceitem.title}
                onChange={(e) => {
                  var serviceArray =
                    Array.isArray(participantsDataNew) &&
                    Array.isArray(participantsDataNew[personCount])
                      ? participantsDataNew[personCount]
                      : [];
                  console.log(serviceArray);
                  console.log(servicekey);
                  serviceArray[servicekey] = e.target.value;
                  participantsDataNew[personCount] = serviceArray;
                  setParticipantsDataNew(participantsDataNew);
                  dispatch({
                    type: SET_PARTICIPANTS_DATA,
                    payload: participantsDataNew,
                  });
                }}
              >
                <MenuItem disabled>-- Vælg --</MenuItem>
                {serviceitem.results.map((subItem, subItemIndex) => (
                  <MenuItem value={subItem.description} key={subItemIndex}>
                    {subItem.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </div>
    </li>
  );
};

export default Participant;
