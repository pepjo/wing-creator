
import chai from 'chai'
import airfoilFromFileGenerator from '../airfoil-from-file'

const expect = chai.expect

describe('airfoil-from-file', () => {
  const airfoil = {
    name: 'TEST',
    filename: 'testd.dat',
    data: [
      [-1, 0.5],
      [0, 0],
      [3, 3],
    ],
  }

  it('should return a function', () => {
    const interpolator = airfoilFromFileGenerator(airfoil, 'linear')

    expect(interpolator).to.be.a('function')
  })

  describe('returned function should linearly interpolate', () => {
    describe('if we pass the points [-1, 0.5], [0, 0], [3, 3]', () => {
      const interpolator = airfoilFromFileGenerator(airfoil, 'linear')

      it('should return 0.25 for x=-0.5', () => {
        const p = interpolator(-0.5, 'intrados')

        expect(p).to.equal(0.25)
      })
      it('should return 0 for x=0', () => {
        const p = interpolator(0, 'intrados')

        expect(p).to.equal(0)
      })
      it('should return 1 for x=1', () => {
        const p = interpolator(1, 'intrados')

        expect(p).to.equal(1)
      })
    })
  })

  // describe('returned function should cubic spline interpolate', () => {
  //   describe('if we pass the points [-1, 0.5], [0, 0], [3, 3]', () => {
  //     const interpolator = airfoilFromFileGenerator(airfoil, 'spline')
  //
  //     const pr = 10000 // Precission
  //
  //     it('should return 0.15625 for x=-0.5', () => {
  //       const p = interpolator(-0.5, 'intrados')
  //
  //       expect(Math.round(p * pr) / pr).to.equal(Math.round(0.15625 * pr) / pr)
  //     })
  //     it('should return 0 for x=0', () => {
  //       const p = interpolator(0, 'intrados')
  //
  //       expect(p).to.equal(0)
  //     })
  //     it('should return 0.25 for x=1', () => {
  //       const p = interpolator(1, 'intrados')
  //
  //       expect(Math.round(p * pr) / pr).to.equal(Math.round(0.25 * pr) / pr)
  //     })
  //   })
  // })
})
