
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'miniproject',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    // Generate a unique file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error registering user' });
        }
        return res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/admin-register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO admin_users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error registering admin user' });
        }
        return res.status(201).json({ message: 'Admin user registered successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering admin user' });
  }
});


app.post('/submit-book', upload.single('bookImage'), async (req, res) => {
  try {
    const { bookName, bookDetails, priceExpected } = req.body;

    // Get the file path of the uploaded image
    const bookImagePath = req.file ? req.file.path : null;

    db.query(
      'INSERT INTO submitted_books (book_name, book_details, price_expected, book_image_path, approval_status) VALUES (?, ?, ?, ?, ?)',
      [bookName, bookDetails, priceExpected, bookImagePath, 'pending'], // Set approval_status to 'pending'
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error submitting book' });
        }
        return res.status(201).json({ message: 'Book submitted successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error submitting book' });
  }
});


// Fetch a list of submitted books
app.get('/submitted-books', (req, res) => {
  db.query('SELECT * FROM submitted_books', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching submitted books' });
    }
    res.status(200).json(results);
  });
});
app.delete('/submitted-books/:id', async (req, res) => {
  const bookId = req.params.id;
  
  // Use SQL DELETE query to remove the book from the database by its ID
  db.query('DELETE FROM submitted_books WHERE id = ?', [bookId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error canceling book' });
    }
    res.status(200).json({ message: 'Book canceled successfully' });
  });
});
// Approve a submitted book by ID



app.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the database to find the admin user by their email
    db.query('SELECT * FROM admin_users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error querying the database' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.status(200).json({ message: 'Admin login successful' });
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Error during admin login' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the database to find the admin user by their email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error querying the database' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.status(200).json({ message: ' login successful' });
    });
  } catch (error) {
    console.error('Error during  login:', error);
    res.status(500).json({ error: 'Error during  login' });
  }
});

// Fetch pending submitted books
app.get('/requested-books', (req, res) => {
  db.query('SELECT * FROM submitted_books WHERE approval_status = ?', ['pending'], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching pending submitted books' });
    }
    res.status(200).json(results);
  });
});


app.post('/accept-book/:id', (req, res) => {
  const bookId = req.params.id;

  // Update the status of the book in the database to 'accepted'
  db.query('UPDATE submitted_books SET approval_status = ? WHERE id = ?', ['accepted', bookId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error accepting book' });
    }
    res.status(200).json({ message: 'Book accepted successfully' });
  });
});
app.post('/add-book', async (req, res) => {
  try {
    const {
      name,
      author,
      rating,
      price,
      status,
      condition,
      description,
      image, // New field for the image
    } = req.body;

    db.query(
      'INSERT INTO books (name, author, rating, price, status, `condition`, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, author, rating, price, status, condition, description, image], // Include 'image' in the query
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error adding book' });
        }
        return res.status(201).json({ message: 'Book added successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding book' });
  }
});

app.get('/search-books', (req, res) => {
  const { query } = req.query;

  db.query(
    'SELECT * FROM books WHERE name LIKE ?',
    [`%${query}%`, `%${query}%`],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error searching for books' });
      }
      res.json(results);
    }
  );
});





app.get("/fetch-books", (req, res) => {
  // Assuming you have a "books" table in your database
  const sql = "SELECT * FROM books";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ error: "Error fetching books" });
    }

    res.status(200).json(results);
  });
});


app.get("/fetch-book-details/:id", (req, res) => {
  const bookId = req.params.id;

  // Query the database to retrieve book details
  db.query(
    "SELECT * FROM books WHERE id = ?",
    [bookId],
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "Book not found" });
      } else {
        // Respond with the book details retrieved from the database
        res.json(results[0]);
      }
    }
  );
});
// Modify your server-side code to handle adding books to a user's cart
// app.post("/add-to-cart", (req, res) => {
//   const { userId, bookId } = req.body;

//   // Check if the book is already in the user's cart
//   db.query(
//     "SELECT * FROM user_cart WHERE user_id = ? AND book_id = ?",
//     [userId, bookId],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Error querying the database" });
//       }

//       if (results.length > 0) {
//         // The book is already in the cart, you can update the quantity or perform other actions here
//         return res.status(200).json({ message: "Book is already in the cart" });
//       }

