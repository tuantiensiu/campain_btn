import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const ContainerTypesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.containerTypes()} className="rw-link">
            ContainerTypes
          </Link>
        </h1>
        <Link
          to={routes.newContainerType()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New ContainerType
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ContainerTypesLayout
