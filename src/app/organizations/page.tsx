import { getAllOrganizations } from "../actions/organizations"
import style from './page.module.scss'

export default async function Organizations() {
  const organizations = await getAllOrganizations()
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className={`modal-content ${style.container}`} >
        {
          organizations.map(organization => {
            return (
              <a href={`/?orgId=${organization.id}`} key={organization.id} className="box">{organization.name}</a>
            )
          })
        }
      </div>
    </div>
  )
}