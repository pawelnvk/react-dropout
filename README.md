# react-dropout

[![CircleCI](https://circleci.com/gh/pawelnvk/react-dropout.svg?style=svg)](https://circleci.com/gh/pawelnvk/react-dropout)
[![Maintainability](https://api.codeclimate.com/v1/badges/886513e64fc6fbc107a7/maintainability)](https://codeclimate.com/github/pawelnvk/react-dropout/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/886513e64fc6fbc107a7/test_coverage)](https://codeclimate.com/github/pawelnvk/react-dropout/test_coverage)

Easy way of managing navigation in react based apps.

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

### `Dropout`
Container component that will be used to determine available width. It accepts following props:

- `children` - DOM element that `ref` will be attached to, it's important for direct descendant to be DOM node
- `items` - list of object to parse that will be available to display in `Dropout.Wrapper` and `Dropout.Rest`

Example:

```jsx
const items = [
  { exact: true, page: 'Home', path: '/' },
  { page: 'About', path: '/about' },
  { page: 'Products', path: '/products' },
  { page: 'Service', path: '/service' },
  { page: 'Articles', path: '/articles' },
  { page: 'Contact', path: '/contact' },
];

const Nav = () => (
  <Dropout items={items}>
    <nav className="navigation">
      {/* code */}
    </nav>
  </Dropout>
);
```

### `Dropout.Wrapper`
Main items container that will be displaying content fitting in `Dropout` child. It accepts following props:

- `children` - children as a function called with render props, direct descendant should be DOM node, to this node ref will be attached

Available render props:

- `items` - items fitting in available space, filtered from provided items

Example:

```jsx
<Dropout.Wrapper>
  {items => (
    <ul className="navigation__list">
      {items.map(({ page, path }) => (
        <li className="navigation__item" key={path}>
          <Link className="navigation__link" to={path}>{page}</Link>
        </li>
      ))}
      {/* code */}
    </ul>
  )}
</Dropout.Wrapper>
```

### `Dropout.Toggle`
Holder of toggle button. It should be placed inside `Dropout.Wrapper`. It accepts following props:

- `children` - children as a function called with render props, direct descendant should be DOM node, to this node ref will be attached

Available render props:

- `isRestOpened` - state of `Dropout.Rest` element, ahowing if it's opened
- `toggleRest` - function called to switch between opened and closed state

Example:

```jsx
<Dropout.Toggle>
  {({ isToggled, toggle }) => (
    <li className="navigation__item navigation__item--toggle">
      <button className="navigation__link" onClick={toggle}>
        {isToggled ? 'Less' : 'More'}
      </button>

      {/* code */}
    </li>
  )}
</Dropout.Toggle>
```

### `Dropout.Rest`
Container of elements that aren't fitting in `Dropout.Wrapper`. It accepts following props:

- `children` - children as a function called with render props, direct descendant should be DOM node, to this node ref will be attached

Available render props:

- `items` - items that aren't fitting in available space, filtered from provided items

Example:

```jsx
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
```
