import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { questions } from "../utils/questions";

export const Question = () => {
  const [viewQuest, setViewQuest] = useState();
  const [view, setView] = useState(0);
  const [nQuest, setNQuest] = useState(0);
  const [optQuest, setOptQuest] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    genQuest();
  }, []);

  const genQuest = () => {
    let question = questions[Math.floor(Math.random() * questions.length)];
    setViewQuest(question);

    const tempOpt = [...optQuest];
    tempOpt.push(question);
    setOptQuest(tempOpt);
  };

  const resetQuest = (res) => {
    let question = [];

    setResult([...result, res]);

    if (optQuest.length === questions.length) {
      setNQuest(nQuest + 1);

      console.log("Ya se han preguntado todas las preguntas.");
      console.log(optQuest);
      console.log(result);
      return;
    } else {
      setNQuest(nQuest + 1);
      question = questions[Math.floor(Math.random() * questions.length)];
      while (optQuest.includes(question)) {
        question = questions[Math.floor(Math.random() * questions.length)];
      }
    }

    setViewQuest(question);

    const tempOpt = [...optQuest];
    tempOpt.push(question);
    setOptQuest(tempOpt);
  };

  let good = 0;
  let bad = 0;
  const viewResultado = () => {
    setView(1);
    optQuest.map((q, i) => {
      if (result[i] === q.value) {
        console.log("bueno", good++);
      } else {
        console.log("malo", bad++);
      }
    });

    sessionStorage.setItem("good", good);
    sessionStorage.setItem("bad", bad);
  };

  const myStyle = {
    height: "700px",
  };

  return (
    <div className="w-3/4">
      {nQuest >= questions.length ? (
        <div className="text-2xl text-justify font-roboto">
          {view === 1 ? (
            <div className="flex gap-3 pb-5">
              <div className="pb-8">
                <Button variant="contained" onClick={() => location.reload()}>
                  New
                </Button>
              </div>
              <h2 className="font-bold text-emerald-400">
                Well Answered: {sessionStorage.getItem("good")}
              </h2>
              <h2 className="font-bold text-red-400">
                Wrongly Answered: {sessionStorage.getItem("bad")}
              </h2>
            </div>
          ) : (
            ""
          )}
          <div
            style={myStyle}
            className="overflow-auto text-2xl p-3 text-justify font-roboto font-light"
          >
            {view === 1 ? (
              optQuest.map((q, i) => {
                if (result[i] === q.value) {
                  return (
                    <p key={i} className="p-3 text-emerald-400">
                      ➝ {q.quest}
                      <span className="flex font-medium">
                        Response: {q.value ? "True" : "False"}
                      </span>
                    </p>
                  );
                } else {
                  return (
                    <p key={i} className="p-3 text-red-400">
                      ➝ {q.quest}
                      <span className="flex font-medium">
                        Response: {q.value ? "True" : "False"}
                      </span>
                    </p>
                  );
                }
              })
            ) : (
              <Button variant="contained" onClick={() => viewResultado()}>
                Show Results
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* <>
          <Button variant="contained" onClick={() => resetApp()}>
            New
          </Button>
          <div className="text-2xl mt-10 text-justify font-roboto font-light">
            <h2 className="font-bold text-red-400">
              Wrongly Answered: {questBad.length}
            </h2>
            {questBad.map((good, i) => (
              <p key={i} className="p-3">
                {good.quest}
                <span className="flex font-medium text-indigo-400">
                  Response: {good.value ? "True" : "False"}
                </span>
              </p>
            ))}
          </div>
          <div className="text-2xl mt-12 text-justify font-roboto font-light">
            <h2 className="font-bold text-emerald-400">
              Well Answered: {questGood.length}
            </h2>
            {questGood.map((good, i) => (
              <p key={i} className="p-3">
                {good.quest}
                <span className="flex font-medium text-indigo-400">
                  Response: {good.value ? "True" : "False"}
                </span>
              </p>
            ))}
          </div>
        </> */
        <>
          <p className="text-2xl text-justify font-roboto font-light">
            <span>{nQuest + 1} ➝</span> {viewQuest?.quest}
          </p>
          <div className="p-4 flex gap-3">
            <Button
              variant="outlined"
              color="info"
              size="large"
              onClick={() => resetQuest(true)}
            >
              True
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={() => resetQuest(false)}
            >
              False
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
