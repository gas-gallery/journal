import './Review.css'

export const pageTitle = 'Review'

function Review() {
  return (
    <div className="review">
      <div className="review-header">
        <h2>Review</h2>
      </div>
      <div className="review-content">
        <p className="empty-message">No items to review</p>
      </div>
    </div>
  )
}

export default Review
