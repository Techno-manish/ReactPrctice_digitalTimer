// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, secondsPassed: 0, running: false}

  onIncrement = () =>
    this.running
      ? null
      : this.setState(prevState => ({minutes: prevState.minutes + 1}))

  onDecrement = () =>
    this.running
      ? null
      : this.setState(prevState => ({minutes: prevState.minutes - 1}))

  onSetReset = () => {
    const {minutes} = this.state
    const time = minutes
    this.setState({minutes: time, secondsPassed: 0, running: false})
    this.clearTimerInterval()
  }

  incrementsecondsPassed = () =>
    this.setState(prevState => ({secondsPassed: prevState.secondsPassed + 1}))

  clearTimerInterval = () => clearInterval(this.intervalId)

  onStartOrPauseTimer = () => {
    const {running, secondsPassed, minutes} = this.state

    const isTimerCompleted = secondsPassed === minutes * 60

    if (isTimerCompleted) {
      this.setState({secondsPassed: 0})
    }
    if (!running) {
      this.intervalId = setInterval(this.incrementsecondsPassed, 1000)
    } else {
      this.clearTimerInterval()
    }

    this.setState(prevState => ({running: !prevState.running}))
  }

  render() {
    const {minutes, running, secondsPassed} = this.state

    const timeRemains = minutes * 60 - secondsPassed

    const remainingMinutes = Math.floor(parseInt(timeRemains) / 60)

    const remainingSeconds = timeRemains - remainingMinutes * 60

    const renderPlayPauseButton = running
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const renderAltText = running ? 'pause icon' : 'play icon'

    const renderDisplayText = running ? 'Running' : 'Paused'

    const stringifiedMinutes =
      remainingMinutes > 9 ? remainingMinutes : `0${remainingMinutes}`

    const stringifiedSeconds =
      remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`

    console.log(renderAltText)
    console.log(renderPlayPauseButton)

    return (
      <div className="bgContainer">
        <h1>Digital Timer</h1>
        <div className="timerBody">
          <div className="timerContainer">
            <div className="timeCircle">
              <h1 className="timerText">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="displayText">{renderDisplayText}</p>
            </div>
          </div>
          <div className="timerMenuContainer">
            <div className="timerSettingsContainer">
              <button
                type="button"
                className="button menuOption"
                onClick={this.onStartOrPauseTimer}
              >
                <img
                  className="playPauseIcon"
                  src={renderPlayPauseButton}
                  alt={renderAltText}
                />
                {running ? 'Pause' : 'Start'}
              </button>
              <button
                type="button"
                className="button menuOption"
                onClick={this.onSetReset}
              >
                <img
                  className="resetIcon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="buttonContainer">
              <button
                type="button"
                className="button"
                onClick={this.onDecrement}
                disabled={running}
              >
                -
              </button>
              <p className="setMinute">{minutes}</p>
              <button
                type="button"
                className="button"
                onClick={this.onIncrement}
                disabled={running}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
