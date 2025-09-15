import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const defaultTitle = "Riad Kilani - Web Developer & Designer";

const routeTitles = [
  { path: /^\/$/, title: "Home | Riad Kilani" },
  { path: /^\/bio$/, title: "About | Riad Kilani" },
  { path: /^\/portfolio$/, title: "Portfolio | Riad Kilani" },
  { path: /^\/blog$/, title: "Blog | Riad Kilani" },
  { path: /^\/blog\//, title: "Blog Post | Riad Kilani" },
  { path: /^\/contact$/, title: "Contact | Riad Kilani" },
];

export default function DynamicTitle({ postTitle }) {
  const location = useLocation();

  useEffect(() => {
    let matched = routeTitles.find(r => r.path.test(location.pathname));
    if (location.pathname.startsWith("/blog/") && postTitle) {
      document.title = `${postTitle} | Riad Kilani`;
    } else {
      document.title = matched ? matched.title : defaultTitle;
    }
  }, [location, postTitle]);

  return null;
}
