import "./App.css"

import Navbar from "./components/Navbar"
import FocusTimer from "./components/FocusTimer"
import TaskList from "./components/TaskList"
import Stats from "./components/Stats"

function App() {
  return (
    <div className="app">

      {/* Background video */}
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/focus-bg.mp4" type="video/mp4" />
        </video>

      {/* Dark layer over video */}
      <div className="video-overlay"></div>

      {/* Website content */}
      <div className="website">

        <Navbar />

        <main>
          <FocusTimer />
          <TaskList />
          <Stats />
        </main>

      </div>

    </div>
  )
}

export default App