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
var MovieCard_vue_1 = require("@/components/atoms/MovieCard.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('MovieCard.vue', function () {
    var mockProps = {
        title: 'Inception',
        year: '2010',
        poster: 'https://example.com/poster.jpg',
    };
    (0, vitest_1.it)('renderiza corretamente com props', function () {
        var wrapper = (0, test_utils_1.mount)(MovieCard_vue_1.default, {
            props: mockProps,
        });
        (0, vitest_1.expect)(wrapper.find('img').attributes('src')).toBe(mockProps.poster);
        (0, vitest_1.expect)(wrapper.find('img').attributes('alt')).toBe(mockProps.title);
        (0, vitest_1.expect)(wrapper.find('h3').text()).toBe("".concat(mockProps.title, " (").concat(mockProps.year, ")"));
    });
    (0, vitest_1.it)('aplica classes CSS corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(MovieCard_vue_1.default, {
            props: mockProps,
        });
        var card = wrapper.find('div');
        (0, vitest_1.expect)(card.classes()).toContain('bg-white');
        (0, vitest_1.expect)(card.classes()).toContain('rounded-lg');
        (0, vitest_1.expect)(card.classes()).toContain('shadow-md');
        (0, vitest_1.expect)(card.classes()).toContain('hover:-translate-y-1');
        (0, vitest_1.expect)(card.classes()).toContain('transition-transform');
        var img = wrapper.find('img');
        (0, vitest_1.expect)(img.classes()).toContain('w-full');
        (0, vitest_1.expect)(img.classes()).toContain('h-[350px]');
        (0, vitest_1.expect)(img.classes()).toContain('object-cover');
        (0, vitest_1.expect)(img.classes()).toContain('bg-gray-200');
        var title = wrapper.find('h3');
        (0, vitest_1.expect)(title.classes()).toContain('truncate');
    });
    (0, vitest_1.it)('renderiza slot content corretamente', function () {
        var slotContent = '<p class="text-sm">Ação, Ficção Científica</p>';
        var wrapper = (0, test_utils_1.mount)(MovieCard_vue_1.default, {
            props: mockProps,
            slots: {
                default: slotContent,
            },
        });
        (0, vitest_1.expect)(wrapper.html()).toContain(slotContent);
    });
    (0, vitest_1.it)('trata erro de imagem corretamente', function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrapper, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = (0, test_utils_1.mount)(MovieCard_vue_1.default, {
                        props: mockProps,
                    });
                    img = wrapper.find('img');
                    return [4 /*yield*/, img.trigger('error')];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(img.attributes('src')).toBe('https://placehold.co/300x450.png?text=No+Poster+Available&font=roboto');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('formata o título corretamente com ano', function () {
        var wrapper = (0, test_utils_1.mount)(MovieCard_vue_1.default, {
            props: {
                title: 'The Dark Knight',
                year: '2008',
                poster: 'poster.jpg',
            },
        });
        (0, vitest_1.expect)(wrapper.find('h3').text()).toBe('The Dark Knight (2008)');
    });
    (0, vitest_1.it)('aplica hover effect corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(MovieCard_vue_1.default, {
            props: mockProps,
        });
        var card = wrapper.find('div');
        (0, vitest_1.expect)(card.classes()).toContain('hover:-translate-y-1');
        (0, vitest_1.expect)(card.classes()).toContain('transition-transform');
    });
});
