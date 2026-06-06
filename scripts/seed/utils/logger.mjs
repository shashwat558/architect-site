// scripts/seed/utils/logger.mjs

const reset  = '\x1b[0m';
const bold   = '\x1b[1m';
const dim    = '\x1b[2m';
const green  = '\x1b[32m';
const yellow = '\x1b[33m';
const cyan   = '\x1b[36m';
const red    = '\x1b[31m';
const blue   = '\x1b[34m';

export const log = {
  title: (msg) => console.log(`\n${bold}${cyan}╔══════════════════════════════════════╗${reset}\n${bold}${cyan}  ${msg}${reset}\n${bold}${cyan}╚══════════════════════════════════════╝${reset}\n`),
  step:  (msg) => console.log(`${bold}${blue}▶ ${msg}${reset}`),
  ok:    (msg) => console.log(`${green}${msg}${reset}`),
  info:  (msg) => console.log(`${dim}${msg}${reset}`),
  warn:  (msg) => console.log(`${yellow}⚠ ${msg}${reset}`),
  error: (msg) => console.error(`${red}✗ ${msg}${reset}`),
};

export function summary(counts) {
  console.log(`\n${bold}${cyan}┌─────────────────────────────────────────┐${reset}`);
  console.log(`${bold}${cyan}│           SEED SUMMARY                  │${reset}`);
  console.log(`${bold}${cyan}├─────────────────────────────────────────┤${reset}`);
  for (const [type, count] of Object.entries(counts)) {
    const label = type.padEnd(20);
    const num   = String(count).padStart(4);
    console.log(`${bold}${cyan}│${reset}  ${label} ${green}${bold}${num} created${reset}       ${bold}${cyan}│${reset}`);
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`${bold}${cyan}├─────────────────────────────────────────┤${reset}`);
  console.log(`${bold}${cyan}│${reset}  ${bold}TOTAL${reset}                ${green}${bold}${String(total).padStart(4)} created${reset}       ${bold}${cyan}│${reset}`);
  console.log(`${bold}${cyan}└─────────────────────────────────────────┘${reset}\n`);
  console.log(`${green}${bold}✅  Seeding complete!${reset}\n`);
}
