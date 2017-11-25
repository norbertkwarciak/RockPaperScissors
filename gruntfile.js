module.exports = function(grunt) {
    
  // Project configuration.
  grunt.initConfig({
      sass: {
          options: {
            sourceMap: true
          },
          dist: {
        files: [{
            expand: true,
            cwd: 'sass',
            src: ['**/*.scss'],
            dest: 'css',
            ext: '.css'
        }]
          }
    },

    imagemin: {
      dynamic: {
          files: [{
              expand: true,
              cwd: 'images/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'images/build/'
          }]
      }
    },

    uglify: {
      my_target: {
        files: {
          'dest/js/app.min.js': ['js/scripts.js']
        }
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },

      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify'],
        options: {
          atBegin: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'imagemin', 'uglify'], ['watch']);
};