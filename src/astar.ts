import * as _ from 'lodash'
import NodeT from './nodet'
import { HeursticFunction } from './types'


/**
 * Astar
 */
class AStar {
    openList: Array<NodeT>
    closedList: Array<NodeT>
    heursticCostFunction: HeursticFunction
    map: NodeT[][]
    constructor(map: NodeT[][], heuristicCostFunction: HeursticFunction) {
        this.map = map
        this.heursticCostFunction = heuristicCostFunction
        
    }
    // /**
    //  * 
    //  * 
    //  * @param {NodeT} Get all neighbor nodes around this node
    //  * @returns {Array<NodeT>}
    //  */
    //  getNeighbors(node: NodeT): Array<NodeT> {
    // }


    // /**
    //  * 
    //  * 
    //  * @param {NodeT} node
    //  * @param {NodeT} goal
    //  * @returns {number}
    //  */
    //  heuristic_cost_estimate(node: NodeT, goal: NodeT): number {

    // }


    // /**
    //  * 
    //  * 
    //  * @param {NodeT} prior
    //  * @param {NodeT} next
    //  * @returns {number}
    //  */
    //  cost_function(prior: NodeT, next: NodeT): number {

    // }


    /**
     * 
     * 
     * @param {NodeT} node1
     * @param {NodeT} node2
     */
     compareNodes(node1: NodeT, node2: NodeT) {

    }
}




