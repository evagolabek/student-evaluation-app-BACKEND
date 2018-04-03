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
let EvaluationController = class EvaluationController {
    getEvaluation(id) {
        return entity_1.default.findOneById(id);
    }
    async allEvaluations() {
        const evaluations = await entity_1.default.find();
        return { evaluations };
    }
    async updateEvaluation(id, update) {
        const evaluation = await entity_1.default.findOneById(id);
        if (!evaluation)
            throw new routing_controllers_1.NotFoundError('Cannot find evaluation');
        return entity_1.default.merge(evaluation, update).save();
    }
};
__decorate([
    routing_controllers_1.Get('/evaluations/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EvaluationController.prototype, "getEvaluation", null);
__decorate([
    routing_controllers_1.Get('/evaluations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "allEvaluations", null);
__decorate([
    routing_controllers_1.Put('/evaluations/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "updateEvaluation", null);
EvaluationController = __decorate([
    routing_controllers_1.JsonController()
], EvaluationController);
exports.default = EvaluationController;
//# sourceMappingURL=controller.js.map