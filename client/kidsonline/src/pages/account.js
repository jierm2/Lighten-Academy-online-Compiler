import NavBar from './NavBar';
import login from './login';
function Account() {
    return (
        <div>
      <NavBar />
        <login/>
      <div className="container mt-4">
        <h1>Account</h1>
      </div>
    </div>
    )
}
export default Account;
