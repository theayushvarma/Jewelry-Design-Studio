// utility/generatePayloadFromFilters.js

const mapValues = {
  cut: {
    ideal: "id",
    very_good: "vg",
    good: "gd",
    fair: "fr",
    poor: "pr",
  },
  diamond_type: {
    natural: "natural",
    labgrown: "labgrown",
  },
  polish: {
    ideal: "ex",
    very_good: "vg",
    good: "gd",
    fair: "fr",
    poor: "pr",
  },
  symmetry: {
    ideal: "ex",
    very_good: "vg",
    good: "gd",
    fair: "fr",
    poor: "pr",
  },
  fluorescence: {
    none: "non",
    faint: "fnt",
    medium: "med",
    strong: "stg",
    very_strong: "vst",
  },
  clarity: {
    IF: "if",
    VVS1: "vvs1",
    VVS2: "vvs2",
    VS1: "vs1",
    VS2: "vs2",
    SI1: "si1",
    SI2: "si2",
    I1: "i1",
    I2: "i2",
    I3: "i3",
  },
  color: {
    D: "d",
    E: "e",
    F: "f",
    G: "g",
    H: "h",
    I: "i",
    J: "j",
    K: "k",
    L: "l",
    M: "m",
  },
};

export function generatePayloadFromFilters(filters, token) {
  const payload = { token };

  const convert = (list = [], key = "") =>
    list.map((item) => mapValues[key]?.[item] || item).join(",");

  if (filters.diamond_type) {
    payload.diamond_type = mapValues["diamond_type"][filters.diamond_type];
  }
  if (filters.sort_order) {
    payload.sort_order = filters.sort_order;
  }
  if (filters.sort_field) {
    payload.sort_field = filters.sort_field;
  }

  const arrayFields = [
    "clarity",
    "color",
    "carat",
    "cut",
    "polish",
    "symmetry",
    "fluorescence",
    "fancy_color",
    "lab",
    "priceAUD",
    "shape",
    "table",
    "depth",
  ];

  arrayFields.forEach((field) => {
    const value = filters[field];
    if (!Array.isArray(value) || value.length === 0) return;

    const isNumericRange =
      value.length === 2 && value.every((v) => !isNaN(parseFloat(v)));
    const converted = isNumericRange
      ? `${value[0]}-${value[1]}`
      : convert(value, field);

    // Handle fancy_color and color logic
    if (field === "fancy_color" || field === "color") {
      if (filters?.isFancyActive && field === "fancy_color") {
        payload.fancy_color = converted;
        delete payload.color;
      } else if (!filters?.isFancyActive && field === "color") {
        payload.color = converted;
        delete payload.fancy_color;
      }
    } if (field === "lab") {
      payload[field] = converted?.toUpperCase();
    } else {
      payload[field] = converted;
    }
  });

  return payload;
}
