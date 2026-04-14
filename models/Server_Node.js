const mongoose = require('mongoose');
const NodeSchema = new mongoose.Schema({
    node_id: Number,
    data_center: String,
    hardware_spec: String,
    node_status: { type: String, enum: ['ONLINE', 'MAINTENANCE', 'FULL'] }
});
module.exports = mongoose.model('Server_Node', NodeSchema);
// module.exports = mongoose.model('Server_Node', NodeSchema, 'Server_Node');