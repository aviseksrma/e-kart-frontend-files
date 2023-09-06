import { NavLink } from "react-router-dom";
import "./Links.css";

const Links = ({ title, link, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title}
    </NavLink>
  );
};

export default Links;
