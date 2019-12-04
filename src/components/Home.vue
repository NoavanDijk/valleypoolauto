<template>
  <div id="home">
<!-- Datepicker to sort the reservations and the "Reserve here" button -->
    <div class="content">
      <div class="headerdatebutton">
        <div class="sortbydate">
          <input class="input headerdate" type="date" v-model="sortDate" v-on:keyup="onClickSortedArray">
        </div>

        <div class="sortbuttons">
          <div class="divsortbutton">
            <button class="button is-primary sortbutton" type="button" name="button" v-on:click="onClickSortedArray">Sort</button>
          </div>

          <div class="divundosortbutton">
            <button class="button is-text undosortbutton" type="button" name="button" v-on:click="onClickClearSortedArray">Undo sort</button>
          </div>
        </div>

        <div class="addreservation">
          <button class="button addreservationbutton is-primary" type="button" name="button" v-on:click="onClickMakeReservationButton">
            <a href="#section1">Reserve here</a>
          </button>
        </div>
      </div>

<!-- Table with all the reservations -->
      <div class="reservationstable">
        <table class="ea_table" v-show="allReservations">
          <thead>
            <tr>
              <th>Startdate</th>
              <th>Enddate</th>
              <th>Starttime</th>
              <th>Endtime</th>
              <th>Name</th>              
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
            <div class="noreservations" v-show="noReservations">
              <p><i>There are no reservations on this day yet.</i></p>
            </div>
          <tbody v-for="(item, index) in items" v-bind:key="index" v-bind:class="{'active': activeIndex === index}">
            <tr v-show="showReservation[index]">
              <td v-on:click="openReservation(index)" class="tdstartdate">{{formatDateToString(item.startdate)}}</td>
              <td v-on:click="openReservation(index)" class="tdenddate">{{formatDateToString(item.enddate)}}</td>
              <td v-on:click="openReservation(index)" class="tdstartdate">{{item.startTime}}</td>
              <td v-on:click="openReservation(index)" class="tdenddate">{{item.endTime}}</td>
              <td v-on:click="openReservation(index)" >Firstname Surname</td>              
              <td v-on:click="openReservation(index)">{{item.status}}</td>
              <td class="tdbuttons">
                <button class="button is-text entermileagebutton" :disabled="checkStatusApprovedOrNotMileage[index]" v-on:click="onClickFillInInformationForm(index)"><a class="aentermileage" href="#section2">Enter mileage</a></button>
              </td>
              <td class="tdbuttons">
                <button class="button editbutton" :disabled="checkStatusApprovedOrNot[index]" v-on:click="onClickEditReservationForm(index)"><a class="aedit" href="#section1"><i class="fas fa-edit"></i></a></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

<!-- Form to make a reservation -->
      <div id="section1" class="formmakereservation" v-if="items[activeIndex]" v-show="showMakeReservationForm[activeIndex]">
        <div class="tile is-ancestor">
          <div class="tile is-parent tilereservationform">
            <div class="tile is-child box">
              <div class="makereservationwithdelete">
                <form class="makereservationform" action="">
                  <div class="field dates">
                    <div class="startdate">
                      <label class="label">Startdate</label>
                      <input class="input" type="date" v-model="startdate">
                    </div>

                    <div class="enddate">
                      <label class="label">Enddate</label>
                      <input class="input" type="date" v-model="enddate">
                    </div>
                  </div>

                  <div class="field time">
                    <div class="starttime">
                      <label class="label">Starttime</label>
                      <input class="input" type="time" v-model="startTime">
                    </div>

                    <div class="endtime">
                      <label class="label">Endtime</label>
                      <input class="input" type="time" v-model="endTime">
                    </div>
                  </div>

                  <div class="field description">
                    <label class="label">Description/Client</label>
                    <textarea class="textarea" v-model="description"></textarea>
                  </div>
                </form>
              </div>

              <div class="deleteandreservebutton">
                <div class="divdeletebutton">
                  <button class="button deletebutton" type="button" name="button" v-on:click="onClickOpenDeleteWarning"><i class="fas fa-trash"></i></button>
                </div>

                <div class="reserveandcancelbutton">
                  <div class="cancelbutton">
                    <button class="button is-text" type="button" name="button" v-on:click="onClickCancel">Cancel</button>
                  </div>

                  <div class="reservatebutton">
                    <button class="button is-primary" type="button" name="button"  v-on:click="onClickConfirmEditReservation">Reserve</button>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

