import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { updateAuthentication } from "../../statemangagment/apiSlice";
import { allTexts } from "../../constants/allTexts";

function NavbarComponent({ isAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(updateAuthentication(false));
    navigate("/");
  };

  console.log({ isAuthenticated });

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Nav className="me-auto">
          {isAuthenticated ? (
            <>
              <Nav.Link as={NavLink} to="/feeds">
                {allTexts.feed}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/archives">
                {allTexts.archive}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/chat">
                {allTexts.chat}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/totalMessege">
                {allTexts.totalMessage}
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>{allTexts.logout}</Nav.Link>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/">
              {allTexts.login}
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
