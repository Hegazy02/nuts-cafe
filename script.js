const primaryColor = "#f3ebb8";
const secondryColor = "#222222";
const products = {
  hotCoffe: [
    {
      id: 1,
      title: "Colombian Dark Roast",
      description: "Rich, bold flavor with notes of chocolate and caramel",
      price: "$19",
      image: "./public/products/ice_coffee_1.webp",
      gradient: "linear-gradient(45deg, #667eea, #764ba2)",
    },
    {
      id: 2,
      title: "French Vanilla Latte",
      description: "Smooth espresso with creamy vanilla and steamed milk",
      price: "$39",
      image: "./public/products/ice_coffee_2.jpg",
      gradient: "linear-gradient(45deg, #f093fb, #f5576c)",
    },
    {
      id: 3,
      title: "Espresso Italiano",
      description: "Authentic Italian espresso beans for the perfect shot",
      price: "$24",
      image: "./public/products/ice_coffee_3.jpg",
      gradient: "linear-gradient(45deg, #4facfe, #00f2fe)",
    },
  ],
  Nuts: [
    {
      id: 4,
      title: "Roasted Almonds",
      description: "Premium California almonds with sea salt seasoning",
      price: "$12",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #fa709a, #fee140)",
    },
    {
      id: 5,
      title: "Mixed Nuts Deluxe",
      description: "Cashews, walnuts, pecans, and pistachios blend",
      price: "$18",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #a8edea, #fed6e3)",
    },
    {
      id: 6,
      title: "Honey Roasted Peanuts",
      description: "Sweet and savory peanuts with natural honey glaze",
      price: "$8",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #ffecd2, #fcb69f)",
    },
  ],
  chocolates: [
    {
      id: 7,
      title: "Dark Chocolate Truffles",
      description: "Belgian dark chocolate with rich ganache center",
      price: "$25",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #ff9a9e, #fecfef)",
    },
    {
      id: 8,
      title: "Milk Chocolate Assortment",
      description: "Variety box of creamy milk chocolate bonbons",
      price: "$22",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #a18cd1, #fbc2eb)",
    },
    {
      id: 9,
      title: "White Chocolate Pralines",
      description: "Delicate white chocolate with hazelnut praline filling",
      price: "$28",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #fad0c4, #ffd1ff)",
    },
  ],
  icedCoffe: [
    {
      id: 10,
      title: "Iced Caramel Macchiato",
      description: "Cold brew with vanilla syrup and caramel drizzle",
      price: "$5",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #a8e6cf, #dcedc1)",
    },
    {
      id: 11,
      title: "Cold Brew Concentrate",
      description: "Smooth, less acidic coffee perfect over ice",
      price: "$15",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #ff8a80, #ffb74d)",
    },
    {
      id: 12,
      title: "Frappé Mocha",
      description: "Blended iced coffee with chocolate and whipped cream",
      price: "$6",
      image: "./public/products/ice_coffee_4.jpg",
      gradient: "linear-gradient(45deg, #81c784, #aed581)",
    },
  ],
};

let currentCategory = "all";
const carousel = document.getElementById("carousel");
const categoryBtns = document.querySelectorAll(".category-btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// --- Cart Data ---
let cart = {};

// Load cart from localStorage on page load
function loadCartFromStorage() {
  const stored = localStorage.getItem('cart');
  if (stored) {
    try {
      cart = JSON.parse(stored);
      updateCartCount();
    } catch (e) {
      cart = {};
    }
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Call loadCartFromStorage on page load
loadCartFromStorage();

function getAllProducts() {
  return Object.values(products).flat();
}

function createProductCard(product) {
  return `
      <div class="product-card fade-in">
          <div class="product-image" style="background: ${product.gradient}">
            <img src="${product.image}"/>
          </div>
          <div class="product-title">${product.title}</div>
          <div class="product-description">${product.description}</div>
          <div class="product-price">${product.price}</div>
          <button class="product-btn">Add to Cart</button>
      </div>
  `;
}

function renderProducts(category) {
  const productsToShow =
    category === "all" ? getAllProducts() : products[category];
  carousel.innerHTML = productsToShow.map(createProductCard).join("");
}

function updateActiveCategory(activeBtn) {
  categoryBtns.forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// Category button event listeners
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    currentCategory = category;
    updateActiveCategory(btn);
    renderProducts(category);
    carousel.scrollTo({ left: 0, behavior: "smooth" });
  });
});

// Carousel navigation
prevBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -320, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: 320, behavior: "smooth" });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevBtn.click();
  } else if (e.key === "ArrowRight") {
    nextBtn.click();
  }
});

// Touch/swipe support for mobile
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
  isDown = false;
});

carousel.addEventListener("mouseup", () => {
  isDown = false;
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});

// Initialize with all products
renderProducts("all");

// Add some interactive particle effects
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: rgba(255,255,255,0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      animation: particle-float 4s linear infinite;
  `;

  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 4000);
}

// Add particle animation CSS
const particleStyle = document.createElement("style");
particleStyle.textContent = `
  @keyframes particle-float {
      to {
          transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
          opacity: 0;
      }
  }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 2000);

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  // Replace with your WhatsApp number (with country code, no + or spaces)
  const phoneNumber = "+201012806076";
  const text = `Hello, my name is ${name} %0A%0A${message}`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
});

