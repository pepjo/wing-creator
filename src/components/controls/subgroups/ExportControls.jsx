
import React from 'react'

// Components
import DropFile from 'react-dropzone'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// Styles
import * as style from '../Controls.style'

// Shapes
import exportSettingsShape from '../../../shapes/exportSettings'

const propTypes = {
  exportSettings: exportSettingsShape,
  handleProblemTypeChange: React.PropTypes.func,
  handleExportDifferentVerticesChange: React.PropTypes.func,
  handleExportExternalMeshChange: React.PropTypes.func,
  handleExportInternalMeshChange: React.PropTypes.func,
  handleExportFluidBoxMeshChange: React.PropTypes.func,
  handleFluidFileDrop: React.PropTypes.func.isRequired,
  handleMeshFileDrop: React.PropTypes.func.isRequired,
}

class WingParametersControls extends React.Component {
  constructor (props) {
    super(props)

    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleFluidFileDrop = this.handleFluidFileDrop.bind(this)
    this.handleMeshFileDrop = this.handleMeshFileDrop.bind(this)
    this.choseMesh = this.choseMesh.bind(this)
    this.selectMeshFile = this.selectMeshFile.bind(this)
    this.selectMesh = this.selectMesh.bind(this)
    this.handleSaveMesh = this.handleSaveMesh.bind(this)
    this.saveMesh = this.saveMesh.bind(this)

    this.state = {
      open: false,
      files: null,
      meshes: null,
      selectedFile: null,
      selectedMesh: null,
      currentState: '',
    }
  }

  choseMesh (files) {
    this.setState({
      open: true,
      files,
      meshes: files.filter(file => file.extension === 'msh').map(file =>
        Object.assign(file, {
          meshes: file.data.split('\n').filter(line => line.substr(0, 4) === 'MESH'),
        })
      ),
      selectedFile: null,
      selectedMesh: null,
      currentState: '',
    })
  }

  selectMeshFile (e, val) {
    this.setState({
      selectedFile: val,
    })
  }

  selectMesh (e, val) {
    this.setState({
      selectedMesh: val,
    })
  }

  handleSaveMesh () {
    this.setState({
      currentState: 'Reading and parsing data...',
    })
    this.forceUpdate()

    setTimeout(() => { this.saveMesh() }, 30)
  }

  saveMesh () {
    if (this.state.selectedFile !== null && this.state.selectedMesh !== null) {
      /*
       * Parse .msh
      */
      const file = this.state.meshes[this.state.selectedFile]
      const lines = file.data.split('\n')
      const n = lines.length
      const coords = []
      const elements = []

      let currentMesh = -1
      let i = 0 // lines.findIndex(line => line === file.meshes[this.state.selectedMesh]) + 2

      while (i < n) {
        if (lines[i].substr(0, 1) === ' ') {
          // Element
          const element = lines[i].trim().split(' ')
          element.shift()
          elements[currentMesh] = elements[currentMesh] || []
          elements[currentMesh].push(element.map((point) => (parseInt(point, 10))))
        } else if (!isNaN(parseInt(lines[i].substr(0, 1), 10))) {
          // Coord
          const coord = lines[i].trim().split(' ')
          coord.shift()
          coords[parseInt(lines[i], 10)] = coord.map((point) => (parseFloat(point, 10)))
        } else if (lines[i].substr(0, 4) === 'MESH') {
          // New mesh
          currentMesh++
        }
        i++
      }

      const resPoints = []

      for (const element of elements[this.state.selectedMesh]) {
        for (const point of element) {
          const found = resPoints.find((p) => (p === point))
          if (typeof found === 'undefined') {
            resPoints.push(point)
          }
        }
      }

      const result = resPoints.map((point) => ({
        p: point, coord: coords[point],
      }))

      /*
       * Parse .res
      */
      let resFileName = file.fileName.split('.')
      resFileName.pop()
      resFileName = `${resFileName.join('.')}.res`
      const resFile = this.state.files.find((fil) => (
        resFileName === fil.fileName
      )).data.split('\n')

      let inPressure = false
      let resdata = []

      for (const resline of resFile) {
        if (inPressure && !isNaN(parseInt(resline, 10))) {
          // Point
          const p = resline.trim().split(' ').filter((val) => (val !== ''))

          const found = resPoints.find((point) => (point == p[0])) // eslint-disable-line

          if (typeof found !== 'undefined') {
            resdata.push(p)
          }
        } else if (resline.substr(0, 25) === 'ComponentNames "PRESSURE"') {
          // Start pressure
          resdata = []
          inPressure = true
        } else if (resline.substr(0, 10) === 'End values') {
          // Finish pressure
          inPressure = false
        }
      }

      this.setState({
        currentState: '',
      })

      const finalData = resdata.map((values) => {
        const p = parseInt(values[0], 10)
        return {
          point: p,
          pressure: parseFloat(values[1], 10),
          coord: result.find((point) => (point.p === p)).coord,
        }
      })

      this.props.handleFluidFileDrop(finalData)
      this.handleCloseDialog()
    } else {
      alert('No surface mesh selected')
    }
  }

