export var pathing = {
    findPathLengthIncludingRoads: function (startPos: RoomPosition, endPos: RoomPosition) {
        let ret = PathFinder.search(
            startPos, {pos: endPos, range: 2},
            {
                plainCost: 2,
                swampCost: 10,
                roomCallback: function (roomName) {
                    let room = Game.rooms[roomName];
                    if (!room) return;
                    let costs = new PathFinder.CostMatrix;

                    room.find(FIND_STRUCTURES).forEach(function (structure: any) {
                        if (structure.structureType === STRUCTURE_ROAD) {
                            // Favor roads over plain tiles
                            costs.set(structure.pos.x, structure.pos.y, 1);
                        } else if (structure.structureType !== STRUCTURE_CONTAINER &&
                                   (structure.structureType !== STRUCTURE_RAMPART || !structure.my)) {
                            // Can't walk through non-walkable buildings
                            costs.set(structure.pos.x, structure.pos.y, 0xff);
                        }
                    });
                    return costs;
                },
            }
        );
        let path = ret.path;
        return path.length + 1; // offset for range
    },
};

import profiler = require('./screeps-profiler'); profiler.registerObject(pathing, 'pathing');

