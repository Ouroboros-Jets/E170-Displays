const imageInline = require('esbuild-plugin-inline-image');
const postCssPlugin = require('esbuild-style-plugin');
const tailwind = require('tailwindcss');
const postCssColorFunctionalNotation = require('postcss-color-functional-notation');
const postCssInset = require('postcss-inset');
const { sassPlugin } = require('esbuild-sass-plugin');
const esbuildPluginTsc = require('esbuild-plugin-tsc');
const envFilePlugin = require('esbuild-envfile-plugin');

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
        plugins: [postCssColorFunctionalNotation(), postCssInset()],
      },
    }),
    sassPlugin(),
  ],
  instruments: [
    reactInstrument('PrimaryFlightDisplay'),
    msfsAvionicsInstrument('RadioSelector'),
    msfsAvionicsInstrument('Clock'),
    msfsAvionicsInstrument('IntegratedElectronicStandby'),
    reactInstrument('EngineIndicatingAndCrewAlertingSystem'),
    reactInstrument('MultifunctionControlDisplay'),
    reactInstrument('MultifunctionDisplay'),
    reactInstrument('ElectronicFlightBag'),
    reactInstrument('DU-1310-2-PFD'),
    reactInstrument('DU-1310-2-MFD'),
  ],
};
function msfsAvionicsInstrument(name, folder = name) {
  return {
    name,
    index: `src/instruments/src/${folder}/instrument.tsx`,
    simulatorPackage: {
      type: 'baseInstrument',
      templateId: `E170_${name}`,
      mountElementId: `${name}_CONTENT`,
      fileName: name.toLowerCase(),
      imports: ['/JS/dataStorage.js'],
    },
  };
}

function reactInstrument(name, additionalImports) {
  return {
    name,
    index: `src/instruments/src/${name}/index.tsx`,
    simulatorPackage: {
      type: 'react',
      isInteractive: false,
      fileName: name.toLowerCase(),
      imports: ['/JS/dataStorage.js', ...(additionalImports ?? [])],
    },
  };
}
