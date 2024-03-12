import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {

  const { currentUser } = useSelector(state => state.persistedReducer.user);
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl max-auto p-3'>
            <Link to="/">
                <h1 className="font-bold">Project Dash</h1>
            </Link>
            <ul className="flex gap-4">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/profile">
                {
                  currentUser ? (
                    <img src={currentUser.profilePicture} alt='profile' 
                    className="h-7 w-7 rounded-full object-cover"/>
                  ) : (
                    <li>Sign in</li>
                  )
                }
              </Link>
            </ul>
        </div>
    </div>
  )
}
