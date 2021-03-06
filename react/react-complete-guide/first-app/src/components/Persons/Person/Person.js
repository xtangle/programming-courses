import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AuthContext from '../../../context/AuthContext';
import withClass from '../../../hoc/WithClass/WithClass';
import styles from './Person.css';

class Person extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  componentDidMount() {
    const { authenticated } = this.context;
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(`[Person.js] componentDidMount, authenticated: ${authenticated}`);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Person.js] componentDidUpdate', prevProps, prevState, snapshot);
  }

  render() {
    console.log('[Person.js] rendering...');
    const { onClick, onChange, name, age, children } = this.props;
    const { authenticated } = this.context;

    const btnStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid purple',
      cursor: 'pointer',
      display: 'block',
      margin: '16px auto',
    };

    const authSection = authenticated
      ? <p>Authenticated!</p>
      : <p>Please log in</p>;

    return (
      <>
        {authSection}
        <p>{`I'm a Person and I am ${name} ${age} old!`}</p>
        <p>{children}</p>
        <input
          // ref={(inputEl) => { this.inputElement = inputEl; }}
          ref={this.inputElementRef}
          type="text"
          onChange={onChange}
          value={name}
        />
        <button
          type="button"
          style={btnStyle}
          onClick={onClick}
        >
          Remove me
        </button>
      </>
    );
  }
}

Person.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Person.defaultProps = {
  onClick: () => null,
  onChange: () => null,
  children: null,
};

export default withClass(Person, styles.Person);