//       // If the book is not in the cart, insert it into the user's cart
//       db.query(
//         "INSERT INTO user_cart (user_id, book_id, quantity) VALUES (?, ?, 1)",
//         [userId, bookId],
//         (err, results) => {
//           if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Error adding book to cart" });
//           }

//           return res.status(201).json({ message: "Book added to cart successfully" });
//         }
//       );
//     }
//   );
// });
// app.post("/add-to-cart", (req, res) => {
//   const { email, book } = req.body;

//   // Insert the data into the user_cart table
//   const sql = "INSERT INTO user_cart (user_email, book_id, quantity) VALUES (?, ?, ?)";
//   const values = [email, book.id, 1]; // Assuming quantity is initially set to 1

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding book to cart:", err);
//       res.status(500).json({ message: "Error adding book to cart" });
//     } else {
//       console.log("Book added to cart");
//       res.status(200).json({ message: "Book added to cart successfully" });
//     }
//   });
// });

// app.post("/add-to-cart", (req, res) => {
//   const { user_email, book } = req.body; // Change 'email' to 'user_email'

//   if (!user_email || !book || !book.id) {
//     // Check if 'user_email' and 'book' data are present and valid
//     return res.status(400).json({ message: "Invalid request data" });
//   }

//   // Insert the data into the user_cart table
//   const sql = "INSERT INTO user_cart (user_email, book_id, quantity) VALUES (?, ?, ?)";
//   const values = [user_email, book.id, 1]; // Assuming quantity is initially set to 1

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding book to cart:", err);
//       res.status(500).json({ message: "Error adding book to cart" });
//     } else {
//       console.log("Book added to cart");
//       res.status(200).json({ message: "Book added to cart successfully" });
//     }
//   });
// });


// app.post("/add-to-cart", (req, res) => {
//   const { user_email, book_id,quantity } = req.body;

//   if (!user_email || !book || !book.id) {
//     return res.status(400).json({ message: "Invalid request data" });
//   }

//   const sql = "INSERT INTO user_cart (user_email, book_id, quantity) VALUES (?, ?, ?)";
//   const values = [user_email, book.id, 1]; // Assuming quantity is initially set to 1

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding book to cart:", err);
//       return res.status(500).json({ message: "Error adding book to cart" });
//     }

//     console.log("Book added to cart");
//     res.status(200).json({ message: "Book added to cart successfully" });
//   });
// });
// app.post("/add-to-cart", (req, res) => {
//   const { user_email, book, quantity } = req.body;

//   if (!user_email || !book || !book.id) {
//     return res.status(400).json({ message: "Invalid request data" });
//   }

//   const sql = "INSERT INTO user_cart (user_email, book_id, quantity) VALUES (?, ?, ?)";
//   const values = [user_email, book.id, quantity]; // Use the quantity from the request

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding book to cart:", err);
//       return res.status(500).json({ message: "Error adding book to cart" });
//     }

//     console.log("Book added to cart");
//     res.status(200).json({ message: "Book added to cart successfully" });
//   });
// });
// app.post("/add-to-cart", (req, res) => {
//   const { user_email, book_id, quantity } = req.body;

//   if (!user_email || !book_id || !quantity) {
//     return res.status(400).json({ message: "Invalid request data" });
//   }

//   const sql = "INSERT INTO user_cart ( book_id, quantity) VALUES ( ?, ?)";
//   const values = [ book_id, quantity]; // Use the quantity from the request

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding book to cart:", err);
//       return res.status(500).json({ message: "Error adding book to cart" });
//     }

//     console.log("Book added to cart");
//     res.status(200).json({ message: "Book added to cart successfully" });
//   });
// });
// app.post("/add-to-cart", (req, res) => {
//   const { book_id, quantity } = req.body;

//   if (!book_id || !quantity) {
//     return res.status(400).json({ message: "Invalid request data" });
//   }

//   const sql = "INSERT INTO user_cart (book_id, quantity) VALUES (?, ?)";
//   const values = [book_id, quantity];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding book to cart:", err);
//       return res.status(500).json({ message: "Error adding book to cart" });
//     }

