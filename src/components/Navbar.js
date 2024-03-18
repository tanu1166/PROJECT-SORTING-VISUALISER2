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
      document.getElementById("change-btn").disabled = true;
      document.getElementById("change-btn").style.backgroundColor = "grey";
      document.getElementById("play-btn").disabled = true;
      document.getElementById("play-btn").style.backgroundColor = "grey";
    } else {
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
    handleRange(60);
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

  return (
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
              <option selected>Select Algo</option>
              <option value="bubble">Bubble Sort </option>
              <option value="merge">Merge Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="quick">Quick Sort</option>
            </select>
          </div>
        </div>
        {/* <div className="sidebar__option">
          <label htmlFor="algo">Select Algorithm: </label>
          <select
            name="algo"
            id="algo"
            onChange={(e) => handleAlgo(e.target.value)}
            disabled={myState.play ? true : false}
          >
            <option value="bubble">Bubble Sort </option>
            <option value="merge">Merge Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div> */}

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
      <div className="functions">
        <button id="change-btn" onClick={changeValues}>
          Change Values
        </button>
        <button id="play-btn" onClick={() => handlePlayPause(true)}>
          Sort!
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
