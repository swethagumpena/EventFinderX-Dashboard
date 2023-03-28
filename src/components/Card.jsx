import React from "react";
import "./Card.css";

const Card = ({ data }) => {
  const formatDateTime = (timestamp) => {
    var date = new Date(timestamp).toLocaleDateString();
    var time = new Date(timestamp).toLocaleTimeString();
    return date + " " + time;
  };

  return (
    <div className="show">
      <h3>{data.title}</h3>
      <p>
        <b>Type:</b> {data.type}
      </p>
      <p>
        <b>Date:</b> {formatDateTime(data.datetime_local)}
      </p>
      <p>
        <b>TimeZone:</b> {data.venue.timezone}
      </p>
      <p>
        <b>Venue:</b> {data?.venue?.name}
      </p>
      <p>
        <b>Location:</b> {data.venue.display_location}
      </p>
      <p>
        <b>Address:</b> {data.venue.address}
      </p>
      <img src={data.performers[0].image} alt={data.performers[0].name} />
      <a href={data.url} target="_blank">
        Buy Tickets
      </a>
    </div>
  );
};

export default Card;
