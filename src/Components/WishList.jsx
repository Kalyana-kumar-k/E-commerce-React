import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeGivenItem } from "../Store/cartSliceReducer";

const WishList = () => {
  let cartReducer = useSelector((state) => {
    return state.cart;
  });

  let dispatch = useDispatch();

  let handleDelete = (id) => {
    if(confirm("Are you sure you remove this product from wish list?")){
        dispatch(removeGivenItem(id));
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      {cartReducer.length !== 0 ? (
        <section className="procuctsSection">
          {cartReducer.map((product) => (
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
      ) : (
        <h2>Please purchase something..</h2>
      )}
    </div>
  );
};

export default WishList;
