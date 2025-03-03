import React from 'react';
import styles from './styles.module.css';

const RespDesign: React.FC = () => {
  return (
    <div className={styles.theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Responsive Design Demo</h1>
        </header>

        <nav className={styles.navbar}>
          <a href="#" className={styles.navbarLink}>
            Home
          </a>
          <a href="#" className={styles.navbarLink}>
            Features
          </a>
          <a href="#" className={styles.navbarLink}>
            Services
          </a>
          <a href="#" className={styles.navbarLink}>
            About
          </a>
          <a href="#" className={styles.navbarLink}>
            Contact
          </a>
        </nav>

        <div className={styles.contentArea}>
          <main className={styles.mainContent}>
            <h2>Main Content Area</h2>
            <img
              src="/api/placeholder/800/400"
              alt="Placeholder image"
              className={styles.image}
            />
            <p>
              This responsive design uses CSS media queries to adapt the layout
              based on screen size. Try resizing your browser window to see how
              elements reposition themselves.
            </p>

            <p>Key responsive features demonstrated:</p>
            <ul>
              <li>Flexible layouts using CSS Flexbox and Grid</li>
              <li>Media queries targeting different viewport sizes</li>
              <li>Fluid images that scale with their containers</li>
              <li>Typography that remains readable across devices</li>
              <li>Feature detection with @media (hover)</li>
              <li>Print-specific styles</li>
            </ul>

            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <h3>Card 1</h3>
                <p>
                  These cards switch from 1 to 2 to 3 columns based on viewport
                  width.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Card 2</h3>
                <p>
                  On devices that support hover, these cards lift up when
                  hovered over.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Card 3</h3>
                <p>
                  The hover effect is disabled on touch devices using @media
                  (hover).
                </p>
              </div>
            </div>
          </main>

          <aside className={styles.sidebar}>
            <h3>Sidebar</h3>
            <p>On mobile, this sidebar appears below the main content.</p>
            <p>
              On tablets and desktops, it appears to the right of the main
              content.
            </p>
            <p>When printing, this sidebar is hidden entirely.</p>
          </aside>
        </div>

        <footer className={styles.footer}>
          <p>Responsive footer - hidden when printing</p>
        </footer>
      </div>
    </div>
  );
};

export default RespDesign;
