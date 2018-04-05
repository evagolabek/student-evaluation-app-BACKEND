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
const entity_2 = require("../batches/entity");
let StudentController = class StudentController {
    async getStudent(id) {
        const student = await entity_1.default.findOneById(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Cannot find student');
        return student;
    }
    async allStudents() {
        const students = await entity_1.default.find();
        return { students };
    }
    async updateStudent(id, update) {
        const student = await entity_1.default.findOneById(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Cannot find student');
        return entity_1.default.merge(student, update).save();
    }
    async createStudent(batchId, student) {
        const batch = await entity_2.default.findOneById(batchId);
        if (!batch)
            throw new routing_controllers_1.BadRequestError(`Batch does not exist`);
        const entity = await entity_1.default.create({
            firstName: student.firstName,
            lastName: student.lastName,
            image: student.image,
            batch: batch
        }).save();
        return entity;
    }
    async deleteStudent(id) {
        const student = await entity_1.default.findOneById(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Cannot find student');
        await student.remove();
        return 'Student succesfully deleted';
    }
};
__decorate([
    routing_controllers_1.Get('/students/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudent", null);
__decorate([
    routing_controllers_1.Get('/students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "allStudents", null);
__decorate([
    routing_controllers_1.Put('/students/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateStudent", null);
__decorate([
    routing_controllers_1.Post('/batches/:id/students'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_1.default]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "createStudent", null);
__decorate([
    routing_controllers_1.Delete('/students/:id'),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteStudent", null);
StudentController = __decorate([
    routing_controllers_1.JsonController()
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=controller.js.map