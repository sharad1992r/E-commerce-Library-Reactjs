import Nav from "./components/Nav";
import React, { useEffect, useState } from "react";
import "./index.css";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import Bookinfo from "./pages/Bookinfo";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id));
    console.log("df", item);
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  //   const dupeItem = cart.find(item => +item.id === +book.id)
  //   if(dupeItem){
  //     dupeItem.quantity += 1;
  //     setCart(cart.map(item => {
  //       if(item.id === dupeItem.id){
  //         return {
  //           ...item,
  //           quantity: item.quantity + 1,
  //         }
  //       }
  //       else{
  //         return item
  //       }
  //     }))
  //   }
  //   else{
  //     setCart([...cart, {...book, quantity: 1}])
  //   }
  //   // console.log(dupeItem)
  //   setCart([...cart, {book, quantity: 1}])
  // }

  // useEffect(() => {
  //   console.log(cart)
  // },[cart])

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route
          path="/books/:id"
          render={() => (
            <Bookinfo books={books} addToCart={addToCart} cart={cart} />
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <Cart
              books={books}
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
            />
          )}
        />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
