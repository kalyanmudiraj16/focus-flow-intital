const Navbar = () => {
  return (
    <header className="navbar">

      <div className="logo">
        Focus<span>Flow</span>
      </div>

      <nav>
        <ul>
          <li>Home</li>
          <li>Focus</li>
          <li>Tasks</li>
          <li>Stats</li>
        </ul>
      </nav>

      <button className="profile-btn">
        Profile
      </button>

    </header>
  )
}

export default Navbar