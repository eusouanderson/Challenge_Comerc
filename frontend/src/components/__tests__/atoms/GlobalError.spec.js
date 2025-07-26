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
var GlobalError_vue_1 = require("@/components/atoms/GlobalError.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('GlobalError.vue', function () {
    (0, vitest_1.it)('não renderiza quando errorMessage está vazio', function () {
        var wrapper = (0, test_utils_1.mount)(GlobalError_vue_1.default, {
            props: { errorMessage: '' },
        });
        (0, vitest_1.expect)(wrapper.find('[role="alert"]').exists()).toBe(false);
    });
    (0, vitest_1.it)('renderiza corretamente quando errorMessage existe', function () {
        var errorMsg = 'Erro de teste';
        var wrapper = (0, test_utils_1.mount)(GlobalError_vue_1.default, {
            props: { errorMessage: errorMsg },
        });
        var alert = wrapper.find('[role="alert"]');
        (0, vitest_1.expect)(alert.exists()).toBe(true);
        (0, vitest_1.expect)(alert.text()).toContain(errorMsg);
        (0, vitest_1.expect)(alert.classes()).toContain('bg-red-100');
        (0, vitest_1.expect)(alert.classes()).toContain('border-red-400');
    });
    (0, vitest_1.it)('contém a estrutura correta do DOM', function () {
        var wrapper = (0, test_utils_1.mount)(GlobalError_vue_1.default, {
            props: { errorMessage: 'Teste' },
        });
        var alert = wrapper.find('[role="alert"]');
        (0, vitest_1.expect)(alert.find('strong').text()).toBe('Erro:');
        (0, vitest_1.expect)(alert.find('span').exists()).toBe(true);
        (0, vitest_1.expect)(alert.find('button').exists()).toBe(true);
        (0, vitest_1.expect)(alert.find('button').text()).toBe('×');
    });
    (0, vitest_1.it)('emite evento clear quando o botão é clicado', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(GlobalError_vue_1.default, {
                        props: { errorMessage: 'Teste' },
                    });
                    return [4 /*yield*/, wrapper.find('button').trigger('click')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(wrapper.emitted()).toHaveProperty('clear');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('aplica classes CSS corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(GlobalError_vue_1.default, {
            props: { errorMessage: 'Teste' },
        });
        var alert = wrapper.find('[role="alert"]');
        var expectedClasses = [
            'fixed',
            'top-4',
            'right-4',
            'max-w-sm',
            'bg-red-100',
            'border',
            'border-red-400',
            'text-red-700',
            'px-4',
            'py-3',
            'rounded',
            'shadow-lg',
            'z-50',
            'flex',
            'items-center',
            'space-x-3',
        ];
        expectedClasses.forEach(function (className) {
            (0, vitest_1.expect)(alert.classes()).toContain(className);
        });
        var button = wrapper.find('button');
        (0, vitest_1.expect)(button.classes()).toContain('text-red-700');
        (0, vitest_1.expect)(button.classes()).toContain('hover:text-red-900');
    });
    (0, vitest_1.it)('tem atributos ARIA corretos', function () {
        var wrapper = (0, test_utils_1.mount)(GlobalError_vue_1.default, {
            props: { errorMessage: 'Teste' },
        });
        var alert = wrapper.find('[role="alert"]');
        (0, vitest_1.expect)(alert.attributes('role')).toBe('alert');
        var button = wrapper.find('button');
        (0, vitest_1.expect)(button.attributes('aria-label')).toBe('Fechar');
    });
});
