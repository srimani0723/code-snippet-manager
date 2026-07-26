import { runJavaScriptCode } from "../services/compilerService.js";

export const javascriptCompiler = async (req, res) => {
  const { code } = req.body;
  console.log("Received code for compilation:", code);
  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }
  try {
    const result = await runJavaScriptCode(code);
    res.status(200).json({
      output: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
