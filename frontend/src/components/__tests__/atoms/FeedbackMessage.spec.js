"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeedbackMessage_vue_1 = require("@/components/atoms/FeedbackMessage.vue");
var test_utils_1 = require("@vue/test-utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('FeedbackMessage.vue', function () {
    (0, vitest_1.it)('renderiza corretamente com mensagem padrão', function () {
        var message = 'Operação realizada com sucesso!';
        var wrapper = (0, test_utils_1.mount)(FeedbackMessage_vue_1.default, {
            props: { message: message },
        });
        (0, vitest_1.expect)(wrapper.text()).toContain(message);
        (0, vitest_1.expect)(wrapper.classes()).toContain('bg-green-500');
        (0, vitest_1.expect)(wrapper.classes()).not.toContain('bg-red-500');
        (0, vitest_1.expect)(wrapper.classes()).toContain('fixed');
        (0, vitest_1.expect)(wrapper.classes()).toContain('bottom-4');
    });
    (0, vitest_1.it)('aplica classe de sucesso quando type é "success"', function () {
        var wrapper = (0, test_utils_1.mount)(FeedbackMessage_vue_1.default, {
            props: {
                message: 'Sucesso!',
                type: 'success',
            },
        });
        (0, vitest_1.expect)(wrapper.classes()).toContain('bg-green-500');
        (0, vitest_1.expect)(wrapper.classes()).not.toContain('bg-red-500');
    });
    (0, vitest_1.it)('aplica classe de erro quando type é "error"', function () {
        var wrapper = (0, test_utils_1.mount)(FeedbackMessage_vue_1.default, {
            props: {
                message: 'Erro ocorreu!',
                type: 'error',
            },
        });
        (0, vitest_1.expect)(wrapper.classes()).toContain('bg-red-500');
        (0, vitest_1.expect)(wrapper.classes()).not.toContain('bg-green-500');
    });
    (0, vitest_1.it)('renderiza a mensagem passada como prop', function () {
        var testMessage = 'Mensagem personalizada de teste';
        var wrapper = (0, test_utils_1.mount)(FeedbackMessage_vue_1.default, {
            props: { message: testMessage },
        });
        (0, vitest_1.expect)(wrapper.text()).toBe(testMessage);
    });
    (0, vitest_1.it)('possui classes CSS base sempre presentes', function () {
        var wrapper = (0, test_utils_1.mount)(FeedbackMessage_vue_1.default, {
            props: { message: 'Teste' },
        });
        var baseClasses = [
            'fixed',
            'bottom-4',
            'right-4',
            'text-white',
            'px-4',
            'py-2',
            'rounded',
            'shadow-lg',
            'transition-opacity',
            'duration-300',
        ];
        baseClasses.forEach(function (className) {
            (0, vitest_1.expect)(wrapper.classes()).toContain(className);
        });
    });
});
