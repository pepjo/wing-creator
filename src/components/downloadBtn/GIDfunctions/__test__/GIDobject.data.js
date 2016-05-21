
export const objectData = [{
  layer: 'Test 0 1 255 0 0',
  vertices: [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 1],
    [1, 0, 1],
  ],
  segments: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ],
  faces: [
    [[0, 0], [1, 0], [2, 0], [3, 0]],
    [[7, 1], [6, 1], [5, 1], [4, 1]],

    [[8, 0], [4, 0], [9, 1], [0, 1]],
    [[9, 0], [5, 0], [10, 1], [1, 1]],

    [[10, 0], [6, 0], [11, 1], [2, 1]],
    [[11, 0], [7, 0], [8, 1], [3, 1]],
  ],
  volumes: [
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
  ],
  groups: [
    {
      name: 'group1',
      type: 'points',
      color: '#000000',
      entities: [
        [0, 1],
        [3, 5],
      ],
    },
    {
      name: 'group2',
      type: 'points',
      color: '#000000',
      entities: [
        [1, 4],
      ],
    },
    {
      name: 'surf1',
      type: 'surfaces',
      color: '#000000',
      entities: [
        2,
      ],
    },
  ],
  loads: [
    {
      type: 'SurfacePressureLoad3D',
      goupName: 'surf1',
      fixPressure: 1,
      pressureType: 'Positive',
      pressureValue: 12,
    },
  ],
  boundaryConditions: [
    {
      type: 'Displacements',
      goupName: 'surf1',
      x: 0,
      y: 0,
      z: 0,
      fx: 1,
      fy: 1,
      fz: 1,
    },
  ],
  properties: [
    {
      name: 'Aluminium',
      material: 'Aluminium_7021',
      element: 'Shell',
    },
  ],
  elements: [
    {
      group: 'AllSurfaces',
      property: 'Aluminium',
      element: 'Triangle',
    },
  ],
}]

export const verticesText = `1 1 0 0 3 0 0 1 0
0.000000 0.000000 0.000000
1 2 0 0 3 0 0 1 0
0.000000 1.000000 0.000000
1 3 0 0 3 0 0 1 0
1.000000 1.000000 0.000000
1 4 0 0 3 0 0 1 0
1.000000 0.000000 0.000000
1 5 0 0 3 0 0 1 0
0.000000 0.000000 1.000000
1 6 0 0 3 0 0 1 0
0.000000 1.000000 1.000000
1 7 0 0 3 0 0 1 0
1.000000 1.000000 1.000000
1 8 0 0 3 0 0 1 0
1.000000 0.000000 1.000000
`

export const segmentsText = `2 1 0 0 2 0 0 1 0
1 2
2 2 0 0 2 0 0 1 0
2 3
2 3 0 0 2 0 0 1 0
3 4
2 4 0 0 2 0 0 1 0
4 1
2 5 0 0 2 0 0 1 0
5 6
2 6 0 0 2 0 0 1 0
6 7
2 7 0 0 2 0 0 1 0
7 8
2 8 0 0 2 0 0 1 0
8 5
2 9 0 0 2 0 0 1 0
1 5
2 10 0 0 2 0 0 1 0
2 6
2 11 0 0 2 0 0 1 0
3 7
2 12 0 0 2 0 0 1 0
4 8
`

export const facesText = `5 1 0 0 1 0 0 1 0
4
1 2 3 4
0 0 0 0
0.5 0.5 0
0 0 -1
5 2 0 0 1 0 0 1 0
4
8 7 6 5
1 1 1 1
0.5 0.5 1
0 0 1
5 3 0 0 1 0 0 1 0
4
9 5 10 1
0 0 1 1
0 0.5 0.5
-1 0 0
5 4 0 0 1 0 0 1 0
4
10 6 11 2
0 0 1 1
0.5 1 0.5
0 1 0
5 5 0 0 1 0 0 1 0
4
11 7 12 3
0 0 1 1
1 0.5 0.5
1 0 0
5 6 0 0 1 0 0 1 0
4
12 8 9 4
0 0 1 1
0.5 0 0.5
0 -1 0
`

export const volumesText = `9 1 0 0 0 0 0 1 0
6
1 2 3 4 5 6
0 0 0 0 0 0
0.5 0.5 0.5
`

export const noneheader = `RAMSAN-ASCII-gid-v9.5
UNKNOWN 0
0
1 Test 0 1 255 0 0
0
0
`

export const KRATOSstructuralheader = `RAMSAN-ASCII-gid-v9.5
kratos.gid\\Kratos\\kratos 0
0
1 Test 0 1 255 0 0
0
0
`
/* eslint-disable */
export const footer = `0
0
0.1
0
12.0.8
1 0 0 1 2 0 0.6 0 0 0


0 0 0 0 100 0 10 1
1
0 0 1 1 0 2 0 0 0.3 1.8 0.3 0.3 500 1e-015 3 1.1 0 0 0 2 1 0.2 5 5 1 1.25 1 1 0.4 0 0 0 0 0 0 0 0 0 0 0
0 0 0 150 10 0.4 `
/* eslint-enable */

