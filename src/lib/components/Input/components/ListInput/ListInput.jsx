import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import InputWrapper, { inputWrapperProps } from '../InputWrapper';
import IconButton from 'lib/components/IconButton';
import s from './ListInput.css';


class ListInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onChange(i) {
    return (e) => {
      this.props.value[i] = e.target.value;
      this.props.onChange(this.props.value, this.props.name);
    };
  }

  onClickAdd() {
    const value = this.props.value || [];
    value.push('');
    this.props.onChange(value, this.props.name);
  }

  onClickRemove(i) {
    return () => {
      const value = _.clone(this.props.value);
      value.splice(i, 1);
      this.props.onChange(value, this.props.name);
    };
  }

  render() {
    let {value} = this.props;
    value = value || [];
    let className = classnames(
      s.listInput,
      {
        [s.hasError]: _.get(this.props, 'errors.length')
      },
      this.props.className
    );

    const inputs = value.map((val, i) => {
      return (
        <li key={i} className={s.listItem}>
          <input
            type="text"
            className={s.input}
            value={val}
            onChange={this.onChange(i)}
            autoFocus
          />
          <IconButton
            className={s.removeButton}
            iconName="times"
            onClick={this.onClickRemove(i)}
          />
        </li>
      );
    });

    return (
      <InputWrapper
        {..._.pick(this.props, inputWrapperProps)}
        className={className}
      >
        <ul className={s.list}>{ inputs }</ul>
        <IconButton
          className={s.addButton}
          iconName="pencil"
          onClick={this.onClickAdd}
          block
        >
          Add
        </IconButton>
      </InputWrapper>
    );
  }

}
ListInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string)
};

export default ListInput;