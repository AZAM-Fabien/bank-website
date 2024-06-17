import PropTypes from "prop-types";

const InputWrapper = ({ className, label, id, type, ...rest }) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...rest} />
    </div>
  );
};

InputWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputWrapper;
