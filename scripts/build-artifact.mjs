// Turns the `vite build --mode artifact` output into a single page for the claude.ai artifact viewer:
// CSS and JS are inlined, and the public images are copied next to it.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const dist = "dist-artifact";
const out = `${dist}/page`;
const html = readFileSync(`${dist}/index.html`, "utf8");
const jsPath = html.match(/<script[^>]+src="\.\/([^"]+\.js)"/)?.[1];
const cssPath = html.match(/<link[^>]+href="\.\/([^"]+\.css)"/)?.[1];
if (!jsPath || !cssPath) throw new Error("Could not find the built JS/CSS in dist-artifact/index.html");

const js = readFileSync(`${dist}/${jsPath}`, "utf8").replace(/<\/script/gi, "<\\/script");
const css = readFileSync(`${dist}/${cssPath}`, "utf8");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync("public/images", `${out}/images`, { recursive: true });
cpSync("public/partners", `${out}/partners`, { recursive: true });

writeFileSync(
  `${out}/index.html`,
  `<title>Noor Textile</title>
<meta name="description" content="Noor Textile — premium ev tekstili: tikməli yastıqlar, süfrələr, salfetlər.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap">
<style>${css}</style>
<div id="app"></div>
<script type="module">${js}</script>
`,
);
console.log(`artifact page → ${out}/index.html (${(js.length / 1024).toFixed(0)} KB JS, ${(css.length / 1024).toFixed(0)} KB CSS)`);
