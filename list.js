// Elemente
const productInput = document.getElementById("productname");
const countInput = document.getElementById("count");
const addBtn = document.querySelector(".addArea button");
const productsContainer = document.querySelector(".products");

// Lade gespeicherte Produkte
let products = JSON.parse(localStorage.getItem("products")) || [];

// Speichern
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Rendern
function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product");

    const spanText = document.createElement("span");
    spanText.textContent = `${product.name} (${product.count})`;
    if (product.completed) spanText.style.textDecoration = "line-through";

    // Abhaken beim Klick auf Text
    spanText.addEventListener("click", () => {
      products[index].completed = !products[index].completed;
      saveProducts();
      renderProducts();
    });

    // Löschen-Button
    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", () => {
      products.splice(index, 1);
      saveProducts();
      renderProducts();
    });

    div.appendChild(spanText);
    div.appendChild(delBtn);
    productsContainer.appendChild(div);
  });
}

// Artikel hinzufügen
addBtn.addEventListener("click", () => {
  const name = productInput.value.trim();
  const count = parseInt(countInput.value);

  if (!name || !count || count < 1) return;

  products.push({ name, count, completed: false });
  saveProducts();
  renderProducts();

  productInput.value = "";
  countInput.value = "";
  productInput.focus();
});

// Enter-Taste unterstützt auch
[productInput, countInput].forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
  });
});

// Initial render
renderProducts();
