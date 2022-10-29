const { BrowserRouter: Router, Link, Route, Switch } = ReactRouterDOM;

const root = document.querySelector('#root');

const initialNavItems = [
  { exact: true, page: 'Home', path: '/' },
  { page: 'About', path: '/about' },
  { page: 'History', path: '/history' },
  { page: 'Career', path: '/career' },
  { page: 'Blog', path: '/blog' },
  { page: 'Help', path: '/help' },
  { page: 'FAQ', path: '/faq' },
  { page: 'Products', path: '/products' },
  { page: 'Service', path: '/service' },
  { page: 'Articles', path: '/articles' },
  { page: 'Contact', path: '/contact' },
];

const Hamburger = ({ isActive }) => (
  <div className={`hamburger ${isActive ? 'is-active' : ''}`}>
    <span className="hamburger__line hamburger__line--1" />
    <span className="hamburger__line hamburger__line--2" />
    <span className="hamburger__line hamburger__line--3" />
  </div>
);

const Logo = () => (
  <div className="logo">
    <Link className="logo__link" to="/">
      Logo
    </Link>
  </div>
);

const Toggle = ({ children }) => {
  const [isToggled, setIsToggled] = React.useState(false);
  const handleToggle = () => setIsToggled((prevIsToggled) => !prevIsToggled);

  return (
    <li className="navigation__item navigation__item--toggle dropdown">
      {isToggled && (
        <button className="dropdown__overlay" onClick={handleToggle} />
      )}
      <button
        className="navigation__link navigation__link--toggle dropdown__toggle"
        onClick={handleToggle}
      >
        <Hamburger isActive={isToggled} />
        {isToggled ? 'Less' : 'More'}
      </button>

      {isToggled && children}
    </li>
  );
};

const Nav = ({ navItems }) => (
  <Dropout items={navItems}>
    {({
      countToHide,
      exceedingItems,
      getContentProps,
      getRootProps,
      items,
    }) => (
      <nav
        {...getRootProps({
          className: 'navigation',
          'data-testid': 'navigation',
        })}
      >
        <ul {...getContentProps({ className: 'navigation__list' })}>
          {items.map(({ page, path }) => (
            <li className="navigation__item" key={path}>
              <Link className="navigation__link" to={path}>
                {page}
              </Link>
            </li>
          ))}
          {!!countToHide && (
            <Toggle>
              <ul className="subnav dropdown__content">
                {exceedingItems.map(({ page, path }) => (
                  <li className="subnav__item" key={path}>
                    <Link className="subnav__link" to={path}>
                      {page}
                    </Link>
                  </li>
                ))}
              </ul>
            </Toggle>
          )}
        </ul>
      </nav>
    )}
  </Dropout>
);

const App = () => {
  const [navItems, setNavItems] = React.useState(initialNavItems);

  return (
    <Router>
      <div className="app">
        <header className="app__header app__header--lower header">
          <div className="header__container u-container">
            <Logo />

            <Nav navItems={navItems} />
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
                  <div className={`page page--${page.toLocaleLowerCase()}`}>
                    <div className="page__content">
                      <h1 className="page__title">{page}</h1>
                      <div className="page__button-wrapper">
                        <button
                          className="page__button button"
                          onClick={() =>
                            setNavItems((prevNavItems) => [
                              ...prevNavItems,
                              {
                                page: `Item-${+new Date()}`,
                                path: `/item-${+new Date()}`,
                              },
                            ])
                          }
                        >
                          + Add item
                        </button>
                        <button
                          className="page__button button"
                          onClick={() =>
                            setNavItems((prevNavItems) =>
                              prevNavItems.filter(
                                (_, index, array) => index !== array.length - 1,
                              ),
                            )
                          }
                        >
                          - Remove item
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              />
            ))}
          </Switch>
        </main>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, root);
