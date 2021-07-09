import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router";
import CarouselComponent from "./CarouselComponent";
import HotelRating from "./HotelRating";
import HotelReviews from "./HotelReviews";
import globalContext from "../context/global/globalContext";
import { SET_PARTICIPANTS_DATA } from "../context/types";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { Button, Tab, Tabs, TabPane, Box, Typography } from "@material-ui/core";

const Details = () => {
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(0);
  // let { currentAccomodationCode, currentPeriodId } = useParams();
  const {
    currentTrip,
    fetchCombinations,
    currentCombinations,
    fetchOrderCreate,
  } = useContext(globalContext);

  const { participantsData, dispatch } = useContext(globalContext);

  const {
    destination_name,
    // travel_length,
    minimum_price,
    post,
    // accommodation_checkin,
    // accommodation_checkout,
    accomodation_code,
    period_id,
  } = currentTrip;

  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  useEffect(() => {
    let source = axios.CancelToken.source();
    // fetchCombinations(source, currentAccomodationCode, currentPeriodId);
    fetchCombinations(source, accomodation_code, period_id);
    return () => {
      source.cancel();
    };
  }, []);

  const handleTabIndex = (event, newValue) => {
    setTabIndex(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const tempRating = (Math.random() * 1.5 + 3.5).toFixed(1);
  return (
    <>
      <h1 className="mb-2 mt-2 text-themeColor font-semibold text-xl text-center">
        {post?.post_title},
        <span className="ml-2 text-gray-500 font-normal text-sm">
          {destination_name}
        </span>
      </h1>
      <div className="relative">
        <div className={"p-4"} style={{ maxWidth: "960px", margin: "0 auto" }}>
          <CarouselComponent images={post?.meta.gallery_settings} DetailsPage />
        </div>
      </div>
      <HotelReviews rating={tempRating} />

      <div className="p-3">
        <AppBar position={"static"}>
          <Tabs
            value={tabIndex}
            onChange={handleTabIndex}
            aria-label="Muligheder"
          >
            <Tab label="Priser" {...a11yProps(0)} />
            <Tab label="Hotellet" {...a11yProps(1)} />
            <Tab label="Fakta" {...a11yProps(2)} />
            <Tab label="Kort" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel className="mb-4 py-4" value={tabIndex} index={0}>
          {currentCombinations && (
            <>
              <div className="grid bg-gray-400 p-4 grid-cols-12">
                <div className="col-span-5">Værelser</div>
                <div className="col-span-2">Rejseinfo</div>
                <div className="col-span-2">Dato</div>
                <div className="col-span-2">Pris</div>
                <div className=""></div>
              </div>
              {currentCombinations?.map((combination, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } grid grid-cols-12 p-4`}
                >
                  <div className="col-span-5 pt-2 text-sm">
                    {combination.rooms.rooms_description}
                  </div>
                  <div className="col-span-2 pt-2 text-sm">
                    {combination.transport_code_name},{" "}
                    {combination.current_week.display_days} dage
                  </div>
                  <div className="col-span-2 text-sm pt-2 ">
                    {combination.current_week.departure_date}
                  </div>
                  <div className="col-span-1 text-sm pt-2 font-semibold">
                    {formatter.format(combination.current_week.price)}
                  </div>
                  <div className="text-sm text-right">
                    <Button
                      onClick={() => {
                        dispatch({
                          type: SET_PARTICIPANTS_DATA,
                          payload: [],
                        });

                        fetchOrderCreate(combination.rooms.room_string);
                        history.push("order");
                      }}
                      color="primary"
                      variant="contained"
                    >
                      Bestil
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </TabPanel>

        <TabPanel className="mb-4 py-4" value={tabIndex} index={1}>
          {post?.meta?.hotel_beskrivelse && (
            <div
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_beskrivelse,
              }}
            />
          )}
        </TabPanel>

        <TabPanel className="mb-4 py-4" value={tabIndex} index={2}>
          {post?.meta?.hotel_fakta && (
            <div
              className={`${
                tabIndex === 2 ? "block" : "hidden"
              } hotel_beliggenhed`}
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_fakta,
              }}
            />
          )}
        </TabPanel>

        <TabPanel className="mb-4 py-4" value={tabIndex} index={3}>
          {post?.meta?.hotel_beliggenhed && (
            <div
              className={`${
                tabIndex === 3 ? "block" : "hidden"
              } hotel_beliggenhed`}
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_beliggenhed,
              }}
            />
          )}
        </TabPanel>
      </div>
    </>
  );
};

export default Details;

//https://thinggaard.dk/wp-json/thinggaard/v1/trips/combinations?destination_id=SBA&ages=30,30&duration=4&date=Sat%20Jan%2001%202022%2016:38:00%20GMT+0100%20(Central%20European%20Standard%20Time)&transport=0&token=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhYmFzZV9jcmVkZW50aWFscyI6eyJjb21wYW55X2lkIjoyLCJkYXRhYmFzZV9uYW1lIjoiVFJWMDA0X1RISU5HR0FBUkQifSwiZXhwIjoxNjIxNzgwNzI3fQ.ecV_wPrRjhgcpa0Sfg2yjPwiGiU7aFA1Ln-EDBLDo4w&accomodation_code=PEE&period_id=2225
