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
var Input_vue_1 = require("@/components/atoms/Input.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('Input.vue', function () {
    (0, vitest_1.it)('aplica o type corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(Input_vue_1.default, {
            props: {
                modelValue: '',
                type: 'email',
            },
        });
        (0, vitest_1.expect)(wrapper.find('input').attributes('type')).toBe('email');
    });
    (0, vitest_1.it)('exibe placeholder quando fornecido', function () {
        var placeholderText = 'Digite seu email';
        var wrapper = (0, test_utils_1.mount)(Input_vue_1.default, {
            props: {
                modelValue: '',
                placeholder: placeholderText,
            },
        });
        (0, vitest_1.expect)(wrapper.find('input').attributes('placeholder')).toBe(placeholderText);
    });
    (0, vitest_1.it)('aplica v-model corretamente', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, input;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(Input_vue_1.default, {
                        props: {
                            modelValue: 'valor inicial',
                        },
                    });
                    input = wrapper.find('input');
                    (0, vitest_1.expect)(input.element.value).toBe('valor inicial');
                    return [4 /*yield*/, input.setValue('novo valor')];
                case 1:
                    _b.sent();
                    (0, vitest_1.expect)(wrapper.emitted()).toHaveProperty('update:modelValue');
                    (0, vitest_1.expect)((_a = wrapper.emitted('update:modelValue')) === null || _a === void 0 ? void 0 : _a[0]).toEqual(['novo valor']);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('aplica todas as classes CSS corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(Input_vue_1.default, {
            props: { modelValue: '' },
        });
        var expectedClasses = [
            'border',
            'border-surface',
            'rounded',
            'px-3',
            'py-2',
            'w-full',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-accent',
            'text-text',
            'placeholder-muted',
        ];
        expectedClasses.forEach(function (className) {
            (0, vitest_1.expect)(wrapper.find('input').classes()).toContain(className);
        });
    });
    (0, vitest_1.it)('emite evento update:modelValue ao digitar', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, input, emittedEvents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(Input_vue_1.default, {
                        props: { modelValue: '' },
                    });
                    input = wrapper.find('input');
                    return [4 /*yield*/, input.setValue('testando')];
                case 1:
                    _a.sent();
                    emittedEvents = wrapper.emitted('update:modelValue');
                    (0, vitest_1.expect)(emittedEvents).toBeDefined();
                    (0, vitest_1.expect)(emittedEvents === null || emittedEvents === void 0 ? void 0 : emittedEvents.length).toBe(1);
                    (0, vitest_1.expect)(emittedEvents === null || emittedEvents === void 0 ? void 0 : emittedEvents[0]).toEqual(['testando']);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('atualiza o valor quando modelValue muda', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(Input_vue_1.default, {
                        props: { modelValue: 'valor antigo' },
                    });
                    (0, vitest_1.expect)(wrapper.find('input').element.value).toBe('valor antigo');
                    return [4 /*yield*/, wrapper.setProps({ modelValue: 'valor novo' })];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.find('input').element.value).toBe('valor novo');
                    return [2 /*return*/];
            }
        });
    }); });
});
