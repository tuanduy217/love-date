import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    const prompt = `
    Dựa trên lựa chọn của người dùng:
    - Bữa ăn: ${answers.mealType}
    - Loại món: ${answers.type}
    - Hương vị: ${answers.flavor}
    - Tâm trạng: ${answers.feeling}
    - Phong cách ẩm thực: ${answers.style}

    👉 Hãy làm 2 việc:
    Gợi ý 3 **món ăn cụ thể** phù hợp với các tiêu chí trên. Trình bày ngắn gọn, súc tích.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const suggestion = completion.choices[0].message?.content;
    return NextResponse.json({ suggestion });
  } catch (err) {
    console.error("Error generating suggestion:", err);
    return NextResponse.json(
      { suggestion: "Không thể lấy dữ liệu 😅" },
      { status: 500 }
    );
  }
}
