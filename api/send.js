export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  const text = `
📩 Nouveau message SnapFolio
👤 Nom : ${name}
📧 Email : ${email}
💬 Message : ${message}
  `;

  try {
    await fetch(
      `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TG_CHAT_ID,
          text
        })
      }
    );

    return res.status(200).json({ message: "Message envoyé ✅" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur ❌" });
  }
}