<!-- Show reservation form -->
      <div class="formmakereservation" v-if="items[activeIndex]" v-show="showReservationForm[activeIndex]">
        <div class="tile is-ancestor">
          <div class="tile is-parent tilereservationform">
            <div class="tile is-child box">
              <div class="makereservationwithdelete">
                <form class="showreservationform" action="">
                  <div class="field dates">
                    <div class="startdate">
                      <label class="label">Startdate</label>
                      <input class="input" type="date" v-model="startdate" readonly>
                    </div>

                    <div class="enddate">
                      <label class="label">Enddate</label>
                      <input class="input" type="date" v-model="enddate" readonly>
                    </div>
                  </div>

                  <div class="field time">
                    <div class="starttime">
                      <label class="label">Starttime</label>
                      <input class="input" type="time" v-model="startTime" readonly>
                    </div>

                    <div class="endtime">
                      <label class="label">Endtime</label>
                      <input class="input" type="time" v-model="endTime" readonly>
                    </div>
                  </div>

                  <div class="field description">
                    <label class="label">Description/Client</label>
                    <textarea class="textarea" v-model="description" readonly></textarea>
                  </div>
                </form>
              </div>

              <div class="deleteandreservebutton">
                <div class="reservatebutton">
                  <button class="button is-text" type="button" name="button"  v-on:click="onClickCancel">Close</button>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>

<!-- Form to enter the mileage and the zipcodes -->
      <div id="section2" class="formmakereservation" v-if="items[activeIndex]" v-show="showAddKmAndZipcodesForm[activeIndex]">
        <div class="tile is-ancestor">
          <div class="tile is-parent tilereservationform">
            <div class="tile is-child box">
              <form class="makereservationform" action="">
                <div class="field dates">
                  <div class="kmstart">
                    <label class="label">Mileage start</label>
                    <input class="input inputkm" type="number" v-model="kmstart">
                  </div>

                  <div>
                    <label class="label">Mileage end</label>
                    <input class="input inputkm" type="number" v-model="kmend">
                  </div>
                </div>

                <div class="field time">
                  <div class="zipcodedeparture">
                    <label class="label">Zipcode departure</label>
                    <input class="input inputzipcodes" type="text" v-model="zipcodedeparture">
                  </div>

                  <div>
                    <label class="label">Zipcode destination</label>
                    <input class="input inputzipcodes" type="text" v-model="zipcodedestination">
                  </div>
                </div>
              </form>
              <div class="reservatebutton">
                <button class="button is-text" v-on:click="onClickCancel">Cancel</button> 
                <button class="button is-primary" type="button" name="button" :disabled="saveButtonIsDisabled" v-on:click="onClickSaveButton">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Warning modal after you make a reservation -->
    <div class="modal" :class="{'is-active': activeModalId === 'modal-warning'}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Warning!</p>
          <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
        </header>
        <section class="modal-card-body">
          <p>Don't forget your mileage! These must be entered by <b>Enter mileage</b> after your ride.</p>
        </section>
        <footer class="modal-card-foot warningbuttons">
            <button class="button" v-on:click="onClickCloseModal">Cancel</button>
            <button class="button is-primary" v-on:click="onClickContinueButton">Continue</button>
        </footer>
      </div>
    </div>

  <!-- Warning modal if you want to delete a reservation -->
    <div class="modal js-modalconfirmdelete" :class="{'is-active': activeModalId === 'modal-delete'}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-family-secondary">Delete</p>
          <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure you want to delete this reservation? You cannot undo this action.</p>
        </section>
        <footer class="modal-card-foot footerdeletewarning">
          <button class="button is-text" v-on:click="onClickCloseModal">Cancel</button>
          <button class="button is-primary" v-on:click="onClickDeleteReservation">Delete</button>
        </footer>
      </div>
    </div>

