// /src/utils/priorityLogic.js

export function generatePriorityFlags(parsed) {
  const high = [];
  const medium = [];
  const low = [];

  Object.values(parsed || {}).forEach(p => {
    const flag = (p.flag || "").toLowerCase();
    const test = {
      label: p.label,
      code: p.code,
      value: p.value,
      unit: p.unit,
      flag: p.flag
    };

    // High priority markers
    if (["high", "very high", "critical", "low"].includes(flag)) {
      high.push(test);
    }
    // Medium priority markers
    else if (["borderline", "mild high", "mild low"].includes(flag)) {
      medium.push(test);
    }
    // Normal / low priority
    else {
      low.push(test);
    }
  });

  return { high, medium, low };
}