//     console.log("Book added to cart");
//     res.status(200).json({ message: "Book added to cart successfully" });
//   });
// });
// Endpoint to add a book to the user's cart or update its quantity
// app.post("/add-to-cart", (req, res) => {
//   const { book_id, quantity } = req.body;

//   if (!book_id || !quantity) {
//     return res.status(400).json({ message: "Invalid request data" });
//   }

//   // Check if the book with the given book_id already exists in user_cart
//   const checkSql = "SELECT * FROM user_cart WHERE book_id = ?";
//   db.query(checkSql, [book_id], (checkErr, checkResult) => {
//     if (checkErr) {
//       console.error("Error checking book in cart:", checkErr);
//       return res.status(500).json({ message: "Error checking book in cart" });
//     }

//     if (checkResult.length > 0) {
//       // Book already exists in the cart, update the quantity
//       const updateSql = "UPDATE user_cart SET quantity = quantity + ? WHERE book_id = ?";
//       const updateValues = [quantity, book_id];

//       db.query(updateSql, updateValues, (updateErr, updateResult) => {
//         if (updateErr) {
//           console.error("Error updating book quantity:", updateErr);
//           return res.status(500).json({ message: "Error updating book quantity" });
//         }

//         console.log("Book quantity updated in cart");
//         res.status(200).json({ message: "Book quantity updated in cart" });
//       });
//     } else {
//       // Book doesn't exist in the cart, insert a new record
//       const insertSql = "INSERT INTO user_cart (book_id, quantity) VALUES (?, ?)";
//       const insertValues = [book_id, quantity];

//       db.query(insertSql, insertValues, (insertErr, insertResult) => {
//         if (insertErr) {
//           console.error("Error adding book to cart:", insertErr);
//           return res.status(500).json({ message: "Error adding book to cart" });
//         }

//         console.log("Book added to cart");
//         res.status(200).json({ message: "Book added to cart successfully" });
//       });
//     }
//   });
// });
app.post("/add-to-cart", (req, res) => {
  const { book_id, quantity, name, author, image, price } = req.body;

  if (!book_id || !quantity || !name || !author || !image || !price) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  const sql = `
    INSERT INTO user_cart (book_id, quantity, name, author, image, price) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [book_id, quantity, name, author, image, price];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding book to cart:", err);
      return res.status(500).json({ message: "Error adding book to cart" });
    }

    console.log("Book added to cart");
    res.status(200).json({ message: "Book added to cart successfully" });
  });
});

// app.js (or your server entry file)

// app.get("/api/get-cart-books", (req, res) => {
//   // Assuming you have a database connection called 'db'

//   const sql = "SELECT * FROM user_cart";

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching cart books:", err);
//       return res.status(500).json({ message: "Error fetching cart books" });
//     }

//     res.status(200).json(result); // Send the retrieved books as JSON response
//   });
// });

// app.js (or your server entry file)

// app.get("/api/get-cart-books", (req, res) => {
//   // Assuming you have a database connection called 'db'

//   const sql = `
//     SELECT
//       // c.*,  -- Select all fields from user_cart
//       b.name AS book_name,
//       b.author,
//       b.image,
//       b.price
//     FROM user_cart c
//     // JOIN books b ON c.book_id = b.id
//   `;

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching cart books:", err);
//       return res.status(500).json({ message: "Error fetching cart books" });
//     }

//     res.status(200).json(result); // Send the retrieved books as JSON response
//   });
// });
// app.get("/api/get-cart-items", (req, res) => {
//   // Assuming you have a database connection called 'db'

//   const sql = "SELECT * FROM user_cart";

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching cart items:", err);
//       return res.status(500).json({ message: "Error fetching cart items" });
//     }

//     const cartItems = result.map((row) => row.book_id);
//     res.status(200).json(cartItems); // Send the retrieved cart items (book IDs) as JSON response
//   });
// });
app.get("/api/get-cart-items", (req, res) => {
  // Assuming you have a database connection called 'db'

  const sql = "SELECT book_id FROM user_cart";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).json({ message: "Error fetching cart items" });
    }

    const cartItems = result.map((row) => row.book_id);
    res.status(200).json({ cartItems }); // Send the retrieved cart items (book IDs) as JSON response
  });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
