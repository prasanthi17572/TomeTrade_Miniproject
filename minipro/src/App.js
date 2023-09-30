// import "./App.css";
// import { Route, Switch } from "react-router-dom";
// import { Provider } from "./context/Context";
// import Navbar from "./components/Navbar";
// import Header from "./components/Header";
// import Books from "./components/Books";
// import About from "./components/About";
// import BookCart from "./components/BookCart";
// import BookDetails from "./components/BookDetails";
// import LoginPage from "./components/LoginPage";
// import Signup from "./components/Signup";
// import Admin from "./components/Admin";
// import Form from './components/Form';
// import Welcome  from "./components/Welcome";
// import SellBooksForm from "./components/SellBooksForm";
// import UserDetails from "./components/UserDetails";
// import AdminLogin from "./components/AdminLogin"; // Import the AdminLogin component
// import AdminRegister from "./components/AdminRegister";
// import AdminDashboard from "./components/AdminDashboard";
// import AddBooksForm from "./components/AddBooksForm";
// // import RequestedBooksList from "./components/RequestedBooksList";
// import RequestedBooks from "./components/RequestedBooks.js"; // Import the new component

// import { CartProvider } from './components/CartContext'; // Import the CartProvider

// function App() {
//   return (
//     <Provider>
//       <div className="App">
//         <Navbar />
//         <Switch>
//           <Route
//             exact
//             path="/"
//             render={() => (
//               <>
//                 <Header />
//                 <Books />
//               </>
//             )}
//           />
//           <Route path="/about" component={About} />
//           <Route path="/book-cart" component={BookCart} />
//           <Route path="/book/details/:id" component={BookDetails} />
//           <Route path='/admin' component={Admin}/>
//           <Route path="/login" component={LoginPage} />
//           <Route path="/signup" component={Signup} />
//           <Route path="/form" component={Form}/>
//           <Route path="/Welcome" component={Welcome} />
//           <Route path="/sell-books" component={SellBooksForm} />
//           <Route path="/user-details" component={UserDetails} />
//           <Route path="/admin-login" component={AdminLogin} />
//           <Route path="/admin-register" component={AdminRegister} />
//           <Route path="/AdminDashboard" component={AdminDashboard} />
//           <Route path="/add-books" component={AddBooksForm} />
//           {/* <Route path="/requested-books" component={RequestedBooksList} /> */}
//           {/* <Route path="/requested-books"  component={RequestedBooks} /> */}
//           <Route path="/requested-books" component={RequestedBooks} />



//         </Switch>
//       </div>
//     </Provider>
//   );
// }

// export default App;
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Provider } from "./context/Context";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Books from "./components/Books";
import About from "./components/About";
import BookCart from "./components/BookCart";
import BookDetails from "./components/BookDetails";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Form from './components/Form';
import Welcome from "./components/Welcome";
import SellBooksForm from "./components/SellBooksForm";
import UserDetails from "./components/UserDetails";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminDashboard from "./components/AdminDashboard";
import AddBooksForm from "./components/AddBooksForm";
import RequestedBooks from "./components/RequestedBooks"; // Import the new component
import Cart from "./components/Cart";
import { CartProvider } from './components/CartContext'; // Import the CartProvider
import CartPage from "./components/CartPage";

function App() {
  return (
    <Provider>
      <CartProvider> {/* Wrap your entire app with CartProvider */}
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <Header />
                  <Books />
                </>
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/book-cart" component={BookCart} />
            <Route path="/book/details/:id" component={BookDetails} />
            <Route path='/admin' component={Admin} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/form" component={Form} />
            <Route path="/Welcome" component={Welcome} />
            <Route path="/sell-books" component={SellBooksForm} />
            <Route path="/user-details" component={UserDetails} />
            <Route path="/admin-login" component={AdminLogin} />
            <Route path="/admin-register" component={AdminRegister} />
            <Route path="/AdminDashboard" component={AdminDashboard} />
            <Route path="/add-books" component={AddBooksForm} />
            <Route path="/requested-books" component={RequestedBooks} />
            <Route path="/carts" component={CartPage}/>
          </Switch>
        </div>
      </CartProvider>
    </Provider>
  );
}

export default App;
