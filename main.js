// ___________________________________________________________
//
//  _____  _    _ _______  ______ _______ _____ __   _ ______
// |     |  \  /  |______ |_____/ |  |  |   |   | \  | |     \
// |_____|   \/   |______ |    \_ |  |  | __|__ |  \_| |_____/
//
// ___________ Artificial Intelligence for Screeps ___________
//
//
// Overmind repository: github.com/bencbartlett/overmind
//
//
// To-do list: ====================
// TODO: ignore pathing only for haulers/friendly creeps on track? Gets stuck against enemies
// TODO: DEFCON + dynamically generated guards (patrolling cops?)
// TODO: spawn queue - duplicate creeps can be built from double-spawn rooms
// Import everything needed
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Overmind_1 = require("./Overmind");
const profiler = require("./lib.screeps-profiler");
require("./require");
const preprocessing_1 = require("./preprocessing");
const data_logger_1 = require("./logging.data_logger");
const visuals_1 = require("./visuals.visuals");
// import * as profiler from "./lib/screeps-profiler.js";
// Enable screeps profiler
// profiler.enable();
// Main loop
function loop() {
    profiler.wrap(function () {
        // return null;
        // Memory management ===========================================================================================
        // Clear memory for non-existent creeps
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
        // Clear memory for non-existent flags
        for (let name in Memory.flags) {
            if (Game.flags[name] == undefined) {
                delete Memory.flags[name];
            }
        }
        // Setup =======================================================================================================
        // Preprocessing
        preprocessing_1.preprocessing.run();
        // Initialize Overmind object
        global.Overmind = new Overmind_1.default;
        Overmind.initializeAllBrains();
        // Animation ===================================================================================================
        // Animate each creep
        for (let name in Game.creeps) {
            // if (name == 'destroyer_0') {
            //     continue;
            // }
            Game.creeps[name].run();
        }
        // Animate each room
        for (let name in Game.rooms) {
            // Object.defineProperty(Game.rooms[name], 'brain', brains[name]);
            // Animate each room brain, but only for owned rooms
            let room = Game.rooms[name];
            if (room.my) {
                room.run();
                room.brain.run();
            }
        }
        // Postprocessing ==============================================================================================
        // Log stats
        var logger = new data_logger_1.dataLogger;
        logger.run();
        // Draw visuals
        if (Game.cpu.bucket > 7500) {
            visuals_1.visuals.drawGlobalVisuals();
        }
    });
}
exports.loop = loop;
