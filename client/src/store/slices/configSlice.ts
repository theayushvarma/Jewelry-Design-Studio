import { createSlice } from "@reduxjs/toolkit";

interface ConfigState {
  data: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  filterOptions: Record<string, any>;
  defaultFilters: Record<string, any>;
}

const staticData = {
  success: true,
  message: "Parameter",
  data: {
    // diamond_type: ["lab"],
    shape: [
      "round",
      "oval",
      "cushion",
      "emerald",
      "princess",
      "radiant",
      "pear",
      "marquise",
      "asscher",
      "heart",
    ],
    color: [
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "op",
      "qr",
      "st",
      "uv",
      "wx",
      "yz",
    ],
    clarity: [
      "fl",
      "if",
      "vvs1",
      "vvs2",
      "vs1",
      "vs2",
      "si1",
      "si2",
      "si3",
      "i1",
      "i2",
      "i3",
    ],
    fancy_color: [
      "yellow",
      "pink",
      "blue",
      "red",
      "brown",
      "green",
      "purple",
      "orange",
      "violet",
      "grey",
      "black",
      "champange",
      "other",
    ],
    lab: ["gia", "igi", "ags"],
    cut: ["id", "ex", "vg", "gd", "fr"],
    polish: ["ex", "vg", "gd", "fr"],
    symmetry: ["ex", "vg", "gd", "fr"],
    fluorescence: ["non", "fnt", "med", "slt", "stg", "vst"],
    eyeclean: [""],
    country: ["usa", "hong kong", "uk", "israel", "belgium", "india"],
    currency_type: null,
    currency_symbol: "€",
    colorcode: "#A18D77",
    price: [1, 80000],
    carat: [0.18, 30],
    display_price: 1,
    text1: null,
    text2: null,
    text3: null,
  },
};

const initialState: ConfigState = {
  data: staticData.data,
  token: "", // optional placeholder token
  loading: false,
  error: null,
  filterOptions: staticData.data,
  defaultFilters: {
    diamond_type: ["natural"],
    sort_field: "price",
    sort_order: "asc",
    shape: [],
    fancy_color: [],
  },
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    resetConfig(state) {
      // restore to initial static data
      return initialState;
    },
  },
});

export const { resetConfig } = configSlice.actions;

export default configSlice.reducer;
