// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// PAGE-SPECIFIC: home
import enHome from "./locales/en/home.json";
import deHome from "./locales/de/home.json";
import itHome from "./locales/it/home.json";
import sqHome from "./locales/sq/home.json";

// PAGE-SPECIFIC: shop
import enShop from "./locales/en/shop.json";
import deShop from "./locales/de/shop.json";
import itShop from "./locales/it/shop.json";
import sqShop from "./locales/sq/shop.json";

// PAGE-SPECIFIC: member
import enMember from "./locales/en/member.json";
import deMember from "./locales/de/member.json";
import itMember from "./locales/it/member.json";
import sqMember from "./locales/sq/member.json";

// PAGE-SPECIFIC: checkout
import enCheckout from "./locales/en/checkout.json";
import deCheckout from "./locales/de/checkout.json";
import itCheckout from "./locales/it/checkout.json";
import sqCheckout from "./locales/sq/checkout.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: enHome,
        shop: enShop,
        member: enMember,
        checkout: enCheckout
      },
      de: {
        home: deHome,
        shop: deShop,
        member: deMember,
        checkout: deCheckout
      },
      it: {
        home: itHome,
        shop: itShop,
        member: itMember,
        checkout: itCheckout
      },
      sq: {
        home: sqHome,
        shop: sqShop,
        member: sqMember,
        checkout: sqCheckout
      }
    },

    lng: "en",
    fallbackLng: "en",

    // Add "home" namespace
    ns: ["home", "shop", "member", "checkout"],
    defaultNS: "home",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
