import * as React from 'react'
// @ts-expect-error import
import { Overlay, Section } from 'camunda-modeler-plugin-helpers/components'
import { useState } from 'react'
import { BUTTON_SELECT_TEMPLATE, SECTION_HEADER_IMPORT_TEMPLATE } from './constants'
import { type DocSetupProps } from './dpc-setup-props'
import { type File } from '../generator/domain/bpmn-file'

const OVERLAY_OFFSET = { top: 0, right: 0 }
export default function GenerateDocSetupView (props: DocSetupProps): Overlay {
  const [inputFile, setInputFile] = useState(props.initValues.inputFile)
  const [chosenFileText, setChosenFileText] = useState('No file selected.')

  const handleInputFileClick = (): void => {
    const realInput = document.getElementById('inputFile')
    if (realInput !== null) {
      realInput.click()
    }
  }

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target !== null ? (event.target.files as FileList)[0] : null

    if (file == null) {
      return
    }

    setInputFile(file as unknown as File)
    setChosenFileText(file.name)
  }

  const handleSubmit = (): void => { props.onClose({ inputFile }) }

  return <Overlay offset={ OVERLAY_OFFSET } anchor={ props.anchor } onClose={ props.onClose }>
        <Section width="400px">
            <Section.Header>
                { SECTION_HEADER_IMPORT_TEMPLATE } <span onClick={ props.onDocHelp }> ?</span>
            </Section.Header>
            <Section.Body>
                <form id="select-file" className="import-form">
                    <fieldset>
                        <div className="fields">
                            <div className="form-group">
                                <div className="file-input">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={ handleInputFileClick }>{ BUTTON_SELECT_TEMPLATE }</button>

                                </div>

                                <input
                                    type="file"
                                    id="inputFile"
                                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    className="form-control"
                                    name="inputFile"
                                    onChange={ handleInputFileChange }
                                />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </Section.Body>
        </Section>

        { chosenFileText !== 'No file selected.'
          ? (
            <React.Fragment>
                <Section maxHeight="400px">
                    <Section.Body>
                        <form id="import-form" className="import-form" onSubmit={ handleSubmit }>
                            {
                                    <Section key="document">

                                        <Section.Header>
                                            Template configuration
                                        </Section.Header>

                                        <Section.Body>
                                            <fieldset>
                                                <div className="fields">

                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <p>{chosenFileText}</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </Section.Body>
                                    </Section>

                            }
                        </form>
                    </Section.Body>
                </Section>
                <Section>
                    <Section.Body>
                        <Section.Actions>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                form="import-form">Generater doc</button>
                        </Section.Actions>
                    </Section.Body>
                </Section>
            </React.Fragment>
            )
          : null }
    </Overlay>
}
