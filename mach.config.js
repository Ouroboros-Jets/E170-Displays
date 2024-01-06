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
    reactInstrument('PrimaryFlightDisplay'),
    reactInstrument('RadioSelector'),
    reactInstrument('Clock'),
    reactInstrument('IntegratedElectronicStandby'),
    reactInstrument('EngineIndicatingAndCrewAlertingSystem'),
    reactInstrument('MultifunctionControlDisplay'),
    reactInstrument('MultifunctionDisplay'),
    reactInstrument('ElectronicFlightBag'),
    reactInstrument('DU-1310-2-PFD'),
    reactInstrument('DU-1310-2-MFD')
  ]
}

const reactInstrument = (name, additionalImports) => {
  return {
    name,
    index: `src/instruments/src/${name}/index.tsx`,
    simulatorPackage: {
      type: 'react',
      isInteractive: false,
      fileName: name.toLowerCase(),
      imports: ['/JS/dataStorage.js', ...(additionalImports ?? [])]
    }
  }
}
