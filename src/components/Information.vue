<template>
  <div id="information">
    <h1>Hier komt een dashboard met grafieken over de gemaakte kilometers</h1>

    <div>
      <apexchart width="660" type="bar" :options="options" :series="series"></apexchart>
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
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 15, 45, 50, 29, 60, 40, 91, 20, 50, 30, 80]
      }]
    }
    }
  }
</script>