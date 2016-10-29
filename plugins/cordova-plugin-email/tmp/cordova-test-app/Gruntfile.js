'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    app: {
      // configurable paths
      src: require('./bower.json').appPath || 'src',
      gen: require('./bower.json').appPath || 'src-gen',
      dist: 'www'
    },
    watch: {
      compass: {
        files: ['<%= app.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= app.src %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.src %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= app.src %>}/scripts/{,*/}*.js',
          '<%= app.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'bower_components/{,*/}*'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= app.src %>',
            '.'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '<%= app.src %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '{.tmp,<%= app.src %>}/scripts/{,*/}*.js',
            '<%= app.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            'bower_components/{,*/}*'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= app.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.dist %>/*',
            '!<%= app.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= app.src %>/scripts/{,*/}*.js'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= app.src %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= app.src %>/images',
        javascriptsDir: '<%= app.src %>/scripts',
        fontsDir: '<%= app.src %>/styles/fonts',
        importPath: 'bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
   'string-replace': {
        inline: {
            files: {
                'www/': 'styles/**',
            },
            options: {
                replacements: [
                  // place files inline example
                    {
                        pattern: /\?.*?(["|'|\)])/gi,
                     replacement: '$1'
                    }
                 ]
            }
        }
    },
    useminPrepare: {
      html: '<%= app.src %>/index.html',
      options: {
        dest: '<%= app.dist %>'
      }
    },
    usemin: {
      html: ['<%= app.dist %>/{,*/}*.html'],
      css: ['<%= app.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= app.dist %>']
      }
    },
    htmlmin: {
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: '<%= app.src %>',
          src: ['index.html'],
          dest: '<%= app.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.src %>',
          dest: '<%= app.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'config.json',
            'images/{,*/}*.*',
            'styles/fonts/*',
            'scripts/webworker*.js',
            '*.js',
            'views/*.html',
            'templates/*.html'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= app.gen %>',
          dest: '<%= app.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'config.json',
            'images/{,*/}*.*',
            'styles/fonts/*',
            '*.js'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= app.dist %>/images',
          src: [
            'generated/*'
          ]
        }, {
          expand: true,
          cwd: 'bower_components/mobile-angular-ui/dist/fonts',
          dest: '<%= app.dist %>/fonts',
          src: [
            '*',
          ]
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap-sass/vendor/assets/fonts/bootstrap',
          dest: '<%= app.dist %>/fonts',
          src: [
            '*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= app.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'compass',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      server: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= app.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/scripts',
          src: ['*.js', '!webworker*.js'],
          dest: '<%= app.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= app.dist %>/scripts/scripts.js': [
            '<%= app.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    shell: {
      options: {
        failOnError: true,
        stdout: true,
        stderr: true,
        execOptions: {
          maxBuffer: Infinity
        }
      },
      prepareIOS: {
        command: 'cordova platform add ios && cordova build ios'
      },
      prepareAndroid: {
        command: 'source ~/.android-sdk-installer/env && cordova platform add android && cordova build android'
      },
      buildIOS: {
        command: 'cordova build ios'
      },
      buildAndroid: {
        command: 'source ~/.android-sdk-installer/env && cordova build android'
      }
    }
  });

  grunt.registerTask('setup:ios', 'Set up CI for iOS (noop)', function() {
    //
  });

  grunt.registerTask('setup:android', 'Set up CI for Android (noop)', function() {
    var done = this.async();

    var setup = require('child_process').spawn('./etc/setupAndroidSDK.sh');

    setup.stdout.pipe(process.stdout);
    setup.stderr.pipe(process.stderr);

    setup.on('close', function(code) {
      done(code === 0);
    });
  });

  grunt.registerTask('test:ios', ['shell:buildIOS']);
  grunt.registerTask('test:android', ['shell:buildAndroid']);
  grunt.registerTask('ci:ios', ['setup:ios', 'release', 'shell:prepareIOS']);
  grunt.registerTask('ci:android', ['setup:android', 'release', 'shell:prepareAndroid']);
  grunt.registerTask('ios', ['clean', 'release', 'test:ios']);
  grunt.registerTask('android', ['clean', 'release', 'test:android']);

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'usemin',
    'string-replace'
  ]);

  grunt.registerTask('release', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'ngmin',
    'cssmin',
    'uglify',
    'usemin',
    'string-replace'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
