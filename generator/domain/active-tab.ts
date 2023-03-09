import { type File } from './bpmn-file'

export interface ActiveTab {
  readonly file: File
  readonly id: string
  readonly name: string
  readonly title: string
  readonly type: string
}

export interface ActiveTabEvent {
  readonly activeTab: ActiveTab
}
