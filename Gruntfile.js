/**
 * Created by paulnta on 23.10.15.
 */

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-vulcanize');

    grunt.initConfig({
        jekyllConfig: grunt.file.readYAML('_config.yml'),
        jekyllConfig_dev: grunt.file.readYAML('_config.dev.yml'),

        copy: {

            app:{
                files: [
                    { expand:true, cwd: 'bower_components/webcomponentsjs/',
                        src: 'webcomponents.min.js',
                        dest: 'scripts/vendor/'},
                    { expand:true, cwd: 'app/includes', src: '**/*', dest: '_includes/'},
                    { expand:true, cwd: 'app/elements', src: '**/*', dest: 'elements/'},
                    { expand:true, cwd: 'app/layouts', src: '**/*', dest: '_layouts/'},
                    { expand:true, cwd: 'app/posts', src: '**/*', dest: '_posts/'},
                    { expand:true, cwd: 'app/sass', src: '**/*', dest: '_sass/'},
                    { expand:true, cwd: 'app/css', src: '**/*', dest: 'css/'},
                    { expand:true, cwd: 'app/', src: '*.html', dest: './'},
                ]
            }
        },

        vulcanize: {
            dist: {
                options: {
                    inlineScripts: true,
                    inlineCss: true,
                    stripComments: true
                },
                files: {
                    'elements/elements.vulcanized.html': 'app/elements/elements.html'
                }
            }
        },

        // Build with jekyll cmd
        exec:{
            jekyll:{
                cmd: function () {
                    console.log('executing jekyll cmd');
                    return "jekyll build --config _config.dev.yml --trace";
                }
            }
        },

        // When an file is modified, build with jekyll
        watch:{
            options:{
                livereload: true
            },
            source:{
                files: ['app/**/*'],
                tasks: ['build']
            }
        },

        template:{
            options:{
                data: {
                    baseurl : grunt.file.readYAML('_config.yml').baseurl
                }
            },
           html:{
                files:{
                    '_includes/head.html': ['app/includes/head.html']
                }
            }
        },

        processhtml:{
            dist:{
                files:{
                    '_includes/head.html': ['_includes/head.html']
                }
            },
            dev:{
                files:{
                    '_includes/head.html': ['_includes/head.html']
                }
            }
        },

        connect:{
            server:{
                options:{
                    port: 4000,
                    base: '_site',
                    livereload: true
                }
            }
        }

    });

    grunt.registerTask('build', [
        'copy',
        'template',
        'processhtml:dev',
        'exec:jekyll'
    ]);

    grunt.registerTask('build-dist', [
        'copy',
        'template',
        'processhtml:dist',
        'vulcanize:dist',
        'exec:jekyll'
    ]);

    grunt.registerTask('serve', [
        'build',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);

};