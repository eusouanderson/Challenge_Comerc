"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MovieList_vue_1 = require("@/components/molecules/MovieList.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('MovieList.vue', function () {
    (0, vitest_1.it)('renderiza corretamente com slot padrão', function () {
        var wrapper = (0, test_utils_1.mount)(MovieList_vue_1.default, {
            slots: {
                default: '<div>Item 1</div><div>Item 2</div>',
            },
        });
        // A div principal + 2 slots = 3 divs no total
        (0, vitest_1.expect)(wrapper.findAll('div').length).toBe(3);
        (0, vitest_1.expect)(wrapper.text()).toContain('Item 1');
        (0, vitest_1.expect)(wrapper.text()).toContain('Item 2');
    });
    (0, vitest_1.it)('aplica classes CSS base corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(MovieList_vue_1.default);
        var baseClasses = [
            'bg-center',
            'grid',
            'grid-cols-1',
            'max-w-6xl',
            'gap-6',
            'mx-auto',
            'justify-items-center',
        ];
        baseClasses.forEach(function (className) {
            (0, vitest_1.expect)(wrapper.classes()).toContain(className);
        });
    });
    (0, vitest_1.it)('aplica classes responsivas corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(MovieList_vue_1.default);
        (0, vitest_1.expect)(wrapper.classes()).toContain('sm:grid-cols-2');
        (0, vitest_1.expect)(wrapper.classes()).toContain('md:grid-cols-3');
        (0, vitest_1.expect)(wrapper.classes()).toContain('lg:grid-cols-4');
    });
    (0, vitest_1.it)('aplica max-width corretamente', function () {
        var wrapper = (0, test_utils_1.mount)(MovieList_vue_1.default);
        (0, vitest_1.expect)(wrapper.classes()).toContain('max-w-6xl');
    });
    (0, vitest_1.it)('centraliza os itens horizontalmente', function () {
        var wrapper = (0, test_utils_1.mount)(MovieList_vue_1.default);
        (0, vitest_1.expect)(wrapper.classes()).toContain('mx-auto');
        (0, vitest_1.expect)(wrapper.classes()).toContain('justify-items-center');
    });
});
