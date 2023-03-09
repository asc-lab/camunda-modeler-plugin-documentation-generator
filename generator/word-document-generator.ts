import { type ProcessElement } from './domain/process-elements'
import { type ProcessDiagram } from './domain/process-diagram'
import { type ProcessFlowElement } from './domain/process-flow-element'
import { type TemplateData, TemplateHandler } from 'easy-template-x'

function getFlowElementExecutor (flowElement: ProcessFlowElement): string {
  let executor = ''
  if (flowElement.$type === 'bpmn:UserTask' && flowElement.extensionElements !== undefined && flowElement.extensionElements.$type === 'bpmn:ExtensionElements') {
    executor = flowElement.extensionElements.values.filter(extElem => extElem.$type === 'zeebe:assignmentDefinition').map(extElem => extElem.assignee).join(',')
  }

  return executor
}

export async function generateWord (processDiagram: ProcessDiagram, template: Buffer): Promise<Buffer> {
  const processElements: ProcessElement[] = processDiagram.flowElements.filter(flowElement => flowElement?.name !== undefined && flowElement?.name !== '').map((flowElement, index) => ({
    order: index + 1,
    name: flowElement.name,
    description: (flowElement.documentation !== undefined && flowElement.documentation.length > 0) ? flowElement.documentation[0].text : '',
    executor: getFlowElementExecutor(flowElement)
  }))

  // process the template
  const handler = new TemplateHandler()
  const data = {
    processName: (processDiagram.name !== undefined) ? processDiagram.name : '',
    processId: (processDiagram.id !== undefined) ? processDiagram.name : '',
    processIsExecutable: (processDiagram.isExecutable !== undefined) ? processDiagram.isExecutable : '',
    processDocumentation: processDiagram.documentation !== undefined && processDiagram.documentation.length === 1 ? processDiagram.documentation[0].text : '',
    activities: processElements as unknown as TemplateData[]
  }

  const doc = await handler.process(Buffer.from(template), data)

  return doc
}
