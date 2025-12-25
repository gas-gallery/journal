import './Flagged.css'

export const pageTitle = 'Flagged'

function Flagged() {
  return (
    <div className="flagged">
      <div className="flagged-header">
        <h2>Flagged</h2>
      </div>
      <div className="flagged-content">
        <p className="empty-message">No flagged tasks</p>
      </div>
    </div>
  )
}

export default Flagged
