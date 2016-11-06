import * as _ from 'lodash'
import NodeT from './nodet'
import { HeursticFunction, DistanceFunction, Cell, AStarResult } from './types'
const PriorityQueue = require('js-priority-queue')




/**
 * Astar
 */
class AStar {
    openList: any                           // This will be a prioirty queue
    closedList: NodeT[]                     // Simple array of a closed list
    distanceCost: DistanceFunction          // A function that computes distance (user provided)
    heursticCostEstimate: HeursticFunction  // A function that computes a heuristic estimate (user provided)
    map: NodeT[][]                          // A map of nodes (user provided)
    startNode: NodeT                        // The start node we are using
    endGoalNode: NodeT                      // The end goal node we are trying to reach

    constructor(map: NodeT[][], distanceCostFunction: DistanceFunction, heuristicFunction: HeursticFunction) {
        this.map = map
        this.heursticCostEstimate = heuristicFunction
        this.distanceCost = distanceCostFunction
        this.openList = new PriorityQueue( {comparator: this.compareNodes })
    }


    /**
     * 
     * 
     * @param {Cell} start postion
     * @param {Cell} goal position
     * @returns {boolean} true if sucessful
     * 
     * @memberOf AStar
     */
    initializeSearch(start: Cell, goal: Cell): boolean {
        this.startNode = this.findNode(start)
        this.endGoalNode = this.findNode(goal)

        const safe = (this.startNode !== null && this.endGoalNode !== null )
        if (safe) {
            // initialzation activities
            this.openList.queue(this.startNode) // push on the start node on the queue
        }
        return safe;
    }

    stepSearchOnce() : AStarResult {
        const bestOpenNode: NodeT = this.openList.peek() // get the best open node
        // Check if bestOpenNode is the goal node
        if (this.sameNode(bestOpenNode, this.endGoalNode)) {
            this.endGoalNode.parent = bestOpenNode.parent
            return AStarResult.FINISHED
        }
        this.openList.dequeue() // pop off this node, about to investigate all its neighbors
        this.closedList.push(bestOpenNode) // ad this to the closed list
        const neighbors = this.getNeighbors(bestOpenNode)
        _.forEach(neighbors, (neighbor) => {
            // Check if in closed list
            // Check if in open list (crap how to do that with a priority queue) just use regular array with array.sort
        })

        
    }
    sameNode(node1: NodeT, node2: NodeT): boolean {
        return (node1.x === node2.x && node1.y === node2.y)
    }


    /**
     * 
     * 
     * @param {Cell} loc    - lcation to searh for 
     * @returns {NodeT}     - Node in the mpa
     * 
     * @memberOf AStar
     */
    findNode(loc: Cell): NodeT {
        if (loc.x > this.map.length || loc.y > this.map[0].length){
            return null
        }
        return this.map[loc.x][loc.y]
    }
    /**
     * 
     * 
     * @param {NodeT} Get all neighbor nodes around this node
     * @returns {Array<NodeT>}
     */
     getNeighbors(node: NodeT): NodeT[] {
         return []
    }

    /**
     * 
     * 
     * @param {NodeT} node1
     * @param {NodeT} node2
     */
     compareNodes(node1: NodeT, node2: NodeT): number {
        return node1.f - node2.f
    }
}




