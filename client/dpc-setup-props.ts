import { type File } from '../generator/domain/bpmn-file'

export interface InitialValues {
  inputFile: File | undefined
}
export interface DocSetupProps {
  anchor: HTMLButtonElement | null
  initValues: InitialValues
  onClose: (details?: any) => void
  onDocHelp: () => void
}
