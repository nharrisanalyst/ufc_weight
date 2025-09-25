import './style.css'
import {createChart , width , margin} from './chart.js'


document.querySelector('#app').innerHTML = `
  <div class='main-grid' style="grid-template-columns: 1fr ${width + (margin.l + margin.r)}px 1fr;">
    <div></div>
    <div>
    <div id="title">
    <h1 id="mainTitle">
    UFC Fighters Shed Dangerous Amounts of Weight Before Fights
    </h1>
     <p id="authorTitle">
      By: <a id="me" href="https://bsky.app/profile/truesync.bsky.social">Nathan Harris</a>     <a href="https://bsky.app/profile/truesync.bsky.social">@truesync.bsky.social</a> <a href="http://nathanharris.co">nathanharris.co</a> 
    </p>
    <p class="subTitle">
      In 2017 a Perth Australia Based 18 year old Female Muay Thia Fighter named Jessica Lindsey died trying to make a fight wight in. In the weeks before Jessica died she had engaged in <b>“extreme weight cutting”</b>.  The day of Jessica’s weigh in she collapsed wearing layers of clothing including a sweatsuit and a beanie  while running in 89 degree heat. She was rushed to the hospital and pronounced dead 4 days later.
      <a herf="https://www.abc.net.au/news/2020-03-10/jessica-lindsay-died-after-extreme-training-for-muay-thai-fight/12042078">Jessica Lindsay</a>
    
    </p>  
    
    <p class="subTitle">
    CSAC (California State Athletic Commission) released data on Fight Night Weights for UFC 298.  The CSAC flags and warns any fighter that increases their weight from weigh-in to fight night by 10% or more as especially dangerous, because of potential long-term health effects from dehydration. We analyzed the data and found that <b> 51% of fighters</b> have passed the <b>10% extreme weight loss threshold</b>, with the average weight regained being <b>10.22%</b>.
    
    </p>

    <p class="subTitle">
    Research has shown that losing more than 2 pounds in a week can be a threat to ones health. 2 pounds in a week is on average <strong>losing more than 0.3 lbs per day</strong> is potentially dangerous to one's health.<sub>1</sub>
    </p>
    
   

    </div>
    <div>
    <h2 id="chart-title">UFC 298 Fight Night Weigh in Weight / Fight Night Weight Difference <br/>(fighters over 10% threshold shown)</h2>
    <div id="chart"></div> 
    <div>

    <p class="subTitle">
     This chart shows that UFC fighters cut extreme weight. Fighters routinely put their health in danger to make weight. Cutting extreme amounts of weight is common in the UFC, with some fighters losing over 30 pounds and then regaining that weight within a day. The chart also shows that the UFC knowingly puts fighters at risk, aware of the extreme measures they take to make weight.  
    </p>
  
    <p class="subTitle">
      We have collected video evidence of this extreme weight cutting to show the effects it has on figthers: 
    <div class="subSourcesVideo">
     Video : <a target="_blank"  href="https://www.youtube.com/shorts/PRZEylWrwTU">Geoff Neal UFC 298 weigh in at 170.5lbs </a>   &nbsp; &nbsp; Video:<a target="_blank" href ="https://www.youtube.com/watch?v=tleFsF9Q0BM"> Geoff Neal in the octogan full body 30lbs heavier at 200.8lbs, UFC 298 </a>
    <div>

    <div class="subSourcesVideo">
     Video : <a target="_blank" href="https://www.youtube.com/shorts/gZnB-pL5WMY">Paulo Costa weigh in UFC 298 at 185.5lbs </a>   &nbsp; &nbsp; Video:<a target="_blank" href ="https://www.youtube.com/watch?v=LYntCdZOy8U"> Paulo Costa weigh in UFC Fight Night 196 at a more normal 204.5lbs weight.  </a> The contrast is startling.
    <div>

    <div class="subSourcesVideo">
     Video : <a target="_blank" href="https://www.youtube.com/watch?v=iGMUKC0t5R4">Aspen Ladd visibly shaken and can hardly walk at her 135lb weigh in </a>   &nbsp; &nbsp; Video:<a target="_blank" href ="https://www.youtube.com/watch?v=2ZxjUZiWozc"> Reaction to Aspen Ladd 16 second knock out.  </a>
    <div>

    <div class="subSourcesVideo">
     Video  : <a target="_blank"  href="https://www.youtube.com/watch?v=yf-h7BjD-WI"> Paddy the Baddy Documents his Weight cut including preforming an extreme weight cut of over 15lbs in the 15 hours before his weigh in. </a>
    <div>
    </p>

     
    UFC fighters today use many extreme weight cutting techniques to make weight including extreme dehydration. They manipulate water by drinking excessive amounts for a week and then restricting intake in the 24 hours before weigh-ins. They induce sweating by sitting for hours in saunas, taking hot baths with salt, and wearing sweat suits to lose gallons of fluid. Fighters manipulate sodium by consuming high amounts and then eliminating it 48 hours before a match, triggering rapid water loss. They also perform extreme exercise, such as prolonged steady-state cardio, to shed additional water weight.
    </p>

    <p class="subTitle">
    Extreme weight loss techniques that Fighter use to make weight cause a fighter to lose a <strong>dangerous amount of body weight </strong> in a 24-hour period. Fighters have <strong>died </strong> from this process, and many suffer long-term consequences.
    </p>
     
    <p class="subTitle">
      In 1997, three seperate NCAA wrestlers died while cutting weight for a match.<sub>4</sub> Their deaths sparked a national dialogue about training techniques and extreme weight loss in the sport. The tragedy pushed the NCAA to reform its rules on weight management.
    </p> 

    <p class="subTitle">
      The NCAA banned saunas, rubber suits, and diuretics. Officials began using hydration tests to ensure wrestlers competed while properly hydrated. The organization also moved weigh-ins to the day of competition to remove the advantage of extreme weight cuts. Other fighting associations, such as ONE Championship, also conduct hydration tests the UFC has no such tests.
    </p>

    <p class="subTitle">
      The UFC must reform its weigh-in process to reset fighter culture and create healthier long-term outcomes for athletes.
    </p>


    
    <div style="margin-top:16px;">
    <div class="subSources">
    1. https://www.nhlbi.nih.gov/health/educational/lose_wt/recommen.htm
    </div>

    <div class="subSources">
    3. https://www.sherdog.com/news/news/Marvin-Vettori-Paulo-Costa-Agree-to-Meet-at-205-Pounds-for-UFC-Fight-Night-196-Headliner-182526
    </div>

    <div class="subSources">
    4. https://www.mlive.com/sports/2018/03/wrestling_has_come_a_long_way.html
    </div>
    </div>
    <div id="links">
    <a href ="https://bsky.app/intent/compose?text=Patrick%20Mahomes%20and%20the%20KC%20Chiefs%20dug%20themselves%20a%20Historic%20half%20time%20deficit%20the%202nd%20worse%20ever.%20Explore%20Super%20Bowl%20comebacks%20and%20more%20in%20this%20Visualization%20http%3A%2F%2F https://nharrisanalyst.github.io/superbowlhalf/" class='sm-link'>
      <svg class="w-6 h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 568 501"><title>Bluesky butterfly logo</title><path fill="currentColor" d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z"></path></svg>
    </a>
    <div id="tweet-this">
    <a href="https://twitter.com/intent/tweet?hashtags=NFL&text=Explore Super Bowl Halftime Deficits&url=https://nharrisanalyst.github.io/superbowlhalf/" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
    <div id="reddit-this">
      <a href="https://reddit.com/submit?url=https%3A%2F%2Fnharrisanalyst.github.io%2Fsuperbowlhalf%2F&title=Patrick Mahomes and The Kansas City Chiefs Dug Themselves a Historic Unsurmountable Half Time Deficit." onclick="window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;" title="Share on Reddit" rel="noopener" >Share on Reddit</a>
    </div>
    <div id="newsletter">
       <div id="newsletter-title"> subscribe to my Data Visualization newsletter &nbsp; &nbsp; </div>
      <iframe src="https://embeds.beehiiv.com/da2f7bb3-4c1d-43cd-bb63-8094b70fa63f?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>
      </div>
    </div>
    </div>
    <div></div>
  </div>
`

createChart(document.querySelector('#chart'))
