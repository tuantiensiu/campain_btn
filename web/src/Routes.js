// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'
import CountDownPage from './pages/CountDownPage/CountDownPage'
import BulkSMSPage from './pages/BulkSmsPage/BulkSmsPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/bulk-sms" page={BulkSMSPage} name="bulkSms" />
      <Route path="/count-down" page={CountDownPage} name="countDown" />
      <Route
        path="/container-roles/new"
        page={NewContainerRolePage}
        name="newContainerRole"
      />
      <Route
        path="/container-roles/{id}/edit"
        page={EditContainerRolePage}
        name="editContainerRole"
      />
      <Route
        path="/container-roles/{id}"
        page={ContainerRolePage}
        name="containerRole"
      />
      <Route
        path="/container-roles"
        page={ContainerRolesPage}
        name="containerRoles"
      />
      <Route
        path="/containers/new"
        page={NewContainerPage}
        name="newContainer"
      />
      <Route
        path="/containers/{id}/edit"
        page={EditContainerPage}
        name="editContainer"
      />
      <Route path="/containers/{id}" page={ContainerPage} name="container" />
      <Route path="/containers" page={ContainersPage} name="containers" />
      <Route
        path="/container-hosts/new"
        page={NewContainerHostPage}
        name="newContainerHost"
      />
      <Route
        path="/container-hosts/{id}/edit"
        page={EditContainerHostPage}
        name="editContainerHost"
      />
      <Route
        path="/container-hosts/{id}"
        page={ContainerHostPage}
        name="containerHost"
      />
      <Route
        path="/container-hosts"
        page={ContainerHostsPage}
        name="containerHosts"
      />
      <Route
        path="/container-types/new"
        page={NewContainerTypePage}
        name="newContainerType"
      />
      <Route
        path="/container-types/{id}/edit"
        page={EditContainerTypePage}
        name="editContainerType"
      />
      <Route
        path="/container-types/{id}"
        page={ContainerTypePage}
        name="containerType"
      />
      <Route
        path="/container-types"
        page={ContainerTypesPage}
        name="containerTypes"
      />
      <Route path="/ho-so" page={CampPostSubmitPage} name="campPostSubmit" />
      <Route
        path="/draft-profiles/new"
        page={NewDraftProfilePage}
        name="newDraftProfile"
      />
      <Route
        path="/draft-profiles/{id}/edit"
        page={EditDraftProfilePage}
        name="editDraftProfile"
      />
      <Route
        path="/draft-profiles/{id}"
        page={DraftProfilePage}
        name="draftProfile"
      />
      <Route
        path="/draft-profiles"
        page={DraftProfilesPage}
        name="draftProfiles"
      />
      <Route path="/metas/new" page={NewMetaPage} name="newMeta" />
      <Route path="/metas/{id}/edit" page={EditMetaPage} name="editMeta" />
      <Route path="/metas/{id}" page={MetaPage} name="meta" />
      <Route path="/metas" page={MetasPage} name="metas" />
      <Route path="/" page={CampFormPage} name="campForm" />
      <Route path="/home" page={CampFormPage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
