// Preprocessing code to be run before animation of anything
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessing = {
    get memory() {
        return Memory.preprocessing;
    },
    cacheAssignments: function () {
        this.memory.assignments = {};
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            let assignmentRef = creep.memory.assignment;
            if (assignmentRef) {
                if (!this.memory.assignments[assignmentRef]) {
                    this.memory.assignments[assignmentRef] = {};
                }
                if (!this.memory.assignments[assignmentRef][creep.memory.role]) {
                    this.memory.assignments[assignmentRef][creep.memory.role] = [];
                }
                this.memory.assignments[assignmentRef][creep.memory.role].push(name);
            }
        }
    },
    cacheTargets: function () {
        this.memory.targets = {};
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.task && creep.memory.task.targetID) {
                let targetRef = creep.memory.task.targetID;
                if (!this.memory.targets[targetRef]) {
                    this.memory.targets[targetRef] = [];
                }
                this.memory.targets[targetRef].push(name);
            }
        }
    },
    // allMarketOrders: function () {
    //     this.memory.allMarketOrders = Game.market.getAllOrders();
    // },
    run: function () {
        Memory.preprocessing = {};
        this.cacheAssignments();
        this.cacheTargets();
    }
};
// const profiler = require('screeps-profiler');
const profiler = require("./lib.screeps-profiler");
profiler.registerObject(exports.preprocessing, 'preprocessing');
