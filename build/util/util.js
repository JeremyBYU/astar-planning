"use strict";
var _ = require('lodash');
var types_1 = require('../types');
function create2DMap(x, y) {
    var _map = new Array(x);
    for (var i = 0; i < x; ++i) {
        _map[i] = new Array(y);
        for (var j = 0; j < y; ++j) {
            _map[i][j] = new types_1.default(i, j);
        }
    }
    return _map;
}
exports.create2DMap = create2DMap;
function sampleHeuristicMap() {
    var mapH = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 120, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 120, 100, 0, 0, 0, 0],
        [0, 0, 0, 100, 120, 100, 0, 0, 0, 0],
        [0, 0, 0, 100, 110, 100, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    return mapH;
}
exports.sampleHeuristicMap = sampleHeuristicMap;
exports.sampleCorrectPath = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 6 },
    { x: 5, y: 7 },
    { x: 6, y: 8 },
    { x: 7, y: 8 },
    { x: 8, y: 8 },
    { x: 9, y: 9 }
];
function transformNodestoCells(nodes) {
    return _.map(nodes, function (node) {
        return { x: node.x, y: node.y };
    });
}
exports.transformNodestoCells = transformNodestoCells;
//# sourceMappingURL=util.js.map