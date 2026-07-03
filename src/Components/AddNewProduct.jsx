import React, { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { Paper, Box, TextField, Grid, Typography, Button } from "@mui/material";
import { IoCaretBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
  let paperStyle = {
    width: "400px",
    margin: "10% auto",
    textAlign: "center",
    padding: "10px",
  };

  let navigate = useNavigate();

  let [newProduct, setNewProduct] = useState({
    title: "",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      alert("Data added successfully");
      setNewProduct({
        title: "",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });
  }

  let handleAddProduct = (e) => {
    let { name, value } = e.target;
    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setNewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <Button
        style={{ margin: "20px" }}
        variant="contained"
        onClick={() => {
          navigate("/Products");
        }}
      >
        <IoCaretBackSharp />
      </Button>
      <Paper elevation={20} style={paperStyle}>
        <Typography variant="h5" component={"h5"} style={{ margin: "10px" }}>
          Create New Product
        </Typography>
        <Box sx={{ mt: 3 }} component={"form"} onSubmit={handleSubmit}>
          <Grid style={{ display: "grid", gap: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name="title"
              fullWidth
              type="text"
              value={newProduct.title}
              onChange={handleAddProduct}
            />
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              name="category"
              fullWidth
              type="text"
              value={newProduct.category}
              onChange={handleAddProduct}
            />
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  id="outlined-basic"
                  label="Rate"
                  variant="outlined"
                  name="rating.rate"
                  fullWidth
                  value={newProduct.rating.rate}
                  onChange={handleAddProduct}
                  type="number"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="outlined-basic"
                  label="Count"
                  variant="outlined"
                  name="rating.count"
                  fullWidth
                  value={newProduct.rating.count}
                  onChange={handleAddProduct}
                  type="number"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Add product
            </Button>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default AddNewProduct;
