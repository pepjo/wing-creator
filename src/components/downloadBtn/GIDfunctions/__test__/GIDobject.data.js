
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
0.085
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
      <group id="1" name="group1" color="#000000"/>
    </groups>
    <entities_groups>
      <entities_group name="points">
        <vector name="entity_ids" length="5" type="integer">1:2 4:6</vector>
        <vector name="entity_num_groups" length="5" type="ushort">1x5</vector>
        <vector name="entity_groups" length="5" type="ushort">1x5</vector>
      </entities_group>
    </entities_groups>
  </pre>
</gid>`
