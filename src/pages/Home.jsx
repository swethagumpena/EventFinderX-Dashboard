import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CLIENT_ID = import.meta.env.VITE_APP_ACCESS_KEY;

function Home() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [sortByDate, setSortByDate] = useState("new-old");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://api.seatgeek.com/2/events?listing_count.gt=0&client_id=${CLIENT_ID}`;

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

  const lineChartData = events.map((event) => ({
    name: event.title,
    price: event.stats.average_price,
  }));

  const barChartData = events.map((event) => ({
    name: event.title,
    popularity: event.popularity,
  }));

  const formatXAxisTick = (tickItem) => {
    return tickItem.split(" ")[0];
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSortByDateChange = (event) => {
    setSortByDate(event.target.value);
  };

  const handleOnEventClick = (id) => {
    window.open(`/event/${id}`);
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
      <div className="chart-titles">
        <h3>Popularity</h3>
        <h3>Average Price</h3>
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              tickFormatter={formatXAxisTick}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="popularity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={600} height={300} data={lineChartData}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              tickFormatter={formatXAxisTick}
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ul className="shows">
        {events.map((event) => (
          <Card
            data={event}
            key={event.id}
            handleOnEventClick={handleOnEventClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default Home;
