import NodeT from './nodet'


/**
 * 
 * 
 * @interface HeursticFunction
 */
export interface HeursticFunction {
    (node: NodeT): number
}

export type Map = { value: Array<Array<NodeT>> }