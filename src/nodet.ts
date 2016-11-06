
/**
 * Node class
 */
export default class NodeT {
    x: number       // Cell index (first dimension)
    y: number       // Cell index (second dimension)
    f: number       // Overall cost of node
    g: number       // cost function (distance to node from start node)
    h: number       // heuristic cost function
    parent: NodeT   // Reference to parent node
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.f = Infinity
        this.g = Infinity
        this.h = Infinity
        this.parent = null
    }
}