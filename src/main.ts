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

import OM from "./Overmind";
import profiler = require('./lib/screeps-profiler');

declare var Overmind: OM;


import "./require";
import {preprocessing} from "./preprocessing";
import {dataLogger} from './logging/data_logger';
import {visuals} from './visuals/visuals';

// import * as profiler from "./lib/screeps-profiler.js";
// Enable screeps profiler
// profiler.enable();

// Main loop
export function loop() {
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
        preprocessing.run();
        // Initialize Overmind object
        global.Overmind = new OM;
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
        var logger = new dataLogger;
        logger.run();
        // Draw visuals
        if (Game.cpu.bucket > 7500) {
            visuals.drawGlobalVisuals();
        }
    });
}

