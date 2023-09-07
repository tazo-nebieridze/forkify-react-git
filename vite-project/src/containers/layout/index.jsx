import { Outlet } from "react-router-dom";
import Header from "../Header";
import SearchView from "../SearchView";

const Layout = () =>  {
    return (
      <div className="container">
        <Header />
        <SearchView />
        <Outlet />
      </div>
    );
  }

  export default Layout;