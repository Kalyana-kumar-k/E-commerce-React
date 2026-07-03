import React, { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let render = 0;

let schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Enter your full name"),
  email: Yup.string()
    .email()
    .required("Email is Required")
    .matches(/^[a-z]+[0-9]+@[a-z]{3,5}\.[a-z]{2,5}$/, "Enter proper email"),
  age: Yup.number()
    .integer()
    .positive()
    .required("age is required")
    .min(18, "enter age between 18-30")
    .max(30, "Enter age between 18-30"),
  password: Yup.string().required("Password is required"),
  cPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const Signup = () => {
  const paperStyle = {
    width: "400px",
    margin: "auto",
    textAlign: "center",
    padding: "10px",
    display: "grid",
    gap: "20px",
  };
  render++;
  let [input, setInput] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let handleInput = (data) => {
    console.log(data);
  };

  // console.log(errors);

  return (
    <>
      <h1>React-Hook-Form - {render}</h1>
      <Paper
        elevation={20}
        style={paperStyle}
        component={"form"}
        onSubmit={handleSubmit(handleInput)}
      >
        <Typography variant="h5">Form-validation</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="title"
          fullWidth
          type="text"
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="title"
          fullWidth
          type="email"
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="title"
          fullWidth
          type="number"
          label="Age"
          {...register("age")}
          error={!!errors.age}
          helperText={errors.age?.message}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="title"
          fullWidth
          type="password"
          label="Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="title"
          fullWidth
          type="password"
          label="Confirm password"
          {...register("cPassword")}
          error={!!errors.cPassword}
          helperText={errors.cPassword?.message}
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Paper>
    </>
  );
};

export default Signup;
