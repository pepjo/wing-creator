
import chai from 'chai'
import airfoilFromFileGenerator from '../airfoil-from-file'

const expect = chai.expect

describe('airfoil-from-file', () => {
  const airfoil = {
    name: 'TEST',
    filename: 'testd.dat',
    data: [
      [0, 0],
      [0.3, 0.3],
      [0.4, 0.3],
    ],
  }

  it('should return a function', () => {
    const interpolator = airfoilFromFileGenerator(airfoil, 'linear')

    expect(interpolator).to.be.a('function')
  })

  describe('returned function should linearly interpolate', () => {
    describe('if we pass the points [0, 0], [0.3, 0.3], [0.4, 0.3]', () => {
      const interpolator = airfoilFromFileGenerator(airfoil, 'linear')

      it('should return 0.2 for x=0.2', () => {
        const p = interpolator(0.2, 'intrados')

        expect(p).to.equal(0.2)
      })
      it('should return 0.3 for x=0.3', () => {
        const p = interpolator(0.3, 'intrados')

        expect(p).to.equal(0.3)
      })
      it('should return 0.3 for x=0.35', () => {
        const p = interpolator(0.35, 'intrados')

        expect(p).to.equal(0.3)
      })
    })
  })

  describe('returned function should cubic spline interpolate', () => {
    describe('if we pass the points [0, 0], [0.3, 0.3], [0.4, 0.3]', () => {
      const interpolator = airfoilFromFileGenerator(airfoil, 'spline')

      const pr = 10000 // Precission

      it('should return 0.2 for x=0.2500', () => {
        const p = interpolator(0.2, 'intrados')

        expect(Math.round(p * pr) / pr).to.equal(Math.round(0.2500 * pr) / pr)
      })
      it('should return 0.3 for x=0.3', () => {
        const p = interpolator(0.3, 'intrados')

        expect(p).to.equal(0.3)
      })
      it('should return 0.3 for x=0.30625', () => {
        const p = interpolator(0.35, 'intrados')

        expect(Math.round(p * pr) / pr).to.equal(Math.round(0.30625 * pr) / pr)
      })
    })
  })
})
