import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Κάτι πήγε στραβά στο API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
