<template>
  <div id="information">
    <h1>Hier komt een dashboard met grafieken over de gemaakte kilometers</h1>

    <div>
      <apexchart width="660" type="bar" :options="options" :series="series"></apexchart>
    </div>

    <div>
      <p id="demo">Totaal aantal kilometers: </p>
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
              shadeTo: 'light',
              shadeIntensity: 0.65
            }
          },
        },
        series: [{
          name: 'series-1',
          data: [30, 15, 45, 50, 29, 60, 40, 91, 20, 50, 30, 80]
        }],
      }
    },

    created: function(){
      const self = this;
      let config = {'Authorization': 'f35da560-8a5e-4db9-976d-973117b682f6'};
      axios.get('/baas/poolcar/reservations', {headers: config})
      .then(response => {
        const totalkilometersarray = [];
        for(var i = 0; i < response.data.length; i += 1){
          const d = response.data[i];
          const totalkilometers = d.item.kmend - d.item.kmstart;

          totalkilometersarray.push(totalkilometers);
        }

        function getSum(total, num) {
          return total + Math.round(num);
        }

        document.getElementById("demo").innerHTML = totalkilometersarray.reduce(getSum, 0);
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
</script>