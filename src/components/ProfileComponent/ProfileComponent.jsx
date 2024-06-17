import { useDispatch, useSelector } from "react-redux";
import {
  addNewUserName,
  editUserName,
  triggerEdit,
} from "../../Slices/userInfoSlice.jsx";
import InputWrapper from "../inputWrapper/inputWrapper.jsx";
import { EditUserNameAsync } from "../../features/EditUserNameThunk.jsx";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { userName, firstName, lastName, edit, newUserName } = useSelector(
    (state) => state.userInfo
  );

  const handleChangeUserName = (e) => {
    e.preventDefault();
    dispatch(EditUserNameAsync())
      .unwrap()
      .then(() => dispatch(triggerEdit()), dispatch(editUserName(newUserName)));
  };

  return (
    <>
      {edit ? (
        <>
          <div className="header-edit">
            <section className="edit-user-content">
              <h2 className="white-text"> Edit user info </h2>
              <form onSubmit={handleChangeUserName}>
                <InputWrapper
                  className="input-wrapper-edit-profile"
                  label="User name:"
                  id="userName"
                  type="text"
                  defaultValue={userName}
                  onChange={(e) => dispatch(addNewUserName(e.target.value))}
                />
                <InputWrapper
                  className="input-wrapper-edit-profile-blurred"
                  label="First name:"
                  id="firstName"
                  type="text"
                  defaultValue={firstName}
                  readOnly
                />
                <InputWrapper
                  className="input-wrapper-edit-profile-blurred"
                  label="Last name:"
                  id="lastName"
                  type="text"
                  defaultValue={lastName}
                  readOnly
                />
                <div className="btn-edit-profile">
                  <button type="submit" className="edit-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => dispatch(triggerEdit())}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="header">
            <h2>
              Welcome back
              <br />
              {firstName} {lastName} !
            </h2>
            <button
              className="edit-button"
              onClick={() => dispatch(triggerEdit())}
            >
              Edit Name
            </button>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default ProfileComponent;
