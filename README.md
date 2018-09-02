# react-dropout
Easy way of managing navigation in react based apps.

:warning: **Library is under development** :warning:

## Usage
```jsx
const navItems = [
  { exact: true, page: 'Home', path: '/' },
  { page: 'About', path: '/about' },
  { page: 'Products', path: '/products' },
  { page: 'Service', path: '/service' },
  { page: 'Articles', path: '/articles' },
  { page: 'Contact', path: '/contact' },
];

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
```

## API
- `Dropout`
- `Dropout.Wrapper`
- `Dropout.Toggle`
- `Dropout.Rest`

## Contributing guidelines
Remember to install all dependencies with help of `yarn`.

Run server with `yarn start`. It will host server on `http://localhost:10001/` and watch `demo` and `src` directiories for changes.
