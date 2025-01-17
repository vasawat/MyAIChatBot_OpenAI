import "./App.css";
import axios from "axios";
import { Button } from "antd";
import { useState, useEffect } from "react";
import environment from "./environments/environment.js";

import Normal from "./components/Normal.jsx";
import WithJson from "./components/WithJson.jsx";

function App() {
  const [dataTest, setDataTest] = useState([]);

  useEffect(() => {
    console.log(dataTest);
  }, [dataTest]);
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="w-2/3 my-6 flex flex-col gap-6">
        <div className="w-full h-96 overflow-y-scroll bg-gray-100 p-6 rounded shadow-xl border border-gray-300 ">
          <p className="mb-2">textBox : </p>
          <div className="flex flex-col gap-4">
            {dataTest.length > 0 &&
              dataTest.map((data, index) =>
                index % 2 === 0 ? (
                  <div className="w-full flex justify-end items-center gap-2">
                    <div className="text-sm bg-gray-200 p-3 max-w-[70%] rounded">
                      {data}
                    </div>
                    <p>: You</p>
                  </div>
                ) : (
                  <div className="w-full flex justify-start items-center gap-2">
                    <p>AI :</p>
                    <div className="text-sm bg-gray-300 p-3 max-w-[70%] rounded">
                      {data}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 bg-gray-200 p-6 rounded shadow-xl transition duration-300 ease-in-out">
          <Button
            onClick={() =>
              axios.get(environment.apiUrl + "/api").then((res) => {
                console.log(res.data);
                setDataTest([
                  ...dataTest,
                  "Hi Who are you?",
                  res.data.choices[0].message.content,
                ]);
              })
            }
          >
            Test OpenAI
          </Button>
          <Normal setDataTest={setDataTest} dataTest={dataTest} />
          <WithJson setDataTest={setDataTest} />
        </div>
      </div>
    </div>
  );
}

export default App;
