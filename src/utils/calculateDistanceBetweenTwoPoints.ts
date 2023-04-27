export const distanceBetweenTwoPointsInKm = (
    p1: google.maps.LatLngLiteral,
    p2: google.maps.LatLngLiteral
): number => {
    // const distance = google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000;
    // console.log('distanceBetweenTwoPoints, distance: ', distance);
    const distance = getDistanceFromLatLonInKm(p1.lat, p1.lng, p2.lat, p2.lng);
    return distance;
};

// From OP of https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}