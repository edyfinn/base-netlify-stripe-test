import { useIdentityContext } from 'react-netlify-identity';

// log in/sign up example
function Login() {
  const { loginUser, signupUser } = useIdentityContext();
 /* const formRef = React.useRef();
  const [msg, setMsg] = React.useState('');*/

  const signup = () => {
    /*const email = formRef.current.email.value;
    const password = formRef.current.password.value;

    signupUser(email, password)
      .then(user => {
        console.log('Success! Signed up', user);
        navigate('/dashboard');
      })
      .catch(err => console.error(err) || setMsg('Error: ' + err.message));*/
  };

 /*  return (
    <form
      ref={formRef}
      onSubmit={e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        load(loginUser(email, password, true))
          .then(user => {
            console.log('Success! Logged in', user);
            navigate('/dashboard');
          })
          .catch(err => console.error(err) || setMsg('Error: ' + err.message));
      }}
    >
      <div>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <div>
        <input type="submit" value="Log in" />
        <button onClick={signup}>Sign Up </button>
        {msg && <pre>{msg}</pre>}
      </div>
    </form>
  ); */
}

export default Login;