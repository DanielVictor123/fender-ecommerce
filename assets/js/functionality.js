// Mock product data
const mockProducts = [
  {
    id: 1,
    title: "Shirt 1",
    price: 18.99,
    imageUrl: "/assets/images/products/clothes-1.jpg",
  },
  {
    id: 2,
    title: "Shirt 2",
    price: 24.99,
    imageUrl: "/assets/images/products/clothes-2.jpg",
  },
  {
    id: 3,
    title: "Shirt 3",
    price: 12.99,
    imageUrl: "/assets/images/products/clothes-3.jpg",
  },
  {
    id: 4,
    title: "Shirt 4",
    price: 39.99,
    imageUrl: "/assets/images/products/clothes-4.jpg",
  },
  {
    id: 5,
    title: "Jacket 1",
    price: 99.99,
    imageUrl: "/assets/images/products/jacket-1.jpg",
  },
];

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const cancelButton = document.createElement("button");
cancelButton.classList.add("cancel-button");
cancelButton.textContent = "X";

async function fetchProducts(query) {
  // Use the mock data instead of the Etsy API
  return mockProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

function displaySearchResults(products) {
  searchResults.innerHTML = "";

  if (products.length === 0) {
    searchResults.innerHTML = "<p>No products found.</p>";
    searchInput.value = ""; // Reset the search input
    setTimeout(() => {
      searchResults.innerHTML = ""; // Clear the search results container after 3 seconds
    }, 3000);
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button class="purchase-button">Purchase</button>
    `;
    searchResults.appendChild(productElement);
  });

  searchResults.appendChild(cancelButton);
}

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query) {
    const products = await fetchProducts(query);
    displaySearchResults(products);
  }
});

cancelButton.addEventListener("click", () => {
  searchInput.value = "";
  searchResults.innerHTML = "";
});
// const apiKey = "s7m18bnwujjixwwf4losupla";
// const searchInput = document.getElementById("search-input");
// const searchButton = document.getElementById("search-button");
// const searchResults = document.getElementById("search-results");

// async function fetchProducts(query) {
//   try {
//     const response = await fetch(
//       `https://openapi.etsy.com/v2/listings/active?api_key=${apiKey}&keywords=${encodeURIComponent(
//         query
//       )}&limit=20`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }

// function displaySearchResults(products) {
//   searchResults.innerHTML = "";

//   if (products.length === 0) {
//     searchResults.innerHTML = "<p>No products found.</p>";
//     searchInput.value = ""; // Reset the search input
//     setTimeout(() => {
//       searchResults.innerHTML = ""; // Clear the search results container after 3 seconds
//     }, 3000);
//     return;
//   }

//   products.forEach((product) => {
//     const productElement = document.createElement("div");
//     productElement.classList.add("product");
//     productElement.innerHTML = `
//       <img src="${product.MainImage.url_570xN}" alt="${product.title}">
//       <h3>${product.title}</h3>
//       <p>$${product.price}</p>
//     `;
//     searchResults.appendChild(productElement);
//   });
// }

// searchButton.addEventListener("click", async () => {
//   const query = searchInput.value.trim();
//   if (query) {
//     const products = await fetchProducts(query);
//     displaySearchResults(products);
//   }
// });

const slider = document.getElementById("slider");
const slides = slider.children;
let currentIndex = 0;

function showSlide(index) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = i === index ? "block" : "none";
  }
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

showSlide(currentIndex);
// Change slide every 5 seconds
setInterval(nextSlide, 5000);
