import { Fragment } from "react";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Products from "./Components/Products";
import ToDoList from "./Components/ToDoList";
import ProductsList from "./Components/ProductsList";
import ProductDetails from "./Components/ProductDetails";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBarTab from "./Components/NavBarTab";
import NotFound from "./Components/NotFound";
import AddNewProduct from "./Components/AddNewProduct";
import UpdateProduct from "./Components/UpdateProduct";
import WishList from "./Components/WishList";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

export let UserContext = createContext();

function App() {
  let [user, setUser] = useState({
    name: "CRUD React'Js",
    email: "dummymail123@gmail.com",
  });

  let person = "kalyan";

  return (
    <UserContext.Provider value={{ user }}>
      <Fragment>
        <Router basename="/E-commerce-React">
          {/* <ol>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={`/login/${person}`}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li>
              <Link to={"/products"}>Products</Link>
            </li>
            <li>
              <Link to={"/todo"}>To Do List</Link>
            </li>
          </ol> */}
          <NavBarTab />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/:newPerson" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="list" element={<ProductsList />} />
              <Route path="details" element={<ProductDetails />} />
            </Route>
            <Route path="/todo" element={<ToDoList />} />
            <Route path="/newproduct" element={<AddNewProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Fragment>
    </UserContext.Provider>
  );
}

export default App;
