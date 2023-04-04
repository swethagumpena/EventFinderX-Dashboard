import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../utils/dateTime";

const CLIENT_ID = import.meta.env.VITE_APP_ACCESS_KEY;

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.seatgeek.com/2/events/${id}?client_id=${CLIENT_ID}`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="info">
      <h3>{event.title}</h3>
      <p>
        <b>Location:</b> {event.venue.display_location}
      </p>
      <p>
        <b>Type:</b> {event.type}
      </p>
      <p>
        <b>Date:</b> {formatDateTime(event.datetime_local)}
      </p>
      <p>
        <b>TimeZone:</b> {event.venue.timezone}
      </p>
      <p>
        <b>Venue:</b> {event?.venue?.name}
      </p>
      <p>
        <b>Location:</b> {event.venue.display_location}
      </p>
      <p>
        <b>Address:</b> {event.venue.address}
      </p>
      <img src={event.performers[0].image} alt={event.performers[0].name} />
      <a href={event.url} target="_blank">
        Buy Tickets
      </a>
    </div>
  );
}

export default EventDetails;
