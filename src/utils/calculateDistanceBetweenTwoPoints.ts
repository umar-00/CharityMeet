export const distanceBetweenTwoPointsInKm = (
    p1: google.maps.LatLngLiteral,
    p2: google.maps.LatLngLiteral
): number => {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000;
    // console.log('distanceBetweenTwoPoints, distance: ', distance);
    return distance;
};