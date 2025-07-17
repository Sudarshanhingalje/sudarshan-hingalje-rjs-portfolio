import cron from "node-cron";
import simpleGit from "simple-git";

const git = simpleGit();

cron.schedule("* * * * *", async () => {
  try {
    const status = await git.status();
    if (status.files.length === 0) {
      console.log(
        "⏳ No changes to commit at",
        new Date().toLocaleTimeString()
      );
      return;
    }

    await git.add(".");
    await git.commit("🔄 Auto commit");
    await git.push("origin", "main");
    console.log(
      "✅ Auto committed and pushed at",
      new Date().toLocaleTimeString()
    );
  } catch (error) {
    console.error("❌ Git auto-commit failed:", error.message);
  }
});

console.log("🚀 Auto-commit script started ....");
