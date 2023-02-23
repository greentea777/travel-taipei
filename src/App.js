import { useEffect, useState } from "react";
import db from "./database/db.json";

function App() {
  const [data, setData] = useState([db.data]);

  console.log(data);

  return (
    <div className="App">
      <h1></h1>
    </div>
  );
}

export default App;
