import InputWrapper from "../components/inputWrapper/inputWrapper.jsx";
import Modal from "../components/modal/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addEmail,
  addPassword,
  checkCheckbox,
  defaultChecked,
} from "../Slices/logInSlice.jsx";
import { loginAsync } from "../features/loginThunk.jsx";
import { openModal } from "../Slices/modalSlice.jsx";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userConnection.connection);
  const { email, checked } = useSelector((state) => state.identity);
  const checkedInLocalStorage = localStorage?.getItem("checked");
  const emailLocale = localStorage?.getItem("email") ?? "";

  useEffect(() => {
    if (JSON.stringify(error) != "{}") {
      dispatch(openModal());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (localStorage?.getItem("checked") === "true") {
      dispatch(defaultChecked());
    }
    if (emailLocale !== "") {
      dispatch(addEmail(emailLocale));
    }
  }, [dispatch, emailLocale]);

  useEffect(() => {
    if (
      checked === false &&
      (checkedInLocalStorage == "false" || checkedInLocalStorage == null)
    ) {
      window.localStorage?.removeItem("email");
    }
  }, [checked, checkedInLocalStorage]);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginAsync())
      .unwrap()
      .then(() => navigate("/profile"));

    if (checked == true) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("checked", true);
    }
  };

  const handleCheck = () => {
    dispatch(checkCheckbox());
  };

  return (
    <>
      {isOpen && <Modal errorMessage={error} />}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <InputWrapper
              className="input-wrapper"
              label="email"
              id="email"
              type="text"
              required
              defaultValue={emailLocale}
              onChange={(e) => dispatch(addEmail(e.target.value))}
            />
            <InputWrapper
              className="input-wrapper"
              label="Password"
              id="password"
              type="password"
              required
              onChange={(e) => dispatch(addPassword(e.target.value))}
            />
            <div className="input-remember">
              {localStorage.getItem("checked") ? (
                <input
                  type="checkbox"
                  id="remember-me"
                  onChange={handleCheck}
                  defaultChecked
                />
              ) : (
                <input
                  type="checkbox"
                  id="remember-me"
                  onChange={handleCheck}
                />
              )}

              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            <button
              type="button"
              className="sign-in-button"
              onClick={() => navigate("/sign-up")}
            >
              Sign-up
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignIn;
