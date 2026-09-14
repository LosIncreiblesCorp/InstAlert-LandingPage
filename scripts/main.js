/* REPARTO INICIO JOSE | feature/inicio | referencias de navegacion e idioma | COPIAR DESDE AQUI */
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const languageToggle = document.querySelector(".language-toggle");
/* REPARTO FIN JOSE | feature/inicio | referencias de navegacion e idioma | COPIAR HASTA AQUI */

/* REPARTO INICIO JOSE | feature/inicio | preferencia de idioma y traducciones compartidas | COPIAR DESDE AQUI */
let currentLanguage = siteConfig.defaultLanguage;
try {
  const savedLanguage = localStorage.getItem("instalert-language");
  if (["en", "es"].includes(savedLanguage)) currentLanguage = savedLanguage;
} catch {
  /* Storage can be unavailable for local files. */
}

const translatedText = [...document.querySelectorAll("[data-es]")].map(
  (element) => ({ element, en: element.textContent, es: element.dataset.es }),
);
const translatedAlt = [...document.querySelectorAll("[data-es-alt]")].map(
  (element) => ({ element, en: element.alt, es: element.dataset.esAlt }),
);
const translatedLabels = [...document.querySelectorAll("[data-es-label]")].map(
  (element) => ({
    element,
    en: element.getAttribute("aria-label"),
    es: element.dataset.esLabel,
  }),
);
const translatedTitles = [...document.querySelectorAll("[data-es-title]")].map(
  (element) => ({ element, en: element.title, es: element.dataset.esTitle }),
);

/* REPARTO FIN JOSE | feature/inicio | preferencia de idioma y traducciones compartidas | COPIAR HASTA AQUI */

/* REPARTO INICIO JOSE | feature/inicio | idioma global e integracion con planes | COPIAR DESDE AQUI */
function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  translatedAlt.forEach((item) => {
    item.element.alt = item[language];
  });
  translatedText.forEach((item) => {
    item.element.textContent = item[language];
  });
  translatedLabels.forEach((item) => {
    item.element.setAttribute("aria-label", item[language]);
  });
  translatedTitles.forEach((item) => {
    item.element.title = item[language];
  });
  languageToggle.querySelector(".language-label").textContent =
    language === "es" ? "EN" : "ES";
  const languageAction =
    language === "es" ? "Switch to English" : "Cambiar a español";
  languageToggle.setAttribute("aria-label", languageAction);
  languageToggle.title = languageAction;
  document.title =
    language === "es"
      ? "InstAlert | Seguridad que conecta negocios"
      : "InstAlert | Connected Business Security";
  document.querySelector('meta[name="description"]').content =
    language === "es"
      ? "InstAlert, desarrollado por LosIncreiblesCorp, conecta negocios locales mediante alertas de seguridad, una red de negocios cercanos e información de riesgo local. Suscripciones de pago."
      : "InstAlert by LosIncreiblesCorp connects local businesses through security alerts, a nearby business network, and local risk information. Paid subscriptions.";
  document.querySelectorAll("[data-auth]").forEach((button) => {
    if (!siteConfig.auth[button.dataset.auth])
      button.title = language === "es" ? "Próximamente" : "Coming soon";
  });
  document.querySelector(".back-top").title =
    language === "es" ? "Volver al inicio" : "Back to top";
  renderPricing();
  document.dispatchEvent(
    new CustomEvent("languagechange", { detail: language }),
  );
  try {
    localStorage.setItem("instalert-language", language);
  } catch {
    /* Keep the switch usable without storage. */
  }
}

navToggle.addEventListener("click", () => {
  const open = header.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
function closeNavigation() {
  header.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}
document
  .querySelectorAll(".site-nav a")
  .forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("open")) {
    closeNavigation();
    navToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) closeNavigation();
});
matchMedia("(min-width: 1001px)").addEventListener("change", (event) => {
  if (event.matches) closeNavigation();
});
languageToggle.addEventListener("click", () =>
  setLanguage(currentLanguage === "es" ? "en" : "es"),
);
/* REPARTO FIN JOSE | feature/inicio | idioma global e integracion con planes | COPIAR HASTA AQUI */

/* REPARTO INICIO JOSE | feature/inicio | accesos a la aplicacion | COPIAR DESDE AQUI */
document.querySelectorAll("[data-auth]").forEach((button) => {
  const destination = siteConfig.auth[button.dataset.auth];
  button.disabled = !destination;
  button.addEventListener("click", () => {
    if (destination) window.location.assign(destination);
  });
});
/* REPARTO FIN JOSE | feature/inicio | accesos a la aplicacion | COPIAR HASTA AQUI */

/* REPARTO INICIO JEAN | feature/planes | estado y referencias de precios | COPIAR DESDE AQUI */
const pricingButtons = document.querySelectorAll("[data-currency]");
const prices = document.querySelectorAll(".price[data-plan]");
const currencySymbols = { pen: "S/", usd: "$" };
let currentCurrency = "pen";
/* REPARTO FIN JEAN | feature/planes | estado y referencias de precios | COPIAR HASTA AQUI */

/* REPARTO INICIO JEAN | feature/planes | renderizado de precios PEN y USD | COPIAR DESDE AQUI */
function renderPricing(currency = currentCurrency) {
  if (!Object.hasOwn(currencySymbols, currency)) return;
  currentCurrency = currency;
  pricingButtons.forEach((button) => {
    const selected = button.dataset.currency === currency;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  prices.forEach((price) => {
    const amount = pricing[price.dataset.plan]?.[currency];
    const hasPrice = Number.isFinite(amount) && amount >= 0.01;
    const formatted = hasPrice
      ? amount.toLocaleString(currentLanguage === "es" ? "es-PE" : "en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : currentLanguage === "es"
        ? "Por definir"
        : "TBD";
    price.querySelector("strong").textContent =
      `${currencySymbols[currency]} ${formatted}`;
    price.querySelector("span").textContent =
      currentLanguage === "es"
        ? hasPrice
          ? "/ mes"
          : "/ mes (precio pendiente de aprobación)"
        : hasPrice
          ? "/ month"
          : "/ month (price pending approval)";
  });
}

/* REPARTO FIN JEAN | feature/planes | renderizado de precios PEN y USD | COPIAR HASTA AQUI */

/* REPARTO INICIO JEAN | feature/planes | eventos del selector de moneda | COPIAR DESDE AQUI */
pricingButtons.forEach((button) =>
  button.addEventListener("click", () =>
    renderPricing(button.dataset.currency),
  ),
);
/* REPARTO FIN JEAN | feature/planes | eventos del selector de moneda | COPIAR HASTA AQUI */

/* REPARTO INICIO JOSE | feature/inicio | inicializacion final; conservar al final | COPIAR DESDE AQUI */
lucide.createIcons();
setLanguage(currentLanguage);
/* REPARTO FIN JOSE | feature/inicio | inicializacion final; conservar al final | COPIAR HASTA AQUI */
