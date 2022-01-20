"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const settings_config_1 = __importDefault(require("./settings.config"));
const texts_config_1 = __importDefault(require("./texts.config"));
exports.schemas = {
    user: {
        props: {
            name: joi_1.default.string().lowercase().trim()
                .min(settings_config_1.default.user.text.name.min).max(settings_config_1.default.user.text.name.max).required()
                .messages({
                'string.base': texts_config_1.default.ptbr.entities.user.validation.name.type,
                'string.min': texts_config_1.default.ptbr.entities.user.validation.name.min,
                'string.max': texts_config_1.default.ptbr.entities.user.validation.name.max,
                'any.required': texts_config_1.default.ptbr.entities.user.validation.name.required
            }),
            nickname: joi_1.default.string()
                .lowercase()
                .min(settings_config_1.default.user.text.nickname.min).max(settings_config_1.default.user.text.nickname.max).required()
                .messages({
                'string.base': texts_config_1.default.ptbr.entities.user.validation.nickname.type,
                'string.min': texts_config_1.default.ptbr.entities.user.validation.nickname.min,
                'string.max': texts_config_1.default.ptbr.entities.user.validation.nickname.max,
                'any.required': texts_config_1.default.ptbr.entities.user.validation.nickname.required,
                'string.nickname': texts_config_1.default.ptbr.entities.user.validation.nickname.invalidFormat
            }),
            description: joi_1.default.string()
                .min(0).max(2500).required()
                .messages({
                'string.base': texts_config_1.default.ptbr.entities.user.validation.description.type,
                'string.min': texts_config_1.default.ptbr.entities.user.validation.description.min,
                'string.max': texts_config_1.default.ptbr.entities.user.validation.description.max,
                'any.required': texts_config_1.default.ptbr.entities.user.validation.description.required,
            }),
            email: joi_1.default.string()
                .email().lowercase().required()
                .messages({
                'string.base': texts_config_1.default.ptbr.entities.user.validation.email.type,
                'any.required': texts_config_1.default.ptbr.entities.user.validation.email.required,
                'string.email': texts_config_1.default.ptbr.entities.user.validation.email.invalidFormat
            }),
            password: joi_1.default.string().trim()
                .min(settings_config_1.default.user.text.password.min).max(settings_config_1.default.user.text.password.max).required()
                .messages({
                'string.base': texts_config_1.default.ptbr.entities.user.validation.password.type,
                'any.required': texts_config_1.default.ptbr.entities.user.validation.password.required,
                'string.min': texts_config_1.default.ptbr.entities.user.validation.password.min,
                'string.max': texts_config_1.default.ptbr.entities.user.validation.password.max,
            })
        },
        methods: {
            validProp: async (name, value) => {
                return await exports.schemas.user.props[name].validateAsync(value);
            },
            validProps: async (nameProps, valuesProsp) => {
                var promises = [];
                for (let i = 0; i < nameProps.length; i++) {
                    promises.push(await exports.schemas.user.methods.validProp(nameProps[i], valuesProsp[nameProps[i]]));
                }
                return await Promise.all(promises);
            },
        }
    },
    link: {
        props: {
            type: joi_1.default.string().required()
                .messages({
                'string.base': texts_config_1.default.ptbr.entities.link.validation.type.type,
                'any.required': texts_config_1.default.ptbr.entities.link.validation.type.required,
            }),
            url: joi_1.default.string().required().regex(settings_config_1.default.link.text.url.regex)
                .messages({
                'string.base': texts_config_1.default.ptbr.entities.link.validation.url.type,
                'any.required': texts_config_1.default.ptbr.entities.link.validation.url.required,
                'string.pattern.base': texts_config_1.default.ptbr.entities.link.validation.url.invalidFormat
            })
        },
        methods: {
            validProp: async (name, value) => {
                return exports.schemas.link.props[name].validateAsync(value);
            },
            validProps: async (nameProps, valuesProsp) => {
                var promises = [];
                for (let i = 0; i < nameProps.length; i++) {
                    promises.push(exports.schemas.link.methods.validProp(nameProps[i], valuesProsp[nameProps[i]]));
                }
                return Promise.all(promises);
            },
        }
    }
};
