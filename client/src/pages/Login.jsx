import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await loginUser({
        email,
        password
      });

      alert(res.data.message);

      navigate("/dashboard");

    } catch{

      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card p-4 shadow-lg border-0 rounded-4">

            <h2 className="text-center mb-4 text-primary fw-bold">
              Employee Login
            </h2>

            <form onSubmit={handleLogin}>

              <div className="mb-3">

                <label className="fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;