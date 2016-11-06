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
