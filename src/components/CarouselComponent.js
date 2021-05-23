import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = ({ images, DetailsPage }) => {
  return (
    <>
      {DetailsPage ? (
        <Carousel autoPlay={false}>
          {images?.map((img) => (
            <img src={img.url} loading="lazy" />
          ))}
        </Carousel>
      ) : (
        <Carousel
          className={`md:min-h-full md:w-5/12`}
          showIndicators={false}
          showThumbs={false}
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
            />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CarouselComponent;
