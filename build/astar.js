"use strict";
var _ = require('lodash');
var util_1 = require('./util/util');
var types_1 = require('./types');
// const PriorityQueue = require('js-priority-queue')
/**
 * Astar
 */
var AStar = (function () {
    function AStar(distanceCostFunction, heuristicFunction, map) {
        this.heursticCostEstimate = heuristicFunction;
        this.distanceCost = distanceCostFunction;
        if (Array.isArray(map)) {
            this.map = map;
        }
        else {
            this.map = util_1.create2DMap(map.x, map.y);
        }
        this.openList = [];
        this.closedList = [];
        this._rows = this.map.length;
        this._cols = this.map[0].length;
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
    AStar.prototype.initializeSearch = function (start, goal) {
        this.startNode = this.findNode(start);
        this.endGoalNode = this.findNode(goal);
        // Fix Node Initializations
        this.startNode.g = 0;
        this.startNode.h = 0;
        this.startNode.f = 0;
        this.endGoalNode.g = 0;
        this.endGoalNode.h = 0;
        this.endGoalNode.f = 0;
        var safe = (this.startNode !== null && this.endGoalNode !== null);
        if (safe) {
            // initialzation activities
            this.openList.push(this.startNode); // push on the start node on the queue
            this._initialized = true;
        }
        return safe;
    };
    AStar.prototype.findPath = function () {
        if (!this._initialized) {
            return types_1.AStarResult.ERR;
        }
        var result = types_1.AStarResult.NORM;
        do {
            result = this.stepSearchOnce();
        } while (result === types_1.AStarResult.NORM);
        if (result !== types_1.AStarResult.FINISHED) {
            return result;
        }
        var bestPath = this.createPath(this.endGoalNode); // return the best path (as nodes)
        return bestPath;
    };
    AStar.prototype.stepSearchOnce = function () {
        var _this = this;
        if (this.openList.length < 1) {
            return types_1.AStarResult.NO_PATH;
        }
        var bestOpenNode = this.openList[0]; // get the best open node, node are sorted
        // Check if bestOpenNode is the goal node
        if (this.sameNode(bestOpenNode, this.endGoalNode)) {
            this.endGoalNode.parent = bestOpenNode.parent;
            return types_1.AStarResult.FINISHED;
        }
        this.openList.shift(); // pop off this node, about to investigate all its neighbors
        this.closedList.push(bestOpenNode); // ad this to the closed list
        var neighbors = this.getNeighbors(bestOpenNode);
        _.forEach(neighbors, function (neighbor) {
            // Check if in closed list
            if (_.includes(_this.closedList, neighbor)) {
                return; // return early, this node has already been investigated
            }
            // create a new distance cost for this neighbor
            var newG = bestOpenNode.g + _this.distanceCost(bestOpenNode, neighbor);
            // If this node is not on the open list, then add it
            if (!_.includes(_this.openList, neighbor)) {
                _this.openList.push(neighbor);
            }
            else if (newG >= neighbor.g) {
                return; // This new g score is higher than what is was before. This path is NOT better, return early
            }
            // This path MUST be better, lets save it
            neighbor.parent = bestOpenNode; // Save the parent
            neighbor.g = newG; // Save the computed distance cost
            neighbor.h = _this.heursticCostEstimate(neighbor, _this.endGoalNode); // Compute the heuristic cost
            neighbor.f = neighbor.g + neighbor.h; // compute the total cost (f)
            _this.openList.sort(_this.compareNodesF); // Sort the list
        });
        return types_1.AStarResult.NORM;
    };
    AStar.prototype.createPath = function (node) {
        var list = [node];
        var parent = null;
        do {
            var oldNode = list[list.length - 1];
            parent = oldNode.parent;
            if (parent !== null) {
                list.push(parent);
            }
        } while (parent !== null);
        list.reverse();
        return list;
    };
    AStar.prototype.sameNode = function (node1, node2) {
        return (node1.x === node2.x && node1.y === node2.y);
    };
    /**
     *
     *
     * @param {Cell} loc    - lcation to searh for
     * @returns {NodeT}     - Node in the mpa
     *
     * @memberOf AStar
     */
    AStar.prototype.findNode = function (loc) {
        if (loc.x > this._rows - 1 || loc.x < 0 || loc.y > this._cols - 1 || loc.y < 0) {
            return null;
        }
        return this.map[loc.x][loc.y];
    };
    /**
     *
     *
     * @param {NodeT} Get all neighbor nodes around this node
     * @returns {Array<NodeT>}
     */
    AStar.prototype.getNeighbors = function (node) {
        var _this = this;
        var neigborCell = [];
        neigborCell.push({ x: node.x + 1, y: node.y }); // Right
        neigborCell.push({ x: node.x, y: node.y + 1 }); // Up
        neigborCell.push({ x: node.x - 1, y: node.y }); // Left
        neigborCell.push({ x: node.x, y: node.y - 1 }); // Down
        neigborCell.push({ x: node.x + 1, y: node.y + 1 }); // Up-Diag
        neigborCell.push({ x: node.x - 1, y: node.y + 1 }); // Left - Diag
        neigborCell.push({ x: node.x - 1, y: node.y - 1 }); // Bottom - Diag
        neigborCell.push({ x: node.x + 1, y: node.y - 1 }); // Right - Diag
        // Remove invalid cells
        _.remove(neigborCell, function (cell) {
            if (cell.x < 0 || cell.x > _this._rows - 1 || cell.y < 0 || cell.y > _this._cols - 1) {
                return true;
            }
        });
        // transform cell into the the nodes
        var neighborNodes = _.map(neigborCell, function (cell) {
            return _this.findNode(cell);
        });
        return neighborNodes;
    };
    /**
     *
     *
     * @param {NodeT} node1
     * @param {NodeT} node2
     */
    AStar.prototype.compareNodesF = function (node1, node2) {
        return node1.f - node2.f;
    };
    return AStar;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AStar;
//# sourceMappingURL=astar.js.map