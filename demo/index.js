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
  <nav className="navigation">
    <ul className="navigation__list">
      {navItems.map(({ page, path }) => (
        <li className="navigation__item" key={path}>
          <Link className="navigation__link" to={path}>{page}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

const App = () => (
  <Router>
    <div>
      <header className="header">
        <Dropout>
          <div className="header__container u-container">
            <Logo />

            <Nav />
          </div>
        </Dropout>
      </header>

      <main>
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
