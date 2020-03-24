console.log('Local JS loaded')

var Vue = require('vue');
var axios = require('axios')

new Vue({
    el: '#app',
    data: {
      message: 0.0,
      map: null,
      tileLayer: null,
      layers: [
        {
            id: 0,
            name: 'ZTM',
            active: false,
            features: [
                {id:0, name: 'aaa', type: 'marker', coords: [52.158495, 21.072295]}
            ],
          },
      ],

    },
    methods: {
        tempToRGB: function(temp){
            var color;
            console.log(temp)
            temp = parseFloat(temp)
            var r = (temp-5)*(temp-55)*(-0.3)
            var g = (temp+15)*(temp-25)*(-0.4)
            var b = (temp-5)*(temp+45)*(-0.3)
            color = 'rgb(' + r + ',' + g + ','  + b + ')'
            return color
        },
        getWet: function () {
            
            axios
              .get('https://danepubliczne.imgw.pl/api/data/synop/station/warszawa')
              .then(response => this.message = response.data.temperatura)
        },
        initMap() {
            var L;
            this.map = L.map('map', { zoomControl: false }).setView([52.1584, 21.0722], 15);this.tileLayer = L.tileLayer(
                'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                {
                  maxZoom: 18,
                  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                }
              );this.tileLayer.addTo(this.map)
        },
        initLayers() {},

    },
    computed: {
        bg1: function () {
            return {
                "backgroundColor":this.tempToRGB(this.message),
            }
        }

    },
    created() {
        this.getWet()
    },
    mounted() {
        this.initMap()
        this.initLayers()
    },
  })
