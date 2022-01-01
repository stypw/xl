var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function NameFormat() {
        return function (target, propertyKey) {
            console.log(target[propertyKey]);
        };
    }
    exports.NameFormat = NameFormat;
    function Input() {
        return function (target, propertyKey) {
        };
    }
    exports.Input = Input;
    var Student = /** @class */ (function () {
        function Student() {
            this.studentName = "lzj";
        }
        Object.defineProperty(Student.prototype, "value", {
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            NameFormat()
        ], Student.prototype, "studentName", void 0);
        __decorate([
            Input()
        ], Student.prototype, "value", null);
        return Student;
    }());
    exports.Student = Student;
});
