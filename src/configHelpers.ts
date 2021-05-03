import * as fs from "fs";
import * as path from "path";
import * as Yaml from "yamljs";
import { ConfigValueType } from "./types";

const projectRoot = path.join(__dirname, "..");

export function loadConfigfromYaml(configPath: string): Record<string, any> {
    const configFromRootDir = path.join(projectRoot, configPath);
    const checkedConfigPath = fs.existsSync(configPath) ? configPath : fs.existsSync(configFromRootDir) ? configFromRootDir : undefined;

    if (!checkedConfigPath) {
        throw new Error(`Configuration file ${configPath} does not exist`);
    }

    return Yaml.load(configPath);
}

export function getEnvironmentVariableKeys(): string[] {
    return Object.keys(process.env);
}

export function loadEnvironmentVariable(key: string, type: ConfigValueType) {
    const value = process.env[key];

    if (value === undefined) {
        return undefined;
    }

    // All env variables are set as strings, so we need to check first if we can parse them
    switch (type) {
        case "boolean":
            if (["true", "false"].includes(value)) {
                return Boolean(value);
            }
            break;
        case "number":
            if (value !== "" && Number(value) !== NaN) {
                return Number(value);
            }
            break;
        case "string":
            if (value !== "") {
                return value;
            }
            break;
    }

    throw new Error(`Invalid ENV value of property '${key}', which should be of type '${type}'.`);
}
