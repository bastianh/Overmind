import {Task} from "./Task";

export class taskSupply extends Task {
    target: StructureSpawn | StructureExtension | StructureTower | StructureLab | StructureNuker | StructurePowerSpawn;

    constructor() {
        super('supply');
        // Settings
        this.maxPerTarget = 1;
        this.moveColor = 'blue';
        this.data.quiet = true;
    }

    isValidTask() {
        var creep = this.creep;
        return (creep.carry.energy > 0);
    }

    isValidTarget() {
        var target = this.target;
        if (target &&
            (target.structureType == STRUCTURE_SPAWN ||
            target.structureType == STRUCTURE_EXTENSION ||
            target.structureType == STRUCTURE_TOWER ||
            target.structureType == STRUCTURE_LAB ||
            target.structureType == STRUCTURE_NUKER ||
            target.structureType == STRUCTURE_POWER_SPAWN)) {
            return (target.energy < target.energyCapacity);
        } else {
            return false;
        }
    }

    work() {
        return this.creep.transfer(this.target, RESOURCE_ENERGY);
    }
}

