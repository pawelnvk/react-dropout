# react-dropout

[![NPM version](https://img.shields.io/npm/v/react-dropout.svg)](https://www.npmjs.com/package/react-dropout)
[![NPM downloads](https://img.shields.io/npm/dm/react-dropout.svg)](https://www.npmjs.com/package/react-dropout)
[![Maintainability](https://api.codeclimate.com/v1/badges/886513e64fc6fbc107a7/maintainability)](https://codeclimate.com/github/pawelnvk/react-dropout)
[![Test Coverage](https://api.codeclimate.com/v1/badges/886513e64fc6fbc107a7/test_coverage)](https://codeclimate.com/github/pawelnvk/react-dropout)
[![GitHub Actions](https://github.com/pawelnvk/react-dropout/actions/workflows/PR.yml/badge.svg)](https://github.com/pawelnvk/react-dropout/actions)

Easy way of managing navigation in react-based apps.

## Installation

```sh
npm install --save react-dropout
```

```sh
yarn add react-dropout
```

## Usage

```jsx
const navItems = [
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
  const handleToggle = () => setIsToggled((previousIsToggled) => !previousIsToggled);

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

const Nav = () => (
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
```

## Example

To see example implementation preview [this](https://codesandbox.io/s/wyj7mnz897).

## API

Component accepts following props:

- `children` - child as a function passing `Droupout` render props
- `items` - list of object to parse that will be available in render props, items can be extended by `grade` property to indicate which of them should be hidden firstly lowest grade is the most important and it will be hidden last

Render props:

- `countToHide` - number of hidden elements
- `exceedingItems` - items that are exceeding current container
- `getContentProps` - props that should be attached to content
- `getRootProps` - props that should be attached to root
- `items` - items currently visible

## Contributing

If you want to contribute, please read [contribution guide](CONTRIBUTING.md)
