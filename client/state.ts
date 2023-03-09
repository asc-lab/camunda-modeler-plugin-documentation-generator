import { type File } from '../generator/domain/bpmn-file'

export interface State {
  activeTab: { type: string }
  configOpen: boolean
  modalOpen: boolean
  modalDocHelpOpen: boolean
  inputFile: File | undefined
}
