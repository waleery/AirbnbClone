import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import reactNativeGlobals from "eslint-plugin-react-native-globals";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "universe",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        prettier: fixupPluginRules(prettier),
        "react-native-globals": reactNativeGlobals,
        react: fixupPluginRules(react),
        "react-native": fixupPluginRules(reactNative),
    },

    languageOptions: {
        globals: {
            ...reactNative.environments["react-native"]["react-native"],
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },

            project: "./tsconfig.json",
            files: ["*.ts", "*.tsx"],
        },
    },

    settings: {
        "import/ignore": ["react-native"],

        react: {
            version: "detect",
        },
    },

    rules: {
        '@typescript-eslint/ban-types': 'off',
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["error"],
        "react-native/no-single-element-style-arrays": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-empty-function": "off",
        "react/jsx-no-bind": ["warn"],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react-native/sort-styles": 0,
        "react/display-name": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-var-requires": "off",
    },
}];