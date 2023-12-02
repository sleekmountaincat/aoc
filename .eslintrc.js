const OFF = 0;
const ON = 2;

module.exports = exports = {
    root: true,
    env: {
        node: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint',],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended',],
    "rules": {
        "@typescript-eslint/no-non-null-assertion": OFF,
        "@typescript-eslint/ban-ts-comment": OFF,
        "@typescript-eslint/no-var-requires": OFF,
        "@typescript-eslint/no-unused-vars": ON
    }
};
