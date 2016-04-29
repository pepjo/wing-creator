
export default function (mesh, segments, loads) {
  // Add face from segments
  mesh.facesFromSegments.push([
    [segments[0], 0], // In rib segment
    [segments[1], 0], // Rib to rib segment
    [segments[2], 1], // In prev rib segment
    [segments[3], 1], // Rib to rib segment
  ])

  // Add face to a single group
  mesh.groups.push({
    name: `extSurface_${mesh.facesFromSegments.length}`,
    type: 'surfaces',
    color: '#999999ff',
    entities: [
      mesh.facesFromSegments.length - 1,
    ],
  })

  // Add loads to the face
  mesh.loads.push({
    goupName: `extSurface_${mesh.facesFromSegments.length}`,
    type: 'SurfacePressureLoad3D',
    fixPressure: 1,
    pressureType: 'Positive',
    pressureValue: (loads[0] + loads[1] + loads[2] + loads[3]) / 4,
  })
}
