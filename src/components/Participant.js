import React, { useState, useContext } from "react";
import {
  Button,
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

  const handleParticipantSave = (participantId, participantServices) => {
    console.log(participantsDataNew);
  };

  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return (
    <div className="my-6 p-4 rounded border border-solid border-1 border-gray-400">
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-12">
          <h2 className="font-semibold text-lg text-center">
            {(participant.age > 17 ? "Voksen" : "Barn") +
              " (deltager " +
              (personCount + 1) +
              ")"}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TextField
          className={classes.formControl}
          id="name"
          label="Navn"
          variant="outlined"
          type="text"
          name="name"
          defaultValue={participant.full_name}
          value={
            participantsDataNew[participant.participant_id] &&
            participantsDataNew[participant.participant_id]["name"]
              ? participantsDataNew[participant.participant_id]["name"]
              : participant.full_name
          }
          onChange={(e) => {
            var pushedValue = participantsDataNew[participant.participant_id];
            pushedValue = pushedValue ? pushedValue : {};
            pushedValue["name"] = e.target.value;
            participantsDataNew[participant.participant_id] = pushedValue;
            setParticipantsDataNew(participantsDataNew);
            dispatch({
              type: SET_PARTICIPANTS_DATA,
              payload: participantsDataNew,
            });
          }}
        />
        <TextField
          className={classes.formControl}
          id="age"
          label="Alder"
          variant="outlined"
          type="number"
          name="age"
          defaultValue={participant.age}
          value={
            participantsDataNew[participant.participant_id] &&
            participantsDataNew[participant.participant_id]["age"]
              ? participantsDataNew[participant.participant_id]["age"]
              : participant.age
          }
          onChange={(e) => {
            var pushedValue = participantsDataNew[participant.participant_id];
            pushedValue = pushedValue ? pushedValue : {};
            pushedValue["age"] = e.target.value;
            participantsDataNew[participant.participant_id] = pushedValue;
            setParticipantsDataNew(participantsDataNew);
            dispatch({
              type: SET_PARTICIPANTS_DATA,
              payload: participantsDataNew,
            });
          }}
        />
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="køn">Køn</InputLabel>
          <Select
            id="køn"
            label="køn"
            value={
              participantsDataNew[participant.participant_id] &&
              participantsDataNew[participant.participant_id]["gender"]
                ? participantsDataNew[participant.participant_id]["gender"]
                : participant.full_name
            }
            onChange={(e) => {
              var pushedValue = participantsDataNew[participant.participant_id];
              pushedValue = pushedValue ? pushedValue : {};
              pushedValue["gender"] = e.target.value;
              participantsDataNew[participant.participant_id] = pushedValue;
              setParticipantsDataNew(participantsDataNew);
              dispatch({
                type: SET_PARTICIPANTS_DATA,
                payload: participantsDataNew,
              });
            }}
          >
            <MenuItem disabled>-- Køn --</MenuItem>
            <MenuItem value="M">Mand</MenuItem>
            <MenuItem value="K">Kvinde</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={"py-4"}>
        {participant?.services_ordered.map((serviceitem, servicekey) => (
          <div
            className="grid grid-cols-3 p-4 mb-4 rounded"
            style={{ backgroundColor: "#f2f2f2" }}
            key={servicekey}
          >
            <div className={"col-span-2"}>
              <h2>{serviceitem.title}</h2>
            </div>
            <FormControl
              key={serviceitem.id}
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id={serviceitem.title}>
                {serviceitem.title}
              </InputLabel>
              <Select
                id={serviceitem.title}
                value={
                  participantsDataNew[participant.participant_id] &&
                  participantsDataNew[participant.participant_id]["services"] &&
                  participantsDataNew[participant.participant_id]["services"][
                    serviceitem.id
                  ]
                    ? participantsDataNew[participant.participant_id][
                        "services"
                      ][serviceitem.id]
                    : serviceitem.standard
                    ? serviceitem.standard
                    : false
                }
                onChange={(e) => {
                  var pushedValue =
                    participantsDataNew[participant.participant_id]["services"];
                  pushedValue = pushedValue ? pushedValue : {};
                  pushedValue[serviceitem.id] = e.target.value;
                  participantsDataNew[participant.participant_id]["services"] =
                    pushedValue;
                  setParticipantsDataNew(participantsDataNew);
                  dispatch({
                    type: SET_PARTICIPANTS_DATA,
                    payload: participantsDataNew,
                  });
                }}
              >
                <MenuItem disabled>-- Vælg --</MenuItem>
                {!serviceitem.standard && (
                  <MenuItem value={false}>Fravalgt</MenuItem>
                )}
                {serviceitem.results.map((subItem, subItemIndex) => (
                  <MenuItem
                    className={classes.formControl}
                    value={subItem.service_price_id}
                    key={subItemIndex}
                  >
                    {subItem.description} (
                    {formatter.format(subItem.service_price)})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-12 text-center">
          <Button
            size="medium"
            onClick={() => {
              handleParticipantSave(
                participant.participant_id,
                participantsDataNew[participant.participant_id]
              );
            }}
            color="secondary"
            variant="contained"
          >
            Gem deltager
          </Button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Participant;
