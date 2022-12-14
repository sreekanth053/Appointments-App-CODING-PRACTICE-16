// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentData, onClickStarred} = props
  const {id, titleValue, dateValue, isStarred} = appointmentData
  const displayDate = format(new Date(dateValue), 'dd MMMM yyyy, EEEE')
  const displayStarredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const isStarredBtn = () => {
    onClickStarred(id)
  }

  return (
    <li className="list-item">
      <div className="display-list">
        <p className="list-title">{titleValue}</p>
        <button
          onClick={isStarredBtn}
          // testid="star"
          type="button"
          className="starred-image-button"
        >
          <img src={displayStarredImage} alt="star" className="starred-image" />
        </button>
      </div>
      <p className="list-description">{displayDate}</p>
    </li>
  )
}
export default AppointmentItem
