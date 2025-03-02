import { NextApiRequest, NextApiResponse } from 'next';

interface PasswordAnalysisRequest extends NextApiRequest {
  body: {
    password: string;
  };
}

interface PasswordAnalysisResponse {
  result: any;
  isBreached: boolean;
}

export default async function handler(
  req: PasswordAnalysisRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Call Hugging Face API
    const API_URL =
      'https://api-inference.huggingface.co/models/Xenova/distilbert-base-password-analysis';
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: password }),
    });

    const data = await response.json();

    // Also check for common passwords (substitute for actual breach API in production)
    const commonPasswords = ['password', '123456', 'qwerty', 'admin'];
    const isBreached =
      commonPasswords.includes(password.toLowerCase()) ||
      password.toLowerCase().includes('123');

    const result: PasswordAnalysisResponse = {
      result: data,
      isBreached,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error analyzing password:', error);
    return res.status(500).json({ error: 'Failed to analyze password' });
  }
}
