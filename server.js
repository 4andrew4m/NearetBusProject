const express = require("express");
const path = require("path");
const TripService = require("./tripService");
const AuthService = require("./authService");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const database = {
  stations: [
    { name: "Станція А", code: "Kyiv1", city: "Київ" },
    { name: "Станція Б", code: "Kyiv2", city: "Київ" },
    { name: "Станція В", code: "Lviv1", city: "Львів" },
    { name: "Станція Г", code: "Lviv2", city: "Львів" }
  ],
  trips: [
    // Київ → Львів
    { id: 1, from: "Київ", to: "Львів", time: "06:00", station: "Станція А", seats: [1,2,11,13,17] },
    { id: 2, from: "Київ", to: "Львів", time: "08:45", station: "Станція Б", seats: [] },
    { id: 3, from: "Київ", to: "Львів", time: "12:30", station: "Станція Б", seats: [] },
    { id: 4, from: "Київ", to: "Львів", time: "15:15", station: "Станція А", seats: [] },
    { id: 5, from: "Київ", to: "Львів", time: "17:30", station: "Станція А", seats: [] },
    { id: 6, from: "Київ", to: "Львів", time: "19:20", station: "Станція Б", seats: [] },

    // Львів → Київ
    { id: 7, from: "Львів", to: "Київ", time: "06:50", station: "Станція В", seats: [] },
    { id: 8, from: "Львів", to: "Київ", time: "09:20", station: "Станція Г", seats: [] },
    { id: 9, from: "Львів", to: "Київ", time: "14:40", station: "Станція В", seats: [] },
    { id:10, from: "Львів", to: "Київ", time: "16:10", station: "Станція В", seats: [] },
    { id:11, from: "Львів", to: "Київ", time: "17:30", station: "Станція В", seats: [] },
    { id:12, from: "Львів", to: "Київ", time: "18:50", station: "Станція Г", seats: [] }
  ]
};

const tripService = new TripService(database);
const authService = new AuthService(database);

/* API */
app.get("/trips", (req, res) => {
  const { from, to } = req.query;
  res.json(tripService.findTrips(from, to));
});

app.post("/login", (req, res) => {
  res.json({ success: authService.authenticate(req.body.code) });
});

app.get("/station-trips/:code", (req, res) => {
  const station = database.stations.find(s => s.code === req.params.code);
  if (!station) return res.status(403).end();
  res.json(database.trips.filter(t => t.station === station.name));
});

app.post("/update-seats", (req, res) => {
  const { tripId, seats } = req.body;
  const trip = database.trips.find(t => t.id === tripId);
  trip.seats = seats;
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server started on port 3000"));
