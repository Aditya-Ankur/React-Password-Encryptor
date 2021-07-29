import React, { useState } from "react";
import { sha256 } from "js-sha256";
import LoadingBar from "react-top-loading-bar";
import { useHistory } from "react-router";

function Result() {
  document.title = "Results";
  const { push } = useHistory();
  const [loading, setLoading] = useState(100);
  const [password] = useState(sessionStorage.getItem("password"));

  const copyPassword = () => {
    var copyText = document.getElementById("copy");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    sessionStorage.clear();
  };

  return (
    <>
      <LoadingBar
        color="black"
        progress={loading}
        shadow={true}
        onLoaderFinished={() => setLoading(0)}
      />
      <div
        className="heading"
        style={{ margin: "20vh 0 10vh 0", fontSize: "3.5vw" }}
      >
        Password Successfully Encrypted!!
      </div>
      <div className="show-pass" style={{ display: "flex" }}>
        <span
          id="copy"
          style={{
            display: "inline-block",
            marginRight: "20px",
            fontSize: "1.3vw",
          }}
        >
          {sha256(password)}
        </span>
        <button
          type="button"
          className="copy"
          title="Copy to Clipboard"
          onClick={copyPassword}
        >
          <i className="fas fa-clipboard"></i>
        </button>
      </div>
      <div className="home" style={{ display: "flex", marginTop: "5vh" }}>
        <button
          className="take-home"
          onClick={() => {
            push("/");
          }}
        >
          Home
        </button>
      </div>
    </>
  );
}
export default Result;
