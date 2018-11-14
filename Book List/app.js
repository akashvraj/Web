class Store
{

    static addBookData(book)
    {
        let books = [];
        //
        
        let temp;
        if( (temp = localStorage.getItem("BookData")) !== null)
            books = JSON.parse(temp);
        
        books.push(book);
        localStorage.setItem("BookData", JSON.stringify(books));

    }

    static removeBookData(book_to_remove)
    {
        
        let books_list = JSON.parse(localStorage.getItem("BookData"));
        //console.log(books_obj);
        books_list.forEach(function(book, index){
            console.log(index);
            let cmp_book = new Book(book.title, book.author, book.isbn);
            console.log(cmp_book);
            if(Book.compareBook(cmp_book, book_to_remove))
            {
                console.log("yes")
                books_list.splice(index, 1);
                return;
            }
        });

    localStorage.setItem("BookData", JSON.stringify(books_list));        
    }

}// class Store end



class Book{
    constructor(title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    
    addBookToList()
    {
        Store.addBookData(this);

    }

    removeBookFromList()
    {
        Store.removeBookData(this);
    }

    static compareBook(book1, book2)
    {
        if(book1.title==book2.title & book1.author==book2.author & book1.isbn==book2.isbn)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

class UI{

    clearFields()
    {
        $title.value="";
        $author.value="";
        $isbn.value="";
    }

    showAlert(message, className)
    {
        //create div
        const $div = document.createElement('div');
            //Add class
            $div.className = `${className}`;
            //Add text
            $div.appendChild(document.createTextNode(message));

        //Get parent
        const $parent = document.querySelector(".container");
        $parent.insertBefore($div, $bookForm);

        /* remove alert after 3 seconds */
        setTimeout(function(){$div.remove();}, 1000);

    }
    
    deleteBookFromUi(e)
    {
        if(e.target.className == "delete")
        {
            e.target.parentElement.parentElement.remove();
        }

        let $tr = e.target.parentElement.parentElement;
        let remove_book = new Book($tr.childNodes[0].textContent, $tr.childNodes[2].textContent, $tr.childNodes[4].textContent);
        //console.log(remove_book);
        remove_book.removeBookFromList();
        //e.preventDefault();
    }

    addBookToUi(book)
    {
         //Create Element
         const $tr = document.createElement('tr');
         $tr.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> <td><a href="#" class="delete">${'x'}</a></td>`;
         
         $book_list.appendChild($tr);
    }

} // UI class end



/* Variables section */
const $bookForm = document.forms["book-form"]; // Get the specific form
const $book_list = document.querySelector("table tbody");
const $title = $bookForm["title"];
const $author = $bookForm["author"];
const $isbn = $bookForm["isbn"];

/* Event section */
// Event listner for add book
$bookForm["submit-book"].addEventListener('click', addBook);
// Event listner for delete book using event deligation
$book_list.addEventListener('click', deleteBook);



/* Function Section */

function deleteBook(e)
{
    new UI().deleteBookFromUi(e);

}

function addBook(e)
{
    //Get form values
    const title = $title.value;
    const author = $author.value;
    const isbn = $isbn.value;
    
    //Instantiate book
    const book = new Book(title, author, isbn);
    
    //Instantiate UI
    const ui = new UI();
    
    //Validate
    if(title == "" || author == "" || isbn == ""  )
    {
        ui.showAlert("Please fill in all fields!", "error");
    }
    else{
    //Add book to UI
    ui.addBookToUi(book);

    //Add Book to storage
    book.addBookToList();

    //Show Success
    ui.showAlert("Book added", "success");

    //Clear fields
    ui.clearFields();
    }
   // e.preventDefault();
} // addBook() end

(function refreshBooks()
{
    obj_books = JSON.parse(localStorage.getItem("BookData"));
    const ui = new UI();
    obj_books.forEach(function(book, index){
        ui.addBookToUi(book);
    });
})();