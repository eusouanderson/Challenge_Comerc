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
var MovieViewToggle_vue_1 = require("@/components/organisms/MovieViewToggle.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('MovieViewToggle.vue', function () {
    (0, vitest_1.it)('renders both toggle buttons', function () {
        var wrapper = (0, test_utils_1.mount)(MovieViewToggle_vue_1.default, {
            props: {
                currentView: 'all',
            },
        });
        var buttons = wrapper.findAll('button');
        (0, vitest_1.expect)(buttons.length).toBe(2);
        (0, vitest_1.expect)(buttons[0].text()).toBe('All Movies');
        (0, vitest_1.expect)(buttons[1].text()).toBe('My Movies');
    });
    (0, vitest_1.it)('applies active styles for "all" view', function () {
        var wrapper = (0, test_utils_1.mount)(MovieViewToggle_vue_1.default, {
            props: {
                currentView: 'all',
            },
        });
        var allButton = wrapper.find('button:first-child');
        var mineButton = wrapper.find('button:last-child');
        (0, vitest_1.expect)(allButton.classes()).toContain('bg-blue-500');
        (0, vitest_1.expect)(allButton.classes()).toContain('text-white');
        (0, vitest_1.expect)(mineButton.classes()).toContain('bg-gray-200');
        (0, vitest_1.expect)(mineButton.classes()).toContain('text-gray-600');
    });
    (0, vitest_1.it)('applies active styles for "mine" view', function () {
        var wrapper = (0, test_utils_1.mount)(MovieViewToggle_vue_1.default, {
            props: {
                currentView: 'mine',
            },
        });
        var allButton = wrapper.find('button:first-child');
        var mineButton = wrapper.find('button:last-child');
        (0, vitest_1.expect)(mineButton.classes()).toContain('bg-blue-500');
        (0, vitest_1.expect)(mineButton.classes()).toContain('text-white');
        (0, vitest_1.expect)(allButton.classes()).toContain('bg-gray-200');
        (0, vitest_1.expect)(allButton.classes()).toContain('text-gray-600');
    });
    (0, vitest_1.it)('emits viewChanged event with "all" when first button clicked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(MovieViewToggle_vue_1.default, {
                        props: {
                            currentView: 'mine', // Start with mine view
                        },
                    });
                    return [4 /*yield*/, wrapper.find('button:first-child').trigger('click')];
                case 1:
                    _b.sent();
                    (0, vitest_1.expect)(wrapper.emitted('viewChanged')).toBeTruthy();
                    (0, vitest_1.expect)((_a = wrapper.emitted('viewChanged')) === null || _a === void 0 ? void 0 : _a[0]).toEqual(['all']);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('emits viewChanged event with "mine" when second button clicked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(MovieViewToggle_vue_1.default, {
                        props: {
                            currentView: 'all', // Start with all view
                        },
                    });
                    return [4 /*yield*/, wrapper.find('button:last-child').trigger('click')];
                case 1:
                    _b.sent();
                    (0, vitest_1.expect)(wrapper.emitted('viewChanged')).toBeTruthy();
                    (0, vitest_1.expect)((_a = wrapper.emitted('viewChanged')) === null || _a === void 0 ? void 0 : _a[0]).toEqual(['mine']);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('has proper transition classes', function () {
        var wrapper = (0, test_utils_1.mount)(MovieViewToggle_vue_1.default, {
            props: {
                currentView: 'all',
            },
        });
        var buttons = wrapper.findAll('button');
        buttons.forEach(function (button) {
            (0, vitest_1.expect)(button.classes()).toContain('transition-colors');
        });
    });
    (0, vitest_1.it)('has consistent button styling', function () {
        var wrapper = (0, test_utils_1.mount)(MovieViewToggle_vue_1.default, {
            props: {
                currentView: 'all',
            },
        });
        var buttons = wrapper.findAll('button');
        buttons.forEach(function (button) {
            (0, vitest_1.expect)(button.classes()).toContain('px-6');
            (0, vitest_1.expect)(button.classes()).toContain('py-2');
            (0, vitest_1.expect)(button.classes()).toContain('font-bold');
            (0, vitest_1.expect)(button.classes()).toContain('rounded');
        });
    });
});
