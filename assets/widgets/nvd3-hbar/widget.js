define([
    'angular',
    '/widgets/nvd3-widget/nvd3-widget.js',
    '/widgets/data-util/adapter.js',
    '/widgets/data-dialogs/bar-chart-dialog.js'
  ],
  function (angular) {

    var m = angular.module('app.widgets.nvd3-hbar', [
      'app.widgets.nvd3-widget',
      'app.widgets.data-util.adapter',
      'app.widgets.data-dialogs.bar-chart-dialog'
    ]);

    m.service('NVD3HBarAdapter', function () {
      this.applyDecoration = function (options, decoration) {
        if (angular.isDefined(decoration) && angular.isDefined(options)) {
          //console.log(options)
          options.chart.height = decoration.height;
          options.title.text = decoration.title;
          options.subtitle.text = decoration.subtitle;
          options.caption.text = decoration.caption;
          options.chart.xAxis.axisLabel = decoration.xAxisName;
          options.chart.yAxis.axisLabel = decoration.yAxisName;
          options.chart.xAxis.staggerLabels = decoration.staggerLabels;
          options.chart.rotateLabels = decoration.xAxisAngle;
          options.chart.reduceXTicks = decoration.reduceXTicks;
          options.chart.showControls = decoration.showControls;
          options.chart.stacked = decoration.stacked;
          options.chart.color = (decoration.color) ? decoration.color : null;
        }
        return options;
      }

      this.getDecoration = function (options) {
        if (angular.isDefined(options)) {
          var decoration = {}
          decoration.height = options.chart.height;
          decoration.title = options.title.text;
          decoration.subtitle = options.subtitle.text;
          decoration.caption = options.caption.text;
          decoration.xAxisName = options.chart.xAxis.axisLabel;
          decoration.yAxisName = options.chart.yAxis.axisLabel;
          decoration.xAxisAngle = options.chart.rotateLabels;
          decoration.reduceXTicks = options.chart.reduceXTicks;
          decoration.staggerLabels = options.chart.xAxis.staggerLabels;
          decoration.color = options.chart.color;
          decoration.showControls = options.chart.showControls;
          decoration.stacked = options.chart.stacked;
          return decoration;
        }
      }
    })

    m.controller('Nvd3HBarChartCtrl', function ($scope, BarChartDialog, NVD3HBarAdapter, NVD3Widget, BarSerieGenerator) {
      new NVD3Widget($scope, {
        dialog: BarChartDialog,
        decorationAdapter: NVD3HBarAdapter,
        optionsURL: "/widgets/nvd3-hbar/options.json",
        serieAdapter: {
          getX: function (d) {
            return d.label
          },
          getY: function (d) {
            return d.value
          }
        },
        serieGenerator: BarSerieGenerator
      })
    });
  });
