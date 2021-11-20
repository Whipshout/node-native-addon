const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let isMusl = false
let loadError = null

switch (platform) {
  case 'android':
    if (arch !== 'arm64') {
      throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'index.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./index.node')
      } else {
        nativeBinding = require('undefined-android-arm64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(
          join(__dirname, 'index.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./index.node')
          } else {
            nativeBinding = require('undefined-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(
          join(__dirname, 'index.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./index.node')
          } else {
            nativeBinding = require('undefined-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'index.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./index.node')
          } else {
            nativeBinding = require('undefined-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'index.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./index.node')
          } else {
            nativeBinding = require('undefined-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'index.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./index.node')
          } else {
            nativeBinding = require('undefined-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        isMusl = readFileSync('/usr/bin/ldd', 'utf8').includes('musl')
        if (isMusl) {
          localFileExisted = existsSync(
            join(__dirname, 'index.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./index.node')
            } else {
              nativeBinding = require('undefined-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'index.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./index.node')
            } else {
              nativeBinding = require('undefined-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        isMusl = readFileSync('/usr/bin/ldd', 'utf8').includes('musl')
        if (isMusl) {
          localFileExisted = existsSync(
            join(__dirname, 'index.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./index.node')
            } else {
              nativeBinding = require('undefined-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'index.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./index.node')
            } else {
              nativeBinding = require('undefined-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        localFileExisted = existsSync(
          join(__dirname, 'index.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./index.node')
          } else {
            nativeBinding = require('undefined-linux-arm-gnueabihf')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { uuid } = nativeBinding

module.exports.uuid = uuid