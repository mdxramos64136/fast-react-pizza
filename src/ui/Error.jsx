import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";
import { useEffect, useRef } from "react";

function Error() {
  const error = useRouteError();

  //for  accessibility porpuse: points to a real DOM element.
  // Null = element doesnt exist yet...
  const headingRef = useRef(null);
  console.log(error.data);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div>
      {/* When h1 is reendered , headingRef.current points to it*/}
      <h1 tabIndex="-1" ref={headingRef}>
        Something went wrong!
      </h1>
      <div role="alert">
        <p>{error.data || error.message}</p>
      </div>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
