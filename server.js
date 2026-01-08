const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Mock bulk redeem API
app.post("/api/redeem", async (req, res) => {
  const { giftCode, playerIds } = req.body;

  if (!giftCode || !playerIds || !playerIds.length) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const results = playerIds.map((id) => {
    return {
      playerId: id,
      status: Math.random() > 0.2 ? "SUCCESS" : "FAILED",
      message: Math.random() > 0.2 ? "Redeemed successfully" : "Invalid or already used"
    };
  });

  // Simulate processing delay
  setTimeout(() => {
    res.json({ results });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
