import { generateAIExplain } from "../services/geminiService.js";
import { prompts } from "../utils/aiPrompts.js";

export const explainCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }
    const prompt = prompts.explain(code);
    const explanation = await generateAIExplain(prompt);
    res.json({
      explanation: explanation.replace(/\n{2,}/g, "\n\n").trim(),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to explain code" });
  }
};
