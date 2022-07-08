import * as ErrorScreen from './suites/ErrorScreen.js'
import * as LoadingIndicator from './suites/LoadingIndicator.js'
import * as SecvisogramPage from './suites/SecvisogramPage.js'
import * as EditWorkflowStateDialog from './suites/SecvisogramPage/EditWorkflowStateDialog.js'
import * as NewDocumentDialog from './suites/SecvisogramPage/NewDocumentDialog.js'

export default [
  SecvisogramPage,
  EditWorkflowStateDialog,
  NewDocumentDialog,
  ErrorScreen,
  LoadingIndicator,
]
