import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TbLoaderQuarter } from "react-icons/tb";
import useFetch from "./useFetch";
import { FaCartPlus } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem } from "../Store/cartSliceReducer";

const ProductsList = () => {
  //fetch using custom hook- Async Await try catch useFetch.js
  let { products, err, isLoading, setProducts } = useFetch(
    "http://localhost:4000/products",
  );
  let navigate = useNavigate();

  let navigation = (id) => {
    navigate(`/updateproduct/${id}`);
  };
  // fetch using then catch
  /*  let [products, setProducts] = useState([]);
  let [err, setErr] = useState("");
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/products", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Search proper data");
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setErr(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); */

  let handleDelete = (id) => {
    if (confirm("Are you sure to revert this?")) {
      fetch(`http://localhost:4000/products/${id}`, { method: "DELETE" }).then(
        () => {
          alert("Deleted Successfully");
          let newProductList = products.filter((product) => product.id !== id);
          setProducts(newProductList);
        },
      );
    }
  };

  let dispatch = useDispatch();
  let cartWishList = useSelector((state) => {
    return state.cart;
  });

  let addItemToCart = (product) => {
    let checkList = cartWishList.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    if (checkList) {
      alert("Product already added");
    } else {
      dispatch(addNewItem(product));
      alert("Wish list added..!");
    }
  };

  if (isLoading) {
    return (
      <center>
        <TbLoaderQuarter className="loader" size={200} color="green" />
      </center>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      <h5
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "10px",
        }}
      >
        Create new product -{" "}
        <Button
          variant="secondary"
          style={{ marginTop: "10px" }}
          onClick={() => {
            navigate("/newproduct");
          }}
        >
          <MdCreateNewFolder />
        </Button>
      </h5>
      <h2>Products List - {products.length}</h2>
      <section className="procuctsSection">
        {products.map((product) => (
          <center key={product.id}>
            <Card style={{ width: "18rem" }} className="card">
              <Card.Img
                variant="top"
                src={product.image}
                className="productImage"
              />
              <Card.Body className="productDescription">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
              <Card.Title style={{ marginTop: "10px" }}>
                $. {product.price}
              </Card.Title>
              <div className="productBtn">
                <Button
                  variant="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    addItemToCart(product);
                  }}
                >
                  <FaCartPlus />
                </Button>
                <Button
                  variant="success"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    navigation(product.id);
                  }}
                >
                  <RiEditBoxFill />
                </Button>
                <Button
                  variant="danger"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  <AiFillDelete />
                </Button>
              </div>
            </Card>
          </center>
        ))}
      </section>
      {err && <h4>{err}</h4>}
    </div>
  );
};

export default ProductsList;
