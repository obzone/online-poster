export default function Loading() {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className={`card`}>
          <div className="card-image">
            <figure className="image is-4by3 is-skeleton">
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48 is-skeleton">
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}