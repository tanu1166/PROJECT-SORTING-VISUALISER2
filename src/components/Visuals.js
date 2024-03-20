import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import QuickSort from "./QuickSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";

import "./Visuals.css";
import Timer from "./Timer";

function Visuals() {
  const myState = useSelector((state) => state.updateProps);
  const dispatch = useDispatch();
  const color = myState.color;
  const range = myState.range;

  let speed = myState.speed;
  if (myState.algorithm === "selection") speed *= 3;
  else if (myState.algorithm === "merge") speed *= 5;
  else if (myState.algorithm === "quick") speed *= 6;
  return (
    <div className="visuals">
      <div className="visualizer">
        {
          <div
            className="visual__items"
            style={{ width: `${myState.values.length * 11}px` }}
          >
            {myState.values.map((item) => {
              return (
                <div
                  className="visual__item"
                  key={item[1]}
                  id={item[1]}
                  style={{
                    transition: `${speed / 1000}s linear all`,
                    transform: `translateX(${item[1] * 11}px)`,
                  }}
                >
                  <h4>{item[0]}</h4>
                  <div
                    className="visual"
                    style={{
                      height: `${item[0] * 3}px`,
                      backgroundColor: color,
                      width: range < 35 ? "8px" : "6px",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        }
      </div>

      <BubbleSort />
      <InsertionSort />
      <MergeSort />
      <QuickSort />
      <SelectionSort />
    </div>
  );
}

export default Visuals;
