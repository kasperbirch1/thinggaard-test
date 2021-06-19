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
            key={servicekey}
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
                id={serviceitem.title}
                value={participantsDataNew[participant.participant_id] && participantsDataNew[participant.participant_id][serviceitem.id]  ? participantsDataNew[participant.participant_id][serviceitem.id] : false}
                onChange={(e) => {
                  var pushedValue=participantsDataNew[participant.participant_id];
                  pushedValue=pushedValue ? pushedValue : {};
                  pushedValue[serviceitem.id]=e.target.value;
                  participantsDataNew[participant.participant_id]=pushedValue;
                  setParticipantsDataNew(participantsDataNew);
                  dispatch({
                    type: SET_PARTICIPANTS_DATA,
                    payload: participantsDataNew,
                  });
                }}
              >
                <MenuItem disabled>-- Vælg --</MenuItem>
                <MenuItem value={false}>Fravalgt</MenuItem>
            {serviceitem.results.map((subItem, subItemIndex) => (
                  <MenuItem value={subItem.service_price_id} key={subItemIndex}>
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
