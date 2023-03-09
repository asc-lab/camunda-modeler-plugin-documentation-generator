export interface BpmnFile {
  readonly bpmnXml: Buffer
}

export interface File {

  path: string
  contents: Buffer
  lastModified: number
}
