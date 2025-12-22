// tripService.js
class TripService {
  constructor(database) {
    this.database = database;
  }
  // Пошук рейсів за маршрутом
  findTrips(from, to) {
    return this.database.trips.filter(
      trip => trip.from === from && trip.to === to
    );
  }
  // Оновлення кількості сидячих місць
  updateSeats(tripId, newSeatCount) {
    const trip = this.database.trips.find(t => t.id === tripId);
    if (trip) {
      trip.sittingSeats = newSeatCount;
      return true;
    }
    return false;
  }
}
module.exports = TripService;
