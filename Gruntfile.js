/**
 * Created by JKH6031 on 07/03/2017.
 */
module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var serveStatic = require('serve-static'),
        // Configurable paths
        config = {
            app: 'src',
            dist: 'public'
        };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= config.dist %>*',
                            '!<%= config.dist %>/.git*'
                        ]
                    }
                ]
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                includePaths: [
                    'bower_components'
                ]
            },
            server: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/styles',
                        src: ['*.scss'],
                        dest: '.tmp/styles',
                        ext: '.css'
                    }
                ]
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>//styles',
                    src: ['*.css'],
                    dest: '<%= config.dist%>/styles',
                    ext: '.css'
                }]
            }
        },

        babel: {
            options: {
                sourceMap: false,
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>', // Custom folder
                    src: ['**/*.js'],
                    dest: '<%= config.dist %>', // Custom folder
                    ext: '.js'
                }]
            }
            // dist: {
            //     files: {
            //         'dist/app.js': 'src/scripts/index.js'
            //     }
            // }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: '**'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>/vendor-scripts',
                        src: ['**'],
                        dest: '<%= config.dist %>/vendor-scripts'
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dist: ['cssmin', 'copy:dist']
        },

        connect: {
            options: {
                port: 9000,
                open: {
                    target: 'http://localhost:9000/index.html'
                },
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            serveStatic(config.dist)
                            // ,
                            // connect().use('/bower_components', serveStatic('./bower_components'))
                        ];
                    }
                }
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,**/}*.js'],
                tasks: ['jshint:all'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: []
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,**/}*.{scss,sass}'],
                tasks: ['sass:local']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/styles/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*',
                    '<%= config.app %>/scripts/{,**/}*.hbs'
                ]
            }
        },

        webpack: {
            dev: {
                // webpack options
                entry: "./<%= config.dist %>/scripts/index.js",
                output: {
                    path: "<%= config.dist %>/scripts/",
                    filename: "pack.js",
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('local', [
        'clean:dist',
        'copy:dist',
        'cssmin:target',
        'babel:jsx',
        'webpack:dev',
        'connect:livereload',
        'watch'
    ]);
};
