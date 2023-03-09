import { type ExtensionElementValue } from './extension-element-value'

export interface ExtensionElement {
  readonly $type: string
  readonly values: [ExtensionElementValue]
}
