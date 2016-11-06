
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

/**
 * 
 * 
 * @interface HeursticFunction
 */
export interface HeursticFunction {
    (node: NodeT, goal: NodeT): number
}

export interface DistanceFunction {
    (node1: NodeT, node2: NodeT): number
}

export interface Cell {
    x: number
    y: number
}

export enum AStarResult {
    ERR = 1,
    NO_PATH,
    NORM,
    FINISHED,
}
