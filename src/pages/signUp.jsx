import InputWrapper from "../components/inputWrapper/inputWrapper.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmail, addPassword } from "../Slices/logInSlice.jsx";
import { addFirstName, addLastName, addUserName } from "../Slices/userInfoSlice.jsx";
import { signUpAsync } from "../features/SignUpThunk.jsx";
import Modal from "../components/modal/modal.jsx";
import { openModal } from "../Slices/modalSlice.jsx";
import { useEffect } from "react";
import { loginAsync } from "../features/loginThunk.jsx";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.modal);
  const { error } = useSelector((state) => state.userSignUp);


  useEffect(() => {
    if (JSON.stringify(error) != "{}") {
      dispatch(openModal());
    }
  }, [dispatch, error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpAsync())
      .unwrap()
      .then(() => (dispatch(loginAsync()).unwrap(), navigate("/profile")));
    
  };

  return (
    <>
      {isOpen && <Modal errorMessage={error}/>}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <InputWrapper
              className="input-wrapper"
              label="email"
              id="email"
              type="text"
              required
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
            <InputWrapper
              className="input-wrapper"
              label="Username"
              id="Username"
              type="text"
              required
              onChange={(e) => dispatch(addUserName(e.target.value))}
            />
            <InputWrapper
              className="input-wrapper"
              label="firstName"
              id="firstName"
              type="text"
              required
              onChange={(e) => dispatch(addFirstName(e.target.value))}
            />
            <InputWrapper
              className="input-wrapper"
              label="lastName"
              id="lastName"
              type="text"
              required
              onChange={(e) => dispatch(addLastName(e.target.value))}
            />

            <button
              className="sign-in-button"
            >
              Sign-up
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignUp;
