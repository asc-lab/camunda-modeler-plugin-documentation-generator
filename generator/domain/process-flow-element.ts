import { type DocumentationElement } from './documentation-element'
import { type ExtensionElement } from './extension-element'

export interface ProcessFlowElement {
  readonly id: string
  readonly $type: string
  readonly name: string
  readonly documentation: DocumentationElement[]
  readonly extensionElements: ExtensionElement

}
