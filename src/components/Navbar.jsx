import { useState } from "react";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (sectionId) => {

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }

    setMenuOpen(false);
  };


  return (
    <header className="navbar">

      {/* Logo */}

      <div
        className="logo"
        onClick={() => handleNavigation("home")}
      >
        Focus<span>Flow</span>
      </div>


      {/* Navigation */}

      <nav
        className={
          menuOpen
            ? "nav-menu active"
            : "nav-menu"
        }
      >

        <ul>

          <li
            onClick={() =>
              handleNavigation("home")
            }
          >
            Home
          </li>

          <li
            onClick={() =>
              handleNavigation("focus")
            }
          >
            Focus
          </li>

          <li
            onClick={() =>
              handleNavigation("tasks")
            }
          >
            Tasks
          </li>

          <li
            onClick={() =>
              handleNavigation("stats")
            }
          >
            Stats
          </li>

        </ul>

      </nav>


      {/* Profile */}

      <button className="profile-btn">
        Profile
      </button>


      {/* Mobile Menu */}

      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? "✕" : "☰"}
      </button>

    </header>
  );
};


export default Navbar;