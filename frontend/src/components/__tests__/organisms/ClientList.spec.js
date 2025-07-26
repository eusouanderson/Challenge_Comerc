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
var Input_vue_1 = require("@/components/atoms/Input.vue");
var ClientList_vue_1 = require("@/components/organisms/ClientList.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('ClientList.vue', function () {
    var mockClients = [
        {
            id: 1,
            name: 'John',
            lastname: 'Doe',
            cpf: '12345678901',
            status: 'active',
        },
        {
            id: 2,
            name: 'Jane',
            lastname: 'Smith',
            cpf: '98765432109',
            status: 'inactive',
        },
        {
            id: 3,
            name: 'Bob',
            lastname: 'Johnson',
            cpf: '45612378903',
            status: 'active',
        },
    ];
    (0, vitest_1.it)('renders correctly with clients', function () {
        var wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
            props: {
                clients: mockClients,
            },
        });
        (0, vitest_1.expect)(wrapper.find('table').exists()).toBe(true);
        (0, vitest_1.expect)(wrapper.findAll('tbody tr').length).toBe(mockClients.length);
    });
    (0, vitest_1.it)('shows empty state when no clients', function () {
        var wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
            props: {
                clients: [],
            },
        });
        (0, vitest_1.expect)(wrapper.find('table').exists()).toBe(true);
        (0, vitest_1.expect)(wrapper.find('td[colspan="4"]').text()).toContain('Nenhum cliente encontrado');
    });
    (0, vitest_1.it)('filters clients by search term', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, searchInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
                        props: {
                            clients: mockClients,
                        },
                    });
                    searchInput = wrapper.findComponent(Input_vue_1.default);
                    return [4 /*yield*/, searchInput.setValue('John')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.findAll('tbody tr').length).toBe(2); // John Doe and Bob Johnson
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('filters clients by CPF search', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, searchInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
                        props: {
                            clients: mockClients,
                        },
                    });
                    searchInput = wrapper.findComponent(Input_vue_1.default);
                    return [4 /*yield*/, searchInput.setValue('123')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.findAll('tbody tr').length).toBe(2); // 12345678901 and 45612378903
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('filters clients by status', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, statusSelect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
                        props: {
                            clients: mockClients,
                        },
                    });
                    statusSelect = wrapper.find('select');
                    return [4 /*yield*/, statusSelect.setValue('active')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.findAll('tbody tr').length).toBe(2); // John Doe and Bob Johnson
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('emits edit event when edit button is clicked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, firstEditButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
                        props: {
                            clients: mockClients,
                        },
                    });
                    firstEditButton = wrapper.findAll('button')[0];
                    return [4 /*yield*/, firstEditButton.trigger('click')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.emitted('edit')).toBeTruthy();
                    (0, vitest_1.expect)(wrapper.emitted('edit')[0]).toEqual([mockClients[0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('emits deactivate event when deactivate button is clicked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, firstDeactivateButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
                        props: {
                            clients: mockClients,
                        },
                    });
                    firstDeactivateButton = wrapper.findAll('button')[1];
                    return [4 /*yield*/, firstDeactivateButton.trigger('click')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.emitted('deactivate')).toBeTruthy();
                    (0, vitest_1.expect)(wrapper.emitted('deactivate')[0]).toEqual([mockClients[0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('combines name and lastname for search', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, searchInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
                        props: {
                            clients: mockClients,
                        },
                    });
                    searchInput = wrapper.findComponent(Input_vue_1.default);
                    return [4 /*yield*/, searchInput.setValue('Doe')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.findAll('tbody tr').length).toBe(1);
                    (0, vitest_1.expect)(wrapper.find('td').text()).toContain('John Doe');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('displays status correctly', function () {
        var wrapper = (0, test_utils_1.mount)(ClientList_vue_1.default, {
            props: {
                clients: mockClients,
            },
        });
        var statusCells = wrapper.findAll('td:nth-child(3)');
        (0, vitest_1.expect)(statusCells[0].text()).toBe('Ativo');
        (0, vitest_1.expect)(statusCells[1].text()).toBe('Inativo');
    });
});
