import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../utils/apiRoutes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { allTexts } from "../constants/allTexts";

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    avatarImage: null,
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(allTexts.username_is_required),
    email: Yup.string()
      .email(allTexts.invalid_email)
      .required(allTexts.email_is_required),
    password: Yup.string().required(allTexts.password_is_required),
    avatarImage: Yup.mixed().required(allTexts.image_is_required),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(async () => {
      console.log({ values });
      const { password, username, email, avatarImage } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        avatarImage,
      });
      console.log({ data });
      if (data.status === false) {
        //   toast.error(data.msg, toastOptions);
        console.log({ message: data.msg });
      } else {
        localStorage.setItem(allTexts.user, JSON.stringify(data.user));
      }
      setSubmitting(false);
      navigate("/");
    }, 500);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5 pt-5">
      <Row className="border p-5 rounded w-50">
        <Col>
          <h1 className="text-center mb-4">{allTexts.register}</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    {allTexts.username}
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    component={Alert}
                    variant="danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    {allTexts.email}
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component={Alert}
                    variant="danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    {allTexts.password}
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component={Alert}
                    variant="danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="avatarImage" className="form-label">
                    {allTexts.image}
                  </label>
                  <Field
                    type="file"
                    name="avatarImage"
                    id="avatarImage"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="avatarImage"
                    component={Alert}
                    variant="danger"
                  />
                </div>
                <Button
                  className="w-100 mt-4 p-2"
                  type="submit"
                  disabled={isSubmitting}
                  block>
                  {isSubmitting
                    ? `${allTexts.register}.....`
                    : allTexts.register}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
export default Register;
