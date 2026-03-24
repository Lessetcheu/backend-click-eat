import env from "../config/env.js";
import chalk from "chalk";
class Logger {
    static log(context, ...msg) {
        if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
            console.log(`[${context}]`, ...msg);
        }
    }
    static success(context, ...msg) {
        if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
            console.log(chalk.green(`[${context}]`), ...msg);
        }
    }
    static info(context, ...msg) {
        if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
            console.log(chalk.blue(`[${context}]`), ...msg);
        }
    }
    static warn(context, ...msg) {
        if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
            console.log(chalk.yellow(`[${context}]`), ...msg);
        }
    }
    static error(context, ...msg) {
        if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
            console.log(chalk.red(`[${context}]`), ...msg);
        }
    }
}
export default Logger;
//# sourceMappingURL=logger.js.map