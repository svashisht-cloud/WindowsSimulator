import { useEffect, useState, useRef } from "react";

import "./searchAlgorithm.css";
import Home from "../Home";

const SearchAlgorithm = () => {
  const numRows = 20;
  const numColumns = 40;

  const [rows, setRows] = useState();

  const algorithm = useRef("DFS");
  const target = 4;

  useEffect(() => {
    resetBoard();
  }, []);

  const resetBoard = () => {
    let gameRows = [];
    for (let i = 0; i < numRows; ++i) {
      let columns = [];
      for (let j = 0; j < numColumns; ++j) {
        if (i === 5 && j === 6) {
          columns.push(4);
        } else {
          columns.push(0);
        }
      }
      gameRows.push(columns);
    }
    setRows(gameRows);
  };

  const handleSearch = (row, column) => {
    resetBoard();
    let stack = [];
    const Enterkey = [row, column].toString();

    if (algorithm.current === "DFS") stack.push([row, column]);
    else if (algorithm.current === "BFS") stack.unshift([row, column]);
    const dictionary = {};
    dictionary[Enterkey] = true;
    const delay = 10;

    const processNextElement = () => {
      if (stack.length === 0) {
        return;
      }

      const element = stack.pop();
      if (rows[element[0]][element[1]] === 4) {
        stack = [];
        console.log("found result");
        return;
      }

      const getNeighborElements = getTouchingElements(element[0], element[1]);

      for (let i = 0; i < getNeighborElements.length; ++i) {
        const key = getNeighborElements[i].toString();
        if (rows[getNeighborElements[i][0]][getNeighborElements[i][1]] === 4) {
          stack = [];
          if (algorithm.current === "DFS") stack.push(getNeighborElements[i]);
          else if (algorithm.current === "BFS")
            stack.unshift(getNeighborElements[i]);
          break;
        }
        if (!(key in dictionary)) {
          if (algorithm.current === "DFS") stack.push(getNeighborElements[i]);
          else if (algorithm.current === "BFS")
            stack.unshift(getNeighborElements[i]);
          dictionary[key] = true;
        } else {
          continue;
        }
      }

      setRows((rows) =>
        rows.map((row, rowIndex) =>
          row.map((col, columnIndex) => {
            for (let i = 0; i < getNeighborElements.length; ++i) {
              if (col === 4) {
                return 4;
              }
              if (
                (rowIndex === element[0] && columnIndex === element[1]) ||
                col === 2
              ) {
                return 2;
              }
              if (
                col === 1 ||
                (getNeighborElements[i][0] === rowIndex &&
                  getNeighborElements[i][1] === columnIndex)
              ) {
                return 1;
              }
            }
            return 0;
          })
        )
      );

      setTimeout(processNextElement, delay); // Call the next iteration after delay milliseconds
    };

    processNextElement(); // Start the processing
  };

  const getTouchingElements = (row, column) => {
    const touchingElements = [[row, column]];
    for (let i = row - 1; i <= row + 1; ++i) {
      if (i < 0 || i >= numRows) continue;
      for (let j = column - 1; j <= column + 1; ++j) {
        if (j < 0 || j >= numColumns) continue;
        if (i === row && j === column) continue;
        touchingElements.push([i, j]);
      }
    }
    return touchingElements;
  };

  const algorithmSelect = (event) => {
    algorithm.current = event.target.value;
    resetBoard();
  };

  return (
    <div className="algorithmsComponent">
      <div className="algorithmBoardToolbar">
        <div className="algorithmChooser">
          <label for="algorithm">Choose an algorithm:</label>
          <select name="algorithm" id="algorithm" onChange={algorithmSelect}>
            <option value="DFS">DFS</option>
            <option value="BFS">BFS</option>
          </select>
        </div>
      </div>
      <div className="algorithmBoard">
        {rows &&
          rows.map((row, rowIndex) => (
            <div className="algorithmBoardrow">
              {row.map((ell, columnIndex) => (
                <div
                  className="algorithmBoardElements"
                  onClick={() => handleSearch(rowIndex, columnIndex)}
                  style={{
                    backgroundColor:
                      ell === 1
                        ? "grey"
                        : ell === 2
                        ? "blue"
                        : ell === 4
                        ? "red"
                        : "white",
                  }}
                ></div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchAlgorithm;
