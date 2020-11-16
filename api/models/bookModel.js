const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        tritm: true,
        required: [true, 'Book must have a name']
    },
    images: {
        type: [String],
        default: "no-photo.jpg"
    },
    description: String,
});


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;