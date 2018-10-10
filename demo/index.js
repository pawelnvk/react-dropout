const {
  BrowserRouter: Router,
  Link,
  Route,
  Switch,
} = ReactRouterDOM;

const root = document.querySelector('#root');

const navItems = [
  { grade: 4, exact: true, page: 'Home', path: '/' },
  { grade: 6, page: 'About', path: '/about' },
  { grade: 1, page: 'Products', path: '/products' },
  { grade: 2, page: 'Service', path: '/service' },
  { grade: 7, page: 'Articles', path: '/articles' },
  { grade: 3, page: 'Contact', path: '/contact' },
];

const Hamburger = ({ isActive }) => (
  <div className={`hamburger ${isActive ? 'is-active' : ''}`}>
    <span className="hamburger__line hamburger__line--1"></span>
    <span className="hamburger__line hamburger__line--2"></span>
    <span className="hamburger__line hamburger__line--3"></span>
  </div>
);

const Logo = () => (
  <div className="logo">
    <Link className="logo__link" to="/">Logo</Link>
  </div>
);

const Nav = () => (
  <Dropout items={navItems}>
    <nav className="navigation">
      <Dropout.Wrapper>
        {items => (
          <ul className="navigation__list">
            {items.map(({ page, path }) => (
              <li className="navigation__item" key={path}>
                <Link className="navigation__link" to={path}>{page}</Link>
              </li>
            ))}
            <Dropout.Toggle>
              {({ isToggled, toggle }) => (
                <li className="navigation__item navigation__item--toggle dropdown">
                  {isToggled && <button className="dropdown__overlay" onClick={toggle} />}
                  <button className="navigation__link navigation__link--toggle dropdown__toggle" onClick={toggle}>
                    <Hamburger isActive={isToggled} />
                    {isToggled ? 'Less' : 'More'}
                  </button>

                  <Dropout.Rest>
                    {items => (
                      <ul className="subnav dropdown__content">
                        {items.map(({ page, path }) => (
                          <li className="subnav__item" key={path}>
                            <Link className="subnav__link" to={path}>{page}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Dropout.Rest>
                </li>
              )}
            </Dropout.Toggle>
          </ul>
        )}
      </Dropout.Wrapper>
    </nav>
  </Dropout>
);

const App = () => (
  <Router>
    <div className="app">
      <header className="app__header header">
        <div className="header__container u-container">
          <Logo />

          <Nav />
        </div>
      </header>

      <main className="app__main">
        <Switch>
          {navItems.map(({ exact, page, path }) => (
            <Route
              exact={exact}
              key={path}
              path={path}
              render={() => (
                <div className={`page page--${page.toLowerCase()}`}>
                  <div className="page__content">{page}</div>
                </div>
              )}
            />
          ))}
        </Switch>
      </main>
    </div>
  </Router>
);

ReactDOM.render(<App />, root);
