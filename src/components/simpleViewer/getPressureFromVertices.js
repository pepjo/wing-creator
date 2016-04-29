
function calculateDistance (vertix, simVertix) {
  return Math.sqrt(
    Math.pow(vertix.x - simVertix.coord[0], 2) +
    Math.pow(vertix.y - simVertix.coord[1], 2) +
    Math.pow(vertix.z - simVertix.coord[2], 2)
  )
}

// Returns the pressure of the closest vertex
function findPressure (vertix, simulation) {
  return simulation[
    // Returns an array with the index of the simVertix and the distance to it
    simulation.map((simVertix, i) => (
      [i, calculateDistance(vertix, simVertix)]
    )).reduce((min, distance) => (
      min[1] > distance[1] ? distance : min
    ))[0]
  ].pressure
}

export default function (vertices, simulation) {
  if (simulation) {
    return vertices.map((vertix) => (
      findPressure(vertix, simulation)
    ))
  }
  return []
}
