<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://www.thevalley.nl/">
          <img id="logonavbar" src="./assets/images/logo.svg" width="92" height="28">
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hiddenvue="true"></span>
        </a>
      </div>

      <div id="navbarBasic" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="navbar-item">
              Auto reserveren
            </a>
            <a class="navbar-item">
              Mijn reserveringen
            </a>
          </div>
        </div>
      </div>
    </nav>

    <div class="content">
      <div class="headerdatebutton">
        <div class="sortbydate">
          <input class="input headerdate" type="date">
        </div>

        <div class="addreservation">
          <button class="button addreservationbutton is-primary" type="button" name="button" v-on:click="onClickMakeReservationButton">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>

      <div class="reservationstable">
        <table class="table" v-visible="allReservations">
          <thead>
            <tr>
              <th>Starttime</th>
              <th>Endtime</th>
              <th>Name</th>
              <th>Startdate</th>
              <th>Enddate</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" v-on:click="changeColor(index)" v-bind:class="{'active': activeIndex === index}">
              <td v-html="item.startTime"></td>
              <td v-html="item.endTime"></td>
              <td>Name</th>
              <td v-html="formatDateToString(item.startdate)"></td>
              <td v-html="formatDateToString(item.enddate)"></td>
              <td v-html="item.status"></td>
              <td><i class="fas fa-edit"></i></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="formmakereservation" v-if="items[activeIndex]">
        <form action="" v-visible="makeReservationForm">
          <input class="input" type="time" v-model="startTime">
          <input class="input" type="time" v-model="endTime">
          <input class="input" type="date" v-model="startdate">
          <input class="input" type="date" v-model="enddate">
          <button class="button is-primary" type="button" name="button" :disabled="reservatebuttonIsDisabled" v-on:click="onClickConfirmEditReservation">Reserveer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'app',
  data() {
    return {
      activeIndex: -1,
      makeReservationForm: true,
      allReservations: true,

      // Editable Reserve Object
      startdate: '',
      enddate: '',
      startTime: '',
      endTime: '',
      id: 1,
      status: 'In progress',

      kmstart: 0,
      kmend: 0,
      zipcodedeparture: '',
      zipcodedestination: '',
      description: '',

      items: [],
    }
  },

  computed: {
    reservatebuttonIsDisabled(){
      var currentDate = new Date();
      var convertedcurrentdate = moment(this.formatDateToString(currentDate), "D/M/YYYY").unix();
      var str = moment(this.formatDateToString(this.startdate), "D/M/YYYY").unix();
      var str2 = moment(this.formatDateToString(this.enddate), "D/M/YYYY").unix();

      var starttime = this.startTime.split(':');
      var endtime = this.endTime.split(':');
      var hours = (starttime[0] * 60 * 60);
      var minutes = (starttime[1] * 60);

      var hours2 = (endtime[0] * 60 * 60);
      var minutes2 = (endtime[1] * 60);

      var totalsecondsbegin = hours + minutes;
      var totalsecondsend = hours2 + minutes2;

      const inputsAreValid = this.startdate.length > 0
                          && this.enddate.length > 0
                          && this.startTime.length > 0
                          && this.endTime.length > 0;
      const datesAreEqual = str == str2;
      const beginTimeIsBeforeEndTime = totalsecondsbegin < totalsecondsend;
      const beginAndEndDateAreAfterCurrentDate = str >= convertedcurrentdate && str2 >= convertedcurrentdate;
      const endDateisAfterBeginDate = str2 > str;
      const datesAreEqualAndBeginTimeIsBeforeEndTime = datesAreEqual && beginTimeIsBeforeEndTime;

      return !( inputsAreValid
        && beginAndEndDateAreAfterCurrentDate
        && endDateisAfterBeginDate
        || datesAreEqualAndBeginTimeIsBeforeEndTime);
    },
  },

  watch: {
    activeIndex(){
  // if activeindex is valid, do the below
      if(this.items[this.activeIndex]){
        this.startTime = this.items[this.activeIndex].startTime;
        this.endTime = this.items[this.activeIndex].endTime;
        this.startdate = this.items[this.activeIndex].startdate;
        this.enddate = this.items[this.activeIndex].enddate;

        this.kmstart = this.items[this.activeIndex].kmstart;
        this.kmend = this.items[this.activeIndex].kmend;
        this.zipcodedeparture = this.items[this.activeIndex].zipcodedeparture;
        this.zipcodedestination = this.items[this.activeIndex].zipcodedestination;
        this.description = this.items[this.activeIndex].description;
      }
    }
  },

  methods: {
    changeColor: function(index){
      this.activeIndex = index;
      return;
    },

    formatDateToString: function(date){
      var d = new Date(date);
      var retVal;
      if(d instanceof Date && !isNaN(d)){
        var yyyy = d.getFullYear();
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var dd = String(d.getDate()).padStart(2, '0');
        retVal = `${dd}-${mm}-${yyyy}`;
      }else{
        retVal = 'dd-mm-yyyy';
      }
      return retVal;
    },

    onClickMakeReservationButton: function(event){
      this.items.push ({
        // id: 0
        startTime: "",
        endTime: "",
        startdate: "",
        enddate: "",
        kmend: 0,
        kmstart: 0,
        zipcodedeparture: '',
        zipcodedestination: '',
        description: '',
        status: this.status
      });

      this.changeColor(this.items.length -1);
      this.makeReservationForm = true;
    },

    onClickConfirmEditReservation: function(event){
      this.items[this.activeIndex].startTime = this.startTime;
      this.items[this.activeIndex].endTime = this.endTime;
      this.items[this.activeIndex].startdate = this.startdate;
      this.items[this.activeIndex].enddate = this.enddate;
    }
  }
}
</script>
