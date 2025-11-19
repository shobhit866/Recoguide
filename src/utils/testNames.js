import { CODE_MAP } from "./codeMap";

export const TEST_NAMES = {};

// Build reverse map
for (const [label, code] of Object.entries(CODE_MAP)) {
  if (!TEST_NAMES[code]) TEST_NAMES[code] = label;
}

// Clean names (first label for each code)
for (const code in TEST_NAMES) {
  // Capitalize smartly
  const name = TEST_NAMES[code]
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  TEST_NAMES[code] = `${name} (${code})`;
}
