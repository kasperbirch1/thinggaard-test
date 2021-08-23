import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import KeyboardArrowLeftOutlinedIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";

const CarouselComponent = ({ images, className, DetailsPage }) => {
  return (
    <>
      <Carousel
        className={className}
        showIndicators={false}
        useKeyboardArrows={true}
        showThumbs={false}
        autoPlay={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <div
            className={`inline-block text-center rounded-full carousel-arrow carousel-arrow-prev ${
              hasPrev ? "" : "carousel-arrow-disabled"
            }`}
            onClick={onClickHandler}
            title={label}
            style={{
              position: "absolute",
              zIndex: 5,
              bottom: 10,
              left: 12,
              width: 32,
              height: 32,
              cursor: hasPrev ? "pointer" : "initial",
              pointerEvents: hasPrev ? "initial" : "none",
            }}
          >
            <KeyboardArrowLeftOutlinedIcon
              style={{ fontSize: 30 }}
              className="font-bold text-2xl"
            />
          </div>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <div
            className={`inline-block text-center rounded-full carousel-arrow carousel-arrow-next ${
              hasNext ? "" : "carousel-arrow-disabled"
            }`}
            onClick={onClickHandler}
            title={label}
            style={{
              position: "absolute",
              bottom: 10,
              right: 12,
              width: 32,
              height: 32,
              cursor: hasNext ? "pointer" : "initial",
              zIndex: 5,
            }}
          >
            <KeyboardArrowRightOutlinedIcon
              style={{ fontSize: 30 }}
              className="font-bold text-2xl"
            />
          </div>
        )}
      >
        {images?.map((img, index) => (
          <div
            key={index}
            className={`bg-cover bg-top h-72`}
            style={{
              backgroundImage: `url(${img.sizes["gallery-image"]})`,
            }}
          />
        ))}
      </Carousel>
    </>
  );
};

export default CarouselComponent;
