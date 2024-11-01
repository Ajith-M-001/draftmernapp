import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiTextField from "../components/MUITextField";

// eslint-disable-next-line react/prop-types
const UserAuthForm = ({ type }) => {
  const theme = useTheme();
  console.log(type);
  console.log(theme);

  const validationSchema = Yup.object({
    fullName: Yup.string("enter Full Name").required("Your full name required"),
    email: Yup.string("Enter your email")
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string("enter Password")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Must contain at least one uppercase, lowercase, number and special character"
      )
      .required("password is required"),
    confirmPassword: Yup.string("Confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    console.log(`${type} form submitted`, values);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        className="min-height "
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: theme.spacing(4),
        }}
      >
        <Paper elevation={1} sx={{ padding: theme.spacing(4), width: "100%" }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: theme.spacing(6),
              textAlign: "center",
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.text.primary,
            }}
          >
            {type === "signup" ? "Join Us Today" : "Welcome Back"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              //   isSubmitting,
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
            }) => (
              <Form>
                {type === "signup" && (
                  <MuiTextField
                    id="fullName"
                    name="fullName"
                    placeholder={"Enter Your Full Name"}
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                    sx={{ mb: theme.spacing(2) }}
                  />
                )}
                <MuiTextField
                  id="email"
                  name="email"
                  placeholder={"Enter Email"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ mb: theme.spacing(2) }}
                />
                <MuiTextField
                  id="password"
                  name="password"
                  placeholder={"Enter password"}
                  value={values.password}
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ mb: theme.spacing(2) }}
                />
                {type === "signup" && (
                  <MuiTextField
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={"confirm Password"}
                    value={values.confirmPassword}
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ mb: theme.spacing(2) }}
                  />
                )}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      mt: theme.spacing(5),
                      px: theme.spacing(10),
                      borderRadius: theme.spacing(10),
                      height: 54,
                      fontSize: theme.typography.fontSizes.lg,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {type === "signup" ? "Sign Up" : "Sign In"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserAuthForm;
