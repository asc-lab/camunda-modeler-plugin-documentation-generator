export interface ProcessElement {
  readonly order: number
  readonly name: string
  readonly description: string
  readonly executor?: string
}
