import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { Slider } from "@mui/material";

function Sidebar() {
  const myState = useSelector((state) => state.updateProps);
  const dispatch = useDispatch();

  const changeValues = () => {
    let new_arr = [...myState.values];
    for (let i = 0; i < new_arr.length; i++)
      document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

    dispatch({
      type: "CHANGE_VALUES",
    });
  };

  const handlePlayPause = (play) => {
    if (!myState.play) {
      setStart(true);
      document.getElementById("change-btn").disabled = true;
      document.getElementById("change-btn").style.backgroundColor = "grey";
      document.getElementById("play-btn").disabled = true;
      document.getElementById("play-btn").style.backgroundColor = "grey";
    } else {
      dispatch({
        type: "PLAY_PAUSE",
        _play: play,
      });
      return;
    }
    dispatch({
      type: "PLAY_PAUSE",
      _play: play,
    });
  };

  useEffect(() => {
    if (!myState.play) {
      document.getElementById("play-btn").disabled = false;
      document.getElementById("play-btn").style.backgroundColor =
        "rgb(0, 149, 199)";
      document.getElementById("change-btn").disabled = false;
      document.getElementById("change-btn").style.backgroundColor =
        "rgb(0, 149, 199)";
      setStart(false);
    }
  }, [myState.play]);

  const [max, setMax] = useState(60);

  const handleAlgo = (algo) => {
    dispatch({
      type: "UPDATE_ALGORITHM",
      algorithm: algo,
    });
  };

  const resetColor = () => {
    dispatch({
      type: "UPDATE_COLOR",
      color: document.getElementById("color").value,
    });
  };

  const handleRange = (_range) => {
    let new_arr = [...myState.values];
    for (let i = 0; i < new_arr.length; i++)
      document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

    resetColor();

    dispatch({
      type: "UPDATE_RANGE",
      range: _range,
    });
    dispatch({
      type: "CHANGE_VALUES",
    });
  };

  const handleColor = (_color) => {
    dispatch({
      type: "UPDATE_COLOR",
      color: _color,
    });
  };

  const handleSpeed = (_speed) => {
    dispatch({
      type: "UPDATE_SPEED",
      speed: _speed,
    });
  };

  useEffect(() => {
    handleRange(max);
  }, []);

  useEffect(() => {
    dispatch({
      type: "UPDATE_COLOR",
      color: document.getElementById("color").value,
    });
  }, [myState.values]);

  const handleWidth = () => {
    if (window.innerWidth > 1300) setMax(120);
    else if (window.innerWidth > 1200) setMax(100);
    else if (window.innerWidth > 1100) setMax(50);
    else if (window.innerWidth > 900) setMax(45);
    else if (window.innerWidth > 800) setMax(40);
    else if (window.innerWidth > 500) setMax(30);
    else setMax(20);
  };

  useEffect(() => {
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  return (
    <>
      <div className="sidebar">
        <div className="hero">
          <h1 className="title">S O R T I F Y !</h1>
        </div>
        <div className="arrayParameters">
          <div className="sidebar__option">
            <div className="optionTitle">
              <div
                className="optionColor"
                style={{ backgroundColor: "orange" }}
              ></div>
              <p>Select Algorithm</p>
            </div>
            <div className="optionDropdown">
              <select
                class="form-select"
                name="algo"
                id="algo"
                onChange={(e) => handleAlgo(e.target.value)}
                disabled={myState.play ? true : false}
              >
                {/* <option selected>Select Algo</option> */}
                <option value="bubble">Bubble Sort </option>
                <option value="merge">Merge Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="quick">Quick Sort</option>
              </select>
            </div>
          </div>

          <div className="sidebar__option">
            <div className="optionTitle">
              <div
                className="optionColor"
                style={{ backgroundColor: "cornsilk" }}
              ></div>
              <p>Select Range</p>
            </div>
            <div className="optionDropdown">
              <Slider
                style={{ width: "180px" }}
                size="small"
                defaultValue={60}
                id="slider"
                min={1}
                className="slider"
                disabled={myState.play ? true : false}
                max={max}
                onChange={(e) => handleRange(e.target.value)}
                valueLabelDisplay="auto"
              />
            </div>
          </div>

          <div className="sidebar__option">
            <div className="optionTitle">
              <div
                className="optionColor"
                style={{ backgroundColor: "blue" }}
              ></div>
              <p>Select Color</p>
            </div>
            <div className="optionDropdown">
              <select
                name="color"
                id="color"
                onChange={(e) => handleColor(e.target.value)}
                disabled={myState.play ? true : false}
              >
                <option
                  value="rgb(0, 149, 199)"
                  style={{ color: "rgb(0, 149, 199)" }}
                >
                  Blue
                </option>
                <option
                  value="rgb(85, 212, 0)"
                  style={{ color: "rgb(10,200,20)" }}
                >
                  Green
                </option>
                <option value="rgb(255, 112, 112)" style={{ color: "red" }}>
                  Red
                </option>
                <option value="grey" style={{ color: "grey" }}>
                  Black
                </option>
                <option value="#ddd902" style={{ color: "#ddd902" }}>
                  Yellow
                </option>
              </select>
            </div>
          </div>

          <div className="sidebar__option">
            <div className="optionTitle">
              <div
                className="optionColor"
                style={{ backgroundColor: "black" }}
              ></div>
              <p>Select Speed</p>
            </div>
            <div className="optionDropdown">
              <select
                name="speed"
                defaultValue={100}
                id="speed"
                onChange={(e) => handleSpeed(e.target.value)}
                disabled={myState.play ? true : false}
              >
                <option value={500}>Slow</option>
                <option value={200}>Medium</option>
                <option value={100}>Fast</option>
                <option value={20}>Super Fast</option>
                <option value={5}>Ultra Fast</option>
              </select>
            </div>
          </div>
        </div>
        <div className="buttonsAndTimer">
          <div className="functions">
            <button id="change-btn" onClick={changeValues}>
              Change Values
            </button>
            <button
              id="play-btn"
              onClick={() => {
                if (time !== 0) {
                  setTime(0);
                }
                handlePlayPause(true);
              }}
            >
              Sort!
            </button>
          </div>
          <div className="timerDiv">
            <p className="timeDataCont">
              <span className="timeData">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="timeData">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
              </span>
              <span className="timeData">
                {("0" + ((time / 10) % 1000)).slice(-2)}
              </span>
            </p>
            {/* <div>
            <button onClick={() => setStart(true)}>Start</button>
            <button onClick={() => setStart(false)}>Stop</button>
            <button
              onClick={() => {
                setTime(0);
                setStart(false);
              }}
            >
              Reset
            </button>
          </div> */}
          </div>
        </div>
      </div>

      <div className="sidebarMobile">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <div className="hero">
              <h1 className="title">S O R T I F Y !</h1>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <div className="mobileNavOption">
                    <div className="optionTitle">
                      <p>Select Algorithm</p>
                    </div>
                    <div className="optionDropdown">
                      <select
                        class="form-select form-select-sm"
                        name="algo"
                        id="algo"
                        onChange={(e) => handleAlgo(e.target.value)}
                        disabled={myState.play ? true : false}
                      >
                        {/* <option selected>Select Algo</option> */}
                        <option value="bubble">Bubble Sort </option>
                        <option value="merge">Merge Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="quick">Quick Sort</option>
                      </select>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="optionTitle">
                    <div
                      className="optionColor"
                      style={{ backgroundColor: "cornsilk" }}
                    ></div>
                    <p>Select Range</p>
                  </div>
                  <div className="optionDropdown">
                    <Slider
                      style={{ width: "180px" }}
                      size="small"
                      defaultValue={60}
                      id="slider"
                      min={1}
                      className="slider"
                      disabled={myState.play ? true : false}
                      max={max}
                      onChange={(e) => handleRange(e.target.value)}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </li>
                <li className="nav-item">
                  <div className="optionTitle">
                    <div
                      className="optionColor"
                      style={{ backgroundColor: "blue" }}
                    ></div>
                    <p>Select Color</p>
                  </div>
                  <div className="optionDropdown">
                    <select
                      name="color"
                      id="color"
                      onChange={(e) => handleColor(e.target.value)}
                      disabled={myState.play ? true : false}
                    >
                      <option
                        value="rgb(0, 149, 199)"
                        style={{ color: "rgb(0, 149, 199)" }}
                      >
                        Blue
                      </option>
                      <option
                        value="rgb(85, 212, 0)"
                        style={{ color: "rgb(10,200,20)" }}
                      >
                        Green
                      </option>
                      <option
                        value="rgb(255, 112, 112)"
                        style={{ color: "red" }}
                      >
                        Red
                      </option>
                      <option value="grey" style={{ color: "grey" }}>
                        Black
                      </option>
                      <option value="#ddd902" style={{ color: "#ddd902" }}>
                        Yellow
                      </option>
                    </select>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="optionTitle">
                    <div
                      className="optionColor"
                      style={{ backgroundColor: "black" }}
                    ></div>
                    <p>Select Speed</p>
                  </div>
                  <div className="optionDropdown">
                    <select
                      name="speed"
                      defaultValue={100}
                      id="speed"
                      onChange={(e) => handleSpeed(e.target.value)}
                      disabled={myState.play ? true : false}
                    >
                      <option value={500}>Slow</option>
                      <option value={200}>Medium</option>
                      <option value={100}>Fast</option>
                      <option value={20}>Super Fast</option>
                      <option value={5}>Ultra Fast</option>
                    </select>
                  </div>
                </li>
              </ul>
              <div className="buttonsAndTimer">
                <div className="functions">
                  <button id="change-btn" onClick={changeValues}>
                    Change Values
                  </button>
                  <button
                    id="play-btn"
                    onClick={() => {
                      if (time !== 0) {
                        setTime(0);
                      }
                      handlePlayPause(true);
                    }}
                  >
                    Sort!
                  </button>
                </div>
                <div className="timerDiv">
                  <p className="timeDataCont">
                    <span className="timeData">
                      {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span className="timeData">
                      {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
                    </span>
                    <span className="timeData">
                      {("0" + ((time / 10) % 1000)).slice(-2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
