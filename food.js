document.addEventListener("DOMContentLoaded", () => {
  let trendFood = document.querySelectorAll(".trendFood");
  let foodCard = document.querySelectorAll(".foodCard");
  let arrow = document.getElementById("arrow");
  let cartBtn = document.getElementById("cartBtn");
  let cartCount = document.getElementById("cartCount");
  let cartItems = [];

  // Scroll to top on arrow click
  if (arrow) {
    arrow.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact Modal functionality
  const contactBtn = document.getElementById("contactBtn");
  const contactModal = document.getElementById("contactModal");
  const closeContact = document.getElementById("closeContact");

  if (contactBtn && contactModal && closeContact) {
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      contactModal.style.display = "flex";
    });

    closeContact.addEventListener("click", () => {
      contactModal.style.display = "none";
    });

    window.addEventListener("scroll", () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 10) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  // Trending section slider
  let count = 0;

  trendFood.forEach((imgs, index) => {
    imgs.style.left = `${index * 100}%`;
  });

  const myFun = () => {
    trendFood.forEach((curImg) => {
      curImg.style.transform = `translateX(-${count * 100}%)`;
    });
  };

  setInterval(() => {
    count = (count + 1) % trendFood.length;
    myFun();
  }, 4000);

  // Food card detail modal on clicking the card (except the button)
  foodCard.forEach((curCard) => {
    curCard.addEventListener("click", () => {
      // Prevent multiple modals
      if (document.querySelector(".cardDetail")) return;

      const img = curCard.querySelector("img");
      const name = curCard.querySelector("p").innerText;

      const div = document.createElement("div");
      div.classList.add("cardDetail");
      div.innerHTML = `
        <i id="icon" class="fa-solid fa-xmark"></i>
        <img src="${img.src}" alt="Food Image">
        <h2>${name}</h2>
        <button id="backBtn">Back</button>
      `;

      document.body.appendChild(div);

      div.querySelector("#icon").addEventListener("click", () => div.remove());
      div
        .querySelector("#backBtn")
        .addEventListener("click", () => div.remove());
    });
  });

  // Handle Add to Cart - FIXED using closest()
  document.querySelectorAll(".foodCard button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent card detail modal opening

      const card = btn.closest(".foodCard");
      if (!card) return;

      const name = card.querySelector("p").innerText;
      const imgSrc = card.querySelector("img").src;

      cartItems.push({ name, imgSrc });
      cartCount.textContent = cartItems.length;
      alert(`${name} added to cart!`);
    });
  });

  // Cart popup toggle
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const existing = document.querySelector(".cartPopup");
    if (existing) {
      existing.remove();
      return;
    }

    const popup = document.createElement("div");
    popup.classList.add("cartPopup");

    if (cartItems.length === 0) {
      popup.innerHTML = `<h2>Your Cart</h2><p>Cart is empty!</p><button id="closeCart">Close</button>`;
    } else {
      popup.innerHTML = `
        <h2>Your Cart</h2>
        <ul>
          ${cartItems
            .map(
              (item) =>
                `<li><img src="${item.imgSrc}" width="40"> ${item.name}</li>`
            )
            .join("")}
        </ul>
        <button id="closeCart">Close</button>
      `;
    }

    document.body.appendChild(popup);

    document.getElementById("closeCart").addEventListener("click", () => {
      popup.remove();
    });
  });
});
