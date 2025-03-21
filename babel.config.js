const ReactCompilerConfig = {};

export default {
  plugins: [
    ['babel-plugin-react-compiler', ReactCompilerConfig],
  ],
  presets: [
    ['@babel/preset-typescript', { runtime: 'automatic' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
}