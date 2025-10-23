module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  defaultSeverity: 'warning',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['plugin'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
  },
};
