module.exports = (location1 = {}, location2 = {}) => {
  if (!location1.lat || !location1.lng || !location2.lat || !location2.lng) {
    return false;
  } else {
    const piDegree = 0.017453292519943295; // Math.PI / 180
    const cos = Math.cos;
    const angle = 0.5 - cos((location2.lat - location1.lat) * piDegree)/2 +
          cos(location1.lat * piDegree) * cos(location2.lat * piDegree) *
          (1 - cos((location2.lng - location1.lng) * piDegree))/2;

    // 2 * R; R = 6371 km
    return (12742 * Math.asin(Math.sqrt(angle))).toFixed(2);
  }
};
