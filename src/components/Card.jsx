import React from "react";
import "./Card.css";
import { formatDateTime } from "../utils/dateTime";

const Card = ({ data, handleOnEventClick }) => {
  return (
    <div className="card" onClick={() => handleOnEventClick(data.id)}>
      <h3>{data.title}</h3>
      <p>📅 {formatDateTime(data.datetime_local)}</p>
      <p>📍 {data.venue.display_location}</p>
      <img src={data.performers[0].image} alt={data.performers[0].name} />
    </div>
  );
};

export default Card;
