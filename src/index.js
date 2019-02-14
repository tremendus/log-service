const levels = [
  'log',
  'debug',
  'info',
  'warn',
  'error'
]

const Log = function (options = {}) {
  this.silent = options.silent || false
  this.label = options.label || false
  this.console = true
  this.remote = true
  this.nodeEnv = process.env.NODE_ENV || 'production'
  this.minLevel = options.minLevel || (this.nodeEnv === 'production' ? 'warn' : 'log')
  const levelIndex = levels.findIndex((l) => l === this.minLevel)
  this.minLevelIndex = levelIndex === undefined ? 3 : levelIndex

  levels
    .forEach((level) => {
      this[level] = function () {
        this.output(level, arguments)
      }.bind(this)
    })
}

Log.prototype.output = function (level, args) {
  if (this.label) {
    args = (arguments.length === 1 ? [args[0]] : Array.apply(null, args))
    args.unshift('[' + this.label + ']')
  }

  const minLevel = levels.findIndex((l) => l === level)

  const conditions = [
    !this.silent,
    minLevel >= this.minLevelIndex,
    this.console,
    console
  ]

  if (conditions.every((v) => v)) {
    var fn = console[level]
    fn.apply(console, args)
  }
}

module.exports = Log
