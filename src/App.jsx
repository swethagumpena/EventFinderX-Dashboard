import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const CLIENT_ID = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [sortByDate, setSortByDate] = useState("new-old");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://api.seatgeek.com/2/events?client_id=${CLIENT_ID}`;

        if (searchTerm) {
          url += `&q=${searchTerm}`;
        }

        if (type) {
          url += `&type=${type}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        let shows = data.events;

        if (sortByDate === "new-old") {
          shows = shows.sort(
            (a, b) => new Date(a.datetime_local) - new Date(b.datetime_local)
          );
        } else if (sortByDate === "old-new") {
          shows = shows.sort(
            (a, b) => new Date(b.datetime_local) - new Date(a.datetime_local)
          );
        }
        setEvents(shows);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm, type, sortByDate]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSortByDateChange = (event) => {
    setSortByDate(event.target.value);
  };

  return (
    <div className="App">
      <h1>EventFinderX</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={type} onChange={handleTypeChange}>
          <option value="">All types</option>
          <option value="Family">Family</option>
          <option value="Theater">Theater</option>
          <option value="Concert">Concert</option>
          <option value="Nhl">Nhl</option>
          <option value="Classical_opera">Classical_opera</option>
          <option value="Comedy">Comedy</option>
          <option value="Sports">Sports</option>
        </select>
        <p>Date: &nbsp;</p>
        <select value={sortByDate} onChange={handleSortByDateChange}>
          <option value="new-old">New-Old</option>
          <option value="old-new">Old-New</option>
        </select>
      </div>
      <ul className="shows">
        {events.map((event) => (
          <Card data={event} key={event.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
