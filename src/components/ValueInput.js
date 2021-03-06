import BigNumber from 'bignumber.js'
import React, { Component } from 'react'

/**
 * This component is an <input> that will accept value (be controlled) only when
 * is not in focus. When in focus, it manages the value internally applying its
 * own rules.
 *
 * @extends Component
 */
class ValueInput extends Component {
  state = {
    onFocus: false,
    value: ''
  }

  constructor (props) {
    super(props)

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  cleanupValue (value) {
    return new BigNumber(value).gt(0) ? value : ''
  }

  onBlur () {
    this.setState({ onFocus: false })

    this.props.onChange({ target: { value: this.state.value } })
  }

  onChange (ev) {
    const { target: { value } } = ev

    if (new BigNumber(value).lt(0)) {
      return
    }

    this.setState({ value })

    this.props.onChange(ev)
  }

  onFocus () {
    this.setState({ onFocus: true, value: this.cleanupValue(this.props.value) })
  }

  render () {
    const props = {
      ...this.props,
      value: this.state.onFocus
        ? this.state.value
        : this.cleanupValue(this.props.value)
    }

    return (
      <input
        {...props}
        onBlur={this.onBlur}
        onChange={this.state.onFocus ? this.onChange : this.props.onChange}
        onFocus={this.onFocus} />
    )
  }
}

export default ValueInput
