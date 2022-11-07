import {FunctionComponent, useEffect, useState} from "react";
import useAuth from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

const Login: FunctionComponent = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, loginUser } = useAuth();

  const login = () => {
    if(loginUser) {
      loginUser(email.trim(), password)
        .catch(e => console.error(e))
    }
  }

  useEffect(() => {
    if(user) history.push("/");
  }, [user])

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="button" onClick={login}>Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