// --- Add to Cart Logic ---
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('product-btn')) {
    const btn = e.target;
    const card = btn.closest('.product-card');
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;
    const img = card.querySelector('img').src;

    // Cart logic
    if (!cart[title]) {
      cart[title] = { title, price, img, qty: 1 };
    } else {
      cart[title].qty += 1;
    }
    updateCartCount();
    saveCartToStorage();

    // Button feedback (animation, text, color)
    btn.style.transform = "scale(0.95)";
    btn.textContent = "Added! ✓";
    btn.style.color = "white";
    btn.style.background = "linear-gradient(45deg, #48bb78, #38a169)";

    setTimeout(() => {
      btn.style.transform = "";
      btn.textContent = "Add to Cart";
      btn.style.background = "var(--primary-color)";
      btn.style.color = "var(--secondary-color)";
    }, 1500);
  }
});

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.textContent = count;
}

// --- Offcanvas Logic ---
const cartOffcanvas = document.getElementById("cartOffcanvas");
const cartBackdrop = document.getElementById("cartOffcanvasBackdrop");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");

if (cartIcon) {
  cartIcon.addEventListener("click", () => {
    renderCartItems();
    cartOffcanvas.classList.add("open");
    cartBackdrop.classList.add("open");
  });
}
if (closeCart) closeCart.addEventListener("click", closeCartOffcanvas);
if (cartBackdrop) cartBackdrop.addEventListener("click", closeCartOffcanvas);

function closeCartOffcanvas() {
  cartOffcanvas.classList.remove("open");
  cartBackdrop.classList.remove("open");
}

function renderCartItems() {
  if (Object.keys(cart).length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) checkoutBtn.style.display = "none";
    saveCartToStorage();
    return;
  }
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) checkoutBtn.style.display = "";
  let total = 0;
  cartItems.innerHTML = Object.values(cart)
    .map((item) => {
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ""));
      total += priceNum * item.qty;
      return `
      <div class="cart-item" style="display:flex;align-items:center;margin-bottom:16px;">
        <img src="${item.img}" style="width:48px;height:48px;border-radius:8px;margin-right:12px;">
        <span style="font-weight:600;flex:1;">${item.title}</span>
        <div style="margin-left:8px; display:flex;align-items:center;gap:4px;">
          <button class="cart-qty-btn" data-action="decrease" data-title="${item.title}" style="width:24px;height:24px;">-</button>
          <span style="min-width:24px;text-align:center;">${item.qty}</span>
          <button class="cart-qty-btn" data-action="increase" data-title="${item.title}" style="width:24px;height:24px;">+</button>
        </div>
        <span style="margin-left:12px;">${item.price}</span>
        <button class="cart-remove-btn" data-title="${item.title}" style="background:none;border:none;color:#a00;font-size:1.2rem;margin-left:8px;cursor:pointer;"><img src="./public/icons/trash.png" style="width:22px;height:22px;"/></button>
      </div>
    `;
    })
    .join("");
  cartItems.innerHTML += `<div style="text-align:right;font-weight:700;font-size:1.1rem;margin-top:12px;">Total: $${total.toFixed(
    2
  )}</div>`;

  // Add event listeners for quantity and remove buttons
  cartItems.querySelectorAll(".cart-qty-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const title = this.getAttribute("data-title");
      if (this.getAttribute("data-action") === "increase") {
        cart[title].qty++;
      } else if (this.getAttribute("data-action") === "decrease") {
        if (cart[title].qty > 1) {
          cart[title].qty--;
        }
      }
      updateCartCount();
      saveCartToStorage();
      renderCartItems();
    });
  });
  cartItems.querySelectorAll(".cart-remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const title = this.getAttribute("data-title");
      delete cart[title];
      updateCartCount();
      saveCartToStorage();
      renderCartItems();
    });
  });
  saveCartToStorage();
}

const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function() {
    if (Object.keys(cart).length === 0) return;
    let orderMsg = 'Order details:%0A';
    let total = 0;
    Object.values(cart).forEach(item => {
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ''));
      total += priceNum * item.qty;
      orderMsg += `- ${item.title} x${item.qty} (${item.price})%0A`;
    });
    orderMsg += `%0ATotal: $${total.toFixed(2)}`;
    const phoneNumber = '201223057728';
    const url = `https://wa.me/${phoneNumber}?text=${orderMsg}`;
    window.open(url, '_blank');
  });
}

// Hamburger menu toggle for mobile
const navbarMenuIcon = document.getElementById('navbarMenuIcon');
const navbarLinks = document.getElementById('navbarLinks');
if (navbarMenuIcon && navbarLinks) {
  navbarMenuIcon.addEventListener('click', function() {
    const isOpen = navbarLinks.classList.toggle('open');
    navbarMenuIcon.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  // Close menu when a link is clicked (mobile UX)
  navbarLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbarLinks.classList.remove('open');
      navbarMenuIcon.setAttribute('aria-expanded', 'false');
    });
  });
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (
      navbarLinks.classList.contains('open') &&
      !navbarLinks.contains(e.target) &&
      !navbarMenuIcon.contains(e.target)
    ) {
      navbarLinks.classList.remove('open');
      navbarMenuIcon.setAttribute('aria-expanded', 'false');
    }
  });
}
