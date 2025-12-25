import './Tags.css'

export const pageTitle = 'Tags'

function Tags() {
  return (
    <div className="tags">
      <div className="tags-header">
        <h2>Tags</h2>
      </div>
      <div className="tags-content">
        <p className="empty-message">No tags</p>
      </div>
    </div>
  )
}

export default Tags
