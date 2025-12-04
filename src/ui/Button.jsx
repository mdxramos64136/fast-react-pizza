import { Link } from "react-router-dom"

function Button({children, disabled,to}) {
    const className = `bg-yellow-400 uppercase font-semibold 
             text-stone-800 py-3 px-4 inline-block tracking-wide 
             rounded-full hover:bg-yellow-500
             hover:text-yellow-100 transition-colors 
             duration-500 focus:ring-yellow-500 
             focus:bg-yellow-300 focus:outline-none focus:ring 
             focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4`
    
    //if there is 'to' prop, return a <Link> not a Button
    if(to) return <Link className={className} to={to}>{children}</Link>
    return (
        <button disabled={disabled} 
             className={className}>
            {children}
        </button>
    )
}

export default Button
