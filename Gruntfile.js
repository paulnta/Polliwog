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

    grunt.initConfig({
        jekyllConfig: grunt.file.readYAML('_config.yml'),
        jekyllConfig_dev: grunt.file.readYAML('_config.dev.yml'),

        // Copying bower dependencies main files
        copy: {

            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist',
                    src: 'jquery.min.js',
                    dest: 'vendor/js/'
                }]
            },

            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/js',
                    src: 'bootstrap.min.js',
                    dest: 'vendor/js/'
                },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css',
                        src: 'bootstrap.min.css',
                        dest: 'vendor/css/'
                    }]
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
                files: [
                    '_drafts/**/*',
                    '_includes/**/*',
                    '_layouts/**/*',
                    '_posts/**/*',
                    '_sass/**/*',
                    'css/**/*',
                    'js/**/*',
                    '_config.yml',
                    '_config.dev.yml',
                    '*.html',
                    '*.md',
                    'app/**/*'
                ],
                tasks: ['exec:jekyll']
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
                    '_includes/head.html': ['app/head.html']
                }
            }
        },

        processhtml:{
            dist:{
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


    grunt.registerTask('html', ['processhtml']);
    grunt.registerTask('template-html', ['template', 'processhtml']);

    grunt.registerTask('build', [
        'copy',
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