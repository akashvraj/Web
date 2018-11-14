class Book{
    constructor(title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    
    addBookToList(book)
    {
        //Create Element
        const $tr = document.createElement('tr');
        $tr.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> <td><a href="#" class="delete">${'x'}</a></td>`;
        
        $book_list.appendChild($tr);

    }

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
        setTimeout(function(){$div.remove();}, 3000);

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
    //Add book
    ui.addBookToList(book);

    //Show Success
    ui.showAlert("Book added", "success");

    //Clear fields
    ui.clearFields();
    }
   // e.preventDefault();
} // addBook() end


function deleteBook(e)
{
    if(e.target.className == "delete")
    {
        e.target.parentElement.parentElement.remove();
    }
    //e.preventDefault();
}