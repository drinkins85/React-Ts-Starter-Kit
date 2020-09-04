module.exports = {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-airbnb',
        'stylelint-config-rational-order'
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-order',
    ],
    rules: {
        'color-no-invalid-hex': true,
        indentation: 4,
        'function-comma-space-after': 'always-single-line',
        'color-named': 'never'
    }
};
