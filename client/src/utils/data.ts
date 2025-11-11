export const tooltipData = {
  sort_by: {
    title: "Sort By",
    content:
      "Choose the diamond's shape. Common options include Round, Princess, Oval, and more.",
  },
  id: {
    title: "Report Number",
    content:"Enter Report Number to search.",
  },
  quickShip: {
    title: "Quick Ship",
    content:"This is quick ship",
  },
  shape: {
    title: "Shape",
    content:
      "Choose the diamond's shape. Common options include Round, Princess, Oval, and more.",
  },
  carat: {
    title: "Carat",
    content:
      "Select the diamond's weight in carats. Higher carat means a larger and heavier diamond.",
  },
  priceAUD: {
    title: "Price",
    content:
      "Select the priceAUD range to get results.",
  },
  color: {
    title: "Color",
    content:
      "Diamond color is graded from D (colorless) to M (faint yellow). Less color usually means higher value.",
  },
  clarity: {
    title: "Clarity",
    content:
      "Clarity refers to the presence of internal or external imperfections. Graded from IF (flawless) to I3 (included).",
  },
  cut: {
    title: "Cut",
    content:
      "Cut measures how well a diamond reflects light. Options include Ideal, Very Good, Good, Fair, and Poor.",
  },
  polish: {
    title: "Polish",
    content:
      "Polish describes the smoothness of the diamond's surface. A high polish grade enhances sparkle.",
  },
  symmetry: {
    title: "Symmetry",
    content:
      "Symmetry evaluates how precisely the diamond’s facets are aligned. Higher symmetry contributes to better brilliance.",
  },
  fluorescence: {
    title: "Fluorescence",
    content:
      "Indicates how the diamond reacts to UV light. Ranges from Faint to Very Strong or None.",
  },
  table: {
    title: "Table",
    content:
      "The table is the top flat facet of the diamond, shown as a percentage of the total width. Affects brilliance.",
  },
  depth: {
    title: "Depth",
    content:
      "Depth is the height of the diamond from table to culet, shown as a percentage. Influences sparkle and proportions.",
  },
  fancy_color: {
    title: "Fancy Color",
    content:
      "Fancy-colored diamonds are graded by hue and intensity. Includes rare colors like pink, blue, green, etc.",
  },
  lab: {
    title: "Lab",
    content:
      "Choose the diamond certification authority. GIA is the most reputable, others include IGI, HRD, EGL, and more.",
  },
  appliedFilter: {
    title: "Applied Filter",
    content: "These are the filters that you have applied",
  },
  diamond_type: {
    title: "Diamond Type",
    content: "These are the diamond type that you have applied",
  },
  sort_order: {
    title: "Sort Order",
    content: "These are the sort order that you have applied",
  },
  sort_field: {
    title: "Sort By",
    content: "These are the sort by that you have applied",
  },
};

export const getFilterLabel = (key: string): string => {
  const labelMap: Record<string, string> = {
    diamond_type: "Diamond Type",
    cut: "Cut",
    color: "Color",
    clarity: "Clarity",
    shape: "Shape",
    fluorescence: "Fluorescence",
    polish: "Polish",
    symmetry: "Symmetry",
    lab: "Lab",
    fancy_color: "Fancy Color",
    carat: "Carat",
    priceAUD: "Price",
    table: "Table",
    depth: "Depth",
    sortby: "Sort By",
    sortorder: "Sort Order",
    round: "Round",
    princess: "Princess",
    asscher: "Asscher",
    emerald: "Emerald",
    heart: "Heart",
    oval: "Oval",
    pear: "Pear",
    cushion: "Cushion",
    radiant: "Radiant",
    star: "Star",
    natural: "Natural",
    labgrown: "Lab Grown",
    ideal: "Ideal",
    very_good: "Very Good",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    id: "ID",
    ex: "EX",
    vg: "VG",
    gd: "GD",
    fr: "FR",
    d: "D",
    e: "E",
    f: "F",
    g: "G",
    h: "H",
    i: "I",
    j: "J",
    k: "K",
    l: "L",
    m: "M",
    op: "OP",
    qr: "QR",
    st: "ST",
    uv: "UV",
    wx: "WX",
    yz: "YZ",
    blue: "Blue",
    pink: "Pink",
    yellow: "Yellow",
    green: "Green",
    red: "Red",
    purple: "Purple",
    orange: "Orange",
    brown: "Brown",
    gray: "Gray",
    if: "IF",
    vvs1: "VVS1",
    vvs2: "VVS2",
    vs1: "VS1",
    vs2: "VS2",
    si1: "SI1",
    si2: "SI2",
    i1: "I1",
    i2: "I2",
    i3: "I3",
    faint: "Faint",
    medium: "Medium",
    strong: "Strong",
    very_strong: "Very Strong",
    none: "None",
    id: "Certifucate",
    gia: "GIA",
    agl: "AGL",
    igi: "IGI",
    ags: "AGS",
    hrd: "HRD",
    egl: "EGL",
    non: "NON",
    fnt: "FNT",
    med: "MED",
    slt: "SLT",
    stg: "STG",
    vst: "VST",
    other: "Other",
    asc: "Ascending",
    desc: "Descending",
    sort_by: "Sort By",
  };

  return labelMap[key] || formatKeyToLabel(key);
};

const formatKeyToLabel = (key: string): string =>
  !!key
    ? key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : key;

export function getFullForm(key, value) {
  if (!!key) key = key.toLowerCase();
  if (!!value) value = value.toLowerCase();

  const map = {
    cut: {
      id: "Ideal",
      ex: "Excellent",
      vg: "Very Good",
      gd: "Good",
      fr: "Fair",
    },
    polish: {
      ex: "Excellent",
      vg: "Very Good",
      gd: "Good",
      fr: "Fair",
    },
    symmetry: {
      ex: "Excellent",
      vg: "Very Good",
      gd: "Good",
      fr: "Fair",
    },
    fluorescence: {
      non: "None",
      fnt: "Faint",
      med: "Medium",
      slt: "Slight",
      stg: "Strong",
      vstr: "Very Strong",
      vst: "Very Strong",
    },
    clarity: {
      fl: "Flawless",
      if: "Internally Flawless",
      vvs1: "Very Very Slightly Included 1",
      vvs2: "Very Very Slightly Included 2",
      vs1: "Very Slightly Included 1",
      vs2: "Very Slightly Included 2",
      si1: "Slightly Included 1",
      si2: "Slightly Included 2",
      si3: "Slightly Included 3",
      i1: "Included 1",
      i2: "Included 2",
      i3: "Included 3",
    },
    color: {
      fancy: "Fancy",
      d: "Colorless (D)",
      e: "Colorless (E)",
      f: "Colorless (F)",
      g: "Near Colorless (G)",
      h: "Near Colorless (H)",
      i: "Near Colorless (I)",
      j: "Near Colorless (J)",
      k: "Faint Yellow (K)",
      l: "Faint Yellow (L)",
      m: "Faint Yellow (M)",
      n: "Very Light Yellow (N)",
      op: "Light Yellow (O–P)",
      qr: "Light Yellow (Q–R)",
      st: "Light Yellow (S–T)",
      uv: "Light Yellow (U–V)",
      wx: "Light Yellow (W–X)",
      yz: "Light Yellow (Y–Z)",
    },
  };

  return map[key]?.[value] || value;
}
