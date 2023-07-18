import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../utils/apiRoutes";
import { useDispatch } from "react-redux";
import { fetchPosts, updateAuthentication } from "../statemangagment/apiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { ModalComponent } from "../components";
import { allTexts } from "../constants/allTexts";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [error, setError] = useState('')

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(allTexts.username_is_required),
    password: Yup.string().required(allTexts.password_is_required),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(async () => {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log({ data, user: data.user });
      if (data.status === false) {
        setDeleteModal(true)
        setError(data.msg )
      } else {
        console.log("1");
        localStorage.setItem(allTexts.user, JSON.stringify(data.user));
        dispatch(updateAuthentication(true));
        dispatch(fetchPosts());
        navigate("/feeds");
      }
      setSubmitting(false);
    }, 500);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5 pt-5">
      <Row className="border p-5 rounded w-50">
        <Col>
          <h1 className="text-center mb-4"></h1>
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
                <Button
                  className="w-100 mt-4 p-2"
                  type="submit"
                  disabled={isSubmitting}
                  block>
                  {isSubmitting ? `${allTexts.login}.....` : allTexts.login}
                </Button>
              </Form>
            )}
          </Formik>
          
        </Col>
        <span className="mt-3">
           { allTexts.do_not_have_account} <Link to="/register">{allTexts.register}</Link>
          </span>
      </Row>
      <ModalComponent
        headTitle={allTexts.error}
        body={error}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        confirmDelete={setDeleteModal}
      />
    </Container>
  );
};
export default Login;
