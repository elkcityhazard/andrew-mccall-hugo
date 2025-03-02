"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
require("./forms.css");
var Form = /** @class */ (function () {
    function Form(formID) {
        if (formID === void 0) { formID = ""; }
        this.formID = formID;
        this.form = document.getElementById(formID);
        this.events();
    }
    Form.prototype.events = function () {
        if (!this.form || !this.formID)
            return null;
        this.form.addEventListener('submit', this.handleOnFormSubmit.bind(this));
        this.form.addEventListener('formdata', this.handleOnFormData.bind(this));
    };
    Form.prototype.handleClearErrorMsgs = function () {
        var _a;
        var errorList;
        errorList = (_a = this.form.querySelectorAll('small[data-id*="error"]')) !== null && _a !== void 0 ? _a : [];
        if (errorList.length) {
            errorList.forEach(function (el) { return el.textContent = ""; });
        }
    };
    Form.prototype.handleOnFormSubmit = function (e) {
        e.preventDefault();
        this.handleClearErrorMsgs();
        var fd = new FormData(e.target);
    };
    Form.prototype.handleOnFormData = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, email, message, phoneNumber, resp, data, parent_1, msg, pEl, _a, email_1, message_1, error_message, emailField, msgField, inputList, i, formControl, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        formData = e.formData;
                        if (!formData)
                            return [2 /*return*/];
                        email = formData.get("email");
                        message = formData.get("message");
                        phoneNumber = formData.get("phone_number");
                        return [4 /*yield*/, fetch("http://localhost:8281/api/v1/andrew-mccall/contact", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    email: email,
                                    message: message,
                                    phone_number: phoneNumber,
                                })
                            })];
                    case 1:
                        resp = _b.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        data = _b.sent();
                        switch (resp.statusText) {
                            case "OK":
                                parent_1 = this.form.parentElement;
                                this.form.remove();
                                msg = "Thank you for contacting me. I look forward to responding to your inquiry";
                                pEl = document.createElement('p');
                                pEl.textContent = msg;
                                parent_1.appendChild(pEl);
                                break;
                            default:
                                _a = data.data, email_1 = _a.email, message_1 = _a.message;
                                error_message = data.error_message;
                                emailField = this.form.querySelector('input[name="email"]');
                                emailField.value = email_1;
                                msgField = this.form.querySelector('textarea[name="message"]');
                                msgField.textContent = message_1;
                                inputList = [emailField, msgField];
                                for (i = 0; i < inputList.length; i++) {
                                    formControl = inputList[i].closest('.form-control');
                                    formControl.querySelector('small[data-id*="error"]').textContent = error_message;
                                }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.error(err_1.message);
                        throw new Error(err_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Form;
}());
exports.Form = Form;
