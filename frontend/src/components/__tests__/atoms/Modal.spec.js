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
var Modal_vue_1 = require("@/components/atoms/Modal.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('Modal.vue', function () {
    (0, vitest_1.it)('não renderiza quando visible é false', function () {
        var wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
            props: { visible: false },
        });
        (0, vitest_1.expect)(wrapper.find('.fixed').exists()).toBe(false);
    });
    (0, vitest_1.it)('renderiza corretamente quando visible é true', function () {
        var wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
            props: { visible: true },
        });
        (0, vitest_1.expect)(wrapper.find('.fixed').exists()).toBe(true);
        (0, vitest_1.expect)(wrapper.find('.bg-surface').exists()).toBe(true);
        (0, vitest_1.expect)(wrapper.find('button').exists()).toBe(true);
    });
    (0, vitest_1.it)('emite evento close quando o botão é clicado', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
                        props: { visible: true },
                    });
                    return [4 /*yield*/, wrapper.find('button').trigger('click')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.emitted()).toHaveProperty('close');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('renderiza slots corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
            props: { visible: true },
            slots: {
                default: 'Conteúdo principal do modal',
                title: 'Título do Modal',
            },
        });
        (0, vitest_1.expect)(wrapper.text()).toContain('Conteúdo principal do modal');
        (0, vitest_1.expect)(wrapper.text()).toContain('Título do Modal');
        (0, vitest_1.expect)(wrapper.find('h3').text()).toBe('Título do Modal');
    });
    (0, vitest_1.it)('aplica classes CSS corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
            props: { visible: true },
        });
        // Teste para classes do overlay
        var overlay = wrapper.find('.fixed');
        (0, vitest_1.expect)(overlay.classes()).toContain('bg-background/50');
        (0, vitest_1.expect)(overlay.classes()).toContain('flex');
        (0, vitest_1.expect)(overlay.classes()).toContain('items-center');
        (0, vitest_1.expect)(overlay.classes()).toContain('justify-center');
        // Teste para classes do container do modal
        var modalContainer = wrapper.find('.bg-surface');
        (0, vitest_1.expect)(modalContainer.classes()).toContain('rounded');
        (0, vitest_1.expect)(modalContainer.classes()).toContain('p-6');
        (0, vitest_1.expect)(modalContainer.classes()).toContain('max-w-3xl');
        (0, vitest_1.expect)(modalContainer.classes()).toContain('max-h-[90vh]');
        // Teste para classes do botão de fechar
        var closeButton = wrapper.find('button');
        (0, vitest_1.expect)(closeButton.classes()).toContain('text-muted');
        (0, vitest_1.expect)(closeButton.classes()).toContain('hover:text-accent');
        (0, vitest_1.expect)(closeButton.classes()).toContain('transition-colors');
    });
    (0, vitest_1.it)('possui estrutura DOM correta', function () {
        var wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
            props: { visible: true },
        });
        (0, vitest_1.expect)(wrapper.find('header').exists()).toBe(true);
        (0, vitest_1.expect)(wrapper.find('main').exists()).toBe(true);
        (0, vitest_1.expect)(wrapper.find('h3').exists()).toBe(true);
        (0, vitest_1.expect)(wrapper.find('button').text()).toBe('×');
    });
    (0, vitest_1.it)('aplica classes sticky no header', function () {
        var wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
            props: { visible: true },
        });
        var header = wrapper.find('header');
        (0, vitest_1.expect)(header.classes()).toContain('sticky');
        (0, vitest_1.expect)(header.classes()).toContain('top-0');
        (0, vitest_1.expect)(header.classes()).toContain('z-10');
    });
    (0, vitest_1.it)('configura scroll interno corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(Modal_vue_1.default, {
            props: { visible: true },
        });
        var main = wrapper.find('main');
        (0, vitest_1.expect)(main.classes()).toContain('overflow-y-auto');
        (0, vitest_1.expect)(main.classes()).toContain('max-h-[75vh]');
    });
});
