import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import "./musicEventDetails.scss";
import { updateDetailsId } from "../../../state/MusicDetails";

export type EventDetails = {
  images: string;
  name: string;
  localTime: string;
  localDate: string;
  city: string;
  country: string;
  place: string;
};
const useMountEffect = (fun: React.EffectCallback) => useEffect(fun, [fun]);

const MusicEventDetails: React.FC<EventDetails> = React.memo(
  ({ images, name, localTime, city, country, place, localDate }) => {
    const fieldRef = React.useRef<HTMLInputElement>(null);

    const executeScroll = () =>
      fieldRef.current?.scrollIntoView({ behavior: "smooth" });

    const dispatch = useAppDispatch();

    const updateId = (id: string): void => {
      dispatch(updateDetailsId(id));
    };

    const items: Array<string> = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    var dd = String(new Date(localDate).getDate()).padStart(2, "0");

    var mm = String(new Date(localDate).getMonth() + 1).padStart(2, "0");

    var yyyy = new Date(localDate).getFullYear();

    useMountEffect(executeScroll);

    return (
      <div
        ref={fieldRef}
        className="music-event-details__block"
        data-testid="event-box-child"
      >
        <div className="music-event-details__info">
          <h1>{name}</h1>
          <div className="music-event-details__date">
            <span className="music-event-details__icon">
              <i className="fa fa-calendar" />
            </span>
            <span>
              {`${items[new Date(localDate).getDay()]}, ${dd}.${mm}.${yyyy} @ ${
                localTime ? localTime.slice(0, 5) : ""
              }`}
            </span>
          </div>
          <div className="music-event-details__venue">
            <span className="music-event-details__icon">
              <i className="fa fa-building" />
            </span>
            <span>{`${place}, ${city}, ${country}`}</span>
          </div>
          <div className="music-event-details__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </div>
          <button
            className="music-event-details__btn"
            onClick={() => updateId("")}
          >
            Close details
          </button>
        </div>
        <div className="music-event-details__img">
          <div className="overlay-background" />
          <img src={images} alt={name} />
        </div>
      </div>
    );
  }
);

export default MusicEventDetails;
