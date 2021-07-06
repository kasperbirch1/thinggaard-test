import React, { useEffect, useState, useContext } from "react";
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

  const { participantsData, setParticipantsData, dispatch } =
    useContext(globalContext);

  const [participantsDataNew, setParticipantsDataNew] = useState(
    participantsData ? participantsData : []
  );

  const handleParticipantSave = (person) => {
    participantsDataNew[person].saved = true;
    setParticipantsData(participantsDataNew);
    dispatch({
      type: SET_PARTICIPANTS_DATA,
      payload: participantsDataNew,
    });
  };

  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  useEffect(() => {
    var pushedValue = participantsDataNew ? participantsDataNew : [];
    pushedValue[personCount] = pushedValue[personCount] ?? {};
    pushedValue[personCount].id = participant.participant_id;
    pushedValue[personCount].name = participant.full_name;
    pushedValue[personCount].age = participant.age;
    pushedValue[personCount].gender = participant.gender;
    pushedValue[personCount].services = {};
    setParticipantsDataNew(pushedValue);
    dispatch({
      type: SET_PARTICIPANTS_DATA,
      payload: participantsDataNew,
    });
  }, []);

  return (
    <div className="my-6 p-4 rounded border border-solid border-1 border-gray-400">
      <div className="grid grid-cols-12">
        <div className="col-span-12 mb-4">
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
          label="Fulde navn"
          variant="outlined"
          type="text"
          name="name"
          defaultValue={participant.full_name}
          value={
            participantsDataNew[personCount] &&
            participantsDataNew[personCount].name
              ? participantsDataNew[personCount].name
              : participant.full_name
          }
          onChange={(e) => {
            var pushedValue = participantsDataNew ? participantsDataNew : [];
            pushedValue[personCount] = pushedValue[personCount] ?? {};
            pushedValue[personCount].id = participant.participant_id;
            pushedValue[personCount].name = e.target.value;
            setParticipantsDataNew(pushedValue);
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
            participantsDataNew[personCount] &&
            participantsDataNew[personCount].age
              ? participantsDataNew[personCount].age
              : participant.age
          }
          onChange={(e) => {
            var pushedValue = participantsDataNew ? participantsDataNew : [];
            pushedValue[personCount] = pushedValue[personCount] ?? {};
            pushedValue[personCount].id = participant.participant_id;
            pushedValue[personCount].age = e.target.value;
            setParticipantsDataNew(pushedValue);
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
              participantsDataNew[personCount] &&
              participantsDataNew[personCount].gender
                ? participantsDataNew[personCount].gender
                : false
            }
            onChange={(e) => {
              var pushedValue = participantsDataNew ? participantsDataNew : [];
              pushedValue[personCount] = pushedValue[personCount] ?? {};
              pushedValue[personCount].id = participant.participant_id;
              pushedValue[personCount].gender = e.target.value;
              setParticipantsDataNew(pushedValue);
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
      {participantsDataNew[personCount]?.name &&
        participantsDataNew[personCount]?.age &&
        participantsDataNew[personCount]?.gender && (
          <div className={"pt-4"}>
            {participant?.services_ordered.map((serviceitem, servicekey) => (
              <div className="mb-4" key={servicekey}>
                <div className="grid grid-cols-12">
                  <div className="col-span-5">
                    <h2>{serviceitem.title}</h2>
                  </div>
                  <FormControl
                    key={serviceitem.id}
                    variant="outlined"
                    className="col-span-7"
                  >
                    <InputLabel id={serviceitem.title}>
                      {serviceitem.title}
                    </InputLabel>
                    <Select
                      id={serviceitem.title}
                      value={
                        participantsDataNew[personCount] &&
                        participantsDataNew[personCount].services &&
                        participantsDataNew[personCount].services[servicekey] &&
                        participantsDataNew[personCount].services[servicekey]
                          .item
                          ? participantsDataNew[personCount].services[
                              servicekey
                            ].item
                          : serviceitem.standard
                          ? JSON.stringify({
                              id: serviceitem.standard,
                              cost: "0.0",
                            })
                          : false
                      }
                      onChange={(e) => {
                        var pushedValue = participantsDataNew
                          ? participantsDataNew
                          : [];
                        pushedValue[personCount] =
                          pushedValue[personCount] ?? {};

                        pushedValue[personCount].id =
                          participant.participant_id;
                        pushedValue[personCount].services =
                          pushedValue[personCount].services ?? [];

                        pushedValue[personCount].services[servicekey] = {};

                        pushedValue[personCount].services[servicekey]
                          ? (pushedValue[personCount].services[servicekey] = {
                              service_group_id: serviceitem.id,
                              item: e.target.value,
                            })
                          : (pushedValue[personCount].services[servicekey] =
                              {});
                        setParticipantsDataNew(pushedValue);
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
                          value={JSON.stringify({
                            id: subItem.service_price_id,
                            cost: subItem.service_price,
                          })}
                          key={subItemIndex}
                        >
                          {subItem.description} (
                          {formatter.format(subItem.service_price)})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            ))}
          </div>
        )}
      <div className="grid grid-cols-12">
        <div className="col-span-12 mt-4 text-right">
          <Button
            disabled={
              participantsDataNew[personCount]?.name &&
              participantsDataNew[personCount]?.age &&
              participantsDataNew[personCount]?.gender
                ? false
                : true
            }
            size="large"
            onClick={() => {
              handleParticipantSave(personCount);
            }}
            color="secondary"
            variant="contained"
          >
            {participantsDataNew[personCount] &&
            participantsDataNew[personCount].saved
              ? "Opdater deltager"
              : "Gem Deltager"}
          </Button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Participant;
