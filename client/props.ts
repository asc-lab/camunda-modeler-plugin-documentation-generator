
export interface Props {
  _getGlobal: (key: string) => any
  displayNotification: (options: {
    type: string
    title: string
    content: any
    duration: number
  }) => void

  log: (options: {
    category: string
    message: string
  }) => void
  triggerAction: (name: string,
    activeTab: any) => Promise<any>
}
