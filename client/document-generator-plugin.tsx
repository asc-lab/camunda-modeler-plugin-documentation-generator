import * as React from 'react'
// @ts-expect-error import
import { Fill } from 'camunda-modeler-plugin-helpers/components'
// @ts-expect-error import
import WordIcon from '../resources/word-file.svg'
import { type ActiveTab, type ActiveTabEvent } from '../generator/domain/active-tab'
import { createRef, type ReactNode } from 'react'
import { generateWordDocumentationFromBpmn } from '../generator'
import GenerateDocSetupView from './generate-doc-setup-view'
import { type State } from './state'
import { type Props } from './props'
import GenerateDocHelp from './modal/generate-doc-help'
import { type InitialValues } from './dpc-setup-props'
import { type File } from '../generator/domain/bpmn-file'

const defaultState = {
  activeTab: { type: '' },
  configOpen: false,
  modalOpen: false,
  modalDocHelpOpen: false,
  inputFile: undefined
}
const ENCODING_UTF8 = 'utf8'

const LOAD_TEMPLATE_EVENT = 'documentation-generator-plugin:loadTemplate'
const OPEN_HELP_MODAL_EVENT = 'documentation-generator-plugin:openHelpModal'

const FILTER_DOCX = {
  name: 'Word file',
  encoding: ENCODING_UTF8,
  extensions: ['docx']
}

export default class DocumentGeneratorPlugin extends React.PureComponent<Props, State> {
  private readonly _buttonRef: React.RefObject<HTMLButtonElement>
  constructor (props: Props) {
    super(props)
    this.state = defaultState

    this._buttonRef = createRef()
  }

  override componentDidMount (): void {
    const {
      // @ts-expect-error props
      subscribe
    } = this.props

    subscribe(LOAD_TEMPLATE_EVENT, () => {
      this.openModal()
    })

    subscribe(OPEN_HELP_MODAL_EVENT, () => {
      this.openDocHelpModal()
    })

    subscribe('app.activeTabChanged', (event: ActiveTabEvent) => {
      this.setState({ activeTab: event.activeTab })
    })
  }

  handleDocumentGenerationSuccess (exportPath: string): void {
    this.props.displayNotification({
      type: 'success',
      title: 'Document generation succeeded!',
      content: <GenerationSuccess exportPath={exportPath}/>,
      duration: 10000
    })
  }

  handleDocumentGenerationError (error: Error): void {
    this.props.displayNotification({
      type: 'error',
      title: 'Document generation failed',
      content: 'See the log for further details.',
      duration: 10000
    })

    this.props.log({
      category: 'document-generator-error',
      message: error.message
    })
  }

  /**
     * Generates word document for process definition
     *
     * @returns {Promise<object>}
     */
  async generateDocument (templateFile: File): Promise<boolean> {
    try {
      // (0) save tab contents
      const savedTab: ActiveTab = await this.props.triggerAction('save-tab', { tab: this.state.activeTab })

      // (1) ask user were to export the file
      const exportPath: string | undefined = await this.props._getGlobal('dialog').showSaveFileDialog({
        file: savedTab.file,
        title: `Save ${savedTab.name} as ...`,
        filters: [
          FILTER_DOCX
        ]
      })

      if (exportPath == null) {
        return false
      }

      const fileSystem = this.props._getGlobal('fileSystem')
      // 1. read template file
      const { contents } = await fileSystem.readFile(templateFile.path, { encoding: false })

      const doc = await generateWordDocumentationFromBpmn({ bpmnXml: savedTab.file.contents }, contents)

      // 3. save output
      await fileSystem.writeFile(exportPath, { contents: doc })
      this.handleDocumentGenerationSuccess(exportPath)
    } catch (error) {
      console.log(error)
      this.handleDocumentGenerationError(error as Error)
    }
    return true
  }

  openModal (): void {
    this.setState({ modalOpen: true })
  }

  handleConfigClosed (details: InitialValues): void {
    if (!this.state.modalDocHelpOpen) {
      this.setState({ modalOpen: false })
    }

    if (details?.inputFile !== undefined) {
      void this.generateDocument(details?.inputFile)
    }
  }

  openDocHelpModal (): void {
    this.setState({ modalDocHelpOpen: true })
  }

  handleDocHelpModalClosed (): void {
    this.setState({ modalDocHelpOpen: false })
  }

  override render (): ReactNode {
    const initValues = {
      inputFile: this.state.inputFile
    }

    return <React.Fragment>
            {isBPMN(this.state.activeTab) && (
                <Fill slot="tab-actions">
                    <button ref={ this._buttonRef }
                            title="Generate process definition documentation as Word doc" className="btn btn--tab-action"
                            onClick={this.openModal.bind(this)}>
                        <WordIcon/>
                    </button>
                </Fill>
            )}
            { (Boolean(this.state.modalOpen)) && (
                <GenerateDocSetupView
                    anchor={ this._buttonRef.current }
                    onClose={ this.handleConfigClosed.bind(this) }
                    onDocHelp={ this.openDocHelpModal.bind(this) }
                    initValues={ initValues }
                />

            )}
            { (Boolean(this.state.modalDocHelpOpen)) && (
                <GenerateDocHelp onClose={ this.handleDocHelpModalClosed.bind(this) }></GenerateDocHelp>
            )}
        </React.Fragment>
  }
}

// Helpers
const GenerationSuccess = (props: { exportPath: string }): JSX.Element => {
  return <div>
        <p>{'Word documentation was generated.'}</p>
        <p>{'Find your generated Word file at "' + props.exportPath + '".'}</p>
    </div>
}

const isBPMN = (tab: { type: string }): boolean => {
  return tab.type === 'cloud-bpmn'
}
