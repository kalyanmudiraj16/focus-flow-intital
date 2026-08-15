import {
  Moon,
  Sun,
  Palette,
  ShieldCheck,
  Settings as SettingsIcon,
} from "lucide-react";

const Settings = () => {
  return (
    <main className="settings-page">
      <div className="settings-page-inner">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="settings-header">
          <div>
            <p className="settings-eyebrow">
              PREFERENCES
            </p>

            <h1>Settings</h1>

            <p className="settings-subtitle">
              Keep FocusFlow configured the way you work best.
            </p>
          </div>
        </header>


        {/* =========================================
            APPEARANCE
        ========================================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon">
              <Palette size={20} />
            </div>

            <div>
              <p className="settings-card-eyebrow">
                APPEARANCE
              </p>

              <h2>Theme</h2>

              <p>
                Choose how FocusFlow looks on your device.
              </p>
            </div>

          </div>


          <div className="theme-options">

            {/* DARK */}

            <div className="theme-option active">

              <div className="theme-option-icon">
                <Moon size={19} />
              </div>

              <div className="theme-option-content">

                <strong>Dark</strong>

                <span>
                  The default FocusFlow experience.
                </span>

              </div>

              <div className="theme-selected">
                Active
              </div>

            </div>


            {/* LIGHT */}

            <div className="theme-option disabled">

              <div className="theme-option-icon">
                <Sun size={19} />
              </div>

              <div className="theme-option-content">

                <strong>Light</strong>

                <span>
                  A brighter experience is coming soon.
                </span>

              </div>

              <div className="theme-coming-soon">
                Coming soon
              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            GENERAL
        ========================================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon">
              <SettingsIcon size={20} />
            </div>

            <div>
              <p className="settings-card-eyebrow">
                GENERAL
              </p>

              <h2>Workspace</h2>

              <p>
                Basic preferences for your FocusFlow workspace.
              </p>
            </div>

          </div>


          <div className="settings-row">

            <div>
              <strong>
                FocusFlow appearance
              </strong>

              <span>
                Dark mode is currently the default experience.
              </span>
            </div>

            <div className="settings-status">
              Dark
            </div>

          </div>


          <div className="settings-row">

            <div>
              <strong>
                Product updates
              </strong>

              <span>
                New productivity features will appear here
                as FocusFlow evolves.
              </span>
            </div>

            <div className="settings-status muted">
              Automatic
            </div>

          </div>

        </section>


        {/* =========================================
            FOCUSFLOW INFO
        ========================================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="settings-card-eyebrow">
                EXPERIENCE
              </p>

              <h2>FocusFlow</h2>

              <p>
                Simple, focused and distraction-free.
              </p>
            </div>

          </div>


          <div className="settings-info">

            <span>
              You're using the current FocusFlow experience.
            </span>

            <strong>
              Built for focused work.
            </strong>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Settings;