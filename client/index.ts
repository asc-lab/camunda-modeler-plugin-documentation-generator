// @ts-expect-error import
import { registerClientExtension } from 'camunda-modeler-plugin-helpers'
import DocumentGeneratorPlugin from './document-generator-plugin'

registerClientExtension(DocumentGeneratorPlugin)
