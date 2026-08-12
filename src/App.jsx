import Navbar from "./components/Navbar";
import FocusTimer from "./components/FocusTimer";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";

import "./App.css";


function App() {

  return (

    <div className="app">

      {/* Background Video */}

      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/focus-bg.mp4"
          type="video/mp4"
        />
      </video>


      {/* Dark Overlay */}

      <div className="video-overlay"></div>


      {/* Website */}

      <div className="website">

        {/* Home */}

        <div id="home"></div>


        {/* Navbar */}

        <Navbar />


        {/* Main Content */}

        <main>

          <FocusTimer />

          <TaskList />

          <Stats />

        </main>

      </div>

    </div>

  );

}


export default App;