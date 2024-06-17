import { useDispatch } from "react-redux";
import { closeModal } from "../../Slices/modalSlice";
import { reset as loginReset } from "../../features/loginThunk";
import { reset as signUpReset } from "../../features/SignUpThunk";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Modal = ({ errorMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = errorMessage;

  const handleSignUp = () => {
    dispatch(closeModal());
    dispatch(loginReset());
    dispatch(signUpReset());
    navigate("/sign-up");
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <button
          type="button"
          className="modal-btn"
          onClick={() => {
            dispatch(loginReset());
            dispatch(signUpReset());
            dispatch(closeModal());
          }}
        >
          X
        </button>
        <h3>an error as occurred</h3>
        <h4>{JSON.stringify(error)}</h4>

        {(() => {
          switch (JSON.stringify(error)) {
            case '"Error: User not found!"':
              return (
                <>
                  <h4>
                    It seems you don&apos;t have an account with this email
                    address. Please try again or sign up
                  </h4>
                  <button
                    type="button"
                    className="sign-in-button"
                    onClick={handleSignUp}
                  >
                    Sign-up
                  </button>
                </>
              );
            case '"Error: Password is invalid"':
              return <h4> try again </h4>;

            case '"Error: Email already exists"':
              return <h4> an account with this email already exists </h4>;

            default:
              return (
                <h4>
                  {" "}
                  try again with a valid form data by informing a valid email
                  and password{" "}
                </h4>
              );
          }
        })()}
      </div>
    </aside>
  );
};

Modal.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
export default Modal;
