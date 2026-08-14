import Navbar from "./components/Navbar";
import FocusTimer from "./components/FocusTimer";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Background video */}
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="video-overlay"></div>

      {/* Website content */}
      <div className="app-content">

        <Navbar />

        <main>

          <section id="home" className="hero-section">
            <div className="hero-content">
              <p className="section-label">FOCUS FLOW</p>
              <h1>Build your focus.<br />Achieve your goals.</h1>
              <p>
                Stay focused, manage your tasks and track your productivity.
              </p>
            </div>
          </section>

          <section id="focus" className="content-section">
            <FocusTimer />
          </section>

          <section id="tasks" className="content-section">
            <TaskList />
          </section>

          <section id="stats" className="content-section">
            <Stats />
          </section>

        </main>

      </div>
    </div>
  );
}

export default App;