/** Configuração do Jest para o projeto. */
module.exports = {
  // Configuração pronta para projetos Expo / React Native.
  preset: 'jest-expo',
  // O Jest não conhece o alias "@/" do tsconfig; isto ensina-o a resolvê-lo.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};