const imageInline = require('esbuild-plugin-inline-image')
const postCssPlugin = require('esbuild-style-plugin')
const postCssColorFunctionalNotation = require('postcss-color-functional-notation')
const postCssInset = require('postcss-inset')
const { sassPlugin } = require('esbuild-sass-plugin')
const envFilePlugin = require('esbuild-envfile-plugin')

/** @type { import('@synaptic-simulations/mach').MachConfig } */
module.exports = {
  packageName: 'e-170',
  packageDir: 'PackageSources',
  plugins: [
    envFilePlugin,
    imageInline({ limit: -1 }),
    postCssPlugin({
      extract: true,
      postcss: {
        plugins: [postCssColorFunctionalNotation(), postCssInset()]
      }
    }),
    sassPlugin()
  ],
  instruments: [
    reactInstrument('PrimaryFlightDisplay', undefined, false),
    reactInstrument('RadioSelector', undefined, false),
    reactInstrument('Clock', undefined, false),
    reactInstrument('IntegratedElectronicStandby', undefined, false),
    reactInstrument('EngineIndicatingAndCrewAlertingSystem', undefined, true),
    reactInstrument('MultifunctionControlDisplay', undefined, false),
    reactInstrument('MultifunctionDisplay', undefined, true),
    reactInstrument('ElectronicFlightBag', undefined, true),
    reactInstrument('DU-1310-2-PFD', undefined, true),
    reactInstrument('DU-1310-2-MFD', undefined, true),
    reactInstrument('Systems', undefined)
  ]
}

function reactInstrument(name, additionalImports, isInteractive) {
  return {
    name,
    index: `instruments/src/${name}/index.tsx`,
    simulatorPackage: {
      type: 'react',
      isInteractive: isInteractive ?? false,
      fileName: name.toLowerCase(),
      imports: ['/JS/dataStorage.js', ...(additionalImports ?? [])]
    }
  }
}

function reactSystem(name, additionalImports) {
  return {
    name,
    index: `Systems/src/${name}/index.tsx`,
    simulatorPackage: {
      type: 'react',
      isInteractive: false,
      fileName: name.toLowerCase(),
      imports: ['/JS/dataStorage.js', ...(additionalImports ?? [])]
    }
  }
}
