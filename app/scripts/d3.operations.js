import { AppContext } from "/scripts/app.context.js"
import { GraphInforController } from "/scripts/DOMscripts/PopUPs/graph.bar.infor.js"
import { d3Module as d3} from "/scripts/app.js"
import { ProductManager } from "/scripts/product.manager.js"

export const D3Operations = (() => {
  function plot(numeric_key = 'quantity') {
    const products = ProductManager.getAllProducts()
    const full_width = 600
    const full_height = 400

    const svg = d3.select("#data-visual");
    svg
      .attr("viewBox", `0 0 ${full_width} ${full_height}`)



    // Gradient definition
    const gradient_def = svg.append('defs').append("linearGradient").attr('id', "graph-area-grad")
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
    //Gradient point A
    const grad_a = gradient_def.append("stop")
      .attr('offset', "0%")
      .attr('stop-color', "#d8d8d8ff")
    // Gradient point B
    const grad_b = gradient_def.append("stop")
      .attr('offset', "100%")
      .attr('stop-color', "#d7d7d7")

    AppContext.Preferences.subscribeToDarkMode((darkmode) => {
      if (darkmode === true) {
        grad_a.attr("stop-color", "#2c4841")
        grad_b.attr("stop-color", "#323736")
      } else {
        grad_a.attr("stop-color", "#e6e6e6ff")
        grad_b.attr("stop-color", "#d7d7d7")
      }
    })

    const label_pad = 20
    const axis_area = 35
    const width = full_width - axis_area;
    const height = full_height  - label_pad - axis_area;


    const canvas_area_bg = svg.append("rect")
      .attr("height", height+20)
      .attr('width', width)
      .attr('x', axis_area)
      .attr('y', 0)
    const canvas_area = svg.append("g")
      .attr("id", "graph-area")
      .attr("height", height)
      .attr("width", width)
      .attr("transform",`translate(${axis_area}, 0)`);
    // using utils from D3 to automatically scale our bars
    const x = d3.scaleBand()
      .domain(products.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(products, d => d[numeric_key])])
      .range([0, height]);
    // Ordered
    const copy_for_order = d3.scaleLinear()
      .domain([d3.max(products, d => d[numeric_key]), 0])
      .range([0, height]);

    const yaxis = d3.axisLeft(copy_for_order)

    const translate_y_axis = label_pad
    svg.append("g")
      .attr("fill" , "#808080" )
      .attr("transform", `translate(${axis_area + ', ' + translate_y_axis})`)
      .attr("width", axis_area)
      .call(yaxis)

    //
    const xaxis = d3.axisBottom(x)
    svg.append("g")
      .attr("fill" , "#808080" )
      .attr("transform", `translate(${axis_area + ', ' + (height+label_pad)})`)
      .call(xaxis)
      .selectAll(".tick")
      .remove()

    // Setting the graph area fill to gradient_def
    canvas_area_bg.attr('fill',"url(#graph-area-grad)")

    canvas_area.append("g")
      .selectAll('rect')
      .data(products)
      .enter()
      .append("g")
      .attr('fill', "#669B7C")
      // Adding bar in group
      .each(function(d) {
          const group = d3.select(this);

          // Main bar
        group.append("rect")
            .attr("class", "main-bar")
            .attr("x", x(d.name))
            .attr("y", height - y(d[numeric_key]) + label_pad)
            .attr("width", x.bandwidth())
            .attr("height", y(d[numeric_key]))

          // Baseline bar
          group.append("rect")
            .attr("class", "baseline")
            .attr("x", x(d.name))
            .attr("y", height - y(d['QuantityBaseline']) + label_pad)
            .attr("width", x.bandwidth())
            .attr("height", y(d['QuantityBaseline']))
            .attr("fill", "#557669")
            .attr("fill-opacity", 0.5);
        })
      .on("mouseover", function (event, d) {
        const main_bar = d3.select(this).select(".main-bar")
        const band_width = Number(main_bar.attr("width"))/2;
        // Actual dimention for pop up
        const DOM_width = svg.node().clientWidth
        const x_trans_factor = DOM_width/full_width
        const x = Number(main_bar.attr("x")) + band_width + axis_area + axis_area;
        const y = Number(main_bar.attr("y"));

        d3.select(this).attr('fill', '#999b66');
        console.log("virtual x: ", x)
        console.log("factor: ", null)
        console.log("actual:  ", DOM_width)
        GraphInforController.show(d, [x*x_trans_factor,event.offsetY],band_width*x_trans_factor)
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr('fill', '#669B7C');
        GraphInforController.hide()
      })
      ;

    // Adding labels on top
    canvas_area.append("g")
      .selectAll('text')
      .data(products)
      .enter()
      .append('text')
      .attr('x', d => x(d.name) + x.bandwidth() / 2)
      .attr('y', d => height - y(d[numeric_key]) +16)
      .attr('text-anchor', 'middle')
      .text(d => d[numeric_key])
      .attr('fill', 'gray')
      .attr('font-size', '14px');

    // Adding Axis labal
    svg.append("text")
      .attr("font-size", "14px")
      .attr('text-anchor', 'middle')
      .attr("x", (width / 2) + axis_area )
      .attr("y", height + axis_area + (label_pad/2))
      .text("Product " + numeric_key)
      .attr('fill', "#5f5f5f")
      .call(selection => {
        AppContext.Preferences.subscribeToDarkMode((darkmode) => {
          if (darkmode === true) selection.attr('fill', "#c2c2c2")
          else selection.attr('fill', "#5f5f5f")
        })
      })
  }


  return {
    show: ()=>{plot()},
    setViewToPrice: () => { },
    setViewToQuantity: () => { },
    setViewToQuantityvsBaseLine: ()=>{}
  }
})()