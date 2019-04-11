# react-dropout

[![NPM version](https://img.shields.io/npm/v/react-dropout.svg)](https://www.npmjs.com/package/react-dropout)
[![NPM downloads](https://img.shields.io/npm/dm/react-dropout.svg)](https://www.npmjs.com/package/react-dropout)
[![CircleCI](https://circleci.com/gh/pawelnvk/react-dropout.svg?style=svg)](https://circleci.com/gh/pawelnvk/react-dropout)
[![Maintainability](https://api.codeclimate.com/v1/badges/886513e64fc6fbc107a7/maintainability)](https://codeclimate.com/github/pawelnvk/react-dropout/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/886513e64fc6fbc107a7/test_coverage)](https://codeclimate.com/github/pawelnvk/react-dropout/test_coverage)

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
  { page: 'Products', path: '/products' },
  { page: 'Service', path: '/service' },
  { page: 'Articles', path: '/articles' },
  { page: 'Contact', path: '/contact' },
];

class Toggle extends React.Component {
  state = {
    isToggled: false,
  };

  handleToggle = () => {
    this.setState(({ isToggled }) => ({ isToggled: !isToggled }));
  };

  render() {
    const { children } = this.props;
    const { isToggled } = this.state;
    return (
      <li className="navigation__item navigation__item--toggle dropdown">
        {isToggled && (
          <button className="dropdown__overlay" onClick={this.handleToggle} />
        )}
        <button
          className="navigation__link navigation__link--toggle dropdown__toggle"
          onClick={this.handleToggle}
        >
          <Hamburger isActive={isToggled} />
          {isToggled ? 'Less' : 'More'}
        </button>

        {isToggled && children}
      </li>
    );
  }
}

const Nav = () => (
  <Dropout items={navItems}>
    {({
      countToHide,
      exceedingItems,
      getContentProps,
      getRootProps,
      items,
    }) => (
      <nav {...getRootProps({ className: 'navigation' })}>
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
