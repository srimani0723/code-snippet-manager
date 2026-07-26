import { VM } from "vm2";

export const runJavaScriptCode = async (code) => {
  let logs = [];
  try {
    const vm = new VM({
      timeout: 1000,
      sandbox: {
        console: {
          log: (...args) => {
            logs.push(args.join(" "));
          },
        },
      },
    });
    const result = vm.run(code);

    let output = logs.join("\n");
    if (result !== undefined) {
      output += (output ? "\n" : "") + String(result);
    }
    return output || "Code executed successfully with no output.";
  } catch (error) {
    throw new Error(error.message);
  }
};
