export function transformDiamondData(raw: any[]): any[] {
  return raw.map((res) => {
    const main: string[] = [],
      para: string[] = [],
      sidePara: string[] = [],
      secMain: string[] = [];

    Object.keys(res).forEach((key) => {
      if (key === "shape" && res[key]) {
        const shape = res[key].slice(0, 1) + res[key].slice(1).toLowerCase();
        secMain.push(shape);
      } else if (key === "color" && res[key]) {
        main.push(res[key]);
      } else if (key === "clarity" && res[key]) {
        main.push(res[key]);
      } else if (key === "cut" && res[key]) {
        let value: string = res[key];
        switch (value) {
          case "EX":
            value = "Excellent";
            break;
          case "VG":
            value = "Very Good";
            break;
          case "GD":
            value = "Good";
            break;
          case "ID":
            value = "Ideal";
            break;
          case "FR":
            value = "Fair";
            break;
        }
        secMain.push(`${value} Cut`);
        res["CUT_Full"] = `${value} Cut`;
      } else if (key === "lab" && res[key]) {
        sidePara.push(res[key]);
      } else if (key === "diamond_type") {
        res["d_type"] =
          res[key] === "W" ? "Natural" : res[key] === "L" ? "Lab Grown" : "";
      }
    });

    return {
      ...res,
      itemHead: main,
      itemsSubHead: para,
      flourLab: sidePara,
      secondItemHead: secMain,
    };
  });
}

export const sanitizeText = (
  input: string | null | undefined
): string | null | undefined => {
  return !!input
    ? String(input)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
    : input;
};

export const sanitizeNumbers = (
  input: string | null | undefined
): string | null | undefined => {
  return !!input ? String(input).replace(/[^0-9]/g, "") : input;
};

export const sanitizeNumbersCommasSpaces = (
  input: string | null | undefined
): string | null | undefined => {
  return !!input ? String(input).replace(/[^0-9, ]/g, "") : input;
};

export const roundOff = (number: number, digits: number): number => {
  try {
    return Number(number.toFixed(digits));
  } catch (error) {
    return number;
  }
};

export const formatText = (
  text: string,
  formatType: "upper" | "sentence" | "lower"
) => {
  switch (formatType) {
    case "upper":
      return text.toUpperCase();

    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

    case "lower":
      return text.toLowerCase();

    default:
      return text;
  }
};

export const getNameLogo = (text) => {
  try {
    return text
      .split(" ")
      .filter(Boolean) 
      .slice(0, 2) 
      .map((word) => word[0].toUpperCase())
      .join("");
  } catch (error) {
    return "-";
  }
};

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (password: string) => password.length >= 6;


export function openExternalLink(
  url: string,
  target: "_blank" | "_self" | "_parent" | "_top" = "_blank"
): void {
  if (!url) {
    return;
  }

  const width = 600;
  const height = 400;

  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  const newWindow = window.open(
    url,
    "popupWindow",
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );

  if (!newWindow) {
    console.warn(
      "Failed to open the new window. It might be blocked by the browser."
    );
  } else {
    newWindow.opener = null; 
  }
}

export function formatPrice(priceAUD, currency = "$") {
  let cleanedPrice = String(priceAUD).replace(/[^\d.]/g, "");

  let numericPrice = parseFloat(cleanedPrice);
  if (isNaN(numericPrice)) return numericPrice;

  return `${currency}${numericPrice
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function formatPriceWithPostFix(
  priceAUD,
  currencySymbol = "$",
  currencyCode = "USD"
) {
  let cleanedPrice = String(priceAUD).replace(/[^\d.]/g, "");

  let numericPrice = parseFloat(cleanedPrice);
  if (isNaN(numericPrice)) return numericPrice;

  return `${currencySymbol}${numericPrice
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}(${currencyCode})`;
}

export function getCertificateLink(diamond) {
  if (!diamond) {
    return;
  }
  const { certificate_no, certificate_link } = diamond;
  if (!!certificate_no && !!certificate_link) {
    return (
      <span
        className="cursor-pointer hover:underline text-info"
        onClick={() => openExternalLink(certificate_link, "_blank")}
      >
        {certificate_no}
      </span>
    );
  } else {
    return (
      <span
        title="No Certificate Link Found"
        className="cursor-pointer hover:underline text-info"
      >
        {certificate_no || "-"}
      </span>
    );
  }
}

export const getMeasurement = (data) => {
  if (!!data?.width && !!data?.length && !!data?.depth) {
    return `${Number(data?.width).toFixed(2)} * ${Number(data?.length).toFixed(2)} * ${Number(data?.depth).toFixed(2)}`;
  } else {
    ("-");
  }
};
export const getRatio = (data) => {
  if (!!data?.width && !!data?.length) {
    return `${(Number(data?.length) / Number(data?.width)).toFixed(2)}`;
  } else {
    ("-");
  }
};

export const getDiamondTitle = (data) => {
  return `${data?.carat} Carat ${data?.shape} Diamond`;
};

export function hexToHSL(hex: string): string {
  hex = hex.replace(/^#/, "");

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}
