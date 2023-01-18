import './index.css'

const PasswordItem = props => {
  const {eachLog, showPasswords, deleteLog} = props
  const {id, website, userName, password, initialClassName} = eachLog
  const onClickDelete = () => {
    deleteLog(id)
  }
  const headLetter = website[0].toUpperCase()
  const renderingPassword =
    showPasswords === true ? (
      <p>{password}</p>
    ) : (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
        alt="stars"
        className="stars"
      />
    )

  return (
    <li key={id} className="list-container">
      <h className={`head-letter ${initialClassName}`}>{headLetter}</h>
      <div className="list-contents">
        <p>{website}</p>
        <p>{userName}</p>
        <div className="pass-ele">{renderingPassword}</div>
      </div>
      <button type="button" data-testid="delete" className="del-btn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
          onClick={onClickDelete}
        />
      </button>
    </li>
  )
}

export default PasswordItem
