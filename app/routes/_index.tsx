import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from "~/styles/home.css";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your travel plans</h1>
      <p>Try our early beta and never lose track again!</p>
      <p id="cta">
        <Link to="/notes">Try now!</Link>
      </p>
    </main>
  );
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: homeStyles,
    },
  ];
};
