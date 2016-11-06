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

export function createHeuristicMap() {
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

export function transormNodestoCell(nodes: NodeT[]) {
   return  _.map(nodes, (node) => {
        return { x: node.x, y: node.y }
    })
}
