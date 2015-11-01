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
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.initConfig({
        jekyllConfig: grunt.file.readYAML('_config.yml'),
        jekyllConfig_dev: grunt.file.readYAML('_config.dev.yml'),

        copy: {

            app:{
                files: [
                    { expand:true, cwd: 'bower_components/webcomponentsjs/',
                        src: 'webcomponents-lite.min.js',
                        dest: 'app/scripts/vendor/'},
                    { expand:true, cwd: 'app/includes', src: '**/*', dest: '_includes/'},
                    { expand:true, cwd: 'app/elements', src: '**/*', dest: 'elements/'},
                    { expand:true, cwd: 'app/layouts', src: '**/*', dest: '_layouts/'},
                    { expand:true, cwd: 'app/scripts', src: '**/*', dest: 'scripts/'},
                    { expand:true, cwd: 'app/posts', src: '**/*', dest: '_posts/'},
                    { expand:true, cwd: 'app/sass', src: '**/*', dest: '_sass/'},
                    { expand:true, cwd: 'app/css', src: '**/*', dest: 'css/'},
                    { expand:true, cwd: 'app/assets', src: '**/*', dest: 'assets/'},
                    { expand:true, cwd: 'app/', src: '*.html', dest: './'},
                    { expand:true, cwd: 'app/', src: '*.md', dest: './'}
                ]
            }
        },

        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3
                },
                files: {
                    'assets/img.png': 'app/assets/img.png'
                }
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
                    'elements/elements.vulcanized.html': 'app/elements.html'
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
               files:[
                   {src: '_includes/head.html', dest: '_includes/head.html'},
                   {src: '_layouts/default.html', dest: '_layouts/default.html'}
               ]
            }
        },

        processhtml:{
            dist:{
                files:[
                    {src: '_includes/head.html', dest: '_includes/head.html'},
                    {src: '_layouts/default.html', dest: '_layouts/default.html'}
                ]
            },
            dev:{
                files:[
                    {src: '_includes/head.html', dest: '_includes/head.html'},
                    {src: '_layouts/default.html', dest: '_layouts/default.html'}
                ]
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
        'vulcanize:dist',
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
        'copilot',
        'serve'
    ]);

};