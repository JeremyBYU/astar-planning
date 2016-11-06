"use strict";
/**
 * Node class
 */
var NodeT = (function () {
    function NodeT(x, y) {
        this.x = x;
        this.y = y;
        this.f = Infinity;
        this.g = Infinity;
        this.h = Infinity;
        this.parent = null;
    }
    return NodeT;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeT;
(function (AStarResult) {
    AStarResult[AStarResult["ERR"] = 1] = "ERR";
    AStarResult[AStarResult["NO_PATH"] = 2] = "NO_PATH";
    AStarResult[AStarResult["NORM"] = 3] = "NORM";
    AStarResult[AStarResult["FINISHED"] = 4] = "FINISHED";
})(exports.AStarResult || (exports.AStarResult = {}));
var AStarResult = exports.AStarResult;
//# sourceMappingURL=types.js.map