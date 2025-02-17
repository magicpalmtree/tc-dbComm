import { Connection } from 'mongoose';
import { IRawInfo, IGuild } from '../interfaces';
import moment = require("moment");

/**
 * Create rawInfo
 * @param {IRawInfo} data
 * @returns {Promise<IRawInfo>}
*/
async function createRawInfo(connection: Connection, data: IRawInfo) {
    try {
        await connection.models.RawInfo.create(data);
    } catch(e) {
        return false;
    }
}

const fetchRawinfo = async (connection: Connection, {selectedChannels, period}: IGuild) => {
    const model = connection.models.RawInfo;
    const channelList = selectedChannels?.map((item) => item.channelId);
    const today = moment().startOf('day');
    const data = await model.find({
        channelId: { 
            $in:channelList,
        },
        created_at: {
            $gte: moment(period).toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    });
    return data;
}

const checkExist = async (connection: Connection, time: Date) => {
    const model = connection.models.RawInfo;
    const data = await model.find({
        created_at: time
    });
    return data.length > 0;
}

const getRangeId = async (connection: Connection) => {
    const model = connection.models.RawInfo;
    const latest = await model.findOne().sort({ 'messageId': -1 });
    const oldest = await model.findOne().sort({ 'messageId': 1})
    return [oldest, latest];
}

export default {
    createRawInfo,
    fetchRawinfo,
    checkExist,
    getRangeId
}