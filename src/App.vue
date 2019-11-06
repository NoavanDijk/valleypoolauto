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
              Reserve the car
            </a>
            <a class="navbar-item">
              My reservations
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
            Reserve here
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
            <tr v-for="(item, index) in items" v-bind:class="{'active': activeIndex === index}" v-if="items[activeIndex]">
              <td v-html="item.startTime"></td>
              <td v-html="item.endTime"></td>
              <td>Name</th>
              <td v-html="formatDateToString(item.startdate)"></td>
              <td v-html="formatDateToString(item.enddate)"></td>
              <td v-html="item.status"></td>
              <td>
                <button class="button editbutton" :disabled="approvedOrNot[index]" v-on:click="onClickEditReservation(index)"><i class="fas fa-edit"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="formmakereservation" v-if="items[activeIndex]" v-show="activeIndex > -1">
        <div class="tile is-ancestor">
          <div class="tile is-parent tilereservationform">
            <div class="tile is-child box">
              <form class="makereservationform" action="">
                <div class="field dates">
                  <div class="startdate">
                    <label class="label">Startdate</label>
                    <input class="input" :disabled="acceptIsClicked[activeIndex]" type="date" v-model="startdate">
                  </div>

                  <div class="enddate">
                    <label class="label">Enddate</label>
                    <input class="input" :disabled="acceptIsClicked[activeIndex]" type="date" v-model="enddate">
                  </div>
                </div>

                <div class="field time">
                  <div class="starttime">
                    <label class="label">Starttime</label>
                    <input class="input" :disabled="acceptIsClicked[activeIndex]" type="time" v-model="startTime">
                  </div>

                  <div class="endtime">
                    <label class="label">Endtime</label>
                    <input class="input" :disabled="acceptIsClicked[activeIndex]" type="time" v-model="endTime">
                  </div>
                </div>

                <div class="field description">
                  <label class="label">Description/Client</label>
                  <textarea class="textarea" :disabled="acceptIsClicked[activeIndex]" v-model="description"></textarea>
                </div>
              </form>
              <div class="reservatebutton">
                <button class="button is-primary" type="button" name="button" :disabled="reserveButtonIsDisabled" v-on:click="onClickConfirmEditReservation">Reserve</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formmakereservation" v-if="items[activeIndex]" v-show="false">
        <div class="tile is-ancestor">
          <div class="tile is-parent tilereservationform">
            <div class="tile is-child box">
              <form class="makereservationform" action="">
                <div class="field dates">
                  <div class="kmstart">
                    <label class="label">Mileage start</label>
                    <input class="input" type="number" v-model="kmstart">
                  </div>

                  <div class="kmend">
                    <label class="label">Mileage end</label>
                    <input class="input" type="number" v-model="kmend">
                  </div>
                </div>

                <div class="field time">
                  <div class="zipcodedeparture">
                    <label class="label">Zipcode departure</label>
                    <input class="input" type="text" v-model="zipcodedeparture">
                  </div>

                  <div class="zipcodedestination">
                    <label class="label">Zipcode destination</label>
                    <input class="input" type="text" v-model="zipcodedestination">
                  </div>
                </div>
              </form>
              <div class="reservatebutton">
                <button class="button is-primary" type="button" name="button" :disabled="saveButtonIsDisabled" v-on:click="onClickSaveButton">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" :class="{'is-active': activeModalId === 'modal-warning'}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Warning!</p>
          <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
        </header>
        <section class="modal-card-body">
          <p>Don't forget your mileage! These must be entered in <b>My reservations</b> after your ride.</p>
        </section>
        <footer class="modal-card-foot warningbuttons">
            <button class="button" v-on:click="onClickCloseModal">Cancel</button>
            <button class="button is-primary" v-on:click="onClickContinueButton">Continue</button>
        </footer>
      </div>
    </div>

    <button class="button is-primary" type="button" name="button" v-on:click="onClickAcceptReservation">Accept</button>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'app',
  data() {
    return {
      activeIndex: -1,

      allReservations: true,

      approvedOrNot: [],
      acceptIsClicked: [],

      // Editable Reserve Object
      startdate: '',
      enddate: '',
      startTime: '',
      endTime: '',
      status: 'In progress',

      kmstart: 0,
      kmend: 0,
      zipcodedeparture: '',
      zipcodedestination: '',
      description: '',

      items: [],

      activeModalId: '',
    }
  },

  computed: {
    reserveButtonIsDisabled(){
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

    saveButtonIsDisabled(){
      const kmEndIsBiggerThanKmstart = parseInt(this.kmend) >= parseInt(this.kmstart);
      const zeroKilometers = this.kmend != 0 && this.kmstart != 0;
      return !(kmEndIsBiggerThanKmstart && zeroKilometers);
    }
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
    onClickFillInInformation: function(index){
      this.activeIndex = index;
      return;
    },

    onClickEditReservation: function(index){
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
        startTime: "",
        endTime: "",
        startdate: "",
        enddate: "",
        kmend: 0,
        kmstart: 0,
        zipcodedeparture: '',
        zipcodedestination: '',
        description: '',
        status: this.status,
      });

      this.approvedOrNot.push(false);
      this.acceptIsClicked.push(false);
      this.onClickEditReservation(this.items.length -1);
      return;
    },

    onClickConfirmEditReservation: function(event){
      this.items[this.activeIndex].startTime = this.startTime;
      this.items[this.activeIndex].endTime = this.endTime;
      this.items[this.activeIndex].startdate = this.startdate;
      this.items[this.activeIndex].enddate = this.enddate;
      this.items[this.activeIndex].description = this.description;

      this.activeModalId = "modal-warning";
      return;
    },

    onClickAcceptReservation: function(event){
      this.items[this.activeIndex].status = 'Approved';
      this.approvedOrNot.splice(this.activeIndex, 1, true);
      this.acceptIsClicked.splice(this.activeIndex, 1, true);
      this.onClickEditReservation(this.items.length -1);
      return;
    },

    onClickCloseModal: function(event){
      this.activeModalId = "";
      return;
    },

    onClickContinueButton: function(event){
      this.onClickEditReservation(this.items.length -1);
      this.activeModalId = "";
      return;
    },

    onClickSaveButton: function(event){
      this.items[this.activeIndex].kmstart = this.kmstart;
      this.items[this.activeIndex].kmend = this.kmend;
      this.items[this.activeIndex].zipcodedeparture = this.zipcodedeparture;
      this.items[this.activeIndex].zipcodedestination = this.zipcodedestination;

      this.items[this.activeIndex].status = 'Completed';
      return;
    }

  }
}
</script>
