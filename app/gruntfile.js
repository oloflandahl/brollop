module.exports = function(grunt) {

  var basePath = 'assets/js/';

  grunt.initConfig({
    uglify: {
      my_target: {
        options: {
          sourceMap: true
        },
        files: {
          'assets/js/min/app.min.js': [basePath+'*.js']
        }
      }
    },
    // Append a timestamp to 'all.min.js' & 'core.min.js' which are both located in 'index.html' 
    cachebreaker: {
        dev: {
            options: {
                match: [basePath+'min/app.min.js'],
            },
            files: {
                src: ['index.html']
            }
        }
    },
    watch: {
      js: {
        files: [basePath+'*.js'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'cachebreaker']);

};