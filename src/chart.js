import * as d3 from 'd3';
import { annotation,  annotationLabel, annotationCalloutCurve } from 'd3-svg-annotation';
import { legendColor } from 'd3-svg-legend';


export const margin ={t:20,r:50,b:20,l:125};
export const height = 1200 - (margin.r + margin.l);
export  const width = 925 - (margin.t + margin.b);

export const createChart= async (element) =>{
    const data = await d3.csv('data/ufc_weight.csv',d=>{
        return{
            event: d.EVENT.slice(3),
            fighter: d.FIGHTER,
            w_c: d.WEIGHT_CLASS,
            f_n_w: Number(d.FIGHT_NIGHT_WEIGHT),
            perc_regained:Number(d.PERCENTAGE_REGAINED),
            sex:d.SEX,
            w_i:Number(d.WEIGHT_INCREASE),
            w_i_w:Number(d.WEIGH_IN_WEIGHT)
        }
    });

    const data_by_w_i = data.sort((a,b)=> a.w_i - b.w_i).filter(d=> d.perc_regained >= 10);
    console.log(data_by_w_i.length/ data.length);

     console.log('this is the data',data);

    
    const svg = d3.select(element).append('svg').attr('height', height + (margin.r + margin.l)).attr('width', width + (margin.l + margin.r));
 
    const mainG = svg.append('g').attr('transform', `translate(${margin.l},${margin.t})`)

     console.log('this is a must win', d3.max(data_by_w_i, d => d.f_n_w))
    //scales
   const xScale = d3.scaleLinear().domain([0, d3.max(data_by_w_i, d => d.w_i)]).range([0,width]).nice();
   const yScale = d3.scalePoint([0,...data_by_w_i.map(d=>d.fighter)], [height,0]);

    //axes
    mainG.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    mainG.append('g').attr('class', 'x-axis')
                         .attr('transform', `translate(0, ${height})`)
                         .call(d3.axisBottom(xScale))
                         .call(g => g.selectAll(".tick line").clone()
                         .attr("y1", -height)
                         .attr("stroke-opacity", 0.1)); 

    //line

    mainG.append('g').selectAll('line').data(data_by_w_i).join('line')
                   .attr('x1',d=>xScale(0))
                   .attr('x2',d=>xScale(d.w_i))
                   .attr('y1', d=>yScale(d.fighter))
                   .attr('y2', d=>yScale(d.fighter))
                   .attr('stroke-width', 1)
                   .attr('stroke', 'grey')
    //line label

    mainG.append('g').selectAll('text').data(data_by_w_i).join('text')
                      .attr('x', d=>xScale(d.w_i) +2)
                      .attr('y',d=>yScale(d.fighter) +2.5 )
                      .attr('font-size', '10px')
                      .attr('fill', 'grey')
                      .text(d=> `${d.w_i}`)

 
    //safe line 
    mainG.append('g').append('line')
                   .attr('x1',d=>xScale(0.3))
                   .attr('x2',d=>xScale(0.3))
                   .attr('y1', d=>yScale(0))
                   .attr('y2', -10)
                   .attr('stroke-width', 1)
                   .attr('stroke', 'rgba(255,0,0, 0.80)')
                   .attr('stroke-dasharray', '5 5 5 5')

   //safe line label 
     mainG.append('g').append('text')
                      .attr('x', xScale(0.3)+5)
                      .attr('y', -2.5)
                      .attr('font-size', '12px')
                      .text('<- SAFE 1 day wight loss 0.3lbs')
   


   //annotations

   const type = annotationLabel
    const data_anon_one = data_by_w_i.filter(d=>d.fighter === 'Geoff Neal');
    console.log('data test', data_anon_one);
   const first_anon = [{
    note: {
      title: "Geoff Neal weight increased  30.3lbs",
      label:"Neal missed weight at ufc 285 by 4 pounds. Resorting to an extreme weight cut he made weight cutting over thirty pounds 2",
      bgPadding: 5,
      wrap:200,
    },
    connector: {
        end: "arrow",    
        type: "line",     
        lineType : "vertical",   
      },
    //can use x, y directly instead of data
    data: data_anon_one[0],
    className: "show-bg",
    x: xScale(data_anon_one[0].w_i) + 18 ,
    y: yScale(data_anon_one[0].fighter) +5,

    dx:55,
    dy:25


  }]

  const makeAnnotations = annotation()
  .notePadding(15)
  .type(type)
  .annotations(first_anon)

  mainG.append("g")
  .attr("class", "annotation-group")
  .call(makeAnnotations)

}