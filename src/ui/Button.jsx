import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  //based on the type, get the type from the object
  const base = `bg-yellow-400 uppercase font-semibold 
             text-stone-800 inline-block tracking-wide 
             rounded-full hover:bg-yellow-500
             hover:text-yellow-100 transition-colors 
             duration-500 focus:ring-yellow-500 
             focus:bg-yellow-300 focus:outline-none focus:ring 
             focus:ring-offset-2 disabled:cursor-not-allowed `;

  const styles = {
    primary: base + " md:px-6 md:py-4 py-3 px-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary: `border-2 border-ambar-200 uppercase font-semibold 
             text-red-400 inline-block tracking-wide 
             rounded-full hover:bg-red-400
             hover:text-white transition-colors 
             duration-500 focus:ring-red-500 
             focus:bg-red-400 focus:outline-none focus:ring focus:text-white
             focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-3.5 py-2.5 px-4 `,
  };

  //if there is 'to' prop, return a <Link> not a Button
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
