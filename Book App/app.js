

class Book
{
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addbooktolist(book)
    {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

   clearfields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
       }

       deleteBook(target)
       {
           if(target.className === 'delete')
           {
               target.parentElement.parentElement.remove();
           }
       }
   
}

class Store{

    static addbook(book)
    {
        const books = Store.getbooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static getbooks()
    {
        let books;
        if(localStorage.getItem('books') == null)
        {
           books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static displaybooks()
    {
        const books = Store.getbooks();

        books.forEach(function(book){
            const ui = new UI;
            ui.addbooktolist(book);
        });
    }

    static removeBook(isbn)
    {
        const books = Store.getbooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn)
            {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
document.addEventListener('DOMContentLoaded', Store.displaybooks);
 document.getElementById('book-form').addEventListener("submit",function(e)
 {
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value
   
    const book = new Book(title,author,isbn);

    const ui = new UI();
    ui.addbooktolist(book);
    Store.addbook(book);
    ui.clearfields();
 
 e.preventDefault();}
 );

 document.getElementById('book-list').addEventListener('click',function(e)
 {
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
 });
