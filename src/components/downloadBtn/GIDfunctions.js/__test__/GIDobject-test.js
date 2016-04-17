
import chai from 'chai'
import GIDobject from '../GIDobject'
import * as data from './GIDobject.data'

const expect = chai.expect

describe('GIDobject', () => {
  describe('when we construct it with 1 object', () => {
    const GITobj = new GIDobject([data.objectData[0]])

    it('return an object with 1 object attatch', () => {
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

    describe('and when we call generateString', () => {
      const text = GITobj.generateString()

      it('should generate the file correctly', () => {
        expect(text).to.equal(
          data.header +
          data.verticesText +
          data.segmentsText +
          data.footer
        )
      })
    })
  })
})
