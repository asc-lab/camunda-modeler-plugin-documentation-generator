import { type DocumentationElement } from './documentation-element'
import { type ProcessFlowElement } from './process-flow-element'

export interface ProcessDiagram {
  readonly id: string
  readonly $type: string
  readonly isExecutable: boolean
  readonly name: string
  readonly flowElements: ProcessFlowElement[]
  readonly documentation: DocumentationElement[]

}