  handleFluidFileDrop (listFile, e) {
    const directory = e.dataTransfer.items[0].webkitGetAsEntry()
    if (directory.isDirectory && directory.name.split('.').pop() === 'gid') {
      const dReader = directory.createReader()
      let allFiles = []
      const parsedFiles = []

      const readFiles = () => {
        const finish = () => {
          if (allFiles.length === parsedFiles.length) {
            this.choseMesh(parsedFiles)
          }
        }

        const parseFile = (file) => {
          const fReader = new FileReader()

          fReader.onload = (ev) => {
            parsedFiles.push({
              isError: false,
              data: ev.target.result,
              fileName: file.name,
              extension: file.name.split('.').pop(),
            })
            finish()
          }

          fReader.readAsText(file)
        }

        const parseErrorFile = () => {
          parsedFiles.push({
            isError: true,
          })
          finish()
        }

        allFiles = allFiles.filter((file) => {
          if (file.isFile) {
            file.file(parseFile, parseErrorFile)
          }
          return file.isFile
        })
      }

      const cb = (files) => {
        if (files.length !== 0) {
          allFiles = allFiles.concat(files)
          dReader.readEntries(cb)
        } else {
          readFiles()
        }
      }

      dReader.readEntries(cb)
    } else {
      this.props.handleFluidFileDrop(false)
    }
  }

  handleMeshFileDrop (listFile, e) {
    const directory = e.dataTransfer.items[0].webkitGetAsEntry()
    if (directory.isDirectory && directory.name.split('.').pop() === 'gid') {
      const dReader = directory.createReader()
      let allFiles = []
      const parsedFiles = []

      const readFiles = () => {
        const finish = () => {
          if (allFiles.length === parsedFiles.length) {
            let name = directory.name.split('.')
            name.pop()
            name = name.join('.')

            const msh = parsedFiles.find((file) => (
              file.fileName === `${name}.msh`
            ))
            const prj = parsedFiles.find((file) => (
              file.fileName === `${name}.prj`
            ))

            this.props.handleMeshFileDrop(msh, prj)
          }
        }

        const parseFile = (file) => {
          const fReader = new FileReader()

          fReader.onload = (ev) => {
            parsedFiles.push({
              isError: false,
              data: ev.target.result,
              fileName: file.name,
              extension: file.name.split('.').pop(),
            })
            finish()
          }

          fReader.readAsText(file)
        }

        const parseErrorFile = () => {
          parsedFiles.push({
            isError: true,
          })
          finish()
        }

        allFiles = allFiles.filter((file) => {
          if (file.isFile) {
            file.file(parseFile, parseErrorFile)
          }
          return file.isFile
        })
      }

      const cb = (files) => {
        if (files.length !== 0) {
          allFiles = allFiles.concat(files)
          dReader.readEntries(cb)
        } else {
          readFiles()
        }
      }

      dReader.readEntries(cb)
    } else {
      this.props.handleMeshFileDrop(false)
    }
  }

