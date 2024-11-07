import { Button, Link } from "@nextui-org/react";
import { Link as RRLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Homepage</h1>
      <Button as={Link} color="primary" href="/sign-in">
        Sign Up
      </Button>
      <Link color="primary" href="/sign-in/">
        Sign Up
      </Link>
      <RRLink color="primary" to="/sign-in">
        Sign In RRLink
      </RRLink>
    </>
  );
}
