//Creare un negozio online he mostri i prodotti di un negozio di pc
/*Ciuascun prodotto deve avere:
nome,
descrizione,
prezzo,
image,
categoria
*/

/**
 * Product CLass
 */
class Product {
    /**
     * 
     * @param {string} name -Nome del prodotto
     * @param {string} description -Descrizione del prodotto
     * @param {number} price -Prezzo prodotto
     * @param {string} image_path -percorso immagine 
     * @param {string} category -categoria del prodotto
     */
    constructor(name, description, price, image_path, category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image_path = image_path;
        this.category = category;
    }
};

const products = [
    //case
    new Product("RGB LED Case", "A lot of Space", 69.99, "./assets/img/case.jpg", "case"),
    new Product("Red LED Case", "Very beuatiful Red", 59.90, "./assets/img/case_led_rosso.jpg", "case"),
    new Product("Case Botte", "A drink of component", 174.90, "./assets/img/case_tondo.jpg", "case"),
    new Product("Case carroarmato", "A war for components", 385.11, "./assets/img/case_carroarmato.jpg", "case"),
    new Product("Basic Case", "Simple case", 89.90, "./assets/img/case_semplice.jpg", "case"),
    new Product("Black Case", "Simple black case", 59.99, "./assets/img/case_nero.jpg", "case"),

    //PC
    new Product("Very fast Laptop", "The new laptop with 32GB RAM", 1049.99, "./assets/img/laptop.webp", "pc"),
    new Product("galaxy Book", "Fast for every work ", 1229.99, "./assets/img/galaxy_book.jpg", "pc"),
    new Product("HP 250 Notebook", "Economy and good", 557.90, "./assets/img/hp_250.jpg", "pc"),
    new Product("Asus ROG Zephyrus", "The best of market", 4339.90, "./assets/img/rog_zephyrus.jpg", "pc"),

    //Monitor
    new Product("4k Monitor AOC", "Very beatiful Color", 249.99, "./assets/img/monitor.jpg", "monitor"),
    new Product("MSI Monitor", "For every type of use", 199.00, "./assets/img/msi_monitor.jpg", "monitor"),
    new Product("Xiaomi Monitor", "Very large and curve", 499.00, "./assets/img/xiaomi_monitor.jpg", "monitor"),
    new Product("Samsung Ultrawide", "The most large monitor", 499.00, "./assets/img/monitor_ultrawide.jpg", "monitor"),

    //accesory
    new Product("Desk with Tapis Roulant", "Coding and running at the same time", 849.99, "./assets/img/desk.webp", "accesory"),
    new Product("Mouse for desk", "Super comod", 39.99, "./assets/img/mouse.jpg", "accesory"),
    new Product("1TB SSD", "Super fast", 49.99, "./assets/img/ssd.jpg", "accesory"),
    new Product("Steelseries Apex", "Responsive ", 195.46, "./assets/img/tastiera_rgb.jpg", "accesory"),
    new Product("Gamakay MK61", "Tastiera Meccanica", 48.25, "./assets/img/tastiera_meccanica.jpg", "accesory"),
    new Product("Logitech G203", "Mouse for work", 24.99, "./assets/img/lg_mouse.jpg", "accesory"),
    new Product("Razer Naga trinity", "Mouse gaming", 48.25, "./assets/img/razer_mouse.jpg", "accesory")
];
const selectionProduct = document.getElementById("products");

const selectValue = document.getElementById("category");
console.log(selectValue.value);
if (selectValue.value === "all") {
    printProduct(products, selectionProduct);

}


let arrayDaStampare = [];
selectValue.addEventListener("change", function () {
    const categoria = selectValue.value;
    console.log(categoria);

    arrayDaStampare = products.filter(elemento => {
        return elemento.category === categoria
    })

    document.getElementById("products").innerHTML = "";

    console.log(arrayDaStampare);
    printProduct(arrayDaStampare, selectionProduct)
    console.log(document.querySelectorAll(".buy_now"));
})


//Creare una funzione per stampare i prodotti

