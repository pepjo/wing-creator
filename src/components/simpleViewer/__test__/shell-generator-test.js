
import chai from 'chai'
import { distributionFunctions } from '../shell-generator'
import shellGenerator from '../shell-generator'

const expect = chai.expect

describe('shell-generator', () => {
  describe('the shell generator', () => {
    describe('when we pass a planar airfoil (y = 0 for Ax); distribution=equal and imposed points',
    () => {
      const airfoilFunction = () => (0)
      const nPoints = 6
      const distribution = 'equal'
      const imposedPoints = [0.224]

      it('should return a shell with the imposed points', () => {
        const gen = shellGenerator(airfoilFunction, nPoints, distribution, imposedPoints)

        const imposed = gen.vertices.filter((p) => (p.x === imposedPoints[0]))

        expect(imposed[0]).to.have.property('x')
        expect(imposed[1]).to.have.property('x')
      })
    })

    describe('when we pass a planar airfoil (y = 0 for Ax); distribution=sin and imposed points',
    () => {
      const airfoilFunction = () => (0)
      const nPoints = 6
      const distribution = 'sin'
      const imposedPoints = [0.224]

      it('should return a shell with the imposed points', () => {
        const gen = shellGenerator(airfoilFunction, nPoints, distribution, imposedPoints)

        const imposed = gen.vertices.filter((p) => (p.x === imposedPoints[0]))

        expect(imposed[0]).to.have.property('x')
        expect(imposed[1]).to.have.property('x')
      })
    })
  })

  describe('the distribution function', () => {
    describe('equal', () => {
      const equal = distributionFunctions.equal

      it('should return 0.25 for x=0.25', () => {
        const p = equal(0.25)

        expect(p).to.equal(0.25)
      })
      it('should return 0 for x=0', () => {
        const p = equal(0)

        expect(p).to.equal(0)
      })
      it('should return 1 for x=1', () => {
        const p = equal(1)

        expect(p).to.equal(1)
      })
    })

    describe('sin', () => {
      const sin = distributionFunctions.sin
      const pr = 100000 // Precission

      it('should return 0.076120467488713 for x=0.25', () => {
        const p = sin(0.25)

        expect(Math.round(p * pr)).to.equal(Math.round(0.076120467488713 * pr))
      })
      it('should return 0 for x=0', () => {
        const p = sin(0)

        expect(p).to.equal(0)
      })
      it('should return 1 for x=1', () => {
        const p = sin(1)

        expect(p).to.equal(1)
      })
    })
  })
})
