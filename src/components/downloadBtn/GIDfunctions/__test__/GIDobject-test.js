
import chai from 'chai'
import GIDobject from '../GIDobject'
import * as data from './GIDobject.data'

const expect = chai.expect

describe('GIDobject', () => {
  describe('when we construct it with 1 object & problemType=undefined', () => {
    const GITobj = new GIDobject([data.objectData[0]])

    it('should have problemType=NONE', () => {
      expect(GITobj.problemType).to.equal('NONE')
    })

    it('should have an object with 1 object attatch', () => {
      expect(GITobj.objects).to.have.lengthOf(1)
    })

    describe('and when we call generateVertices', () => {
      const text = GITobj.generateVertices()

      it('should generate the vertices correctly', () => {
        expect(text).to.equal(data.verticesText)
      })
    })

    describe('and when we call generateSegments', () => {
      const text = GITobj.generateSegments()

      it('should generate the segments correctly', () => {
        expect(text).to.equal(data.segmentsText)
      })
    })

    describe('and when we call generateFaces', () => {
      const text = GITobj.generateFaces()

      it('should generate the faces correctly', () => {
        expect(text).to.equal(data.facesText)
      })
    })

    describe('and when we call generateString', () => {
      const text = GITobj.generateString()

      it('should generate the file correctly', () => {
        expect(text).to.equal(
          data.noneheader +
          data.verticesText +
          data.segmentsText +
          data.facesText +
          data.footer
        )
      })
    })
  })


  describe('when we construct it with 1 object & problemType=KRATOS_structural', () => {
    const GITobj = new GIDobject([data.objectData[0]], 'KRATOS_structural')

    it('should have problemType=KRATOS_structural', () => {
      expect(GITobj.problemType).to.equal('KRATOS_structural')
    })

    it('should have an object with 1 object attatch', () => {
      expect(GITobj.objects).to.have.lengthOf(1)
    })

    describe('and when we call generateString', () => {
      const text = GITobj.generateString()

      it('should generate the file correctly', () => {
        expect(text).to.equal(
          data.KRATOSstructuralheader +
          data.verticesText +
          data.segmentsText +
          data.facesText +
          data.footer
        )
      })
    })

    describe('and when we call generateKratosPrjFile', () => {
      const text = GITobj.generateKratosPrjFile()

      it('should generate the file correctly', () => {
        expect(text).to.equal(data.groupsfile)
      })
    })
  })
})
