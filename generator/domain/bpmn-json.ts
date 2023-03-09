import { type ProcessDefinition } from './process-definition'

export interface BpmnJson {
  readonly rootElement: ProcessDefinition
}
