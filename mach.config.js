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
    msfsAvionicsInstrument('PFD'),
    msfsAvionicsInstrument('RadioSelector'),
    msfsAvionicsInstrument('Clock'),
    msfsAvionicsInstrument('IES'),
    msfsAvionicsInstrument('EICAS'),
    // reactInstrument('MultifunctionControlDisplay', undefined, false), most likely needs to me in MSFS framework too
    reactInstrument('MultifunctionDisplay', undefined, true), // needs to be converted to avionics framework
    reactInstrument('ElectronicFlightBag', undefined, true) // only react instrument hopefully
    // reactInstrument('DU-1310-2-PFD', undefined, true),
    // reactInstrument('DU-1310-2-MFD', undefined, true),
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

function msfsAvionicsInstrument(name, folder = name) {
  return {
    name,
    index: `instruments/src/${folder}/instrument.tsx`,
    simulatorPackage: {
      type: 'baseInstrument',
      templateId: `E170_${name}`,
      mountElementId: `${name}_CONTENT`,
      fileName: name.toLowerCase(),
      imports: ['/JS/dataStorage.js']
    }
  }
}
