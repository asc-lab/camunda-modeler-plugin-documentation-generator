import * as React from 'react'
// @ts-expect-error import
import { Modal } from 'camunda-modeler-plugin-helpers/components'
import {
  DOC_HELP_ACTIVITY_ASSIGNEE_LABEL, DOC_HELP_ACTIVITY_ASSIGNEE_PLACEHOLDER,
  DOC_HELP_ACTIVITY_DESCRIPTION_LABEL, DOC_HELP_ACTIVITY_DESCRIPTION_PLACEHOLDER,
  DOC_HELP_ACTIVITY_NAME_LABEL, DOC_HELP_ACTIVITY_NAME_PLACEHOLDER, DOC_HELP_ACTIVITY_ORDER_LABEL, DOC_HELP_ACTIVITY_ORDER_PLACEHOLDER, DOC_HELP_PROCESS_ID_LABEL, DOC_HELP_PROCESS_ID_PLACEHOLDER,
  DOC_HELP_PROCESS_IS_EXECUTABLE_LABEL, DOC_HELP_PROCESS_IS_EXECUTABLE_PLACEHOLDER,
  DOC_HELP_PROCESS_NAME_LABEL,
  DOC_HELP_PROCESS_NAME_PLACEHOLDER,
  MODAL_TITLE
} from '../constants'

export default function GenerateDocHelp (props: any): JSX.Element {
  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    onClose
  } = props

  return <Modal className="todo" onClose={ onClose }>

            <Modal.Title>{MODAL_TITLE}</Modal.Title>

            <Modal.Body>
                <p>
                    The following special template placeholders can be used in documentation template.
                </p>
                <h3>Process placeholders</h3>
                <table>
                    <tbody className="keyboard-shortcuts">
                        <tr key="key">
                            <td><b>{DOC_HELP_PROCESS_NAME_LABEL}</b></td>
                            <td className="binding">{DOC_HELP_PROCESS_NAME_PLACEHOLDER}</td>
                        </tr>
                        <tr key="key">
                            <td><b>{DOC_HELP_PROCESS_ID_LABEL}</b></td>
                            <td className="binding">{DOC_HELP_PROCESS_ID_PLACEHOLDER}</td>
                        </tr>
                        <tr key="key">
                            <td><b>{DOC_HELP_PROCESS_IS_EXECUTABLE_LABEL}</b></td>
                            <td className="binding">{DOC_HELP_PROCESS_IS_EXECUTABLE_PLACEHOLDER}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Activities placeholders</h3>
                <p>Activities elements collection is available under <i>activities</i> placeholder. Each item contains the following properties</p>

                <table>
                    <tbody className="keyboard-shortcuts">
                    <tr key="key">
                        <td><b>{DOC_HELP_ACTIVITY_NAME_LABEL}</b></td>
                        <td className="binding">{DOC_HELP_ACTIVITY_NAME_PLACEHOLDER}</td>
                    </tr>
                    <tr key="key">
                        <td><b>{DOC_HELP_ACTIVITY_ORDER_LABEL}</b></td>
                        <td className="binding">{DOC_HELP_ACTIVITY_ORDER_PLACEHOLDER}</td>
                    </tr>
                    <tr key="key">
                        <td><b>{DOC_HELP_ACTIVITY_DESCRIPTION_LABEL}</b></td>
                        <td className="binding">{DOC_HELP_ACTIVITY_DESCRIPTION_PLACEHOLDER}</td>
                    </tr>
                    <tr key="key">
                        <td><b>{DOC_HELP_ACTIVITY_ASSIGNEE_LABEL}</b></td>
                        <td className="binding">{DOC_HELP_ACTIVITY_ASSIGNEE_PLACEHOLDER}</td>
                    </tr>
                    </tbody>
                </table>

            </Modal.Body>

            <Modal.Footer>
                <div className="buttonDiv">
                    <button className="btn btn-primary" onClick={ onClose }>Close</button>
                </div>
            </Modal.Footer>
        </Modal>
}
