document.addEventListener("DOMContentLoaded", () => {
  /* ========== LOVE LETTER TYPEWRITER ========== */
  const bodyEl = document.getElementById("letterBody");
  const startBtn = document.getElementById("startLetter");
  const resetBtn = document.getElementById("resetLetter");

  if (bodyEl && startBtn && resetBtn) {
    const letterText = `
Hi my pretty Kammo jii,

I don’t think you fully realise how beautiful you are  not just your face, not just your smile, but your heart, your mind, your funny little habits that make you “you”.

You somehow make normal days feel special just by being in them. One message from you can flip a bad day into a better one. One “are you okay?” from you hits different than anyone else’s.

You are soft and strong at the same time. Dramatic sometimes, stubborn sometimes, full cute mode sometimes  and I adore every version of you.

Thank you for existing the way you do.
Thank you for being Purva.
And thank you, most of all, for letting me love you in my own slow, stupid, honest way.

Always yours,
Me. 💌
`.trim();

    let index = 0;
    let intervalId = null;

    function startTyping() {
      clearInterval(intervalId);
      bodyEl.classList.remove("letter-body-placeholder");
      bodyEl.textContent = "";
      index = 0;

      intervalId = setInterval(() => {
        bodyEl.textContent = letterText.slice(0, index);
        index++;
        if (index > letterText.length) {
          clearInterval(intervalId);
        }
      }, 35); // typing speed
    }

    function resetLetter() {
      clearInterval(intervalId);
      index = 0;
      bodyEl.textContent =
        "Tap “Start reading” and watch my feelings appear, one little piece at a time.";
      bodyEl.classList.add("letter-body-placeholder");
    }

    startBtn.addEventListener("click", startTyping);
    resetBtn.addEventListener("click", resetLetter);
  }

  /* ========== MEMORIES POPUP / LIGHTBOX ========== */
  const memoryCards = document.querySelectorAll(".memory-card");
  const modal = document.getElementById("memoryModal");
  const modalPhoto = document.getElementById("memoryModalPhoto");
  const modalMeta = document.getElementById("memoryModalMeta");
  const modalTitle = document.getElementById("memoryModalTitle");
  const modalText = document.getElementById("memoryModalText");
  const modalPrev = document.getElementById("memoryPrev");
  const modalNext = document.getElementById("memoryNext");
  const modalClose = document.getElementById("memoryClose");
  const modalCounter = document.getElementById("memoryCounter");

  if (
    memoryCards.length > 0 &&
    modal &&
    modalPhoto &&
    modalMeta &&
    modalTitle &&
    modalText &&
    modalPrev &&
    modalNext &&
    modalClose &&
    modalCounter
  ) {
    let currentIndex = 0;

     function openModal(index) {
  const cardsArray = Array.from(memoryCards);
  const card = cardsArray[index];
  if (!card) return;

  // take image if exists, otherwise fallback to emoji/text
  const imgEl = card.querySelector(".memory-photo img");
  let contentHtml = "";

  if (imgEl) {
    contentHtml = `<img src="${imgEl.src}" alt="${imgEl.alt || ""}">`;
  } else {
    const fallback = card.querySelector(".memory-photo");
    contentHtml = fallback ? fallback.textContent : "♡";
  }

  const meta = card.querySelector(".memory-meta")?.textContent || "";
  const title = card.querySelector(".memory-title")?.textContent || "";
  const text = card.querySelector(".memory-text")?.textContent || "";

  // IMPORTANT: use innerHTML here, not textContent
  modalPhoto.innerHTML = contentHtml;
  modalMeta.textContent = meta;
  modalTitle.textContent = title;
  modalText.textContent = text;
  modalCounter.textContent = `${index + 1} / ${cardsArray.length}`;

  currentIndex = index;
  modal.classList.add("is-open");
}

    function closeModal() {
      modal.classList.remove("is-open");
    }

    function showNext() {
      const total = memoryCards.length;
      const nextIndex = (currentIndex + 1) % total;
      openModal(nextIndex);
    }

    function showPrev() {
      const total = memoryCards.length;
      const prevIndex = (currentIndex - 1 + total) % total;
      openModal(prevIndex);
    }

    // Click on cards to open
    memoryCards.forEach((card, idx) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => openModal(idx));
    });

    // Buttons
    modalNext.addEventListener("click", showNext);
    modalPrev.addEventListener("click", showPrev);
    modalClose.addEventListener("click", closeModal);

    // Click outside modal to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escape key closes modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }
});