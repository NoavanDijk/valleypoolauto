<template>
  <div id="home">
<!-- Datepicker to sort the reservations and the Reserve here button -->
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
              <th></th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in items" v-bind:key="index" v-bind:class="{'active': activeIndex === index}">
            <!-- v-if="items[activeIndex]" v-show="showReservation[index]" -->
            <tr v-show="showReservation[index]">
              <td class="tdstartdate">{{item.startTime}}</td>
              <td class="tdenddate">{{item.endTime}}</td>
              <td>Firstname Surname</td>
              <td class="tdstartdate">{{formatDateToString(item.startdate)}}</td>
              <td class="tdenddate">{{formatDateToString(item.enddate)}}</td>
              <td>{{item.status}}</td>
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

      <div class="noreservations" v-show="noReservations">
        <p>Op deze dag zijn er nog geen reserveringen</p>
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
                    <button class="button is-text" type="button" name="button" v-on:click="onClickCancelEditReservation">Cancel</button>
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
          <p>Don't forget your mileage! These must be entered in <b>My reservations</b> after your ride.</p>
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

    <button class="button is-primary" type="button" name="button" v-on:click="onClickAcceptReservation">Accept</button>
    <button class="button is-secondary" type="button" name="button" v-on:click="onClickTurnDownReservation">Turn down</button>
    <button class="button is-primary" type="button" name="button" v-on:click="sortReservations">Sort reservations</button>
    

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

      allReservations: true,

      showReservation: [],
      sortDate: '',
      noReservations: false,

      approvedOrNot: [],
      approvedOrNotMileage: [],
      showMakeReservationForm: [],
      showAddKmAndZipcodesForm: [],

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
      const zipcodesAreFilledIn = this.zipcodedeparture.length > 0
                               && this.zipcodedestination.length > 0;
      return !(kmEndIsBiggerThanKmstart && zeroKilometers && zipcodesAreFilledIn);
    },

    checkStatusApprovedOrNot(){
      const arr = [];
      for(var i = 0; i < this.items.length; i++){
        if(this.items[i].status == "Approved"){
          arr.push(true);
        }
        if(this.items[i].status == "Completed"){
          arr.push(true);
        }
        else{
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
        
      this.showMakeReservationForm.push(true);
      this.showAddKmAndZipcodesForm.push(false);
      this.showReservation.push(true);
        }
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
      this.approvedOrNotMileage.push(true);
      this.showMakeReservationForm.push(true);
      this.showAddKmAndZipcodesForm.push(false);

      this.showReservation.push(true);
      this.onClickEditReservation(this.items.length -1);
      return;
    },

    onClickFillInInformationForm: function(index){
      this.activeIndex = index;
      this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, true);
      return;
    },

    onClickEditReservation: function(index){
      this.activeIndex = index;
      return;
    },

    onClickEditReservationForm: function(index){
      this.activeIndex = index;
      this.showMakeReservationForm.splice(this.activeIndex, 1, true);
      this.showAddKmAndZipcodesForm.splice(this.activeIndex, 1, false);
      return;
    },

    onClickConfirmEditReservation: function(event){
      this.activeModalId = "modal-warning";
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
      return;
    },

    onClickCloseModal: function(event){
      this.activeModalId = "";
      return;
    },

    onClickContinueButton: function(event){
      this.onClickEditReservation(this.items.length -1);
      this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      this.activeModalId = "";

      const el = this.items[this.activeIndex];

      el.startTime = this.startTime;
      el.endTime = this.endTime;
      el.startdate = this.startdate;
      el.enddate = this.enddate;
      el.description = this.description;
      el.status = this.status;

      let currentObj = this;
      
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
    
      // function compare(a, b){
      //   if(a.startTime < b.startTime)
      //     return -1;
      // if(a.startTime > b.startTime)
      //     return 1;
      //   return 0;
      // }return this.items.sort(compare);
    },

    onClickCancelEditReservation: function(event){
      if(this.items[this.activeIndex].id){
        this.showMakeReservationForm.splice(this.activeIndex, 1, false);
      }else{
        this.showMakeReservationForm.splice(this.activeIndex, 1, false);
        this.activeIndex = this.items.length - 1;
      }
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
      })
      }else{
        this.items.splice(this.activeIndex, 1);
        this.activeModalId = "";
      }
      
      return;
    },

    onClickTurnDownReservation: function(event){
      axios.delete('/baas/poolcar/reservation?filter={"_id":"' + this.items[this.activeIndex].id + '"}')
      .then(response => {
        this.items.splice(this.activeIndex, 1);
        this.activeIndex = this.items.length - 1;
      })
      return;
    },

    onClickSortedArray: function(){
      // date
      for(var i = 0; i < this.items.length; i++){
        if(this.items[i].startdate == this.sortDate){
          this.showReservation.splice(i, 1, true);
          const el = this.items[this.activeIndex];
        }
        // if((this.items[i].startdate == this.sortDate )= 0){
        //   this.noReservations = true;
        // }
        else{
          this.showReservation.splice(i, 1, false);
        }
        // if (0 in die lijst startdate == sortDate hebben){
        // this.noReservations = true;
      }

      
      // time
      //   function compare(a, b){
      //     console.log(a.startTime);
      //     console.log(b.startTime);
      //     if(a.startTime < b.startTime)          
      //       return -1;
      //     if(a.startTime > b.startTime)
      //       return 1;
      //     return 0;
      //   }
      // return this.items.sort(compare);
    },

    onClickClearSortedArray: function(){
      for(var i = 0; i< this.items.length; i++){
        this.showReservation.splice(i, 1, true);
        this.sortDate = '';
      }
      return;
    },

    sortReservations: function(){
      for(var i = 0; i < this.items.length; i++){
        function compare(a, b){
        if(a.startdate < b.startdate){
          return -1;
        }          
        if(a.startdate > b.startdate){
          return 1;
          
        }else{
          return 0;
        }
          // Als er meer dan 2 reserveringen zijn met dezelfde datum, dan moet je het sorteren op tijd.
        }
      return this.items.sort(compare);

      // function compare2(a, b){
      //     console.log(a.startTime);
      //     console.log(b.startTime);
      //     if(a.startTime < b.startTime)          
      //       return -1;
      //     if(a.startTime > b.startTime)
      //       return 1;
      //     return 0;
      //   }
      // return this.items.sort(compare2);
      }
      
    }
  }
}
</script>
