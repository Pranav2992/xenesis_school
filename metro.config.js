const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
};

module.exports = mergeConfig(defaultConfig, config);
// This configuration file sets up Metro to handle SVG files in a React Native project.
// It uses the 'react-native-svg-transformer' to transform SVG files and updates the resolver