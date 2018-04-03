"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./logins/controller");
const controller_2 = require("./users/controller");
const controller_3 = require("./batches/controller");
const controller_4 = require("./evaluations/controller");
const controller_5 = require("./students/controller");
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default,
        controller_2.default,
        controller_3.default,
        controller_4.default,
        controller_5.default,
    ]
});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map