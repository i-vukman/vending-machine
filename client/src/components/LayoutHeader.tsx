import { Layout, Menu } from "antd";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Header>
      <div className="logo" />
      {/* TODO: fix key with router info */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        
        {isLoggedIn && (
          <>
            <Menu.Item key="/products">
              <Link to="/products">
                <span>Products</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/logout" onClick={() => authCtx.logOut()}>
              <span>Log Out</span>
            </Menu.Item>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Menu.Item key="/login">
              <Link to="/login">
                <span>Log In</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/signup">
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default LayoutHeader;