<!-- "Accept" and  "Turn down" buttons -->
    <button class="button is-primary" type="button" name="button" :disabled="disableAcceptAndTurnDownButton" v-on:click="onClickAcceptReservation">Accept</button>
    <button class="button is-secondary" type="button" name="button" :disabled="disableAcceptAndTurnDownButton" v-on:click="onClickTurnDownReservation">Turn down</button>
    
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      activeIndex: -1,

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

      // Form arrays
      allReservations: true,
      showMakeReservationForm: [],
      showReservationForm: [],
      showAddKmAndZipcodesForm: [],

      disableAcceptAndTurnDownButton: true,

      // Sort data
      showReservation: [],
      sortDate: '',
      noReservations: false,

      // Modal
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
      const zipcodesAreFilledIn = this.zipcodedeparture.length > 0
                               && this.zipcodedestination.length > 0;
      return !(kmEndIsBiggerThanKmstart && zeroKilometers && zipcodesAreFilledIn);
    },

    checkStatusApprovedOrNot(){
      const arr = [];
      const self = this;

      for(var i = 0; i < this.items.length; i++){
        if(this.items[i].status == "Approved"){
          arr.push(true);
        }
        if(this.items[i].status == "Completed"){
          arr.push(true);
        }
        if(this.items[i].status == "In progress"){
          arr.push(false);
        }
      }
      return arr; 
    },

    checkStatusApprovedOrNotMileage(){
      const arr2 = [];
      for(var i = 0; i < this.items.length; i++){
        if(this.items[i].status == "Approved"){
          arr2.push(false);
        }else{
          arr2.push(true);
        }
      }
    return arr2;
    },
  },

  watch: {
    activeIndex(){
  // if activeindex is valid, do the below
      if(this.items[this.activeIndex]){
        const el = this.items[this.activeIndex];
        this.startTime = el.startTime;
        this.endTime = el.endTime;
        this.startdate = el.startdate;
        this.enddate = el.enddate;

        this.kmstart = el.kmstart;
        this.kmend = el.kmend;
        this.zipcodedeparture = el.zipcodedeparture;
        this.zipcodedestination = el.zipcodedestination;
        this.description = el.description;
        this.status = el.status;
      }
    }
  },

  created: function(){
    const self = this;
    let config = {'Authorization': 'f35da560-8a5e-4db9-976d-973117b682f6'};
    axios.get('/baas/poolcar/reservations', {headers: config})
    .then(response => {
      for(let i = 0; i < response.data.length; i += 1){
        const d = response.data[i];
       if(d.item){ 
        const newItem = d.item;
        
        newItem.id = d._id;
        self.items.push(newItem);
        }
      }
      
      self.items = self.items.sort(this.compare); 
      
      for(let i = 0; i < self.items.length; i++){
        var currentDate = new Date();
        var convertedcurrentdate = moment(this.formatDateToString(currentDate), "D/M/YYYY").unix();
        var str2 = moment(this.formatDateToString(self.items[i].enddate), "D/M/YYYY").unix();

        if(str2 < convertedcurrentdate){
          this.showReservation.push(false);
        }else{
          this.showReservation.push(true);
        }
        
        this.showMakeReservationForm.push(true);
        this.showReservationForm.push(true);
        this.showAddKmAndZipcodesForm.push(false);
        
        self.items = self.items.sort(this.compare2);
      }
      
    })
    .catch(error => {
      console.log(error)
    })
  },

  methods: {
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

    onClickCloseModal: function(event){
      this.activeModalId = "";
      return;
    },

    compare: function(a, b){
      if(a.startdate < b.startdate){
        return -1;
      }          
      if(a.startdate > b.startdate){
        return 1;
      }else{
        return 0;
      }
    },

    compare2: function(a, b){
      if(a.startdate == b.startdate){
        if(a.startTime < b.startTime){
          return -1;
        }          
        if(a.startTime > b.startTime){
          return 1;
        }else{
          return 0;
        }
      }
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

      this.showMakeReservationForm.push(true);
      this.showAddKmAndZipcodesForm.push(false);
      this.showReservationForm.push(false);

      this.showReservation.push(true);
      this.onClickEditReservation(this.items.length -1);
      this.noReservations = false;
      return;
    },

    openReservation: function(index){
      this.activeIndex = index;
      this.showReservationForm.splice(this.activeIndex, 1, true);
      this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, false);
      this.disableAcceptAndTurnDownButton = false;
      return;
    },

    onClickEditReservation: function(index){
      this.activeIndex = index;
      return;
    },

    onClickConfirmEditReservation: function(event){
      this.activeModalId = "modal-warning";
      return;
    },

    onClickEditReservationForm: function(index){
      this.activeIndex = index;
      this.showMakeReservationForm.splice(this.activeIndex, 1, true);
      this.showReservationForm.splice(this.activeIndex, 1, false);
      this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, false);
      this.disableAcceptAndTurnDownButton = false;
      return;
    },

    onClickContinueButton: function(event){ 
      const el = this.items[this.activeIndex];

      el.startTime = this.startTime;
      el.endTime = this.endTime;
      el.startdate = this.startdate;
      el.enddate = this.enddate;
      el.description = this.description;
      el.status = this.status;

      let currentObj = this;
      
      this.onClickEditReservation(this.items.length -1);
      this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      this.activeModalId = "";
      
      const itemIndex = this.activeIndex;
      if(this.items[itemIndex].id){
        const data = {_id: this.items[this.activeIndex].id, item: this.items[this.activeIndex]};
        const itemIndex = this.activeIndex;
        axios.put('/baas/poolcar/reservation', {        
          filter: JSON.stringify({ "_id" : this.items[this.activeIndex].id }),
          json: JSON.stringify(data)
        })
        .then(response => {
          console.log(response) 
        })
        .catch(function(error){
          console.log(error)
        });
        
      }else{
        const data = {item: this.items[this.activeIndex]};
        axios.post('/baas/poolcar/reservation', {
          json: JSON.stringify(data)
        })
        .then(response => {
          this.items[itemIndex].id = response.data._id; 
          console.log(response)
        })
        .catch(function(error){
          console.log(error);
        });
      }

      const self = this;
      self.items.sort(this.compare); 
      self.items.sort(this.compare2);
      return;
    },

    onClickFillInInformationForm: function(index){
      this.activeIndex = index;
      this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, true);
      this.showReservationForm.splice(this.activeIndex, 1, false);
      return;
    },

    onClickSaveButton: function(event){
      const el = this.items[this.activeIndex];

      el.kmstart = this.kmstart;
      el.kmend = this.kmend;
      el.zipcodedeparture = this.zipcodedeparture;
      el.zipcodedestination = this.zipcodedestination;
      el.status = 'Completed';

      this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, false);

      let currentObj = this;
      const data = {_id: this.items[this.activeIndex].id, item: this.items[this.activeIndex]};
      const itemIndex = this.activeIndex;
      axios.put('/baas/poolcar/reservation', {        
        filter: JSON.stringify({ "_id" : this.items[this.activeIndex].id }),
        json: JSON.stringify(data)
      })
      .then(response => {
        console.log(response); 
      })
      .catch(function(error){
        console.log(error);
      });
      return;
    },

    onClickCancel: function(event){
      this.disableAcceptAndTurnDownButton = true;
      if(this.items[this.activeIndex].id){
        this.showMakeReservationForm.splice(this.activeIndex, 1, false);
        this.showReservationForm.splice(this.activeIndex, 1, false);
        this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, false);
      }else{
        this.showMakeReservationForm.splice(this.activeIndex, 1, false);
        this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, false);
        this.activeIndex = this.items.length - 1;
      }
      return;
    },

    onClickOpenDeleteWarning: function(event){
      this.activeModalId = "modal-delete";
      return;
    },

    onClickDeleteReservation: function(event){
      if(this.items[this.activeIndex].id){
        axios.delete('/baas/poolcar/reservation?filter={"_id":"' + this.items[this.activeIndex].id + '"}')
      .then(response => {
        this.items.splice(this.activeIndex, 1);
        this.activeIndex = this.items.length - 1;
        this.activeModalId = "";
        this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      })
      }else{
        this.items.splice(this.activeIndex, 1);
        this.activeModalId = "";
      }
      return;
    },    

    onClickAcceptReservation: function(event){
      const el = this.items[this.activeIndex];
      el.status = 'Approved';
      
      const data = {_id: this.items[this.activeIndex].id, item: this.items[this.activeIndex]};
        const itemIndex = this.activeIndex;
        axios.put('/baas/poolcar/reservation', {        
          filter: JSON.stringify({ "_id" : this.items[this.activeIndex].id }),
          json: JSON.stringify(data)
        })
        .then(response => {
          console.log(response) 
        })
        .catch(function(error){
          console.log(error)
        });

      this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      this.disableAcceptAndTurnDownButton = true;
      return;
    },

    onClickTurnDownReservation: function(event){
      axios.delete('/baas/poolcar/reservation?filter={"_id":"' + this.items[this.activeIndex].id + '"}')
      .then(response => {
        this.items.splice(this.activeIndex, 1);
        this.activeIndex = this.items.length - 1;
        this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      })
      return;
    },

    onClickSortedArray: function(){
      // Date
      const checksortdatearray = [];
      for(var i = 0; i < this.items.length; i++){
        const checksortdate = this.items[i].startdate == this.sortDate;        
        checksortdatearray.push(checksortdate);

        if(this.items[i].startdate == this.sortDate){
          this.showReservation.splice(i, 1, true);
          const el = this.items[this.activeIndex];
        }else{
          this.showReservation.splice(i, 1, false);
        }
      }

      var found = checksortdatearray.find(function(element) { 
        return element !== false;
      }); 

      if(found === undefined){
        this.noReservations = true;
      }else{
        this.noReservations = false;
      }

      // Time
      const self = this;
      self.items.sort(this.compare2);
    },

    onClickClearSortedArray: function(){
      for(var i = 0; i < this.items.length; i++){
        this.showReservation.splice(i, 1, true);
        this.sortDate = '';
        this.noReservations = false;

        var currentDate = new Date();
        const self = this;
        var convertedcurrentdate = moment(this.formatDateToString(currentDate), "D/M/YYYY").unix();
        var str2 = moment(this.formatDateToString(self.items[i].enddate), "D/M/YYYY").unix();

        if(str2 < convertedcurrentdate){
          this.showReservation.splice(i, 1, false);
        }else{
          this.showReservation.splice(i, 1, true);
        }
      }
      return;
    },
  }
}
</script>
