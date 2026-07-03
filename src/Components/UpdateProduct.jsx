import React, { useState, useEffect } from "react";
import { Paper, Box, TextField, Grid, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { TbLoaderQuarter } from "react-icons/tb";

const UpdateProduct = () => {
  let paperStyle = {
    width: "400px",
    margin: "10% auto",
    textAlign: "center",
    padding: "10px",
  };

  let { id } = useParams();
  let [updateProduct, setUpdateProduct] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`, { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUpdateProduct(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then(() => {
      alert("Saved successfully");
      navigate("/Products");
    });
  }

  let handleUpdateProduct = (e) => {
    let { name, value } = e.target;
    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setUpdateProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setUpdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  if (updateProduct !== null) {
    return (
      <div>
        <Paper elevation={20} style={paperStyle}>
          <Typography variant="h5" component={"h5"} style={{ margin: "10px" }}>
            Update Product
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
                value={updateProduct.title}
                onChange={handleUpdateProduct}
              />
              <TextField
                id="outlined-basic"
                label="Category"
                variant="outlined"
                name="category"
                fullWidth
                type="text"
                value={updateProduct.category}
                onChange={handleUpdateProduct}
              />
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    id="outlined-basic"
                    label="Rate"
                    variant="outlined"
                    name="rating.rate"
                    fullWidth
                    value={updateProduct.rating.rate}
                    onChange={handleUpdateProduct}
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
                    value={updateProduct.rating.count}
                    onChange={handleUpdateProduct}
                    type="number"
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="success">
                Save
              </Button>
            </Grid>
          </Box>
        </Paper>
      </div>
    );
  } else {
    return (
      <div>
        <center>
          <TbLoaderQuarter className="loader" size={200} color="green" />
        </center>
      </div>
    );
  }
};

export default UpdateProduct;
