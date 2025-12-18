import Result from '../models/resultModel.js';
import jwt from "jsonwebtoken";

// Function to generate tokens
export function generateTokens(user) {
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}

export async function createResult(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { title, technology, level, totalQuestions, correct, wrong } = req.body;

    if (!technology || !level || totalQuestions === undefined || correct === undefined) {
      return res.status(400).json({ success: false, message: "Missing Fields" });
    }

    const computedWrong = wrong !== undefined ? Number(wrong) : Math.max(0, totalQuestions - correct);

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const payload = {
      title: String(title).trim(),
      technology,
      level,
      totalQuestions: Number(totalQuestions),
      corrects: Number(correct),
      wrong: computedWrong,
      userId: req.user._id
    };

    const created = await Result.create(payload);

    return res.status(201).json({
      success: true,
      message: "Result created successfully",
      result: created
    });
  } catch (error) {
    console.error("Error in createResult:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function listResults(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { technology } = req.query;
    const query = { userId: req.user._id };

    if (technology && technology.toLowerCase() !== "all") {
      query.technology = technology;
    }

    const items = await Result.find(query).sort({ createdAt: -1 }).lean();

    return res.status(200).json({ success: true, results: items });
  } catch (error) {
    console.error("Error in listResults:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
