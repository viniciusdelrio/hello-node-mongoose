const db = require("./db");
const BooksCollection = require("./models/books")

main().catch(err => console.log(err));

async function main() {
    await db.connect();

    await saveOneBook();
    await saveManyBooks();
    await findAll();
    await findOne();
    await deleteOne();
    await updateOne();

    await db.closeDatabase();
}

async function saveOneBook() {
    var oneBook = new BooksCollection({
        title: "My single book",
        author: "Author of this book"
    });

    await oneBook.save();
}

async function saveManyBooks() {
    var booksToSave = [
        new BooksCollection({
            title: "Clean Architecture",
            author: "Robert C. Martin"
        }),
        new BooksCollection({
            title: "Domain-Driven Design",
            author: "Eric Evans"
        })
    ];

    await BooksCollection.insertMany(booksToSave);
}

async function findAll() {
    var books = await BooksCollection.find();

    console.log("=============================");
    console.log("Find all: " + books);
}

async function findOne() {
    var mySingleBook = await BooksCollection.where({title: 'My single book'}).findOne()

    console.log("=============================");
    console.log("Find one: " + mySingleBook);
}

async function deleteOne() {
    var mySingleBook = await BooksCollection.where({title: 'My single book'}).findOne()

    mySingleBook.deleteOne();

    var books = await BooksCollection.find();
    
    console.log("=============================");
    console.log("Find all after delete: " + books);
}

async function updateOne() {
    await BooksCollection.updateOne({title: 'Clean Architecture'}, {title: 'Clean Code'});

    var books = await BooksCollection.find();

    console.log("=============================");
    console.log("Find all after update: " + books);    
}