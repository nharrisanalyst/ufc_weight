import * as d3 from 'd3';
import { select } from 'd3';
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
    const svg = d3.select(element).append('svg').attr('height', height + (margin.r + margin.l)).attr('width', width + (margin.l + margin.r));
    const mainG = svg.append('g').attr('transform', `translate(${margin.l},${margin.t})`)
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
   const first_anon = [{
    note: {
      title: "Geoff Neal weight increased  30.3lbs",
      label:"Neal missed weight at ufc 285 by 4 pounds. Resorting to an even more extreme weight cut he made weight at 170.5 at UFC 298 cutting over 30lbs.",
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


  const data_anon_two = data_by_w_i.filter(d=>d.fighter === 'Paulo Costa');
  const second_anon = [{
    note: {
      title: "Paulo Costa weighed in at 185.5 but has a normal body weight of 211lbs ",
      label:"Paulo faught at a more normal weight in UFC fight Night 196 at 205lbs becuase acosta admitted to weighing 211lbs (his walk around weight) Wensday before the fight. source-3",
      bgPadding: 5,
      wrap:200,
    },
    connector: {
        end: "arrow",    
        type: "line",     
        lineType : "vertical",   
      },
    //can use x, y directly instead of data
    data: data_anon_two[0],
    className: "show-bg",
    x: xScale(data_anon_two[0].w_i) + 18 ,
    y: yScale(data_anon_two[0].fighter) +5,

    dx:15,
    dy:225


  }]

  const makeAnnotations_two = annotation()
  .notePadding(15)
  .type(type)
  .annotations(second_anon)

  mainG.append("g")
  .attr("class", "annotation-group")
  .call(makeAnnotations_two)


  //labels
  mainG.append('g').append('text')
        .attr('x', width-22)
        .attr('y', height-2)
        .attr('font-size', '12px')
        .attr('fill', '#555')
        .text('lbs')

        mainG.append('g').append('text')
        .attr('x', -50)
        .attr('y', -10)
        .attr('font-size', '12px')
        .attr('fill', '#222')
        .text('Fighter')


        const data_anon_three = data_by_w_i.filter(d=>d.fighter === 'Aspen Ladd');
        const third_anon = [{
          note: {
            title: "Aspen Ladd regained 17.79% of her body weight",
            label:"The most in the dataset. She was visibly shaking when she weighed in at 135lbs and was knocked out in 16 seconds. video links below",
            bgPadding: 5,
            wrap:200,
          },
          connector: {
              end: "arrow",    
              type: "line",     
              lineType : "vertical",   
            },
          //can use x, y directly instead of data
          data: data_anon_three[0],
          className: "show-bg",
          x: xScale(data_anon_three[0].w_i) + 18 ,
          y: yScale(data_anon_three[0].fighter) +5,
      
          dx:7,
          dy:400
      
      
        }]
      
        const makeAnnotations_three = annotation()
        .notePadding(15)
        .type(type)
        .annotations(third_anon)
      
        mainG.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations_three)
      
        //labels
        mainG.append('g').append('text')
              .attr('x', width-22)
              .attr('y', height-2)
              .attr('font-size', '12px')
              .attr('fill', '#555')
              .text('lbs')
      
              mainG.append('g').append('text')
              .attr('x', -50)
              .attr('y', -10)
              .attr('font-size', '12px')
              .attr('fill', '#222')
              .text('Fighter')

    //remove zero

    select('.y-axis').select('.tick').remove();

}





      