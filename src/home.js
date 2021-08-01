import React, { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import LoadingBar from "react-top-loading-bar";

var isVisible = true;

function Heading() {
  return (
    <>
      <div className="heading">Password Encryption form</div>
    </>
  );
}

function Form(props) {
  document.title = "Password Encryptor";
  const [password, setPassword] = useState("");
  const { push } = useHistory();
  const [loading, setLoading] = useState(100);

  const hashPassword = (e) => {
    e.preventDefault();
    if (password === "") {
      sessionStorage.setItem("password", password);
      Swal.fire({
        title: "Invalid Input",
        text: "Fill the form to continue",
        icon: "info",
      });
    } else {
      setLoading(100);
      sessionStorage.setItem("password", password);
      setPassword("");
      push("/result");
    }
  };

  const swipe = () => {
    document.querySelector("hr").addEventListener("mouseover", () => {
      if (isVisible === true) {
        document.querySelector(".heading").style.visibility = "hidden";
        document.querySelector(".form").style.transform = "translateY(-10vh)";
        isVisible = false;
      } else {
        document.querySelector(".heading").style.visibility = "visible";
        document.querySelector(".form").style.transform = "translateY(0)";
        isVisible = true;
      }
    });
  };

  return (
    <>
      <LoadingBar
        color="black"
        progress={loading}
        onLoaderFinished={() => setLoading(0)}
      />
      <div className="form-div">
        <Heading />

        <div className="form" style={{ transition: "0.5s ease" }}>
          <hr onClick={swipe} style={{ cursor: "pointer" }} />

          <form autoCorrect="off" autoComplete="off">
            <label htmlFor="user-name">Name</label>

            <input type="text" name="user-name" id="user-name" />
            <br />

            <label htmlFor="user-email">Email</label>

            <input type="email" name="user-email" id="user-email" />
            <br />

            <label htmlFor="user-pass">Password</label>

            <input
              type="password"
              name="user-pass"
              id="user-pass"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <hr />

            <button type="submit" className="hash" onClick={hashPassword}>
              Hash
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export { Form as default };
