<template>
  <div id="information">
    <h1>Hier komt een dashboard met grafieken over de gemaakte kilometers</h1>

    <div>
      <apexchart width="660" type="bar" :options="options" :series="series"></apexchart>
    </div>

    <div>
      <p><b>Totaal aantal kilometers:</b></p>
      <p id="demo"></p>
    </div>
  </div>  
</template>

<script>
  export default {
    name: 'Information',
    data: function() {
      return {
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
          data: [30, 15, 45, 50, 29, 60, 40, 91, 20, 50, 30, 80]
        }],
      }
    },

    created: function(){
      const self = this;
      let config = {'Authorization': 'f35da560-8a5e-4db9-976d-973117b682f6'};
      axios.get('/baas/poolcar/reservations', {headers: config})
      .then(response => {
        const totalkilometersarray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
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
    }
  }
</script>