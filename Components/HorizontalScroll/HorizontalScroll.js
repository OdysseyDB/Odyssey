import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import "./HorizontalScroll.scss";

function HorizontalScroll({ slideItems, buttons = true }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    slidesToScroll: true,
  });
  return (
    <div className="HorizontalScroll">
      <div className="HorizontalScroll__viewport" ref={emblaRef}>
        <div className="HorizontalScroll__container">{slideItems}</div>

        {buttons && (
          <>
            <button
              data-icon={String.fromCharCode(58090)}
              onClick={() => emblaApi.scrollPrev()}
            />
            <button
              data-icon={String.fromCharCode(58090)}
              onClick={() => emblaApi.scrollNext()}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default HorizontalScroll;
