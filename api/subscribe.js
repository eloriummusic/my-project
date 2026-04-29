export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "invalid email" });
  }

  return res.status(200).json({ success: true, email });
}
