"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  Chart as Chart,
  Xaxis as Xaxis,
  Yaxis as Yaxis,
  Grid as Grid,
} from 'react-d3-core';

import {
  default as xyChart
} from './inherit/xyPlot';

import {
  default as Line,
} from './components/line';

import {
  default as AreaSimple,
} from './components/area';

import {
  default as Scatter,
} from './components/scatter';

import {
  default as CommonProps,
} from './commonProps';

export default class LineChart extends xyChart {

  static defaultProps = Object.assign(CommonProps, {
    showScatter: false
  })

  render() {

    var lines;
    var scatters;

    const {
      showScatter,
      showXGrid,
      showYGrid,
      interpolate,
      chartSeries
    } = this.props;

    const xDomain = this.props.xDomain || this.mkXDomain();
    const yDomain = this.props.yDomain || this.mkYDomain();

    const xScaleSet = this.mkXScale();
    const yScaleSet = this.mkYScale();
    const chartSeriesData = this.mkSeries();


    if(showXGrid) {
      var xgrid = <Grid type="x" key="xgrid" xDomain={xDomain} {...this.props} />
    }

    if(showYGrid) {
      var ygrid = <Grid type="y" key="ygrid" yDomain={yDomain} {...this.props} />
    }

    if(chartSeries) {
      var lines = chartSeriesData.map((d, i) => {
        if(d.area) {
          // area chart
          return <AreaSimple dataset={d} key={i} {...this.props} xScaleSet= {xScaleSet} yScaleSet= {yScaleSet} chartSeriesData= {chartSeriesData} />
        } else {
          // simple line chart
          return <Line dataset={d} key={i} {...this.props} xScaleSet= {xScaleSet} yScaleSet= {yScaleSet} chartSeriesData= {chartSeriesData} />
        }
      })
    }

    if(showScatter && !interpolate) {
      // show scatters in line chart
      var scatters = chartSeriesData.map((d, i) => {
        return <Scatter dataset={d} key={i} {...this.props} xScaleSet= {xScaleSet} yScaleSet= {yScaleSet} chartSeriesData= {chartSeriesData} />
      })
    }

    return (
      <g>
        <g ref= "plotGroup">
          {lines}
          {scatters}
        </g>
        {xgrid}
        {ygrid}
        <Xaxis xDomain={xDomain} {...this.props} />
        <Yaxis yDomain={yDomain} {...this.props} />
      </g>
    )
  }
}
