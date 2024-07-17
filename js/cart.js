/*
=========== Functii pentru cart ===========
*/

// Selectarea centeinerului "CART"
const CART_DOM = document.querySelector('#cart');

// Crearea obiectului cart
let cart = {};

// Selectarea toate butoanele care adauga in cos
const BUTTONS_ADD_PRODUCT = document.querySelectorAll('.product-addCart');

// Numele cheie in "localStorage"
const ITEM_STORAGE = 'produse';
// Extragerea datelor din "localSorage"
const DATA_STORAGE = localStorage.getItem(ITEM_STORAGE);
// Conversia datelor din "localStorage" intr-un obiect
const OBJ_DATA_STORAGE = JSON.parse(DATA_STORAGE);

// Verificarea existentei datelor in "localeSorage" si actualizarea "DOM"
if (OBJ_DATA_STORAGE) {
	cart = OBJ_DATA_STORAGE;
	updateDOM();
}

// Crearea eventului pentru fiecare buton
for (const btn of BUTTONS_ADD_PRODUCT) {
	btn.onclick = function () {
		// Extragerea containe de produs
		const productContent = btn.closest('.product');
		// Adaugarea produsului
		addProduct(productContent);
	};
}

// Adaugarea produselor in obiectul "cart" si actualizarea DOM
function addProduct(product) {
	// Extragerea datelor din html
	const PRODUCT_TITLE = product.querySelector('.product-title').innerText;
	const PRODUCT_PRICE = product.querySelector('.product-price').innerText;

	if (cart[PRODUCT_TITLE]) {
		// Creșterea cantitatii de produs
		cart[PRODUCT_TITLE].cantitate++;
	} else {
		// Crearea unui nou obiect in obiectul "cart"
		cart[PRODUCT_TITLE] = {
			pret: PRODUCT_PRICE,
			cantitate: 1,
		};
	}

	// Actualizare a containerului cu produse adaugate
	updateDOM();
}

// Stergerea produsului din obiectul "cart" si actualizarea DOM
function removeProduct(product) {
	// const PRODUCT = product.target.parentElement;
	const PRODUCT_TITLE = product.querySelector('.product-title').innerText;

	if (cart[PRODUCT_TITLE].cantitate > 1) {
		// Scaderea cantitatii de produs
		cart[PRODUCT_TITLE].cantitate--;
	} else {
		// Strege produsul din obiectul "cart"
		delete cart[PRODUCT_TITLE];
	}

	// Actualizare a containerului cu produse adaugate
	updateDOM();
}

function updateDOM() {
	// Stergerea continutului din containerul "CART_DOM"
	CART_DOM.textContent = '';

	for (const produs in cart) {
		// Crearea contenitorului care va contine toate datele a produsului
		const productBox = createHtmlElement('div', 'product-box');

		const divInfo = createHtmlElement('div', 'product-info');

		// Crearea numele produsului
		const pName = createHtmlElement('p');
		pName.textContent = 'Produs:';
		const productName = createHtmlElement('span', 'product-title');
		productName.textContent = produs;

		// Crearea pretul produsului
		const pPrice = createHtmlElement('p');
		pPrice.textContent = 'Pret:';
		const productPrice = createHtmlElement('span', 'product-price');
		productPrice.textContent = '$' + cart[produs].pret * cart[produs].cantitate;

		// Crearea cantitatea produsului
		const pCount = createHtmlElement('p');
		pCount.textContent = 'Cantitatea:';
		const productCount = createHtmlElement('span', 'product-amount');
		productCount.textContent = cart[produs].cantitate;

		// Crearea divului in care va fi butoanele
		const divBtn = createHtmlElement('div', 'btn-box');
		// Crearea butonul pentru adaugarea unei unitati
		const btnAdd = createHtmlElement('button', 'cart-btn-product');
		btnAdd.textContent = '+';
		btnAdd.onclick = function () {
			addProduct(productBox);
		};

		// Crearea butonul pentru scoate o unitate
		const btnRemove = createHtmlElement('button', 'cart-btn-product');
		btnRemove.textContent = '-';
		btnRemove.onclick = function () {
			removeProduct(productBox);
		};

		// Asemblarea contenitorului
		pName.insertAdjacentElement('beforeend', productName);
		pCount.insertAdjacentElement('beforeend', productCount);
		pPrice.insertAdjacentElement('beforeend', productPrice);

		divInfo.insertAdjacentElement('beforeend', pName);
		divInfo.insertAdjacentElement('beforeend', pCount);
		divInfo.insertAdjacentElement('beforeend', pPrice);

		divBtn.insertAdjacentElement('beforeend', btnAdd);
		divBtn.insertAdjacentElement('beforeend', btnRemove);

		productBox.insertAdjacentElement('beforeend', divInfo);
		productBox.insertAdjacentElement('beforeend', divBtn);

		CART_DOM.insertAdjacentElement('beforeend', productBox);

		// Eliminarea articolului din "localStorage"
		localStorage.removeItem(ITEM_STORAGE);
		// Settarea datelor in "localSorage"
		localStorage.setItem(ITEM_STORAGE, JSON.stringify(cart));
	}
	// Arata continutul containerului "CART"
	cartShow();

}

// Arata sau ascunde elementul "CART"
function cartShow() {
	// Numele de clasa care va fi adaugata la elementul "CART" pentru a fi vizibil
	const CLASS_ADD = 'cart-active';

	if (CART_DOM.textContent !== '') {
		// Adăuga clasa la element pentru a vedea sectiunea cu produse adaugate
		CART_DOM.classList.add(CLASS_ADD);
	} else {
		// Sterge clasa la element pentru a ascunde sectiunea cu produse adaugate
		CART_DOM.classList.remove(CLASS_ADD);
		// Stergerea datelor din "localeStorage"
		localStorage.removeItem(ITEM_STORAGE);
	}
}

// Creaza un element si adauga o clasa
function createHtmlElement(tagName, className) {
	const elementHtml = document.createElement(tagName);

	if (className) {
		// Adauca o clasa la un element
		elementHtml.classList.add(className);
	}

	return elementHtml;
}

