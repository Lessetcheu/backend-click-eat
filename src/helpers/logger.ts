import  env  from "../config/env.js";
import chalk from "chalk";

class Logger {
  static log(context: string, ...msg: Array<any>) {
    if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
      console.log(`[${context}]`,...msg);
    }
  }

  static success(context: string, ...msg: Array<any>) {
    if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
      console.log(chalk.green(`[${context}]`),...msg);
    }
  }

  static info(context: string, ...msg: Array<any>) {
    if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
      console.log(chalk.blue(`[${context}]`),...msg);
    }
  }

  static warn(context: string, ...msg: Array<any>) {
    if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
      console.log(chalk.yellow(`[${context}]`),...msg);
    }
  }

  static error(context: string, ...msg: Array<any>) {
    if (env.nodeEnv === "development" || env.nodeEnv === "staging") {
      console.log(chalk.red(`[${context}]`),...msg);
    }
  }
}

export default  Logger ;
