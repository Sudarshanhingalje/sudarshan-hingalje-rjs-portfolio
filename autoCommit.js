const cron = require("node-cron");
const simpleGit = require("simple-git");
const git = simpleGit();

// ⏱️ Every 1 minute
cron.schedule("* * * * *", async () => {
  try {
    const status = await git.status();
    if (status.files.length === 0) {
      console.log("⏳ No changes to commit at", new Date());
      return;
    }

    await git.add(".");
    await git.commit("🔄 Auto commit");
    await git.push("origin", "main");
    console.log("✅ Auto committed and pushed at", new Date());
  } catch (error) {
    console.error("❌ Git auto-commit failed:", error.message);
  }
});

console.log("🚀 Auto-commit script started ....");