/**
 * # Stampa array sulla DOM
 * La funzione mi permette di stampare sulla DOM un array che do in ingresso 
 * @param {array} list Array che devo usare per stampare
 * @param {array} DOMelement Posizione nella DOM dove stampare
 */
function printProduct(list, DOMelement) {
    list.forEach(product => {
        const { image_path, name, description, price, category } = product;
        const markup = `
            <div class="product">
                <img src="${image_path}" alt="">
                <h4></h4>
                <p>${description}</p>
                <hr>
                <span class = "price_product">€ ${price}</span>
                <span><i class="far fa-folder"></i> ${category}</span>
                <button class="buy_now" data-product-name="${name}" data-attribute-price ="${price}">Buy Now</button>
            </div>
        `;

        DOMelement.insertAdjacentHTML("beforeend", markup)
    })
};




/* 
contenutoArchiviato e la variabile che mi contiene l'array di elementi che archivio quando aggiungo un elemento al carello
JSON.parse mi permette di scompattare l'array che ho creato quando lo vado a inserire in localstorage con la funzione JSON.stringify
JSON.parse mi scompone la stringa che mi viene creata quando lo conservo e lo riconverte in un array di oggetti
sommaArchivita e la somma totale del carello quando archivio un nuovo prezzo
*/
const contenutoArchiviato = JSON.parse(localStorage.getItem("cartArchive"));
//console.log(contenutoArchiviato);

//let sommaArchivita = Number(localStorage.getItem("sommaCarello"));
//console.log(sommaArchivita);

/*
con questa condizione vado a verificare se c'è qualcosa all'interno della variabile che contiene le cose che ho archiviato nel 
localStorage e quindi se ce qualcosa la va a stampare nel carello mentre se non ce nulla va avanti con il programma
*/
let sommarefresh = 0;
if (contenutoArchiviato) {
    contenutoArchiviato.forEach(elem => {
        //console.log(elem.price);
        sommarefresh += Number(elem.price)
        const carello = document.querySelector(".cart_wrapper");
        carello.style.opacity = 1;
        document.querySelector(".cart").insertAdjacentHTML("afterbegin",
            `<div class="elemento_carello">
            <button class="delete_now" data-product-name="${elem.name}" data-attribute-price ="${elem.price}"> - </button>
             <span>${elem.name}</span> <span>${elem.price}</span> </div>`);
        document.querySelector(".total").innerHTML = "€ " + sommarefresh.toFixed(2);

    })
}

//console.log(sommarefresh);
/* Questa sezione mi permette di leggere i button e vedere quando vengono schiacciati, quando vengono schiacciati inviano il loro valore
a un nuovo array e poi con questo array stampo nel carello i dati e con il prezzo calcolo il totale del carello */
let cart = [];

/*
Dopo che ho inizializzato il carello che poi dovro riempire vado a controllare se ci siano oggetti archiviati nel localStorage
e se ce ne sono gli vado ad aggiungere al carello a cui poi successivamente aggiungero altri elementi
*/
if (contenutoArchiviato) {
    contenutoArchiviato.forEach(elemento => {
        cart.push(elemento);
    })
}

/*
dopo che inizializzo la somma le vado a dare il valore  della somma che ho archiviato nel localStorage e quindi se ha un valore 
prende quel valore e dopo quando aggiungo qualcosa al carello va avanti con la somma e non la rimprende sempre da zero
*/
let sum = 0;
sum += sommarefresh;
//console.log(sum);








/*
vado a selezionare tutti quelli con questa classe e poi andro a ciclare all'interno di questo array che contiene tutti i pulsanti
con la classe buy_now e cosi quando ci sara un azione su uno di qualsiasi button partira la mia funzione
*/
let buttons = document.querySelectorAll(".buy_now");
//console.log(buttons);

