import { type ProcessDiagram } from './process-diagram'

export interface ProcessDefinition {
  readonly exporter: string
  readonly exporterVersion: string
  readonly id: string
  readonly rootElements: ProcessDiagram[]
}
