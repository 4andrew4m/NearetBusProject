// server.js
const express = require("express");
const TripService = require("./tripService");
const AuthService = require("./authService");
const app = express();
app.use(express.json());
const database = {
  trips: [],
  stations: []
};
const tripService = new TripService(database);
const authService = new AuthService(database);
app.get("/trips", (req, res) => {
  const { from, to } = req.query;
  res.json(tripService.findTrips(from, to));
});
app.post("/login", (req, res) => {
  const { code } = req.body;
  res.json({ success: authService.authenticate(code) });
});
app.listen(3000);
