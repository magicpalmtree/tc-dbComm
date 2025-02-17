import { Connection } from 'mongoose';
import { IHeatMap } from '../interfaces/HeatMap.interface';

/**
 * Create heatmap
 * @param {IHeatMap} data
 * @returns {Promise<IHeatMap>}
 */
async function createHeatMap(connection: Connection, data: IHeatMap) {
    return connection.models.HeatMap.create(data);
}

/**
 * Create heatmaps
 * @param {IHeatMap} data
 * @returns {Promise<IHeatMap>}
 */
async function createHeatMaps(connection: Connection, data: IHeatMap[]) {
    return connection.models.HeatMap.insertMany(data);
}

export default {
    createHeatMap,
    createHeatMaps
}