  handleCloseDialog () {
    this.setState({ open: false })
  }

  render () {
    const {
      exportSettings,
      handleProblemTypeChange,
      handleExportDifferentVerticesChange,
      handleExportExternalMeshChange,
      handleExportInternalMeshChange,
      handleExportFluidBoxMeshChange,
    } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.handleSaveMesh}
      />,
    ]

    return (
      <div>
        <SelectField
          style={style.field}
          value={exportSettings.problemType} onChange={handleProblemTypeChange}
          floatingLabelText="GID project problem type"
        >
          <MenuItem
            value="KRATOS_structural"
            primaryText="KRATOS structural"
          />
          <MenuItem
            value="KRATOS_fluid"
            primaryText="KRATOS fluid"
          />
          <MenuItem
            value="NONE"
            primaryText="No problem type defined"
          />
        </SelectField>
        <DropFile
          onDrop={this.handleFluidFileDrop} dropEffect="copy"
          style={{
            width: 365, margin: '10px 0', padding: 5, border: '1px dashed #999',
            textAlign: 'center',
          }}
          activeStyle={{
            border: '1px dashed #333', backgroundColor: '#ddd',
          }}
        >
          {(() => {
            if (exportSettings.fluidSimulation) {
              return (
                <span>File correctly uploaded (drag to replace)</span>
              )
            } else if (exportSettings.fluidSimulation === false) {
              return (
                <span>That was not a directory or your browser is not supported</span>
              )
            }
            return (
              <span>
                Drag here the .gid folder after the fluid simulation (only works on Chrome)
              </span>
            )
          })()}
        </DropFile>
        <DropFile
          onDrop={this.handleMeshFileDrop} dropEffect="copy"
          style={{
            width: 365, margin: '10px 0', padding: 5, border: '1px dashed #999',
            textAlign: 'center',
          }}
          activeStyle={{
            border: '1px dashed #333', backgroundColor: '#ddd',
          }}
        >
          {(() => {
            if (exportSettings.meshFile) {
              return (
                <span>File correctly uploaded (drag to replace)</span>
              )
            } else if (exportSettings.meshFile === false) {
              return (
                <span>That was not a directory or your browser is not supported</span>
              )
            }
            return (
              <span>
                Drag here the .gid folder after the mesh generation (only works on Chrome)
              </span>
            )
          })()}
        </DropFile>
        <Dialog
          title="Import fluid results"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleCloseDialog}
        >
          Select the mesh that corresponds to the surface of the wing
          <SelectField
            style={style.field}
            value={this.state.selectedFile} onChange={this.selectMeshFile}
            floatingLabelText="Surface mesh file"
          >
            {(this.state.meshes || []).map((file, i) => (
              <MenuItem
                value={i} key={i}
                primaryText={file.fileName}
              />
            ))}
          </SelectField>
          {(() => {
            if (this.state.selectedFile !== null) {
              return (
                <SelectField
                  style={style.field}
                  value={this.state.selectedMesh} onChange={this.selectMesh}
                  floatingLabelText="Surface mesh"
                >
                  {(this.state.meshes[this.state.selectedFile].meshes || []).map((mesh, i) => (
                    <MenuItem
                      value={i} key={i}
                      primaryText={mesh}
                    />
                  ))}
                </SelectField>
              )
            }
            return false
          })()}
          {this.state.currentState}
        </Dialog>
        <Toggle
          toggled={exportSettings.differentVertices}
          onToggle={handleExportDifferentVerticesChange}
          label="Export separate vertices"
        />
        <Toggle
          toggled={exportSettings.externalMesh}
          onToggle={handleExportExternalMeshChange}
          label="Export external mesh"
        />
        <Toggle
          toggled={exportSettings.internalMesh}
          onToggle={handleExportInternalMeshChange}
          label="Export internal mesh"
        />
        <Toggle
          toggled={exportSettings.fluidBoxMesh}
          onToggle={handleExportFluidBoxMeshChange}
          label="Export fluid box"
        />
      </div>
    )
  }
}

WingParametersControls.propTypes = propTypes

export default WingParametersControls
