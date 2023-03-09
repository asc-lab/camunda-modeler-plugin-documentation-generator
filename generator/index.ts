import { buildJsonFromBpmnXml } from './bpmn-json-generator'
import { generateWord } from './word-document-generator'
import { type ProcessDiagram } from './domain/process-diagram'
import { type BpmnFile } from './domain/bpmn-file'

export const generateWordDocumentationFromBpmn = async (bpmnFile: BpmnFile, template: Buffer): Promise<Buffer> => {
  const processDiagrams: ProcessDiagram[] = await buildJsonFromBpmnXml(bpmnFile)
  const wordDocument = generateWord(processDiagrams[0], template)
  return await wordDocument
}
