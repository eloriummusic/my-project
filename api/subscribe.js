export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "invalid email" });
  }

  try {
    const response = await fetch("https://api.unisender.com/ru/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: process.env.UNISENDER_API_KEY,
        list_ids: process.env.UNISENDER_LIST_ID,
        fields: {
          email: email
        }
      })
    });

    const data = await response.json();

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
}