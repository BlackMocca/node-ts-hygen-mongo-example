var mongoose = require("mongoose");
// Will add the UUID type to the Mongoose Schema types
require("mongoose-uuid2")(mongoose);

export const UUID = mongoose.Types.UUID;
