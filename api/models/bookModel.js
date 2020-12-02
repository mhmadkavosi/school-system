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
    // TODO make a grade for books
},
    {
        timestamps:true
    }
);


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;