const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Заявка на исследование К3${company ? `: ${company}` : ""}`);
    const body = encodeURIComponent(
      [
        `Имя: ${name}`,
        company ? `Компания: ${company}` : "",
        `Контакт: ${contact}`,
        "",
        "Задача:",
        message,
      ]
        .filter(Boolean)
        .join("\n")
    );

    formStatus.textContent =
      "Спасибо. Мы свяжемся с вами и поможем определить подходящий формат исследования.";
    window.location.href = `mailto:hello@k-3.top?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}

const createCardLens = ({
  layoutSelector,
  lensSelector,
  cardSelector,
  targetSelector = "h3",
  alignToCardBorder = false,
}) => {
  const layout = document.querySelector(layoutSelector);
  const lens = layout?.querySelector(lensSelector);
  const cards = Array.from(layout?.querySelectorAll(cardSelector) || []);
  let activeCard = cards[0] || null;
  let target = cards[0]?.querySelector(targetSelector) || null;
  let frame = 0;

  const getOffsetWithin = (element) => {
    let x = 0;
    let y = 0;
    let current = element;

    while (current && current !== layout) {
      x += current.offsetLeft || 0;
      y += current.offsetTop || 0;
      current = current.offsetParent;
    }

    if (current !== layout) {
      const layoutRect = layout.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      return {
        x: elementRect.left - layoutRect.left,
        y: elementRect.top - layoutRect.top,
      };
    }

    return { x, y };
  };

  const moveLens = () => {
    if (!layout || !lens || !target || !activeCard) {
      return;
    }

    const cardOffset = getOffsetWithin(activeCard);
    const targetOffset = getOffsetWithin(target);
    const lensSize = lens.offsetWidth || 22;
    const rawX = alignToCardBorder
      ? cardOffset.x - lensSize / 2
      : targetOffset.x - lensSize - 18;
    const maxX = layout.offsetWidth - lensSize - 6;
    const x = Math.max(6, Math.min(maxX, rawX));
    const y = targetOffset.y + target.offsetHeight / 2 - lensSize / 2;

    lens.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  };

  const requestMove = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(moveLens);
  };

  if (!layout || !lens || !target) {
    return;
  }

  requestMove();

  cards.forEach((card) => {
    const title = card.querySelector(targetSelector);

    if (title) {
      const selectCard = () => {
        activeCard = card;
        target = title;
        requestMove();
      };

      card.addEventListener("pointerenter", selectCard);
      card.addEventListener("mouseenter", selectCard);
      card.addEventListener("focusin", selectCard);
    }
  });

  window.addEventListener("resize", requestMove);
  window.setTimeout(requestMove, 80);

  if (document.fonts?.ready) {
    document.fonts.ready.then(requestMove);
  }
};

createCardLens({
  layoutSelector: ".method-layout",
  lensSelector: ".method-lens",
  cardSelector: ".principle-card",
});

createCardLens({
  layoutSelector: ".report-layout",
  lensSelector: ".result-lens",
  cardSelector: ".deliverable-card",
  targetSelector: "span",
  alignToCardBorder: true,
});
