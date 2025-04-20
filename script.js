// DOM Elements
const cardTemplate = document.querySelector('#card-template');
const addButton = document.querySelector('#submit-book');
const bookDialog = document.querySelector('#addBookDialog');
const openDialogBtn = document.querySelector('#openBookDialogBtn')
const closeDialogBtn = document.querySelector('#closeBookDialogBtn');
const mode = document.querySelector('.mode');
const bookList = document.querySelector('.books');

// Open dialog
openDialogBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

// Close dialog
closeDialogBtn.addEventListener('click', () => {
    bookDialog.close();
});

// Submit handler
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    submitBook();
});

// State Variables
let idCounter = 0;
let themeToggle = false;
const myLibrary = [];

// Book Class
class Book {
    constructor(title, author, year, link, cover, read) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.link = link;
        this.cover = cover;
        this.read = read;
        this.id = idCounter++;
    }
}

// Library Class
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }
}

// UI Class

class UI {
    constructor(library) {
        this.library = library;
    }

    renderLibrary() {
        bookList.innerHTML ='';
        this.library.books.forEach(book => this.createCard(book));  
    }

    createCard(book) {
        const newCard = cardTemplate.content.cloneNode(true);
        const card = newCard.querySelector('.card');
        card.id = book.id;
      
        newCard.querySelector('.book-title').textContent = book.title;
        newCard.querySelector('.book-title').href = book.link || '#';
        newCard.querySelector('.year').textContent = book.year;
        newCard.querySelector('.author').textContent = book.author;
      
        if (book.cover) {
          newCard.querySelector('.book-title').classList.add('hover');
          newCard.querySelector('.cover').src = book.cover;
        }
      
        const delButton = newCard.querySelector('.del');
        delButton.addEventListener('mousedown', () => this.deleteCard(book.id, card));
      
        const status = newCard.querySelector('.read-status');
        if (book.read) {
            card.classList.add('read');
            status.textContent = 'Read';
        } else {
            status.textContent = 'Unread';
        }
        
        status.addEventListener('click', () => {
            book.read = !book.read;
            card.classList.toggle('read', book.read);
            status.textContent = book.read ? 'Read' : 'Unread';
        });
      
        bookList.insertBefore(newCard, bookList.firstChild);
    }      

    deleteCard(id, card) {
        this.library.removeBook(id);
        card.remove();
    }
};

// Themes
const themes = {
    dark: {
        '--surface-col': '#4a5c6a',
        '--card-col': '#3b4a58',         
        '--header-col': '#2c3844',      
        '--bg-col': '#1c232b',           
        '--input-bg': '#5c6d7c',
        '--true-col': '#6eb1c0',         
        '--false-col': '#9a6ca3',        
        '--accent-col': '#5f72a6',       
        '--accent2-col': '#66dcf6',    
        '--text': '#f1eee9',  
    modeText: 'light_mode'
    },
    light: {
        '--surface-col': '#d8c3a5',
        '--card-col': '#c1a78f',
        '--header-col': '#a58c74',
        '--bg-col': '#f3eee7',
        '--input-bg': 'white',
        '--true-col': '#a98467',
        '--false-col': '#c97c63',
        '--accent-col': '#e5b28f',
        '--accent2-col': '#f6d7b0',
        '--text': '#3c2f2f',
        modeText: 'dark_mode'
    }
};

function applyTheme(theme) {
    Object.keys(theme).forEach(key => {
        if (key === 'modeText') {
            mode.textContent = theme[key];
        } else {
            document.documentElement.style.setProperty(key, theme[key]);
        }
    });
}

// Event Listeners
document.querySelector('.dialog-content').addEventListener('submit', (e) => {
    e.preventDefault();
    submitBook();
});

mode.addEventListener('click', () => {
    applyTheme(themeToggle ? themes.dark : themes.light);
    themeToggle = !themeToggle;
});

// Submit Book
function submitBook() {
    const title = document.querySelector('#book-title').value.trim();
    const author = document.querySelector('#book-author').value.trim();
    const year = parseInt(document.querySelector('#book-year').value.trim());
    const link = document.querySelector('#book-link').value.trim();
    const cover = document.querySelector('#book-cover').value.trim();
    const read = document.querySelector('#read').checked;

    if (!title || !author || !year || !Number.isInteger(year)) {
        alert("Please enter valid book details");
        return;
    }

    const book = new Book(title, author, year, link, cover, read);
    library.addBook(book);
    ui.renderLibrary();

    document.querySelector('.dialog-content').reset();
    bookDialog.close();
}

// Initialize Library and UI
const library = new Library();
const ui = new UI(library);

// Add Initial Books
[
    {title: 'East of Eden', 
        author: 'John Steinbeck', 
        year: 1952, 
        link:'https://www.goodreads.com/book/show/4406.East_of_Eden?ac=1&from_search=true&qid=bQQcyxpIPi&rank=1', 
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1639969375i/4406.jpg',
        read: true
    },

    {title: 'Lonesome Dove', 
        author: 'Larry McMurtry', 
        year: 1985, 
        link:'https://www.goodreads.com/book/show/256008.Lonesome_Dove?from_search=true&from_srp=true&qid=siFTxDA130&rank=1', 
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559668037i/256008.jpg',
        read: true
    },

    {title: 'The Brothers K', 
        author: 'David James Duncan', 
        year: 1992, 
        link:'https://www.goodreads.com/book/show/19534.The_Brothers_K?ref=nav_sb_ss_2_14',
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1403176622i/19534.jpg',
        read: true
    },

    {title: 'Barbarian Days: A Surfing Life', 
        author: 'William Finnegan', 
        year: 2015, 
        link:'https://www.goodreads.com/book/show/18693910-barbarian-days?ref=nav_sb_ss_1_14', 
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1418768620i/18693910.jpg',
        read: true
    },

    {title: 'The Pragmatic Programmer: From Journeyman to Master', 
        author: 'Dave Thomas', 
        year: 1999, 
        link:'https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer?ref=nav_sb_ss_1_8',
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg',
        read: false
    },

    {title: 'When Breath Becomes Air', 
        author: 'Paul Kalanithi', 
        year: 2016, 
        link:'https://www.goodreads.com/book/show/25899336-when-breath-becomes-air?ref=nav_sb_ss_1_11', 
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1492677644i/25899336.jpg',
        read: true
    },

    {title: 'Cutting for Stone', 
        author: 'Abraham Verghese', 
        year: 2009, 
        link:'https://www.goodreads.com/book/show/3591262-cutting-for-stone?ref=nav_sb_ss_1_17', 
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553715166i/3591262.jpg',
        read: true
    },

    {title: 'Cadillac Desert: The American West and Its Disappearing Water', 
        author: 'Marc Reisner', 
        year: 1986, 
        link:'https://www.goodreads.com/book/show/56140.Cadillac_Desert?ref=nav_sb_ss_1_8', 
        cover:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388189076i/56140.jpg',
        read: true }
].forEach(bookData => {
    const book = new Book(
        bookData.title, 
        bookData.author, 
        bookData.year, 
        bookData.link, 
        bookData.cover,
        bookData.read
    );
    library.addBook(book);
});

ui.renderLibrary();


