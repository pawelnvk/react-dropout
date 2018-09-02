const {
  BrowserRouter: Router,
  Link,
  Route,
  Switch,
} = ReactRouterDOM;

const root = document.querySelector('#root');

const navItems = [
  { exact: true, page: 'Home', path: '/' },
  { page: 'About', path: '/about' },
  { page: 'Products', path: '/products' },
  { page: 'Service', path: '/service' },
  { page: 'Articles', path: '/articles' },
  { page: 'Contact', path: '/contact' },
]

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
                <li className="navigation__item navigation__item--toggle">
                  <button className="navigation__link" onClick={toggle}>
                    {isToggled ? 'Less' : 'More'}
                  </button>

                  <Dropout.Rest>
                    {items => (
                      <ul className="subnav">
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
              render={() => <div className="page u-container">{page}</div>}
            />
          ))}
        </Switch>
      </main>
    </div>
  </Router>
);

ReactDOM.render(<App />, root);
