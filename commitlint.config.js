export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'build',
          'ci',
          'perf',
          'feat',
          'fix',
          'refactor',
          'docs',
          'chore',
          'style',
          'revert',
          'test'
        ]
      ],
      'subject-min-length': [2, 'always', 4]
    }
  }
  