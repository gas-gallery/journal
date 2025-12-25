import './Forecast.css'

export const pageTitle = 'Forecast'

function Forecast() {
  return (
    <div className="forecast">
      <div className="forecast-header">
        <h2>Forecast</h2>
      </div>
      <div className="forecast-content">
        <p className="empty-message">No forecasted tasks</p>
      </div>
    </div>
  )
}

export default Forecast
