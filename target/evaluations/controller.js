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
const entity_2 = require("../students/entity");
const entity_3 = require("../users/entity");
const typeorm_1 = require("typeorm");
let EvaluationController = class EvaluationController {
    getBatch(id) {
        return entity_1.default.findOneById(id);
    }
    async allEvaluations() {
        const evaluations = await entity_1.default.find();
        return { evaluations };
    }
    async createEvaluation(studentId, userId, evaluation) {
        const student = await entity_2.default.findOneById(studentId);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Cannot find student');
        const user = await entity_3.default.findOneById(userId);
        if (!user)
            throw new routing_controllers_1.NotFoundError('Cannot find user');
        if (evaluation.colour !== 'red' && evaluation.colour !== 'yellow'
            && evaluation.colour !== 'green')
            throw new routing_controllers_1.BadRequestError('Colour must be either red, green or yelllow');
        const entity = await entity_1.default.create({
            date: evaluation.date,
            colour: evaluation.colour,
            remarks: evaluation.remarks,
            student: student,
            user: user
        }).save();
        return entity;
    }
    async getStudentEvaluations(studentId) {
        const studentEvaluations = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select()
            .from(entity_2.default, "student")
            .leftJoinAndSelect("student.evaluations", "evaluation")
            .where("student.id = :id", { id: studentId })
            .getOne();
        return { studentEvaluations };
    }
};
__decorate([
    routing_controllers_1.Get('/evaluations/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EvaluationController.prototype, "getBatch", null);
__decorate([
    routing_controllers_1.Get('/evaluations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "allEvaluations", null);
__decorate([
    routing_controllers_1.Post('/students/:id1/users/:id2/evaluations'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Param('id1')),
    __param(1, routing_controllers_1.Param('id2')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, entity_1.default]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "createEvaluation", null);
__decorate([
    routing_controllers_1.Get('/students/:id/evaluations'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getStudentEvaluations", null);
EvaluationController = __decorate([
    routing_controllers_1.JsonController()
], EvaluationController);
exports.default = EvaluationController;
//# sourceMappingURL=controller.js.map