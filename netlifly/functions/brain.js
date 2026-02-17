// brain.js - MASTER 2.0 CONFIGURATION & ADA MEDICAL OVERRIDE
module.exports = {
  // GOOGLE MASTER 2.0 IDENTITY
  GEO_ID: process.env.GOOGLE_2_0_GEO_ID,
  JAYZ_CLIENT_ID: process.env.GOOGLE_JAYZ_CLIENT_ID,
  JAYZ_CLIENT_SECRET: process.env.GOOGLE_JAYZ_CLIENT_SECRET,
  JAYZ_REFRESH_TOKEN: process.env.GOOGLE_JAYZ_REFRESH_TOKEN,

  // SHOPIFY PRODUCTION ACCESS
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_SECRET: process.env.SHOPIFY_SECRET,
  SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,

  // EMILY AUTOMATION & MEDICAL OVERRIDE POLICIES
  // Full authorization for vision/mobility impairment bypass
  AUTHORIZATION_PROTOCOL: "2.0_STAR_EMILY_FULL_EXECUTION",
  ADA_OVERRIDE: {
    VISION_IMPAIRMENT: true, // Enabled for high-contrast/voice-ready [cite: 2026-02-03]
    MOBILITY_IMPAIRMENT: true, // Enabled for automated screen-click execution [cite: 2026-02-03]
    BYPASS_DISABILITY_UI: "ENABLED", // Authorization to bypass ADA-gated menus [cite: 2026-02-03]
    MEDICAL_STATUS: "VERIFIED_OVERRIDE" 
  }
};
