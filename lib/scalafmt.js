"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scalafmt = void 0;
const core = __importStar(require("@actions/core"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const process = __importStar(require("child_process"));
const util = __importStar(require("util"));
const exec = util.promisify(process.exec);
const homedir = os.homedir();
const bin = path.join(homedir, 'bin');
const scalafmtPath = path.join(bin, 'scalafmt-native');
function scalafmt(version, args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setup();
        yield install(version);
        return yield execute(args);
    });
}
exports.scalafmt = scalafmt;
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        core.startGroup(`Setup`);
        yield exec(`mkdir -p ${bin}`);
        core.endGroup();
    });
}
function install(version) {
    return __awaiter(this, void 0, void 0, function* () {
        core.startGroup(`Install scalafmt-native:${version}`);
        const installerUrl = 'https://raw.githubusercontent.com/scalameta/scalafmt/master/bin/install-scalafmt-native.sh';
        const cmd = `curl -sL ${installerUrl} | bash -sv -- ${version} ${scalafmtPath} 2>&1`;
        const { stdout } = yield exec(cmd);
        core.info(stdout);
        core.endGroup();
    });
}
function execute(args) {
    return __awaiter(this, void 0, void 0, function* () {
        core.startGroup(`scalafmt-native ${args}`);
        try {
            const { stdout } = yield exec(`${scalafmtPath} ${args}`);
            core.info(stdout);
            core.endGroup();
            return stdout;
        }
        catch (error) {
            core.info(error.stdout.toString());
            core.endGroup();
            return Promise.reject(error);
        }
    });
}
