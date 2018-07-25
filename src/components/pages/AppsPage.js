import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import downloadHelper from '../../download-helper'

class AppsPage extends Component {
  static propTypes = {
    desktopAppVersion: PropTypes.string
  }

  render() {
    const {
      currentOS,
      baseReleasetUrl,
      downloadWalletUrl,
      walletInstaller,
      walletInstallers
    } = downloadHelper(this.props.desktopAppVersion)

    return (
      <div className="downloads__main-container">
        <div className="downloads__main-parallax-layer">
          <div className="downloads__content-container">
            <div className="downloads__met-icon">
              <img
                src="/images/metronome-apps-logo.png"
                alt="metronome-apps-logo"
              />
            </div>
            <div className="downloads__title-container">
              <h1 className="downloads__header-title">
                Download the Desktop App
              </h1>
              <h2>Get started with the Metronome Wallet</h2>
            </div>
            {walletInstaller && (
              <a
                {...{ href: `${downloadWalletUrl}.${walletInstaller.ext}` }}
                className="btn"
              >
                Download For {walletInstaller.os} {currentOS.version}
              </a>
            )}
            <a href="#download-options" className="link__sm">
              See all download options
            </a>
            <div className="downloads__app-screenshot">
              <img
                className="--slideUp"
                src="/images/metronome-apps-demo.png"
                srcSet="/images/metronome-apps-demo@2x.png 2x, /images/metronome-apps-demo@3x.png 3x"
                alt="Metronome App Demo"
              />
            </div>
          </div>
          <div className="envelope__footer" id="download-options">
            <div className="envelope">
              <div className="envelope__left" />
              <div className="envelope__right" />
            </div>
            <h2>All Download Options</h2>
            <div className="envelope__footer-downloads">
              <ul>
                <li>
                  <a
                    {...{
                      href: `${downloadWalletUrl}.${
                        walletInstallers.find(w => w.os === 'Mac OS').ext
                      }`
                    }}
                    className="btn"
                  >
                    Download For Mac OS
                  </a>
                </li>
                <li>
                  <a
                    {...{
                      href: `${downloadWalletUrl}.${
                        walletInstallers.find(w => w.os === 'Windows').ext
                      }`
                    }}
                    className="btn"
                  >
                    Download For Windows
                  </a>
                </li>
                <li>
                  <a
                    {...{
                      href: `${downloadWalletUrl}.${
                        walletInstallers.find(w => w.os === 'Ubuntu').ext
                      }`
                    }}
                    className="btn"
                  >
                    Download For Linux
                  </a>
                </li>
              </ul>
            </div>
            <div
              data-toggle="scroll__here"
              className="envelope__footer-coming-soon"
            >
              Or view the{' '}
              <a href={baseReleasetUrl} target="_blank">
                releases
              </a>
            </div>
            <div
              data-toggle="scroll__here"
              className="envelope__footer-coming-soon"
            >
              <span className="span__strong">Coming soon</span> to the App Store
              and Google Play
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion
})

export default connect(mapStateToProps)(AppsPage)
