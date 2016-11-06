import * as _ from 'lodash'
import NodeT from './nodet'
import { HeursticFunction, DistanceFunction, Cell, AStarResult } from './types'
// const PriorityQueue = require('js-priority-queue')

/**
 * Astar
 */
export default class AStar {
    openList: NodeT[]                       // This will be an array that is sorted after anythingis popped or removed
    closedList: NodeT[]                     // Simple array of a closed list
    distanceCost: DistanceFunction          // A function that computes distance (user provided)
    heursticCostEstimate: HeursticFunction  // A function that computes a heuristic estimate (user provided)
    map: NodeT[][]                          // A map of nodes (user provided)
    startNode: NodeT                        // The start node we are using
    endGoalNode: NodeT                      // The end goal node we are trying to reach

    private _rows: number
    private _cols: number
    private _initialized: boolean

    constructor(map: NodeT[][], distanceCostFunction: DistanceFunction, heuristicFunction: HeursticFunction) {
        this.map = map
        this.heursticCostEstimate = heuristicFunction
        this.distanceCost = distanceCostFunction

        this.openList = []
        this.closedList = []

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

        // Fix Node Initializations
        this.startNode.g = 0
        this.startNode.h = 0
        this.startNode.f = 0

        this.endGoalNode.g = 0
        this.endGoalNode.h = 0
        this.endGoalNode.f = 0

        this._rows = this.map.length
        this._cols = this.map[0].length

        const safe = (this.startNode !== null && this.endGoalNode !== null )
        if (safe) {
            // initialzation activities
            this.openList.push(this.startNode) // push on the start node on the queue
            this._initialized = true
        }
        return safe
    }

    findPath(): AStarResult | NodeT[] {
        if (! this._initialized) {
            return AStarResult.ERR
        }
        let result = AStarResult.NORM
        do {
            result = this.stepSearchOnce()
        }
        while (result === AStarResult.NORM)

        if (result !== AStarResult.FINISHED) {
            return result
        }

        const bestPath = this.createPath(this.endGoalNode)
        return bestPath
    }

    stepSearchOnce(): AStarResult {
        if (this.openList.length < 1) {
            return AStarResult.NO_PATH
        }
        const bestOpenNode: NodeT = this.openList[0] // get the best open node, node are sorted
        // Check if bestOpenNode is the goal node
        if (this.sameNode(bestOpenNode, this.endGoalNode)) {
            this.endGoalNode.parent = bestOpenNode.parent
            return AStarResult.FINISHED
        }
        this.openList.shift() // pop off this node, about to investigate all its neighbors
        this.closedList.push(bestOpenNode) // ad this to the closed list
        const neighbors = this.getNeighbors(bestOpenNode)
        _.forEach(neighbors, (neighbor) => {
            // Check if in closed list
            if (_.includes(this.closedList, neighbor)) {
                return // return early, this node has already been investigated
            }
            // create a new distance cost for this neighbor
            const newG: number = bestOpenNode.g + this.distanceCost(bestOpenNode, neighbor)
            // If this node is not on the open list, then add it
            if (!_.includes(this.openList, neighbor)) {
                this.openList.push(neighbor)
            } else if (newG >= neighbor.g) {
                return // This new g score is higher than what is was before. This path is NOT better, return early
            }

            // This path MUST be better, lets save it
            neighbor.parent = bestOpenNode                                      // Save the parent
            neighbor.g = newG                                                   // Save the computed distance cost
            neighbor.h = this.heursticCostEstimate(neighbor, this.endGoalNode)  // Compute the heuristic cost
            neighbor.f = neighbor.g + neighbor.h                                // compute the total cost (f)
            this.openList.sort(this.compareNodesF)                              // Sort the list
        })
        return AStarResult.NORM
    }
    createPath(node: NodeT): NodeT[] {
        const list: NodeT[] = [node]
        let parent = null
        do {
            const oldNode  = list[list.length - 1]
            parent = oldNode.parent
            if (parent !== null) {
                list.push(parent)
            }

        } while (parent !== null)

        list.reverse()
        return list
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
        if (loc.x > this._rows - 1 || loc.x < 0 || loc.y > this._cols - 1 || loc.y < 0) {
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
         let neigborCell: Cell[] = []
         neigborCell.push({x: node.x + 1, y: node.y }) // Right
         neigborCell.push({x: node.x, y: node.y + 1 }) // Up
         neigborCell.push({x: node.x - 1, y: node.y }) // Left
         neigborCell.push({x: node.x, y: node.y - 1 }) // Down

         neigborCell.push({x: node.x + 1, y: node.y + 1 }) // Up-Diag
         neigborCell.push({x: node.x - 1, y: node.y + 1 }) // Left - Diag
         neigborCell.push({x: node.x - 1, y: node.y - 1 }) // Bottom - Diag
         neigborCell.push({x: node.x + 1, y: node.y - 1 }) // Right - Diag

         // Remove invalid cells
          _.remove(neigborCell, (cell) => {
             if (cell.x < 0 || cell.x > this._rows - 1 || cell.y < 0 || cell.y > this._cols - 1) {
                 return true
             }
         })
         // transform cell into the the nodes
         const neighborNodes = _.map(neigborCell, (cell) => {
             return this.findNode(cell)
         })

         return neighborNodes
    }

    /**
     * 
     * 
     * @param {NodeT} node1
     * @param {NodeT} node2
     */
     compareNodesF(node1: NodeT, node2: NodeT): number {
        return node1.f - node2.f
    }
}
