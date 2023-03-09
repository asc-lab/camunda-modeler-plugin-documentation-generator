// @ts-expect-error import
import BpmnModdle from 'bpmn-moddle'
import { type ProcessDefinition } from './domain/process-definition'
import { type ProcessDiagram } from './domain/process-diagram'
import { type BpmnJson } from './domain/bpmn-json'
import { type BpmnFile } from './domain/bpmn-file'

const moddle = new BpmnModdle()

export const buildJsonFromBpmnXml = async (bpmnFile: BpmnFile): Promise<ProcessDiagram[]> => {
  const bpmnJson: BpmnJson = await moddle.fromXML(bpmnFile.bpmnXml)
  return getAllProcessDefinitions(bpmnJson.rootElement)
}

function getAllProcessDefinitions (processDefinition: ProcessDefinition): ProcessDiagram[] {
  return processDefinition.rootElements.filter((rootElement) => rootElement.$type === 'bpmn:Process')
}
