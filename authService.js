// authService.js
class AuthService {
  constructor(database) {
    this.database = database;
  }
  authenticate(stationCode) {
    return this.database.stations.some(
      station => station.code === stationCode
    );
  }
}
module.exports = AuthService;
