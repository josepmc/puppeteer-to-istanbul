/* globals describe, it, beforeEach, after */

const OutputFiles = require('../lib/output-files')
const rimraf = require('rimraf')

require('chai').should()

describe('puppeteer-to-v8', () => {
  describe('filename generation', () => {
    beforeEach(cleanupCoverage)

    // we can use path.basename(path[, ext]).
    it('exposes a handler that appropriately handles colliding names', () => {
      const outputFiles = OutputFiles(require('./fixtures/block-else-not-covered.json'))

      // Since block-else-not-covered was generated by the above line, this
      // should make a new file with -1 appended to the name
      var newPath = outputFiles.rewritePath('./sample_js/block-else-not-covered-1.js')
      newPath.should.eql('./coverage/js/block-else-not-covered-1.js')
    })

    it('handle multiple files with same name, and replace in json', () => {
      // Input from the fixture should be JSONified already
      const fixture = require('./fixtures/function-coverage-full-duplicate.json')
      const outputFiles = OutputFiles(fixture).output()

      outputFiles[0].url.should.eql(fixture[0].url)
      outputFiles[1].url.should.eql(fixture[0].url.replace('.js', '-1.js'))
    })

    // call it something like indexHTML-inline-1.js
    it('appropriately handles inline JavaScript', () => {
      // TODO: Test inline JS handling
    })

    after(cleanupCoverage)

    function cleanupCoverage () {
      rimraf.sync('./coverage')
    }
  })
})