export const groupsfile = `<?xml version="1.0"?>
<gid version="11.1">
  <pre>
    <groups>
      <group id="1" name="group1" color="#000000ff"/>
      <group id="2" name="group2" color="#000000ff"/>
      <group id="3" name="surf1" color="#000000ff"/>
      <group id="4" name="AllSurfaces" color="#999999ff"/>
    </groups>
    <entities_groups>
      <entities_group name="points">
        <vector name="entity_ids" length="6" type="integer">1 2 4 5 6 3</vector>
        <vector name="entity_num_groups" length="6" type="ushort">1 2 2 2 1 1</vector>
        <vector name="entity_groups" length="9" type="ushort">1 1 2 1 2 1 2 1 2</vector>
      </entities_group>
      <entities_group name="surfaces">
        <vector name="entity_ids" length="6" type="integer">3 1 2 4 5 6</vector>
        <vector name="entity_num_groups" length="6" type="ushort">2 1 1 1 1 1</vector>
        <vector name="entity_groups" length="7" type="ushort">3 4 4 4 4 4 4</vector>
      </entities_group>
    </entities_groups>
  </pre>
</gid>`

/* eslint-disable */
export const conditionsFile = `<Container id="surf1" pid="surf1" class="Group" icon="groupsTree.gif" help="Define the positive or negative face pressure" open="0" active="1">
  <Container id="MainProperties" pid="New property" state="hidden" help="Values">
    <Item id="FixPressure" pid="Fix pressure" dv="1" ivalues="1,0" values="1,0" help="Fix pressure"/>
    <Item id="PressureType" pid="Face type" dv="Positive" ivalues="Positive,Negative" values="Positive,Negative" help="Defines which side of the face that matches the direction of the normal to the surface, positive or negative"/>
    <Item id="PressureValue" pid="Pressure value" dv="12" help="Pressure value"/>
  </Container>
</Container>
`

export const conditionsFileBoundary = `<Container id="internalRoot" pid="internalRoot" class="Group" icon="groupsTree.gif" help="Activation" open="1" active="1">
    <Container id="Values" pid="Values" help="Set the values" open="0">
        <Item id="Vx" pid="X" dv="0" help="X coordinate" state="normal"/>
        <Item id="Vy" pid="Y" dv="0" help="Y coordinate" state="normal"/>
        <Item id="Vz" pid="Z" dv="0" nDim="3D" help="Z coordinate" state="disabled"/>
    </Container>
    <Container id="Activation" pid="Fixed" help="Fix/release some degree of freedom" open="0">
        <Item id="Ax" pid="X active" dv="1" ivalues="1,0" values="1,0" help="Fix X degree of freedom"/>
        <Item id="Ay" pid="Y active" dv="1" ivalues="1,0" values="1,0" help="Fix Y degree of freedom"/>
        <Item id="Az" pid="Z active" dv="1" nDim="3D" ivalues="1,0" values="1,0" help="Fix Z degree of freedom"/>
    </Container>
</Container>
`

export const properties = `<Container id="Aluminium" pid="Aluminium" class="Property" icon="propsTree.gif" help="Property" open="0">
    <Container id="MainProperties" pid="New property" state="hidden" help="Values">
        <Item id="ElemType" pid="Property type" dv="Shell" state="normal" ivalues="Beam,Shell,Membrane,Solid" values="Beam,Shell,Membrane,Solid" help="Element type"/>
        <Item id="MatModel" pid="Constitutive law" state="normal" dv="Elastic-Isotropic" GCV="MatModel" help="Material model"/>
        <Item id="Material" pid="Material" dv="Aluminium_7021" state="normal" GCV="Materials" help="Material"/>
        <Item id="Thickness" pid="Thickness" state="normal" dv="1.0" help="Thickness"/>
        <Item id="SectionType" pid="Section type" state="normal" dv="UserDefined" GCV="SectType" help="Select the section type"/>
        <Item id="ProfileDB" pid="Profile list" state="normal" dv="" GCV="ProfileType" help="Select the profile from the list"/>
        <Item id="Area" pid="Area" dv="1.0" state="normal" help="Cross section area"/>
        <Item id="InertiaIx" pid="Inertia Ix" state="normal" dv="1.0" help="Moment of inertia Ix"/>
        <Item id="InertiaIy" pid="Inertia Iy" state="normal" dv="1.0" help="Moment of inertia Iy"/>
        <Item id="RectangularHeight" pid="Height" state="normal" dv="1.0" help="Height value"/>
        <Item id="RectangularWidth" pid="Width" state="normal" dv="1.0" help="Width value"/>
        <Item id="CircularDiameter" pid="Diameter" state="normal" dv="1.0" help="Diameter value"/>
    </Container>
</Container>
`

export const shellElements = `<Container id="AllSurfaces" pid="AllSurfaces" class="Group" icon="groupsTree.gif" help="Thin shell formulation" open="1" active="1">
    <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
        <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle" values="Triangle" help="Element Type"/>
        <Item id="Property" pid="Property" dv="Aluminium" GCV="Properties" help="Property"/>
    </Container>
</Container>
`

export const conditionsFileGroups = `<Group id="group1" color="{#000000}" state="1" type="Generic"/>
<Group id="group2" color="{#000000}" state="1" type="Generic"/>
<Group id="surf1" color="{#000000}" state="1" type="Generic"/>
<Group id="AllSurfaces" color="{#999999}" state="1" type="Generic"/>
`

/* eslint-enable */
