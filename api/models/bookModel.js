const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: String,
    images: {
        type: [String],
        default: "no-photo.jpg"
    },
    description: String,
});


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;