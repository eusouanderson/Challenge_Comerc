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
// @ts-nocheck
var ClientForm_vue_1 = require("@/components/molecules/ClientForm.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('ClienteForm.vue', function () {
    // Mock data for an existing client
    var existingClient = {
        name: 'Existing',
        lastname: 'Client',
        email: 'existing@test.com',
        cpf: '12345678901',
        cell: '11999999999',
        cep: '01001000',
        street: 'Existing Street',
        neighborhood: 'Existing Neighborhood',
        city: 'Existing City',
        uf: 'SP',
        status: 'active',
    };
    // Mock window.alert before each test
    (0, vitest_1.beforeEach)(function () {
        window.alert = vitest_1.vi.fn();
    });
    (0, vitest_1.it)('renderiza todos os campos do formulário', function () {
        var wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
            props: {
                modelValue: null, // For new client form
            },
        });
        var fields = [
            'name',
            'lastname',
            'email',
            'cpf',
            'cell',
            'cep',
            'street',
            'neighborhood',
            'city',
            'uf',
            'password',
            'status',
        ];
        fields.forEach(function (field) {
            (0, vitest_1.expect)(wrapper.find("#".concat(field)).exists()).toBe(true);
        });
    });
    (0, vitest_1.it)('emite evento save com dados do formulário', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
                        props: {
                            modelValue: null, // For new client form
                        },
                    });
                    // Fill out the form
                    return [4 /*yield*/, wrapper.find('#name').setValue('Test Name')];
                case 1:
                    // Fill out the form
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#lastname').setValue('Test Lastname')];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#email').setValue('test@example.com')];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#cpf').setValue('12345678901')];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#cell').setValue('11999999999')];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#cep').setValue('01001000')];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#street').setValue('Test Street')];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#neighborhood').setValue('Test Neighborhood')];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#city').setValue('Test City')];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#uf').setValue('SP')];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('#password').setValue('password123')];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, wrapper.find('form').trigger('submit.prevent')];
                case 12:
                    _b.sent();
                    (0, vitest_1.expect)(wrapper.emitted('save')).toBeTruthy();
                    (0, vitest_1.expect)((_a = wrapper.emitted('save')) === null || _a === void 0 ? void 0 : _a[0]).toEqual([
                        {
                            name: 'Test Name',
                            lastname: 'Test Lastname',
                            email: 'test@example.com',
                            cpf: '12345678901',
                            cell: '11999999999',
                            cep: '01001000',
                            street: 'Test Street',
                            neighborhood: 'Test Neighborhood',
                            city: 'Test City',
                            uf: 'SP',
                            password: 'password123',
                            status: 'active', // default value
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('não requer senha quando editando cliente existente', function () {
        var wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
            props: {
                modelValue: existingClient,
            },
        });
        var passwordInput = wrapper.find('#password');
        (0, vitest_1.expect)(passwordInput.attributes('required')).toBeUndefined();
    });
    (0, vitest_1.it)('requer senha quando criando novo cliente', function () {
        var wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
            props: {
                modelValue: null, // For new client form
            },
        });
        var passwordInput = wrapper.find('#password');
        (0, vitest_1.expect)(passwordInput.attributes('required')).toBeDefined();
    });
    (0, vitest_1.it)('preenche campos quando modelValue é fornecido', function () {
        var wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
            props: {
                modelValue: existingClient,
            },
        });
        (0, vitest_1.expect)(wrapper.find('#name').element.value).toBe(existingClient.name);
        (0, vitest_1.expect)(wrapper.find('#lastname').element.value).toBe(existingClient.lastname);
        (0, vitest_1.expect)(wrapper.find('#email').element.value).toBe(existingClient.email);
        (0, vitest_1.expect)(wrapper.find('#password').element.value).toBe('');
    });
    (0, vitest_1.it)('não emite save se campos obrigatórios estiverem vazios e mostra alerta', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
                        props: {
                            modelValue: null,
                        },
                    });
                    return [4 /*yield*/, wrapper.find('form').trigger('submit.prevent')];
                case 1:
                    _a.sent();
                    // Verify save was not emitted
                    (0, vitest_1.expect)(wrapper.emitted('save')).toBeUndefined();
                    // Verify alert was called with the correct message
                    (0, vitest_1.expect)(window.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('busca endereço quando CEP é válido', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock the fetch function
                    global.fetch = vitest_1.vi.fn(function () {
                        return Promise.resolve({
                            json: function () {
                                return Promise.resolve({
                                    logradouro: 'Praça da Sé',
                                    bairro: 'Sé',
                                    localidade: 'São Paulo',
                                    uf: 'SP',
                                });
                            },
                        });
                    });
                    wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
                        props: {
                            modelValue: null,
                        },
                    });
                    return [4 /*yield*/, wrapper.find('#cep').setValue('01001000')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, wrapper.find('#cep').trigger('blur')];
                case 2:
                    _a.sent();
                    // Wait for promises to resolve
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 3:
                    // Wait for promises to resolve
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.vm.form.street).toBe('Praça da Sé');
                    (0, vitest_1.expect)(wrapper.vm.form.city).toBe('São Paulo');
                    (0, vitest_1.expect)(wrapper.vm.autoFilled).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('não busca endereço quando CEP é inválido', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientForm_vue_1.default, {
                        props: {
                            modelValue: null,
                        },
                    });
                    return [4 /*yield*/, wrapper.find('#cep').setValue('123')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, wrapper.find('#cep').trigger('blur')];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.vm.autoFilled).toBe(false);
                    (0, vitest_1.expect)(wrapper.vm.form.street).toBe('');
                    return [2 /*return*/];
            }
        });
    }); });
});
