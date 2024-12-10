const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const cancelButton = document.createElement("button");
cancelButton.classList.add("cancel-button");
cancelButton.textContent = "X";

// Replace with your eBay App Client ID and OAuth Token
const clientId = "FenderCa-FenderCa-PRD-299cf978a-75ad5cb1"; // eBay App Client ID
const oauthToken =
  "v^1.1#i^1#r^0#p^1#f^0#I^3#t^H4sIAAAAAAAAAOVYfWwURRS/65fBthhAUEk1x1aCKdm92b2vvU3v9GgLPdNeT+5aoFFxP2bbpXe7m51Z2tMYS9UmEgJ+EP6QpBKhErHGEDGQRgWLwUBMqsEYlQSN8AcBTVQE/Iq6e3eUayWA9BKbuLnkdt68efN+v/fezOyA/opZdYPNg5eqnbeU7OgH/SVOJ10JZlWUL51dWrKw3AEKFJw7+u/tLxsoPVOP+HRK51ZCpGsqgq6+dEpFXFYYIkxD5TQeKYhT+TREHBa5RKS1hWMowOmGhjVRSxGuaGOIYBhW9DPQy/pkmRElnyVVL9tMaiFCBgFZkAKM7POwIpAZqx8hE0ZVhHkVW+MB4yVphqRBkmE46+elKdbn6SRcHdBAiqZaKhQgwll3uexYo8DXa7vKIwQNbBkhwtHI8kRbJNrYFEvWuwtshfM8JDCPTTS51aBJ0NXBp0x47WlQVptLmKIIESLc4dwMk41ykcvO3IT7WaqFAIDBAAMkKHgh75WKQuVyzUjz+Np+2BJFIuWsKgdVrODM9Ri12BDWQRHnWzHLRLTRZf89ZPIpRVagESKalkXWROJxIrwcqhI0Gnhy4iW+spFkgkFRDgZYngz4eMknCnR+opy1PM1TZmrQVEmxSUOumIaXQctrOJUbuoAbS6lNbTMiMrY9mtCjkwBc5tAb6LSDmouiibtVO64wbRHhyjavH4GJ0RgbimBiOGFhakeWohDB67oiEVM7s7mYT58+FCK6MdY5t7u3t5fq9VCa0eVmAKDdq1tbEmI3TPOEpWvXek5fuf4AUslCEaE1EikczuiWL31WrloOqF1E2AeCwMPmeZ/sVniq9B+CAszuyRVRrAphWB+AIOgP+AUfZMRgMSoknE9St+0HFPgMmeaNHoj1FC9CUrTyzExDQ5E4j09mPKwMSckflElvUJZJwSf5SVqGEEAoCGKQ/T8Vyo2megKKBsRFyfWi5fn6tBFNyz1Gu+g1Gx/XVJ2NdvsFtq9DEtsBi90tK5aJOLmqpz2OQjdaDVcF35BSLGaS1vzFIMCu9eKR0KwhDKVpwUuImg7jWkoRMzMrwB5DivMGziRgKmUJpgUyouvR4qzVRYP3L5eJm8NdvD3qP9qfrooK2Sk7s1DZ45FlgNcVyt6BKFFLu+1a13jr+GGL12a9nhZuxTq5zijUFsgcWkXKHTmpLFwKrRcpAyLNNKzTNtVmn8CSWg9Urf0MG1oqBY2O6eW1Xc/ptIl5IQVnWmEXIcEVfoZttnTA42H9QY9/emETs1vp2pm2JBVjKS5bcZPHavfkj/ywI/vQA84xMOB8v8TpBPVgMV0LFlWUtpeVVi1ECoaUwssUUrpU69vVgFQPzOi8YpTMc4zPbpE2NLdc6BfM/at+vp91VBfcMex4BNw5ccswq5SuLLhyADVXesrp2+6oZrw0QwPGerx0J6i90ltGLyi7/clDx0dcvz194vutR+LDs/HzW1974UFQPaHkdJY7ygacjsilB757Y9OR4/Wr69c+u3S8ujO27+EqYuU9J+a3y79vj8mvvzl/bOT8zqMf/tL84uJh8ey5nQsG3968aV/fmude3Tv6TO2e+y4OnbyrcuEiMvPezoj2KwIby6s6twzt/8BZ0l5r7jmVmXe4+9bhZmJpnXnirdFdx46983Urt6Vj6EDNWIVmPrX3022VKKzsFjY0ecbmojM/KJ99e2pAr1GNwXMHj8ZeemLF6aauixsbD0nrFl2o/ZMLHPxo+LHPz0fEXeHEU47Vh0Yrh15+lF7y41al9asF23YfOBsZ6T3+x08n13+8cXudPnd8e83mJV9+MXL4k1ei6+Rto3Vz/mqY883d7xqV4+nY6XG5KhfLvwFNxfqg/REAAA=="; // eBay OAuth Application Token

async function fetchProducts(query) {
  try {
    // eBay Finding API endpoint for searching items
    const response = await fetch(
      `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=${clientId}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${encodeURIComponent(
        query
      )}`
    );

    const data = await response.json();
    return data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
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
      <img src="${product.galleryURL}" alt="${product.title[0]}">
      <h3>${product.title[0]}</h3>
      <p>$${product.sellingStatus[0].currentPrice[0].__value__}</p>
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

// // Mock product data
// const mockProducts = [
//   {
//     id: 1,
//     title: "Shirt 1",
//     price: 18.99,
//     imageUrl: "/assets/images/products/clothes-1.jpg",
//   },
//   {
//     id: 2,
//     title: "Shirt 2",
//     price: 24.99,
//     imageUrl: "/assets/images/products/clothes-2.jpg",
//   },
//   {
//     id: 3,
//     title: "Shirt 3",
//     price: 12.99,
//     imageUrl: "/assets/images/products/clothes-3.jpg",
//   },
//   {
//     id: 4,
//     title: "Shirt 4",
//     price: 39.99,
//     imageUrl: "/assets/images/products/clothes-4.jpg",
//   },
//   {
//     id: 5,
//     title: "Jacket 1",
//     price: 99.99,
//     imageUrl: "/assets/images/products/jacket-1.jpg",
//   },
// ];

// const searchInput = document.getElementById("search-input");
// const searchButton = document.getElementById("search-button");
// const searchResults = document.getElementById("search-results");
// const cancelButton = document.createElement("button");
// cancelButton.classList.add("cancel-button");
// cancelButton.textContent = "X";

// async function fetchProducts(query) {
//   // Use the mock data instead of the Etsy API
//   return mockProducts.filter((product) =>
//     product.title.toLowerCase().includes(query.toLowerCase())
//   );
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
//       <img src="${product.imageUrl}" alt="${product.title}">
//       <h3>${product.title}</h3>
//       <p>$${product.price}</p>
//       <button class="purchase-button">Purchase</button>
//     `;
//     searchResults.appendChild(productElement);
//   });

//   searchResults.appendChild(cancelButton);
// }

// searchButton.addEventListener("click", async () => {
//   const query = searchInput.value.trim();
//   if (query) {
//     const products = await fetchProducts(query);
//     displaySearchResults(products);
//   }
// });

// cancelButton.addEventListener("click", () => {
//   searchInput.value = "";
//   searchResults.innerHTML = "";
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
