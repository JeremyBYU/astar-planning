import * as t from 'tape'

import { create2DMap, sampleHeuristicMap, transormNodestoCell, sampleCorrectPath } from '../util/util'
import NodeT from '../nodet'
import AStar from '../astar'
import { Cell } from '../types'


const mapH = sampleHeuristicMap() // sample heuritstic map

function costFunction(node1: NodeT, node2: NodeT) {
    return Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2))
}

function heuristicFunction(node1: NodeT, goalNode: NodeT) {
    return mapH[node1.x][node1.y] + costFunction(node1, goalNode)
}


 
t('Test Sampple Path', function (t) {
    const x = 10
    const y = 10
    const map2D = create2DMap(x, y)
    // Set up Test
    const startCell: Cell = { x: 0, y: 0 }
    const endGoal: Cell = { x: 9, y: 9 }
    const AStarPlanner = new AStar(map2D, costFunction, heuristicFunction)


    AStarPlanner.initializeSearch(startCell, endGoal)

    const path = AStarPlanner.findPath()

    if (typeof path === 'number') {
        t.fail('ERROR: ' + path)
    } else {
        t.deepEqual(path, sampleCorrectPath)
    }


})