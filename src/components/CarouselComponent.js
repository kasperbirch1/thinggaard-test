import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = ({ images, DetailsPage }) => {
  return (
    <>
      {DetailsPage ? (
        <Carousel
          className={` md:min-h-full w-full}`}
          showIndicators={DetailsPage ? true : false}
          showThumbs={DetailsPage ? true : false}
          autoPlay={false}
        >
          {images?.map((img) => (
            <div className={`w-full bg-cover bg-center max-h-96`}>
              <img src={img.url} loading="lazy" />
            </div>
          ))}
        </Carousel>
      ) : (
        <Carousel
          className={`md:min-h-full md:w-5/12`}
          showIndicators={DetailsPage ? true : false}
          showThumbs={DetailsPage ? true : false}
          autoPlay={false}
        >
          {images?.map((img) => (
            <div
              className={`w-full bg-cover bg-center ${
                DetailsPage ? "h-64 md:h-80" : "h-52 md:h-64"
              }`}
              style={{
                backgroundImage: `url(${img.url})`,
              }}
            ></div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CarouselComponent;
