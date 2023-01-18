import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from './Components/PasswordItem'

import './App.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    dummyPasswordInput: '',
    searchWebsite: '',
    showPasswords: false,
    logs: [],
  }

  logDetails = event => {
    event.preventDefault()
    const {
      websiteInput,
      userNameInput,
      passwordInput,
      dummyPasswordInput,
      logs,
    } = this.state

    const colorIndex = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )

    const initialBackgroundColorClassName = `initial-container ${initialContainerBackgroundClassNames[colorIndex]}`

    const newLog = {
      id: v4(),
      website: websiteInput,
      userName: userNameInput,
      password: passwordInput,
      dummyPassword: dummyPasswordInput,
      initialClassName: initialBackgroundColorClassName,
    }
    const updatedLogs = [...logs, newLog]
    this.setState({
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
      dummyPasswordInput: '',
      logs: updatedLogs,
    })
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    const {passwordInput} = this.state
    const endLetter = event.target.value.slice(-1)
    const newPassword = passwordInput.concat(endLetter)
    this.setState({
      dummyPasswordInput: '*'.repeat(newPassword.length),
      passwordInput: newPassword,
    })
  }

  renderPasswords = props => {
    const {showPasswords} = this.state
    const filteredLogs = props
    if (filteredLogs.length === 0) {
      return (
        <div className="no-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords-image"
          />
          <p>No Passwords</p>
        </div>
      )
    }
    return (
      <ul className="passwords-list">
        {filteredLogs.map(each => (
          <PasswordItem
            eachLog={each}
            showPasswords={showPasswords}
            deleteLog={this.deleteLog}
            key={each.id}
          />
        ))}
      </ul>
    )
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  filterWebsites = event => {
    this.setState({searchWebsite: event.target.value})
  }

  deleteLog = id => {
    const {logs} = this.state
    const updatedLogs = logs.filter(each => each.id !== id)
    this.setState({logs: updatedLogs})
  }

  render() {
    const {
      websiteInput,
      userNameInput,
      passwordInput,
      searchWebsite,
      logs,
    } = this.state
    const filteredLogs = logs.filter(each =>
      each.website.toLowerCase().includes(searchWebsite.toLowerCase()),
    )
    return (
      <div className="container">
        <div className="box">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="pm-container">
            <form className="input-container" onSubmit={this.logDetails}>
              <h1 className="add-pass-title">Add New Password</h1>
              <form className="input-tab">
                <div className="input-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-logo"
                  />
                </div>
                <input
                  type="input"
                  placeholder="Enter Website"
                  className="input-text"
                  onChange={this.onChangeWebsite}
                  value={websiteInput}
                />
              </form>
              <br />
              <div className="input-tab">
                <div className="input-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-logo"
                  />
                </div>
                <input
                  type="input"
                  placeholder="Enter Username"
                  className="input-text"
                  onChange={this.onChangeUserName}
                  value={userNameInput}
                />
              </div>
              <br />
              <div className="input-tab">
                <div className="input-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-logo"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-text"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>
              <br />
              <div className="button-box">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="pm-image"
            />
          </div>
          <div className="passwords-container">
            <div className="passwords-title">
              <div className="your-passwords">
                <h1 className="your-pass">Your Passwords</h1>
                <p className="passwords-count">{filteredLogs.length}</p>
              </div>
              <div className="password-search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  onChange={this.filterWebsites}
                  value={searchWebsite}
                  placeholder="Search"
                  className="search-input"
                />
              </div>
            </div>
            <hr className="break-line" />
            <div className="show-passwords">
              <form>
                <input
                  type="checkbox"
                  id="show"
                  value="Show"
                  onChange={this.toggleShowPasswords}
                />
                <label htmlFor="show">Show Passwords</label>
              </form>
            </div>
            {this.renderPasswords(filteredLogs)}
          </div>
        </div>
      </div>
    )
  }
}

export default App
