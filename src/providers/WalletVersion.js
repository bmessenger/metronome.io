import { Component } from 'react'
import { connect } from 'react-redux'

class WalletVersion extends Component {
  componentDidMount () {
    const { onVersion } = this.props
    fetch('https://api.github.com/repos/autonomoussoftware/metronome-wallet-desktop/releases/latest')
      .then(res => res.json())
      .then(function (release) {
        onVersion(release.tag_name)
      })
      .catch(function (err) {
        // eslint-disable-next-line no-console
        console.warn('Could not get latest release info', err.message)
      })
  }

  render () {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  onVersion: payload => dispatch({
    type: 'UPDATE_WALLET_VERSION',
    payload
  })
})

export default connect(null, mapDispatchToProps)(WalletVersion)
