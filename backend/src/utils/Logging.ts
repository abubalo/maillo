import kleur from "kleur";

export default class Logging {
  public static log = (arg: unknown) => this.info(arg);

  public static info(arg: unknown) {
    console.log(
      kleur.blue(`[${new Date().toLocaleString()}][INFO]`),
      typeof arg === "string" ? kleur.blue().bold(arg) : arg
    );
  }

  public static warn(arg: unknown) {
    console.log(kleur.yellow(`[${new Date().toLocaleDateString()}][WARN]`)),
      typeof arg === "string" ? kleur.yellow().bold(arg) : arg;
  }
  public static error(arg: unknown) {
    console.log(kleur.red(`[${new Date().toLocaleDateString()}][ERROR]`)),
      typeof arg === "string" ? kleur.red().bold(arg) : arg;
  }
}
