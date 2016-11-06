import NodeT from './nodet'

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