//vado a ciclare all'interno dell'array contenente tutti i button
buttons.forEach(button => {
    //vado a dire che per ogni button quando ce un click vado ad eseguire la funzione
    button.addEventListener("click", function () {
        const carello = document.querySelector(".cart_wrapper"); //contenitore in cui stampero il carello
        carello.style.opacity = 1; //avendo impostato a zero l'opacita questa la imposta a 1 e cosi al primo elemento che viene aggiunto si vedrai il carello

        //console.log(this.getAttribute("data-product-name"), this.getAttribute("data-attribute-price"));

        //vado a prendere il nome e il prezzo dal button che e stato premuto
        const name = this.getAttribute("data-product-name");
        const price = this.getAttribute("data-attribute-price");
        //creo un oggetto con i due valori del pulsante
        const purchasedIted = { name, price };
        console.log(purchasedIted);
        //pusho l'oggetto all'interno della variabile cart che e il carello
        cart.push(purchasedIted);
        console.log(cart);

        //vado a stampare nel carello in html l'oggetto che e stato aggiunto al carello 
        document.querySelector(".cart").insertAdjacentHTML("afterbegin",
            `<div class="elemento_carello">
            <button class="delete_now"> - </button>
             <span>${name}</span> <span>${price}</span> </div>`);

        //aggiungo il prezzo alla somma e la stampo nel carello
        sum += parseFloat(price);
        //console.log(sum);
        document.querySelector(".total").innerHTML = "€ " + sum.toFixed(2);



        /*
        localStorage mi permette di salvare qualcosa all'interno della memoria locale del programma quindi se io chiudo la pagina e la
        riapro i dati non ci saranno piu.

        con .setItem mi permette di archiviare cio che voglio inserendo prima il nome della chiave che avra nel localStorage e dopo
        cio che voglio salvare

        JSON.stringify mi permette di salvare un array come stringa specifica cosi da poterla poi decifrare e farla restare un array
        anche quando la richiamo siccome quando vado a salvare un valore in localStorage me lo salva come stringa quindi anche se 
        salvo un numero in localStorage quando poi lo andro a richiamre figurera come una stringa
        */
        localStorage.setItem("cartArchive", JSON.stringify(cart));
        //localStorage.setItem("sommaCarello", sum)


    })
});


/*
Vado a selezionare tutti i pulsanti che hanno la classe delete_now che sono i button degli elementi aggiunti al carello e tramite 
il button gli andro ad eliminare dal carello
*/
const deleteButtons = document.querySelectorAll(".delete_now");
//console.log(deleteButtons);

deleteButtons.forEach(delButton => {
    delButton.addEventListener("click", function () {
        const eliminare = this;
        console.log(eliminare);
        console.log(cart);
        /*
        arrivato a questo punto ho l'elemento che schiaccio, quindi quando lo schiaccio mi fa vedere quel button
        devo trovare come selezionarlo ed eliminarlo tramite un dato o un nome 
        */
        const deleteName = this.getAttribute("data-product-name");
        const deletePrice = this.getAttribute("data-attribute-price");
        console.log(deleteName);
        console.log(deletePrice);
        cart.forEach(elemento => {
            let eliminato = elemento.name;
            console.log(eliminato);
            if (eliminato === deleteName) {
                let posElimin = cart.indexOf(elemento);
                console.log(posElimin);
                cart.splice(posElimin, 1)
            }

        })
        window.location.reload();

        localStorage.setItem("cartArchive", JSON.stringify(cart));
        //localStorage.setItem("sommaCarello", sum)


    })
})

const allButton = document.querySelectorAll("button");
//console.log(allButton);

/*
allButton.forEach(buttonRef => {
    buttonRef.addEventListener("click", function () {
        window.location.reload();
    })
})
*/
/*
La parte sotto funziona, quando vado a selezionare una voce del select menu mi fa comparire giustamente gli oggetti di quella categoria
pero se poi voglio aggiungere un elemento al carello dopo aver selezionato la categoria non mi fa piu aggiungere al carello
funziona il button si vede che lo schiaccia pero non funziona l'aggiunta al carello



DA CONTROLLARE!!!!!!


const selectValue = document.getElementById("category");

selectValue.addEventListener("change", function () {
    console.log(selectValue.value);


    let arrayStampa = products.filter(prodotto => {
        return prodotto.category === selectValue.value
    })
    console.log(arrayStampa);

    document.getElementById("products").innerHTML = "";

    printProduct(arrayStampa, selectionProduct);
    //window.location.reload();

})

*/