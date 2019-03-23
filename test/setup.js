require('jsdom-global')()
global.expect = require('expect')
global.performance = window.performance
window.Date = Date;