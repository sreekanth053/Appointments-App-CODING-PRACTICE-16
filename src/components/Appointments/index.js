// Write your code
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleValue: '',
    dateValue: '',
    listContainer: [],
    allListContainer: [],
    isClickedStarred: false,
  }

  onChangeTitle = event => {
    this.setState({titleValue: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateValue: event.target.value})
  }

  onClickStarred = id => {
    this.setState(prevState => ({
      listContainer: prevState.listContainer.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
      allListContainer: prevState.allListContainer.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onAddButton = event => {
    event.preventDefault()
    const {titleValue, dateValue} = this.state
    const newList = {
      id: v4(),
      titleValue,
      dateValue,
      isStarred: false,
    }
    this.setState(prevState => ({
      listContainer: [...prevState.listContainer, newList],
      allListContainer: [...prevState.listContainer, newList],
      titleValue: '',
      dateValue: '',
    }))
  }

  getStarredItems = () => {
    this.setState(prevState => ({
      isClickedStarred: !prevState.isClickedStarred,
    }))
  }

  render() {
    const {
      listContainer,
      allListContainer,
      titleValue,
      dateValue,
      isClickedStarred,
    } = this.state
    const filteredLists = listContainer.filter(
      eachStarred => eachStarred.isStarred === true,
    )
    const listItemsContainer = isClickedStarred
      ? filteredLists
      : allListContainer

    const styleStarredButton = isClickedStarred
      ? 'get-starred-1'
      : 'get-starred-2'

    return (
      <div className="main-bg-container">
        <div className="card-container">
          <h1>Add Appointment</h1>
          <div className="row-styling">
            <form className="form-style" onSubmit={this.onAddButton}>
              <label className="label-text" htmlFor="title">
                Title
              </label>
              <input
                onChange={this.onChangeTitle}
                id="title"
                type="text"
                value={titleValue}
                className="input-element"
              />

              <label className="label-text" htmlFor="date">
                Date
              </label>
              <input
                onChange={this.onChangeDate}
                type="date"
                id="date"
                value={dateValue}
                className="input-element"
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              className="display-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="container">
            <h1 className="heading-element">Appointments</h1>
            <button
              onClick={this.getStarredItems}
              type="button"
              className={`starred-button ${styleStarredButton}`}
            >
              Starred
            </button>
          </div>
          <ul className="ul-container">
            {listItemsContainer.map(eachList => (
              <AppointmentItem
                onClickStarred={this.onClickStarred}
                key={eachList.id}
                appointmentData={eachList}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
