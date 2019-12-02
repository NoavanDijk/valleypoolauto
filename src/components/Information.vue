<template>
  <div id="information">
    <h1 class="analytics">Analytics overview</h1>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification">
              <p class="title2">Totaal aantal gemaakte kilometers</p>
              <p class="demo" id="demo"></p>
            </article>
            <article class="tile is-child notification">
              <p class="title2">Gemaakte ritten per maand</p>
              <div>
                <apexchart :width=windowWidth type="bar" :options="options" :series="series"></apexchart>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification">
              <p class="title2">Gemaakte kilometers per maand</p>
              <div>
                <apexchart :width=windowWidth type="bar" :options="options" :series="series"></apexchart>
              </div>
            </article>
            <article class="tile is-child notification">
              <p class="title2">Totaal aantal gebruikers</p>
              <p class="demo">8</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    name: 'Information',
    data: function() {
      return {
        windowWidth: 640,

        options: {
          chart: {
            id: 'vuechart'
          },

          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          
          theme: {
            monochrome: {
              enabled: true,
              color: '#ff0028',
            }
          }
        },

        series: [{
          name: 'Aantal kilometers',
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }],
      }
    },

    created: function(){
      const self = this;
      let config = {'Authorization': 'f35da560-8a5e-4db9-976d-973117b682f6'};
      axios.get('/baas/poolcar/reservations', {headers: config})
      .then(response => {
        const totalkilometersarray = [0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i = 0; i < response.data.length; i += 1){
          const d = response.data[i];
          const totalkmForItem = d.item.kmend - d.item.kmstart;
          const monthIndex = new Date(d.item.enddate).getMonth();

          let totalkmForMonth = totalkilometersarray[monthIndex];
          totalkmForMonth += totalkmForItem;
          totalkilometersarray[monthIndex] = totalkmForMonth;
        }
         
        function getSum(total, num) {
          const allkilometers = total + num;
          return allkilometers;
        }

        this.series  = [{
          data: totalkilometersarray
        }]

        document.getElementById("demo").innerHTML = totalkilometersarray.reduce(getSum, 0);
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
    },

    mounted: function(){
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
      })
    },

    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      },

      beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
      }
    }
  }
</script>