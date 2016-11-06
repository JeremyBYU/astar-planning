import * as _ from 'lodash'
import NodeT from '../nodet'

export function create2DMap(x: number, y: number): NodeT[][] {
    const _map = new Array(x)
    for (let i = 0; i < x; ++i) {
        _map[i] = new Array(y)
        for (let j = 0; j < y; ++j) {
            _map[i][j] = new NodeT(i, j)
        }
    }
    return _map
}

export function sampleHeuristicMap() {
    const mapH =
    [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 120, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 120, 100, 0, 0, 0, 0],
    [0, 0, 0, 100, 120, 100, 0, 0, 0, 0],
    [0, 0, 0, 100, 110, 100, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    return mapH
}

export const sampleCorrectPath = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 6 },
    { x: 5, y: 7 },
    { x: 6, y: 8 },
    { x: 7, y: 8 },
    { x: 8, y: 8 },
    { x: 9, y: 9 }
]


export function transormNodestoCell(nodes: NodeT[]) {
   return  _.map(nodes, (node) => {
        return { x: node.x, y: node.y }
    })
}
