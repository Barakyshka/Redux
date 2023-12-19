import { NavLink, Link } from "react-router-dom";
import { setUserData } from "../redux/users/action";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ user: state.user.user });

const mapDispatchToProps = (dispatch) => ({
  onChange:(data) => dispatch(setUserData(data)),
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ user, onChange }) => {
  console.log(user);
  return (
    <header className="w-full flex border-b-2 border-black py-2 justify-between text-2xl">
      <Link t0="/" className="mx-3 font-bold">
        {user?.email && `Hello, ${user.email}`}
      </Link>
      <nav>
        <ul className="flex gap-5">
          <li>
            {user?.id && (
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? "text-red-500" : "";
                }}
              >
                About
              </NavLink>
            )}
          </li>
          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) => {
                return isActive ? "text-red-500" : "";
              }}
            >
              Notes
            </NavLink>
          </li>
          <li>
            {user?.id ? (
              <NavLink onClick={() => onChange(null)} to="/signup">
                Log out
              </NavLink>
            ) : (
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive ? "text-red-500" : "";
                }}
              >
                Sign up
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
});
