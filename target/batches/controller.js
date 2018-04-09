"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const typeorm_1 = require("typeorm");
let BatchController = class BatchController {
    getBatch(id) {
        return entity_1.default.findOneById(id);
    }
    async allBatches() {
        const batches = await entity_1.default.find();
        return { batches };
    }
    createBatch(batch) {
        return batch.save();
    }
    async getBatchStudents(batchId) {
        const batchStudents = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select()
            .from(entity_1.default, "batch")
            .leftJoinAndSelect("batch.students", "student")
            .where("batch.id = :id", { id: batchId })
            .getOne();
        return { batchStudents };
    }
};
__decorate([
    routing_controllers_1.Get('/batches/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BatchController.prototype, "getBatch", null);
__decorate([
    routing_controllers_1.Get('/batches'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "allBatches", null);
__decorate([
    routing_controllers_1.Post('/batches'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], BatchController.prototype, "createBatch", null);
__decorate([
    routing_controllers_1.Get('/batches/:id/students'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "getBatchStudents", null);
BatchController = __decorate([
    routing_controllers_1.JsonController()
], BatchController);
exports.default = BatchController;
//# sourceMappingURL=controller.js.map