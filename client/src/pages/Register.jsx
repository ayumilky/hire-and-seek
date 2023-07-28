import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="ayumi" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="li"
        />
        <FormRow type="text" name="location" defaultValue="Canada" />
        <FormRow type="email" name="email" defaultValue="ayumi@gmail.com" />
        <FormRow type="password" name="password" defaultValue="ayumipassword" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
