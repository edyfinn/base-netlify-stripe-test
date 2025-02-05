NUEVA WEB REACTIVA
-------------------------------------------------
# Cambios en la Config de Netlify para Reactivo

Netlify -> Deploys-> Build settings

## *Build command: CI= react-scripts build
No funciona en local es para producción: CI= react-scripts build
No funciona en local: CI= false npm run build 
Funciona en local y hay que ejecutarlo para que se actualice en Netlify y luego hay que volver a poner el de producción: npm run build

## *Publish directory: build
Funciona en local y tiene que estar en producción: build
Funciona en local: _site

# VARIABLES GLOBALES
Tiene que añadirse "REACT_" de esta forma "REACT_STRIPE_DEFAULT_PRICE_PLAN_TEST"

-------------------------------------------------
# LIB NODE
No es necesario instalar dotenv, ya esta incluido en react solo hay que usarlo.



## Install

```bash
yarn add react-netlify-identity
```

## Usage

⚠️ **Important:** You will need to have an active Netlify site running with Netlify Identity turned on. [Click here for instructions](https://www.netlify.com/docs/identity/#getting-started?utm_source=github&utm_medium=swyx-RNI&utm_campaign=devex) to get started/double check that it is on. We will need your site's url (e.g. `https://mysite.netlify.com`) to initialize `IdentityContextProvider`.

**When you call useIdentityContext()**, you can destructure these variables and methods:

- `user: User`
- `setUser`: directly set the user object. Not advised; use carefully!! mostly you should use the methods below
- `isConfirmedUser: boolean`: if they have confirmed their email
- `isLoggedIn: boolean`: if the user is logged in
- `signupUser(email: string, password: string, data: Object, directLogin: boolean = true)`
  - `directLogin` will internally set state to the newly created user
  - `isConfirmedUser` will be false
  - `isLoggedIn` will be true
  - setting `directLogin` to false won't trigger the state
- `loginUser(email: string, password: string, remember: boolean = true)` - we default the `remember` term to `true` since you'll usually want to remember the session in localStorage. set it to false if you need to
- `logoutUser()`
- `requestPasswordRecovery(email: string)`
- `updateUser(fields: object)`: see [updateUser @ gotrue-js](https://github.com/netlify/gotrue-js#update-a-user)
- `getFreshJWT()`
- `authedFetch(endpoint: string, obj: RequestInit = {})` a thin axios-like wrapper over `fetch` that has the user's JWT attached, for convenience pinging Netlify Functions with Netlify Identity
- `recoverAccount(remember?: boolean)`: verifies and consumes the recovery token caught by `runRoutes`, sets user on success
- `param: TokenParam`
  - a token exposing Netlify tokens a dev has to implement the actions for; namely `invite`, `recovery`, `email_change` and `access_denied`
  - **important:** tokens this package exposes no methods for are automatically handled and will not be passed down - see [runRoutes implementation](https://github.com/sw-yx/react-netlify-identity/master/src/runRoutes.tsx)
  - if you don't want this behaviour (added [here](https://github.com/sw-yx/react-netlify-identity/issues/12) in v.0.1.8), pass `runRoutes={false}` to the exposed hook
  - for further reference, please check the [type definition](https://github.com/sw-yx/react-netlify-identity/tree/master/src/token.ts)
  - an example implementation for a Recovery process can be found below
- `verifyToken()`
  - consumes & verifies TokenParam based on the type and tries to retrieve a valid user object
  - devs duty to show password field to afterwards call `signupUser(user.email, newPassword)`

```tsx
import React from 'react';

import { IdentityContextProvider } from 'react-netlify-identity';

function App() {
  const url = 'https://your-identity-instance.netlify.com/'; // supply the url of your Netlify site instance. VERY IMPORTANT. no point putting in env var since this is public anyway
  return (
    <IdentityContextProvider url={url}>
      {/* rest of your app */}
    </IdentityContextProvider>
  );
}
```

<details>
<summary>
<h3 style="color: red">
Click for More Example code
</h3>
</summary>

```tsx
import { useIdentityContext } from 'react-netlify-identity';

// log in/sign up example
function Login() {
  const { loginUser, signupUser } = useIdentityContext();
  const formRef = React.useRef();
  const [msg, setMsg] = React.useState('');

  const signup = () => {
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;

    signupUser(email, password)
      .then(user => {
        console.log('Success! Signed up', user);
        navigate('/dashboard');
      })
      .catch(err => console.error(err) || setMsg('Error: ' + err.message));
  };

  return (
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
  );
}

// log out user
function Logout() {
  const { logoutUser } = useIdentityContext();
  return <button onClick={logoutUser}>You are signed in. Log Out</button>;
}

// check `identity.user` in a protected route
function PrivateRoute(props) {
  const identity = useIdentityContext();
  let { as: Comp, ...rest } = props;
  return identity.user ? (
    <Comp {...rest} />
  ) : (
    <div>
      <h3>You are trying to view a protected page. Please log in</h3>
      <Login />
    </div>
  );
}

// check if user has confirmed their email
// use authedFetch API to make a request to Netlify Function with the user's JWT token,
// letting your function use the `user` object
function Dashboard() {
  const { isConfirmedUser, authedFetch } = useIdentityContext();
  const [msg, setMsg] = React.useState('Click to load something');
  const handler = () => {
    authedFetch.get('/.netlify/functions/authEndPoint').then(setMsg);
  };
  return (
    <div>
      <h3>This is a Protected Dashboard!</h3>
      {!isConfirmedUser && (
        <pre style={{ backgroundColor: 'papayawhip' }}>
          You have not confirmed your email. Please confirm it before you ping
          the API.
        </pre>
      )}
      <hr />
      <div>
        <p>You can try pinging our authenticated API here.</p>
        <p>
          If you are logged in, you should be able to see a `user` info here.
        </p>
        <button onClick={handler}>Ping authenticated API</button>
        <pre>{JSON.stringify(msg, null, 2)}</pre>
      </div>
    </div>
  );
}
```

</details>

<details>
<summary>
<h3>
  How to handle a Recovery Action (since v0.2)
</h3>
</summary>

Of course you can alternatively inline this logic into app.

```tsx
import { useIdentityContext } from 'react-netlify-identity';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

export default function App() {
  const { isLoggedIn } = useIdentityContext();

  return (
    <Router>
      <CatchNetlifyRecoveryNullComponent />
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" exact component={DashboardPage} />
            <Route component={() => <Redirect to="/dashbard" />} />
          </>
        ) : (
          <>
            <Route path="/" exact component={LandingPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            {/* etc */}
            <Route path="/recovery" exact component={RecoveryPage} />
            <Route component={() => <Redirect to="/" />} />
          </>
        )}
      </Switch>
    </Router>
  );
}

function CatchNetlifyRecoveryNullComponent() {
  const {
    param: { token, type },
  } = useIdentityContext();
  const { replace } = useHistory();
  const { pathname } = useLocation();

  // important to check for the current pathname here because else you land
  // in a infinite loop
  if (token && type === 'recovery' && pathname === '/') {
    replace(`/recovery`, { token });
  }

  return null;
}

function RecoveryPage() {
  const {
    location: { state },
  } = useHistory();
  // this state _might_ not be needed, it was needed in my specific implementation
  const [token] = useState(state?.token);

  return null; // set new password in a form and call updateUser
}
```

</details>

## Lower level API: `useNetlifyIdentity`

If you'd like to handle your own context yourself, you can use this library as a hook as well:

```tsx
function useNetlifyIdentity(
  url: string,
  onAuthChange: authChangeParam = () => {},
  enableRunRoutes: boolean = true
): ReactNetlifyIdentityAPI;
```