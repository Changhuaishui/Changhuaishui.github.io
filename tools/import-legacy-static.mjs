import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const legacyRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(projectRoot, "..", "blog-temp");
const sourceRoot = path.join(projectRoot, "source");

const targets = [
  "2023",
  "2024",
  "2025",
  "2026",
  "image",
  "img",
  "links",
  "nlp-learning",
  "xml",
  "404.html",
];

if (!existsSync(legacyRoot)) {
  console.error(`Legacy site not found: ${legacyRoot}`);
  process.exit(1);
}

mkdirSync(sourceRoot, { recursive: true });

for (const entry of targets) {
  const from = path.join(legacyRoot, entry);
  const to = path.join(sourceRoot, entry);

  if (!existsSync(from)) {
    continue;
  }

  if (existsSync(to)) {
    rmSync(to, { recursive: true, force: true });
  }

  cpSync(from, to, { recursive: true, force: true });
  console.log(`Imported ${entry}`);
}

const imported = readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => targets.includes(entry.name))
  .map((entry) => entry.name);

console.log(`Legacy import complete: ${imported.join(", ")}`);
