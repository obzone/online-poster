export default function Loading() {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className={`modal-content`} >
        <div className="skeleton-lines">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}